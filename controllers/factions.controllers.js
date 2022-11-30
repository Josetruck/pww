const Factions = require("../models/mysql/factions.models")


async function lol2() {
    const todos = await Factions.findAll();
    console.log("Factions:", JSON.stringify(todos, null, 2))
    return todos
}


module.exports=lol2