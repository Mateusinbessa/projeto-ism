//############CONFIG PADRAO##############//
const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require('mysql')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const port = 3000
const app = express()
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//############CONFIG PADRAO##############//

//Rota da página inicial
app.get('/', (req, res) =>{
    res.render('home')
})

//Rota da página de cadastro de funcionários
app.get('/cadastrar', (req, res) =>{
    res.render('cadastrar')
})

//Cadastrando funcionarios!
app.post('/funcionarios/insert', (req, res) =>{
    const nome = req.body.nome
    const unidade = req.body.unidade

    async function cadastrar(nome, unidade) {
        const newUser = await prisma.funcionarios.create({
            data: {
                nome: nome,
                unidade: unidade
            }
        })
}
    cadastrar(nome, unidade)
    res.redirect('/cadastrar')
})

//Rota da página que me informa as unidades para que eu possa ver os funcinários dela!
app.get('/funcionarios', (req,res) =>{
    res.render('filtrar_func')
})

//Rota que mostra os usuários filtrados da sede
app.get('/funcionarios/sede', (req, res) => {
    async function filtrar_sede() {
        //a tabela funcionario sem o nome da unidade do lado é por padrão os usuários da sede!
        const users = await prisma.funcionarios.findMany()
        res.render('funcionarios_filtrados', {users})
    } 
    filtrar_sede()
})

//Selecionando funcionários de acordo com a unidade
app.post('/funcionarios/filtro', (req,res) =>{
    const unidade = req.body.unidade

    if (unidade == 'sede') {
        //lógica de implementar as consultas é responsabilidade da rota da sede, aq eu só faço o redirecionamento!
        res.redirect('/funcionarios/sede')
    }
})

//Alterando dados de um funcionário cadastrado
app.get('/funcionarios/sede/edit/:id', (req, res) => {
    const id = req.params.id

    //Função pra selecionar os dados de 1 usuário apenas!
    async function selectOne(id) {
        const user = await prisma.funcionarios.findFirst({
            where: {
                id: id
            }
        })
        res.render('editfuncionarios', {user})
    } 
    //LEMBRETE: Falta  configurar a pagina editfuncionarios!
    selectOne()
})

//Criando a conexão com o servidor!
try {
    app.listen(port)
    console.log("Conexão realizada com sucesso!")
} catch (error) {
    console.log(err)
}