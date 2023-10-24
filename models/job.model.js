module.exports = (sequelize, Sequelize) => {
  const Job = sequelize.define("users", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Job;
};