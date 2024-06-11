const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//Falta agregar el Porject
const Project = require('./project.model');

const Jornada = sequelize.define('Jornada', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaCierre: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hoursWorked: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  projectId:{
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: Project,
        key: 'id'
        }
    },
}, {
  tableName: 'jornadas',
  timestamps: false,
  defaultScope: {
    include: {
      model: Project,
      as: 'project',
      attributes: ['id'], 
    },
  },
});

module.exports = Jornada;
