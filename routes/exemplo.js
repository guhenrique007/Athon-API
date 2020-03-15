const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    // res.status(200).send({
    //     mensagem: 'Testing GET inside example route'
    // });

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM victim;',
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO victim (tx_name) VALUES (?)',
            [req.body.nome],
            (error, result, field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    message: 'Victim inserted with sucess',
                    crime: result.insertId
                });
            }
        )
    });
});

router.get('/:id_exemplo', (req, res, next) => {
    const id = req.params.id_exemplo
    res.status(200).send({
        mensagem: 'Testing GET inside example route',
        id: id
    })
});

//router.patch
//router.delete

module.exports = router;