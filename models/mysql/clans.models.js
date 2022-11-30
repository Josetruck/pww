const Sequelize = require('sequelize')
const sequelize = require('../../database/mysql')
const Clans = sequelize.define('clans', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    clan_name: Sequelize.STRING,
    total_distance: Sequelize.INTEGER,
    this_week_distance: Sequelize.INTEGER,
    creation_date: Sequelize.DATE,
    creator: Sequelize.STRING,
    fk_id_faction: Sequelize.INTEGER
}, {
    timestamps: false
});
module.exports = Clans;