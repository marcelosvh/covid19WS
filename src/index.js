const mssql = require("mssql");
const mysql = require("mysql");
const config = require("./database");
const morgan = require("morgan");
const express = require("express");
const router = require("./routes/statistics.routes");
const app = express();

//Setting
app.set("port", process.env.PORT || 8082);
app.set("json spaces",2);

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origen","*");
    res.header("Access-Control-Allow-Origen","Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Routes
app.use("/api",router);

//Start server

// app.listen(app.get("port"),()=>{
//     console.log(` Server on port ${app.get("port")}`);
// });

var connection = mysql.createConnection({
    // config
    host: 'localhost',
    port: 3306,
    user: 'MVELASQUEZ',
    password: 'MVELASQUEZ',
    database: 'covid19',
});

connection.connect(function(error) {
    if(!error) {
        console.log("Conexión exitosa con la base de datos");
        app.listen(app.get("port"),()=>{
            console.log(`Server on port ${app.get("port")}`);
        });
    } else {
        console.log(`Error en la conexión con la bd: ${error}`)
    }
});


// mysql.connect(config, (err, res) => {
//     if(!err) {
//         console.log("Conexión exitosa con la base de datos");
//         app.listen(app.get("port"),()=>{
//             console.log(` Server on port ${app.get("port")}`);
//         });
//     } else {
//         console.log(`Error en la conexión con la bd: ${err}`)
//     }
// });

module.exports = connection;