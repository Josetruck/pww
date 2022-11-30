const Sequelize = require('sequelize')
const sequelize = require('../../database/mysql')
const Weekly_game = sequelize.define('weekly_game', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    score: Sequelize.INTEGER,
    score_date: Sequelize.DATE,
    fk_id_user: Sequelize.INTEGER,
}, {
    timestamps: false
});
module.exports = Weekly_game;