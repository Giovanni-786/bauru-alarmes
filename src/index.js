const express = require('express');

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./config/smtp');



const server = express();

server.use(express.static('public'))

server.set("view engine", "html")

nunjucks.configure("views", {
    express: server,
    autoEscape: false,
    noCache: true

})




//Config body parser
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())


server.get("/", function(req, res){
    return res.render("about")

});

server.get("/contato", function(req, res){
    return res.render("contato")

});


server.get("/serralheria", function(req, res){
    return res.render("serralheria")

});

server.post("/contato", function(req, res){
    const message = {
        subject: req.body.assunto,
        from: 'Giovanni Lima <contato.site.baurualarmes@gmail.com>',
        to: 'contato.site.baurualarmes@gmail.com',
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


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});




