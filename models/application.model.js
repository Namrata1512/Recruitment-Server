
module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define("applications", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        jobId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        trackingStatus: {
            type: Sequelize.ENUM('Applied', 'Interviewed', 'Offered', 'Rejected'),
            allowNull: false,
            defaultValue: 'Applied',
        },
        coverLetter: {
            type: Sequelize.STRING,
        },
        resumeUrl: {
            type: Sequelize.STRING,
        },
        applicationDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });
    
    Application.associate = (models) => {
        Application.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Application.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
    };

    return Application;
};
