const Sequelize = require('sequelize')
const sequelize = require('../../database/mysql')
const Factions = sequelize.define('factions', {
    id_faction: { type: Sequelize.INTEGER, primaryKey: true },
    faction_name: Sequelize.STRING,
    total_distance: Sequelize.INTEGER,
    this_week_distance: Sequelize.INTEGER,
}, {
    timestamps: false
});
module.exports=Factions;