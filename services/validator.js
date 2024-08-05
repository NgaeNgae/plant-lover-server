const jwt = require('jsonwebtoken');
const role = require('../models/role');
let bodyValidator = (schema) => {
    return (req, res, next) => {
        let result = schema.validate(req.body);
        if (result.error) {
            next(new Error(result.error.details[0].message));
        } else {
            next();
        }
    }
}
let validateRole = () => {
    return async (req, res, next) => {
        let token = req.headers.authorization.split(" ")[1];
        let { data } = jwt.verify(token, process.env.SECRET_KEY);
        if(data.role.name === "admin") {
            next();
        }else {
            next(new Error("Role must be Admin"));
        }
    }
}
let validateToken = () => {
    return (req, res, next) => {
        if (req.headers.authorization) {
            next();
        } else {
            next(new Error("Token not found"));
        }
    }
}

module.exports = { bodyValidator, validateToken, validateRole }