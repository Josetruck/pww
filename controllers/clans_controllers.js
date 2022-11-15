const Clans = require("../models/mysql/clans_models")

async function lol1() {
    const todos = await Clans.findAll();
    console.log("All users:", JSON.stringify(todos, null, 2))
    return todos
}
module.exports=lol1