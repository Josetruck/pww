const mongoose = require("mongoose");
const Users = require("../models/mysql/users.models")
const Req_friend = require("../models/mysql/req_friend.models")
const Profile = require("../models/mongodb/profiles.models");
const user=require("../controllers/users.controllers")
const url = `mongodb://127.0.0.1:27017/pww`;