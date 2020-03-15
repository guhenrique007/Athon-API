const express = require('express');
const mysql = require('../mysql').pool;
 
exports.create = async(data, callback) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO criminal (tx_name) VALUES (?)',
            [data.criminal_name],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }
                callback(result.insertId);
                return result.insertId;
            }
        )
    });
}

exports.createCriminalCrime = async(data, callback) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        console.log(data)

        conn.query(
            'INSERT INTO criminal_crime (id_crime, id_crime_type, id_criminal) VALUES (?,?,?)',
            [data.crime_id, data.crime_type_id, data.criminal_id],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }
                console.log('W C', result.insertId)
                return result.insertId;
            }
        )
    });
}

exports.deleteCriminalCrime = async(id_crime) => {
    console.log(id_crime)

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'DELETE FROM criminal_crime WHERE id_crime = ?',
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