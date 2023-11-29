// Importa o módulo do Express Framework
const express = require ('express')
// Inicializa um objeto de aplicação Express
const app = express ()
// Cria um manipulador da rota padrão 
app.get ('/', function (req, res) {
    res.send ('Hello World')
})
// Inicializa o servidor HTTP na porta 3000
app.listen (3000, function () {
    console.log ('Servidor rodando na porta 3000')
})