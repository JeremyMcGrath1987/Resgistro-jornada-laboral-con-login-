const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((error, connection)=>{
    if(error){
        if(error.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXIÓN CON LA BASE DE DATOS FUÉ CERRADA');
        }
        if(error.code == 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(error.code == 'ECONNREFUSED'){
            console.error('LA CONEXIÓN CON LA BASE DE DATOS FUÉ RECHAZADA');
        }
    }

    if(connection)connection.release();
    console.log('BD conectada');
    return;
});

//Convierte en promesas los callbacks 
pool.query = promisify(pool.query);

module.exports = pool;