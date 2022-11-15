const Sequelize = require('sequelize')
const sequelize = require('../../database/mysql')
const Users = sequelize.define('users', {
    id_user: { type: Sequelize.INTEGER, primaryKey: true },
    user_name: Sequelize.STRING,
    email: Sequelize.STRING,
    pass: Sequelize.STRING,
    total_distance: Sequelize.INTEGER,
    this_week_distance: Sequelize.INTEGER,
    clan_admin: Sequelize.BOOLEAN,
    fk_id_clan: Sequelize.INTEGER,
    fk_id_faction: Sequelize.INTEGER
}, {
    timestamps: false
});
module.exports=Users;