//CONTROLADOR: Aqui se faz o controle das rotas.
//AULA-18-INCREMENTAR OS CLICKS NO REDIRECT. ATUALIZAR OS CLICKS COM findOneAndUpdate.

const Link = require('../models/Link') //Importando a página Link.js aqui, .. é para ir para pasta de cima.

//NEXT, tentar a próxima rota.
const redirect = async(req, res, next) => {
    let title = req.params.title;
    try {
        //Agora se busca a entrada pela variável:
        //AULA-18-ENCONTRAR O ELEMENTO PELO TITULO {title} E MODIFICAR DEPOIS DENTRO DO OBJETO.
        //Incrementar o elemento: {$inc: {clicks: 1 }} , testar com localhost:3000/curso.
        let doc = await Link.findOneAndUpdate({ title }, { $inc: { clicks: 1 } })
        console.log(doc);
        if (doc) {
            res.redirect(doc.url);
        } else {
            next()
        }

    } catch (error) {
        // res.send(error);
        res.send(error)
    }
}

//Nova função chamada em linkRoute e criada aqui:
const addLink = async(req, res) => {
    //Pegar o body
    let link = new Link(req.body)
    try {
        let doc = await link.save() //Se adiciona um link com save, utilizando await.
            //Poderia usar: link.save().then(doc=>{res.send(doc)}).catch(error=>{res.send(error)}), sem try/catch.
        res.redirect('/')
    } catch (error) {
        res.render('add', { error, body: req.body }); //Tratamento de erro. No index.ejs, com if, colocar mensagem.
    } //body: req.body, pré-carrega o que foi digitado antes.                
}

//AULA-10-Função abaixo, criada para fazer busca no banco de dados:
const allLinks = async(req, res) => {
        try {
            let docs = await Link.find({}); //VAZIO, busca tudo no banco de dados.
            res.render('all', { links: docs });
        } catch (error) {
            res.send(error);
        }
    } //Criar uma rota para chamar esta função na pagina linkRoute.

const deleteLink = async(req, res) => {
        let id = req.params.id;
        //Abaixo, optando por deletar pelo body.
        if (!id) {
            id = req.body.id;
        }
        try {
            // Link.deleteOne({_id:id}) //Primeira maneira de deletar o objeto
            await Link.findByIdAndDelete(id) //Segunda maneira de deletar o objeto
                //res.send(id) //Para enviar o id a ser deletado na função.
            res.redirect('/')
        } catch (error) {
            res.status(404).send(error); //Codigo de erro para elemento não encontrado.
        }

    } //Criar no INSOMNIA uma rota de delete, NEW REQUEST, DELETE, name = delete. Na Barra, digitar. localhost:3000/6196e5a2ef6e3ef25fdb6e51(id do objeto a ser deletado)


const loadLink = async(req, res) => {
    let id = req.params.id;
    try {
        let doc = await Link.findById(id)
        res.render('edit', { error: false, body: doc })
    } catch (error) {
        res.status(404).send(error);
    }
}


const editLink = async(req, res) => {
    let link = {};
    link.title = req.body.title;
    link.description = req.body.description;
    link.url = req.body.url;

    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }

    console.log(id);
    try { //doc                
        let link = await Link.updateOne({ _id: id }, link);
        res.redirect('/')
    } catch (error) {
        res.render('edit', { error, body: req.body });
    }
}


//REDIRECT exportado como objeto, para caso se houverem outras funções:
//Passa o addLink aqui também.
module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink }