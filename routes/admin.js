const { response } = require("express");
var express = require("express");
var router = express.Router();
var adminHelper = require("../helpers/admin-helper");
var userHelpers = require("../helpers/userHelpers");

/* GET admin pannel. */
router.get("/", function (req, res, next) {
    if (req.session.admin) {
        adminHelper.getUsers().then((userData) => {
            console.log(userData);

            res.render("admin/admin", { userData });
        });
    } else {
        res.redirect("/admin/adminLogin");
    }
});

router.get("/adminLogin", function (req, res, next) {
    if (req.session.admin) {
        res.redirect("/admin");
    } else {
        res.render("admin/admin-login");
    }
});

/*-----------for post login user==------------------*/
router.post("/login", (req, res) => {
    adminHelper.doLogin(req.body).then((response) => {
        if (response.status) {
            req.session.admin = response.admin;

            res.redirect("/admin");
        } else {
            res.redirect("/admin/login");
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.admin = null;
    res.redirect("/admin");
});

router.get("/addUser", (req, res) => {
    res.render("admin/addUser");
});

router.post("/addUser", (req, res) => {
    userHelpers.doSignup(req.body).then((response) => {
        res.redirect("/admin");
    });
});

router.get("/deleteUser/:id", (req, res) => {
    adminHelper.deleteUser(req.params.id).then(() => {
        res.redirect("/admin");
    });
});

router.get("/editUser/:id", async (req, res) => {
    let userData = await adminHelper.getUserDetail(req.params.id);
    console.log(userData);
    res.render("admin/editUser", { userData });
});

router.post("/editUser/:id", (req, res) => {
    adminHelper.updateUserDetail(req.params.id, req.body).then(() => {
        res.redirect("/admin");
    });
});

module.exports = router;
