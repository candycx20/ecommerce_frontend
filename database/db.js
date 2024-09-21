import {Sequelize} from 'sequelize'

const db = new Sequelize('ecommerce', 'admin', 'Q3HH7DQ6',{
    host:'database-1.c9s08qs0yb7v.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    port: '3308'
})

export default db