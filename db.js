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
    const results = await conn.query('SELECT * FROM user WHERE id =?', [id])
    return results[0];
}

async function insertCustomer(customer) {
    const values = [customer.name, customer.email, 1, 1];
    await conn.query('INSERT INTO user(name, email, status, permissao) VALUES (?, ?, ?, ?)', values);
}

async function updateCustomer(id, customer) {
    const values = [customer.name, customer.email, 1, 1, id];
    await conn.query('UPDATE user SET name=?, email=?, status=?, permissao=? WHERE id=?', values);
}

async function deleteCustomer(id) {
    const values = [id];
    await conn.query('DELETE FROM user WHERE id=?', values);
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}