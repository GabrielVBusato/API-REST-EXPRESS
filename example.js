//Use é uma função middleware de nivel de aplicativo, ou seja, sempre quando o aplicativo receber requisição ela irá executar.
//App.use("rota") irá sempre executar esse middleware para qualquer tipo de requisição.

//Query param
app.get("/clientes/relatorio", (req, res) => {
    res.send(`Cliente relatório completo: completo ${req.query.completo} ano = ${req.query.ano}`)
})

//Route param
app.get("/clientes/:id", (req, res) => {
    res.send(`Cliente ${req.params.id} foi selecionado!`)
})

app.post("/clientes", (req, res) => {
    res.json(req.body);
})
