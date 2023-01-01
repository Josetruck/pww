const Sequelize = require('sequelize')
const sequelize = require('../../database/mysql')

const Req_friend = sequelize.define("req_friends", {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    fk_id_from: Sequelize.INTEGER,
    fk_id_to: Sequelize.INTEGER,
    req_date: Sequelize.DATE,
    req_status: Sequelize.STRING,
}, {
    timestamps: false
});
module.exports = Req_friend;