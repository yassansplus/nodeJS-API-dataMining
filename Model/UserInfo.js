const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const Model = Sequelize.Model;
    class User extends Model { }
    User.init({
        // attributes
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        imagePath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        screen_name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        geo: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        sequelize,
        modelName: 'user',

        // options
    });
    User.sync()
    return User;
}