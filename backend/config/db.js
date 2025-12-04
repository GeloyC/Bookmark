import mysql from 'mysql2/promise'
import express from 'express'

let db;

db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Cabangal10',
    database: 'bookmark',
    port: 3306
})


export default db;