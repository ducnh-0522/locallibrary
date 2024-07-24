import { join } from 'path';
import { DataSource } from 'typeorm';

require('dotenv').config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: host!,
    port: parseInt(port!),
    username: username!,
    password: password!,
    database: database!,
    logging: false,         // SQL logging
    synchronize: false,     // sync schema based on Entity classes
    migrations: [join(__dirname, '../migration/*.{ts,js}')],
    entities: [join(__dirname, '../entity/*.entity.{ts,js}')],
});
