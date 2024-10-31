import {Sequelize} from 'sequelize'

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.PORT;


const db = new Sequelize(database, username, password,{
    host: host,
    dialect: 'mysql',
    port: port
})

export default db