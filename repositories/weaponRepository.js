const express = require('express');
const mysql = require('../mysql').pool;

exports.create = async(data, callback) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO weapon (tx_model, id_weapon_type) VALUES (?,?)',
            [data.weapon_name, data.weapon_type_id],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }
                callback(result.insertId);
                return result.insertId;
            }
        )
    });
}

exports.createWeaponCrime = async(data, callback) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO weapon_crime (id_crime, id_weapon) VALUES (?,?)',
            [data.crime_id, data.weapon_id],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }
                return result.insertId;
            }
        )
    });
}

exports.delete = async(data) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'DELETE FROM crime WHERE id_weapon = ?',
            [data.id_weapon],
            (error, result, field) => {
                conn.release();

                if(error){ return error; }
                return result.insertId;
            }
        )
    });
}

exports.deleteWeaponCrime = async(id_crime) => {
    console.log(id_crime)

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'DELETE FROM weapon_crime WHERE id_crime = ?',
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