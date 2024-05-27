const { Sequelize } = require('sequelize');

const user =  process.env.DB_USER || 'root';
const password =  process.env.DB_PASSWORD || '';

const sequelize = new Sequelize('apptimetracker', `${user}`, `${password}`, {
  host: 'localhost',
  dialect: 'mysql',
});
async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database synchronized.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize;