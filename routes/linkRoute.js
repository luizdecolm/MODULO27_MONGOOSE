//Em rotas, é preciso chamar o express.

const express = require('express');
const router = express.Router()
var methodOverride = require('method-override')

router.use(methodOverride('_method'))
const linkController = require('../controllers/linkController')

//Abaixo, escrever all no localhost:3000/all.
router.get('/', linkController.allLinks) //Rota para função allLinks(listagem).
router.get("/:title", linkController.redirect)
router.get('/edit/:id', linkController.loadLink)
router.get('/add', (req, res) => res.render('add', { error: false, body: {} })) //Renderizando a página index.ejs.



//express.urlencoded(), permite pegar os dados pelo formulário, e executa o metodo addLink.
router.post('/', express.urlencoded({ extended: true }), linkController.addLink);
router.post("/edit/:id", express.urlencoded({ extended: true }), linkController.editLink)



router.delete('/:id', linkController.deleteLink)
router.delete('/', express.urlencoded({ extended: true }), linkController.deleteLink) //TOTA DA AULA 14.


module.exports = router //Exportado depois de inicializar o código.