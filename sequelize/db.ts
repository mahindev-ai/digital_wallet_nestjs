import { Sequelize } from 'sequelize-typescript';
export { sequelize };
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306, // Puerto por defecto para MySQL
  username: 'root',
  password: 'root',
  database: 'digital_wallet',
  logging: true, // Muestra las consultas SQL en la consola
  pool: {
    max: 5, // Conexiones simultáneas máximas
    min: 0, // Conexiones mínimas
    acquire: 30000,
    idle: 10000,
  },
  models: [], // Aquí irán los modelos
});
