/*PASTA criada para os modelos. 
Os modelos estão referênciados a uma coleção, escritos como Links, L maiúsculo.*/
//É preciso ter o mongoose exportado aqui.
const mongoose = require('mongoose')



//SCHEMA:
const linkSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: String,
        url: { type: String, required: true },
        click: { type: Number, dedfaul: 0 }
    })
    //MODEL: exportando o modelo:
module.exports = mongoose.model('Link', linkSchema)