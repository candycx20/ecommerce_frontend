import {Sequelize} from 'sequelize'

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;


const db = new Sequelize(database, username, password,{
    host,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
})

export default db