const mongoose = require('mongoose');

const UserSchma = mongoose.Schema({
    role: { type : mongoose.Schema.Types.ObjectId,ref: "roles"},
    name: { required: true, type: String },
    password: { required: true, type: String },
    email: { required: true, type: String },
    address: { type: String}
}, { timestamps: true });
module.exports = User = mongoose.model('users', UserSchma);