const Role = require('../../models/role');
const User = require('../../models/user');
const base = require('../../services/base');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "axel8102005@gmail.com",
        pass: "woll irrx sdeb sbcv"
    }
})
const confirmaiton = async (req, res, next) => {
        let data = jwt.verify(req.params.token, process.env.SECRET_KEY)
        let user = await new User(data.data).populate('role');
        await user.save();
        user = await user.toObject()
        user["token"] = req.params.token;
        base.baseResponse(res,200,user, "registering");
}
const register = async (req, res, next) => {
    let existUser = await User.findOne({ 'email': req.body.email });
    if (!existUser) {
        req.body["role"] = await Role.findOne({'name' : 'client'});
        req.body["password"] = base.hashcode(req.body["password"]);
        let data = await new User(req.body).populate('role');
        let token = base.generateToken(data);
        let url = `http://localhost:3000/api/auth/confirmation/${token}`
        transporter.sendMail({
            from : "axel8102005@gmail.com",
            to : data.email,
            subject : "Register alert",
            html : `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <h2>Plant Lover</h2>
                <p>Thank you for choosing our app! To complete the setup process and ensure seamless integration, please confirm your Gmail account by clicking on the verification link below:</p>
                <a href="${url}">confirm</a>
                <p>If you have any questions or encounter any issues, feel free to reach out to our support team.<p>Best regards,</p> Plant Lover Team</p>
            </body>
            
            </html>`
        },function (error,response) {
            if(error) {
                console.log(error);
            }
        });
        const role = req.body["role"];
        base.baseResponse(res,200,{token,role}, "registering");
    } else {
        next(Object.assign(new Error("email is already in use"),{status: 422}));
    }
}
const login = async (req, res, next) => {
    let existUser = await User.findOne({ 'email': req.body.email }).populate("role");
    if (existUser) {
        if (base.comPass(req.body.password, existUser.password)) {
            let User = existUser.toObject();
            User.token = base.generateToken(User);
            base.baseResponse(res, 200, User, "success login");
        } else {
            next(Object.assign(new Error("wrong password"),{status: 422}));
        }
    } else {
        next(new Error("There is no user with this email"));
        
    }
}

const getUser = (req,res,next) => {
    let token = req.headers.authorization.split(" ")[1];
    let { data } = jwt.verify(token, process.env.SECRET_KEY);
    base.baseResponse(res, 200, data, "success login");
}

module.exports = { register, login, getUser, confirmaiton }