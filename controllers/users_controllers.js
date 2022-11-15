const Users = require("../models/mysql/users_models")

async function lol() {
    const todos = await Users.findAll();
    console.log("All users:", JSON.stringify(todos, null, 2))
    return todos
}
module.exports =lol