const User = require('../models/user.model');
const Project = require('../models/project.model');

const defineAssociations = () => {
  User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
  Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });
};

module.exports = defineAssociations;