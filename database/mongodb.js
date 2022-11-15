const { MongoClient } = require('mongodb');
const mydb = "pww";
const url = "mongodb://127.0.0.1:27017/";

function client(url, mydb) {
    const client = new MongoClient(url + mydb);
    return client
}
module.exports=client