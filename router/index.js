const express = require('express');
const router = express.Router();
const AdminProduct = require('./admin/product');
const AdminSlider = require('./admin/slider');
const Client = require('../router/client');
const Auth = require('./auth/auth');
const base = require('../services/base')
const { validateToken, validateRole } = require('../services/validator')

//Client
router.use("/api", Client);
//Admin
router.use("/api/admin/products", validateToken(),validateRole(), AdminProduct);
router.use("/api/admin/sliders",validateToken(), validateRole(), AdminSlider);
//Auth
router.use("/api/auth", Auth);


router.use((err, req, res, next) => {
    err.status = err.status || 404;
    res.status(err.status).json({ con: false, "msg": err.message });
});
router.use("*", function (req, res) {
    base.baseResponse(res, 404, [], "There is no route with this request");
})
module.exports = router