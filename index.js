require('dotenv').config();

const db = require('./db');

const express = require('express');

const app = express();

app.use(express.json());

app.delete('/clientes/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    await db.deleteCustomer(id);
    response.sendStatus(204);
});

app.patch('/clientes/:id', async (request, response) => {
    const id = parseInt(request.params.id);
    const customer = request.body;
    await db.updateCustomer(id, customer);
    response.sendStatus(200);
});

app.post('/clientes', async (request, response) => {
    const customer = request.body;
    await db.insertCustomer(customer);
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
    response.send('It`s alive!')  //json({message: 'It`s alive!'})
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`)
});