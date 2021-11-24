/*OBS: node app.js - conecta ao banco pelo terminal
       CTRL+C - encerra a conexão pelo terminal
       clear - limpa o terminal*/
//UTILIZAR EJS - instalar com npm install ejs


const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const path = require('path') //AULA-8-utilizado para trabalhar o engine ejs.
const linkRoute = require('./routes/linkRoute')



mongoose.connect('mongodb://localhost/newlink', { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection;
db.on("error", () => { console.log("Houve um erro!") });
db.once("open", () => { console.log("Banco carregado"); })

/
//Definindo abaixo a engine utilizada:
app.set('view engine', 'ejs');
//Abaixo, pasta onde o sistema irá buscar os templates.
app.set('views', path.join(__dirname, 'templates')) //templates é a pasta. O index.ejs é o template padrão.




//Passando o link para a pagina de rotas.
app.use('/', linkRoute)


app.listen(port, () => console.log('Example app Listening on port 3000!'))