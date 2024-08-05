const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
    name : {type : String, required : true},
},{timestamps : true})

module.exports = Role = mongoose.model("roles", RoleSchema);