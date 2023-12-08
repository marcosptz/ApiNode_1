require('dotenv').config();

const db = require('./db');

const express = require('express');

const app = express();

app.use(express.json());

app.delete('/clientes/:id', (request, response) => {
    const id = parseInt(request.params.id);
    db.deleteCustomer(id);
    response.sendStatus(204);
});

app.patch('/clientes/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const customer = request.body;
    db.updateCustomer(id, customer);
    response.sendStatus(200);
});

app.post('/clientes', (request, response) => {
    const customer = request.body;
    db.insertCustomer(customer);
    response.sendStatus(201);
});

app.get('/clientes/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const results = await db.selectCustomer(id);
    response.json(results);
});

app.get('/clientes', async (request, response) => {
    const results = await db.selectCustomers();
    response.json(results);
});

app.get('/', (request, response, next) => {
    response.json({message: 'It`s alive!'})
});

app.listen(process.env.PORT, () => {
    console.log('App is running!')
});