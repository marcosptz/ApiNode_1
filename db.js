const mysql = require('mysql2/promise');

const conn = mysql.createPool(process.env.CONNECTION_STRING);

// const conn = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB,
// });

async function selectCustomers() {
    const results = await conn.query('SELECT * FROM user')
    return results[0];
}

async function selectCustomer(id) {
    const results = await conn.query(`SELECT * FROM user WHERE id = ${id}`)
    return results[0];
}

function insertCustomer(customer) {
    customer.id = customers.length + 1
    customers.push(customer);
}

function updateCustomer(id, customerData) {
    const customer = customers.find(c => c.id === id);
    if(!customer) return;
    customer.nome = customerData.nome;
    customer.idade = customerData.idade;
    customer.uf = customerData.uf;
}

function deleteCustomer(id) {
    const index = customers.findIndex(c => c.id === id);
    customers.splice(index, 1);
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}