const User = require('../models/user.model');
const Project = require('../models/project.model');
const Jornada = require('../models/jornada.model');

const defineAssociations = () => {
  User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
  Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Project.hasMany(Jornada, { foreignKey: 'projectId', as: 'jornadas' });
  Jornada.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
};

module.exports = defineAssociations;