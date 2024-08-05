const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const baseResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({ condition: true, data: data, message: message });
};
const comPass = (plain, hash) => {
    return bcryptjs.compareSync(plain, hash);
}
const hashcode = (payload) => {
    return bcryptjs.hashSync(payload, 8);
}
const generateToken = (user) => {
    if (user.password) delete user.password
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        data: user
    }, process.env.SECRET_KEY);
}
module.exports = { baseResponse, hashcode, comPass, generateToken }