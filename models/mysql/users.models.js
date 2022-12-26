const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database/mysql')
const Users = sequelize.define('users', {
    id: { type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true 
    },
    user_name :{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING
    },
    total_distance: {
        type: DataTypes.INTEGER,
    },
    this_week_distance: {
        type: DataTypes.INTEGER,
    },
    clan_admin: {
        type: DataTypes.BOOLEAN,
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
    },
    fk_id_clan: {
        type: DataTypes.INTEGER,
    },
    fk_id_faction: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false
});
module.exports = Users;