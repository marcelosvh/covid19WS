const { Router } = require("express");
const mysql = require("mysql");
const router = Router();
const config = require("../database");

router.get("/ejemplo", (req, res) => {
    res.json({message: "Hola"})
});

let connection = mysql.createConnection(config);

let sql = `CALL PROY_APP_COVID19_LISTAR_CASOS_DIARIOS(?)`;

router.get("/statistics", (req, res) => {
    
    const fecha = "07/03/2020"

    connection.query('CALL PROY_APP_COVID19_LISTAR_CASOS_DIARIOS(?)', fecha, (error, rows, fields) => {
        if (!error) {
            const result = rows[0]
            res.json(result);
        } else {
            console.log(`Error en statistics: ${error.message}`);
        }
        
    });
});



module.exports = router;