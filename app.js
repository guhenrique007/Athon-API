const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');

//routes
const rotaExemplo = require('./routes/exemplo');
const policeRoute = require('./routes/police');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
})

app.use('/exemplo', rotaExemplo);
app.use('/police', policeRoute);


app.use((req, res, next) => {
    const erro = new Error('Not found');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        err:{
            message: error.message
        }
    })
})


module.exports = app;