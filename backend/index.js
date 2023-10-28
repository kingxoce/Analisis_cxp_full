const express = require("express");

const cors = require("cors");

const mysql = require("mysql");


const app = express();app.use(express.json());
app.use(cors());
const db = mysql.createConnection({   
     host: "localhost",    
     user: "root",    
     port: "3306",
     password: "master",    
     database: "cxp"})

app.get("/ANT", (req, res) => {    const sql = "SELECT * FROM ANT";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});

app.get("/ANTP/:idp", (req, res) => {  
     const sql = "select * from antp where povid =?;";
     const idp = req.params.idp;  
     db.query(sql,[idp],(err, data) => {      
     if(err) return res.json("Error");    
     return res.json(data);});});


     app.get("/EDC/:idp", (req, res) => {  
          const sql = "SELECT fecha, detalle, documento, cargo, abono, @saldo := @saldo + cargo - abono AS saldo FROM (SELECT fecha_emision as fecha, CONCAT (cxp_documento.serie, ' ', cxp_documento.correlativo) as documento,'Compra' as detalle,total as cargo, 0 AS abono FROM cxp_documento where cxp_proveedor_id=? and tipo_documento_id=1 UNION ALL SELECT fecha,id as documento,'ABONO' as detalle, 0 AS cargo,total as abono FROM cxp_abono where (select cxp_proveedor_id from cxp_documento where id=factura_id)=?) AS combined JOIN (SELECT @saldo := 0) AS initial ORDER BY fecha ASC;";
          const idp = req.params.idp;  
          db.query(sql,[idp,idp],(err, data) => {      
          if(err) return res.json("Error");    
          return res.json(data);});});

          app.get("/searchprov/:idp", (req, res) => {  
               const sql = "SELECT * FROM cxp_proveedor where id=1";
               const idp = req.params.idp;  
               db.query(sql,[idp],(err, data) => {      
               if(err) return res.json("Error");    
               return res.json(data);});});

app.get("/getabonos", (req, res) => {    const sql = "SELECT * FROM abonos";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});



app.get("/getabonos", (req, res) => {    const sql = "SELECT * FROM abonos";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});


app.get("/getcont", (req, res) => {    const sql = "SELECT * FROM CONTS where estado2=1";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});

app.get("/gettipopago", (req, res) => {    const sql = "SELECT * FROM cxp_tipo_pago;";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});


app.get("/getproveedor", (req, res) => {    const sql = "SELECT *, if(retenedor=0,'No','Si') as ret FROM cxp_proveedor";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});


app.get("/searchfact/:idp", (req, res) => {  
     const sql = " SELECT * FROM cxp_documento WHERE cxp_proveedor_id=?;";
     const idp = req.params.idp;  
     db.query(sql,[idp],(err, data) => {      
     if(err) return res.json("Error");    
     return res.json(data);});});

     app.get("/searchcont/:idp", (req, res) => {  
          const sql = "SELECT * FROM CONTS where FACTURA_id=?";
          const idp = req.params.idp;  
          db.query(sql,[idp],(err, data) => {      
          if(err) return res.json("Error");    
          return res.json(data);});});

          app.get("/searchfacttocont/:idp", (req, res) => {  
               const sql = " SELECT * FROM cxp_documento WHERE cxp_proveedor_id=? and TIPO_DOCUMENTO_id=1 and estado2=0;";
               const idp = req.params.idp;  
               db.query(sql,[idp],(err, data) => {      
               if(err) return res.json("Error");    
               return res.json(data);});});

          app.get("/searchfactnocont/:idp", (req, res) => {  
               const sql = "SELECT * FROM CXP_DOCUMENTO WHERE ESTADO2=0 AND TIPO_DOCUMENTO_id=1 AND id=?;";
               const idp = req.params.idp;  
               db.query(sql,[idp],(err, data) => {      
               if(err) return res.json("Error");    
               return res.json(data);});});

               app.get("/searchco/:idp", (req, res) => {  
                    const sql = "select * FROM cxp_contra_pago where id=?";
                    const idp = req.params.idp;  
                    db.query(sql,[idp],(err, data) => {      
                    if(err) return res.json("Error");    
                    return res.json(data);});});


          app.get("/searchcontid/:idp", (req, res) => {  
               const sql = "SELECT * FROM CONTS where id=?";
               const idp = req.params.idp;  
               db.query(sql,[idp],(err, data) => {      
               if(err) return res.json("Error");    
               return res.json(data);});});



     app.get("/getbonosid/:id", (req, res) => {  
          const sql = "SELECT * FROM abonos where id=?;";
          const id = req.params.id;  
          db.query(sql,[id],(err, data) => {      
          if(err) return res.json("Error");    
          return res.json(data),console.log(data);});});



app.post('/abonar', (req, res) => {    
     const sql = "INSERT INTO cxp_abono (`descripcion`, `fecha`, `total`, `FACTURA_id`, `TIPO_PAGO_id`, `USUARIO_id`) VALUES (?)";
     const values = [req.body.descripcion,req.body.fecha, req.body.monto, req.body.factura, req.body.tipoPago, req.body.usuario];
      db.query(sql, [values], (err, data) => {        if(err) return console.log(err);       
     return res.json(data);    })})
 

     app.post('/newcont', (req, res) => {    
          const sql = "INSERT INTO cxp_contra_pago (`fecha_emision`, `fecha_acuerdo`, `descripcion`,`FACTURA_id`) VALUES (?);";
          const values = [req.body.fecha_emision, req.body.fecha_acuerdo, req.body.descripcion, req.body.FACTURA_id];
           db.query(sql, [values], (err, data) => {        if(err) return console.log(err);       
          return res.json(data);    })})




     app.put('/updateabono/:abonoid', (req, res) => {   
          const sql = "UPDATE cxp_abono SET descripcion = ?, fecha = ?, total = ?, FACTURA_id = ?, TIPO_PAGO_id = ?, USUARIO_id = ? WHERE id = ?;          ";
          const values = [req.body.descripcion, req.body.fecha, req.body.monto, req.body.factura, req.body.tipoPago, req.body.usuario];            
          const abonoid = req.params.abonoid;        
          db.query(sql, [...values, abonoid], (err, data) => { 
          if(err) return console.log(values);        
          return res.json(data);    })})


          app.put('/updatecon/:abonoid', (req, res) => {   
               const sql = "UPDATE cxp_contra_pago SET `fecha_emision` = ?, `fecha_acuerdo` = ?, `descripcion` = ?, `FACTURA_id` = ? WHERE `id` = ?;               ";
               const values = [req.body.fecha_emision, req.body.fecha_acuerdo, req.body.descripcion, req.body.FACTURA_id];
               const abonoid = req.params.abonoid;        
               db.query(sql, [...values, abonoid], (err, data) => { 
               if(err) return console.log(values);        
               return res.json(data);    })})


     app.delete('/deleteabono/:id', (req, res) => {   
          const sql = "DELETE from cxp_abono where id=?;";    
          const id = req.params.id;        
          db.query(sql, [id], (err, data) => {
          if(err) return res.json("Error");        
          return res.json(data);    })})


          app.delete('/deletecont/:id', (req, res) => {   
               const sql = "DELETE from cxp_contra_pago where id=?;";    
               const id = req.params.id;        
               db.query(sql, [id], (err, data) => {
               if(err) return res.json("Error");        
               return res.json(data);    })})

app.listen(4000, ()=>console.log('Bienvenido al Backend'))

