const express = require('express');
const mysql = require('../mysql').pool;

exports.create = async(data, callback) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO victim (tx_name) VALUES (?)',
            [data.victim_name],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }
                callback(result.insertId);
                return result.insertId;
            }
        )
    });
}

exports.createVictimCrime = async(data, callback) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO victim_crime (id_crime, id_victim) VALUES (?,?)',
            [data.crime_id, data.victim_id],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }
                return result.insertId;
            }
        )
    });
}

exports.deleteVictimCrime = async(id_crime) => {
    console.log(id_crime)

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'DELETE FROM victim_crime WHERE id_crime = ?',
            [id_crime],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }


                console.log(result);
                return result;
            }
        )
    });
}