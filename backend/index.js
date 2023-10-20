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



app.get("/ANTP", (req, res) => {    const sql = "SELECT * FROM ANTP";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});



app.get("/getabonos", (req, res) => {    const sql = "SELECT * FROM abonos";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});



app.get("/getproveedor", (req, res) => {    const sql = "select * from cxp_proveedor";    db.query(sql, (err, data) => {        if(err) return res.json(err);        return res.json(data);    });});


app.get("/searchfact/:idp", (req, res) => {  
     const sql = " SELECT * FROM cxp_documento WHERE cxp_proveedor_id=?;";
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
 

app.listen(4000, ()=>console.log('Bienvenido al Backend'))

