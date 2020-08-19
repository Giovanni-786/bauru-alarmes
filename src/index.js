const express = require('express');

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./config/smtp');



const server = express();

server.use(express.static('public'))

server.set("view engine", "html")

nunjucks.configure("views", {
    express: server
})

//Config body parser
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())


server.get("/", function(req, res){
    return res.render("index")

});

server.get("/contato", function(req, res){
    return res.render("contato")

});

server.post("/contato", function(req, res){
    const message = {
        subject: req.body.assunto,
        from: 'Giovanni Lima <giovanni.lima786@gmail.com>',
        to: 'giovanni.lima786@gmail.com',
        html: `E-mail: <b> ${req.body.email} </b>
        <br>Nome completo: ${req.body.nome}</br>
        <br>${req.body.texto}</br>`
    
    }

  transporter.sendMail(message, (error, info)=>{
        if(error){
            return res.status(400).send('Falhou');
        }
        return res.render("contato");
        
    })
        
});

const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
    },

});


server.listen(5000, function(){
    console.log("server is running");
});





