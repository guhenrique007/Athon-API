const crimeRepository = require('../repositories/crimeRepository');
const criminalRepository = require('../repositories/criminalRepository');
const weaponRepository = require('../repositories/weaponRepository');
const victimRepository = require('../repositories/victimRepository');

let crime_id, crime_type_id;
let crimes = [];


exports.post = async(req, res, next) => {
    let weapons = req.body.weapons;
    let criminals = req.body.criminals;
    let victims = req.body.victims;
    let crime_type_id = req.body.crime_type_id;

    function insertWeaponCrime(id){
        console.log('callback weapon', id);
        let weapon_id = id;

        let data = {
            crime_id, 
            weapon_id
        }

        weaponRepository.createWeaponCrime(data).then(function (result) {
            console.log('WeaponCrime created');
        }).catch(function(err) {
            return res.status(500).send({
                message: err,
                status: 500
            });
        });
    }

    function insertWeapon(id){
        console.log('callback crime', id);
        crime_id = id;

        weapons.forEach(function(weapon){
            weaponRepository.create(weapon, insertWeaponCrime).then(function () {
                console.log('Weapon created')
            }).catch(function(err) {
                return res.status(500).send({
                    message: err,
                    status: 500
                });
            });
        }) 
    }

    function insertCriminalCrime(id){
        console.log('callback weapon', id);
        let criminal_id = id;

        let data = {
            crime_id, 
            criminal_id,
            crime_type_id
        }

        criminalRepository.createCriminalCrime(data).then(function (result) {
            console.log('CriminalCrime created');
        }).catch(function(err) {
            return res.status(500).send({
                message: err,
                status: 500
            });
        });   
    }

    function insertCriminal(id){
        console.log('callback crime', id);
        crime_id = id;

        criminals.forEach(function(criminal){
            criminalRepository.create(criminal, insertCriminalCrime).then(function () {
                console.log('Criminal created');
            }).catch(function(err) {
                return res.status(500).send({
                    message: err,
                    status: 500
                });
            });
        })
    }

    function insertVictimCrime(id){
        let victim_id = id;

        let data = {
            crime_id, 
            victim_id
        }

        victimRepository.createVictimCrime(data).then(function (result) {
            console.log('CriminalCrime created');
        }).catch(function(err) {
            return res.status(500).send({
                message: err,
                status: 500
            });
        });
    }

    function insertVictim(id){
        crime_id = id;

        victims.forEach(function(victim){
            victimRepository.create(victim, insertVictimCrime).then(function () {
                console.log('Criminal created');
            }).catch(function(err) {
                return res.status(500).send({
                    message: err,
                    status: 500
                });
            });
        })
    }

    crimeRepository.create(req.body, insertWeapon, insertCriminal, insertVictim).then(function () {
        return res.status(201).send({
            message: 'Crime inserted with sucess',
            id: crime_id
        });
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}

function getCrimesByCountry(result){
    crimes = result;
    
    crimes.forEach(function(crime){
        //delete intermediarias
        deleteWeaponCrimeByCountry(crime.id_crime);
        deleteVictimCrimeByCountry(crime.id_crime);
        deleteCriminalCrimeByCountry(crime.id_crime);
        deleteCrime(crime.id_crime);
    })
}

async function deleteCrime(crime_id){
    crimeRepository.delete(crime_id).then(function (result) {
        
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}

async function deleteWeaponCrimeByCountry(crime_id){
    weaponRepository.deleteWeaponCrime(crime_id).then(function (result) {
        
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}

async function deleteVictimCrimeByCountry(crime_id){
    victimRepository.deleteVictimCrime(crime_id).then(function (result) {
        
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}

async function deleteCriminalCrimeByCountry(crime_id){
    criminalRepository.deleteCriminalCrime(crime_id).then(function (result) {
        
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}

function deleteWeaponByCountry(crime_id){
    weaponRepository.delete(data).then(function (result) {
        
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}

exports.deleteByCountry = async(req, res, next) => {

    //ficou sem tratamento de erro :(
    crimeRepository.getByCountry(req.body, getCrimesByCountry).then(function (result) {
        console.log(crimes)
        return res.status(201).send({
            message: 'Crime removed with sucess'
        });
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}

exports.deleteByDate = async(req, res, next) => {

    //ficou sem tratamento de erro :(
    crimeRepository.getByDate(req.body, getCrimesByCountry).then(function (result) {
        console.log(crimes)
        return res.status(201).send({
            message: 'Crime removed with sucess'
        });
    }).catch(function(err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    });
}