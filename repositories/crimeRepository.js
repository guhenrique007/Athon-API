const express = require('express');
const mysql = require('../mysql').pool;

exports.create = async(data, callback, callback2, callback3) => {
    let crime_id, weapon_id;

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO crime (tx_country, dt_crime) VALUES (?,?)',
            [data.country, data.date],
            (error, result, field) => {
                conn.release();

                if(error){ console.log(error); return error; }

                callback(result.insertId);
                callback2(result.insertId);
                callback3(result.insertId);

                return result.insertId;
            }
        )
    });
}

exports.delete = async(id) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            `DELETE FROM crime WHERE id_crime = '${id}'`,
            (error, result, field) => {
                conn.release();
                if(error){ console.log(error); return error; }
                resposta = result;
                return result;
            }
        )
    });
}

exports.deleteByCountry = async(data) => {
    let country = data.country;
    let resposta;

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            `SELECT * FROM crime WHERE tx_country = '${country}'`,
            (error, result, field) => {
                conn.release();
                if(error){ console.log(error); return error; }
                resposta = result;
                return result;

                // result.forEach(function(crime){
                //     conn.query(
                //         `SELECT * FROM weapon WHERE id_crime = '${crime.id_crime}'`,
                //         (error, result, field) => {
                //             conn.release();
                //             if(error){ console.log(error); return error; }
                //             console.log(result)
                //         }
                //     )
                // })

                //return result.insertId;
            }
        )


        // conn.query(
        //     'DELETE FROM crime WHERE tx_country = ?',
        //     [data.country],
        //     (error, result, field) => {
        //         conn.release();
        //         console.log(result)

        //         if(error){ console.log(error); return error; }

        //         return result.insertId;
        //     }
        // )
    });
}

exports.getByCountry = async(data, callback) => {
    let country = data.country;
    let resposta;

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            `SELECT * FROM crime WHERE tx_country = '${country}'`,
            (error, result, field) => {
                conn.release();
                if(error){ console.log(error); return error; }
                
                callback(result)

                return result;
            }
        )
    });
}

exports.getByDate = async(data, callback) => {
    let date = data.date;
    let resposta;

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            `SELECT * FROM crime WHERE dt_crime = '${date}'`,
            (error, result, field) => {
                conn.release();
                if(error){ console.log(error); return error; }
                
                callback(result)

                return result;
            }
        )
    });
}

exports.getWeaponCrimeBy = async(data, callback) => {
    let country = data.country;
    let resposta;

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            `SELECT * FROM crime WHERE tx_country = '${country}'`,
            (error, result, field) => {
                conn.release();
                if(error){ console.log(error); return error; }
                
                callback(result)

                return result;
            }
        )
    });
}

exports.getByCriminal = async(data) => {
    let criminal = data.criminal

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}

        conn.query(
            ``,
            (error, result, field) => {
                conn.release();
                if(error){ console.log(error); return error; }
                
                callback(result)

                return result;
            }
        )
    });
}