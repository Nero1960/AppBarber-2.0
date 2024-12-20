import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_NAME , process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    models: [path.join(__dirname, '..', 'models', '*.ts')],
    timezone: '-06:00'
})

db.sync();


export default db;