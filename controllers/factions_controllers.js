const Factions = require("../models/mysql/factions_models")


async function lol2() {
    const todos = await Factions.findAll();
    console.log("All users:", JSON.stringify(todos, null, 2))
    return todos
}


module.exports=lol2