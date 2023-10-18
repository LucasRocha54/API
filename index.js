const express = require('express')
const app = express()

let clientes = [
    {id: 1, nome: 'Lucas Willian', cidade: 'Belo Horizonte'},
    {id: 2, nome: 'Luiz Pereira', cidade: 'Brazilia'},
    {id: 3, nome: 'Arthur Santos', cidade: 'Goiania'},
    {id: 4, nome: 'Pedro Siqueira', cidade: 'Rio de Janeiro'}
]


app.get('/', (req, res) => {
    res.status(200).send('Olá, seja bem vindo ao meu servidor')
})

app.get('/clientes', (req, res) => {
    res.status(200).json(clientes)
})

const resultados = {
  pessoas: [
    {id:1, nome: "Marcelo"}, 
    {id:2, nome: "João"}, 
    {id:3, nome: "Maria"}
  ],
  carros: [
    {id:1, modelo: "Fusca"}, 
    {id:2, modelo: "Gol"}, 
    {id:3, modelo: "Palio"}
  ],
  animais: [
    {id:1, nome: "Cachorro"}, 
    {id:2, nome: "Gato"}, 
    {id:3, nome: "Papagaio"}
  ]
}

let cache = {};

app.get('/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const data = resultados[tipo];

  if (cache[tipo] && JSON.stringify(data) === JSON.stringify(cache[tipo])) {
    res.status(304).send('Não modificado.');
  } else {
    cache[tipo] = data;
    res.status(200).json(data);
  }
});

app.get('/:tipo/:id', (req, res) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  const data = resultados[tipo].find(item => item.id === parseInt(id));

  if (!data) {
    res.status(404).send('Não encontrado!');
  } else {
    res.status(200).json(data);
  }
});

app.listen(3000, () => { console.log ('Servidor rodando na porta 3000') })