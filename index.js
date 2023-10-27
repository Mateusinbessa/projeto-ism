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

//Página de funcionalidades da aplicação!
app.get('/', (req, res) =>{
    res.render('home')
})

//Pagina de cadastro!
app.get('/cadastrar', (req, res) =>{
    res.render('cadastrar')
})

//Filtrando a unidade
app.get('/funcionarios', (req,res) =>{
    res.render('filtrar_func')
})

app.get('/funcionarios/filtrados', (req, res) => {
    res.render('funcionarios_filtrados')
})

//Cadastrando funcionarios!
app.post('/funcionarios/insert', (req, res) =>{
    const nome = req.body.nome
    const unidade = req.body.unidade

    //Função para cadastrar um novo usuário!
    //FIZ ISSO HOJE COM PRISMA
    //PRECISO DESENVOLVER MELHOR, MAS TÁ FUNFANDO! AUMENTAR A FUNCIONALIDADE, E AUMENTAR A ABSTRAÇÃO
    //DPS SUBO NO GITHUB!
    async function cadastrar() {
        const newUser = await prisma.funcionarios.create({
            data: {
                nome: nome,
                unidade: unidade
            }
        })
}
    cadastrar()
    res.redirect('/cadastrar')
})

app.post('/funcionarios/filtro', (req,res) =>{
    const unidade = req.body.unidade
    const tabela = `funcionarios_${unidade}`
    const sql = `SELECT * FROM ${tabela}`

    conn.query(sql, function(err, data) {
        if(err){
            console.log(err)
            return
        }

        const dados = data
        res.render('funcionarios_filtrados', {dados})
    })
})

//Configuração da conexão com o DB!
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ism'
})

//Conexão com DB!
conn.connect(function(err){
    if(err){
        console.log(err)
        return
    }

    console.log('Conexão com o banco de dados feita com sucesso!')
    app.listen(port)
})
