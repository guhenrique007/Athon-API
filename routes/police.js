const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const crimeController = require('../controllers/crimeController');


router.get('/weapons', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            `SELECT distinct tx_model, tx_weapon_type
            FROM police.weapon as weapon, police.weapon_crime as weapon_crime, police.weapon_type as wt
            WHERE weapon.id_weapon = weapon_crime.id_weapon AND wt.id_weapon_type = weapon.id_weapon_type`,
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.get('/crime/:id', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            `SELECT  crime.id_crime, tx_country, dt_crime, tx_type, group_concat(distinct(tx_weapon_type)) as weapons_type, group_concat(distinct(tx_model)) as weapons, group_concat(distinct(v.tx_name)) as victims, c.tx_name
            FROM police.crime as crime, police.crime_type as ct, 
                 police.victim_crime as vc, police.victim as v, 
                 police.weapon_crime as wc, police.weapon_type as wt, police.weapon as w,
                 police.criminal_crime as cc, police.criminal as c
            WHERE cc.id_crime = crime.id_crime AND cc.id_criminal = c.id_criminal AND cc.id_crime_type = ct.id_crime_type AND
                  vc.id_crime = crime.id_crime AND v.id_victim = vc.id_victim AND
                  wc.id_crime = crime.id_crime AND w.id_weapon = wc.id_weapon AND w.id_weapon_type = wt.id_weapon_type
            AND crime.id_crime = ${req.params.id}`,
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.get('/crime/criminal/:criminal', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            `SELECT tx_country, dt_crime
            FROM police.crime AS c
                INNER JOIN police.criminal_crime AS cc
                    ON c.id_crime = cc.id_crime
                INNER JOIN police.criminal AS cr
                    ON cr.id_criminal = cc.id_criminal and cr.tx_name = '${req.params.criminal}'`,
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.get('/crime/weapon/:weapon', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            `SELECT tx_country, dt_crime
            FROM police.crime AS c
                INNER JOIN police.weapon_crime AS wc
                    ON c.id_crime = wc.id_crime
                INNER JOIN police.weapon AS w
                    ON w.id_weapon = wc.id_weapon and w.tx_model = '${req.params.weapon}'`,
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.get('/crime/date/:date1/:date2', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query(
            `SELECT * FROM police.crime 
            WHERE dt_crime BETWEEN '${req.params.date1}' and '${req.params.date2}';`,
            (error, result, fields) => {
                if(error) { return res.status(500).send({error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.post('/crime', crimeController.post);
router.delete('/crime/country', crimeController.deleteByCountry);
router.delete('/crime/date', crimeController.deleteByDate);



module.exports = router;