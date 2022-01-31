var express = require("express");
const session = require("express-session");
var router = express.Router();
var userHelpers = require("../helpers/userHelpers");

let items = [
    {
        image: "images/img1.png",
        title: "Inspiron 15 laptop",
        price: "₹ 69,989.99 ",
        features: "11th Generation Intel® Core™ i5-11320H Processor",
        os: "Windows 11 Home",
        graphics: "Intel® Iris® Xe Graphics with shared graphics memory",
        RAM: " 16GB, 2x8GB, DDR4, 3200MHz",
        storage: "512GB M.2 PCIe NVMe Solid State Drive",
    },
    {
        image: "images/img2.png ",
        title: "Inspiron 14 laptop",
        price: "₹ 62,489.99 ",
        features: "11th Generation Intel® Core™ i5-11320H Processor",
        os: "Windows 11 Home",
        graphics: "Intel® Iris® Xe Graphics with shared graphics memory",
        RAM: " 8GB, 2x8GB, DDR4, 3200MHz",
        storage: "512GB M.2 PCIe NVMe Solid State Drive",
    },
    {
        image: "images/img3.png",
        title: "Inspiron 14 laptop",
        price: "₹ 66,989.99 ",
        features: "11th Generation Intel® Core™ i5-11320H Processor",
        os: "Windows 11 Home",
        graphics: "Intel® Iris® Xe Graphics with shared graphics memory",
        RAM: " 16GB, 2x8GB, DDR4, 3200MHz",
        storage: "512GB M.2 PCIe NVMe Solid State Drive",
    },
    {
        image: "images/img4.png",
        title: "Inspiron 15 3000 laptop",
        price: "₹ 59,989.99 ",
        features: "11th Generation Intel® Core™ i5-11320H Processor",
        os: "Windows 11 Home",
        graphics: "Intel® Iris® Xe Graphics with shared graphics memory",
        RAM: " 8GB, 8GBx1, DDR4, 2666MHz",
        storage: "512GB M.2 PCIe NVMe Solid State Drive",
    },
    {
        image: "images/img1.png",
        title: "Inspiron 15 3000 laptop",
        price: "₹ 39,489.99 ",
        features: "AMD Ryzen™ 3 3250U Dual Core Mobile Processor with Radeon™ Graphics",
        os: "Windows 10 Home",
        graphics: "Integrated graphics with AMD APU",
        RAM: " 8GB, 1x8GB, DDR4, 2400MHz",
        storage: "1TB 5400 rpm 2.5, SATA Hard Drive",
    },
    {
        image: "images/img2.png",
        title: "Inspiron 15 laptop",
        price: "₹ 64,989.99 ",
        features: "11th Generation Intel® Core™ i5-11320H Processor",
        os: "Windows 11 Home",
        graphics: "Intel® Iris® Xe Graphics with shared graphics memory",
        RAM: " 8GB, 2x4GB, DDR4, 3200MHz",
        storage: "512GB M.2 PCIe NVMe Solid State Drive",
    },
    {
        image: "images/img3.png",
        title: "Inspiron 14 laptop",
        price: "₹ 56,989.99 ",
        features: "AMD Ryzen™ 5 5500U 6-core/12-thread with Radeon™ Graphics",
        os: "Windows 11 Home",
        graphics: "AMD Radeon™ Graphics with shared graphics memory",
        RAM: " 8GB, 1x8GB, DDR4, 3200MHz",
        storage: "512GB M.2 PCIe NVMe Solid State Drive",
    },
    {
        image: "images/img4.png",
        title: "Inspiron 15 laptop",
        price: "₹ 76,990.99 ",
        features: "11th Generation Intel® Core™ i5-11320H Processor",
        os: "Windows 11 Home",
        graphics: "NVIDIA® GeForce® MX450 with 2GB GDDR5 graphics memory",
        RAM: " 16GB, 2x8GB, DDR4, 3200MHz",
        storage: "512GB M.2 PCIe NVMe Solid State Drive",
    },
];

/*------------ GET users-home page.----------------- */
router.get("/", (req, res) => {
    let user = req.session.user;
    if (req.session.user){
    res.render("user/user-home", { items, user });
  }else{
    res.redirect("/login")
  }
});

/*------------ Get login- page---------------------- */
router.get("/login", (req, res) => {
  if(req.session.user){
    res.redirect('/')
  }else{
    res.render("user/user-login");
  }
  });

/*-----------for get signup page---------------------*/
router.get("/signup", (req, res) => {
    res.render("user/user-signup");
});

/*-----------for post register user==------------------*/
router.post("/register", (req, res) => {
    console.log(req.body);
    userHelpers.doSignup(req.body).then((response) => {
        if (response.status) {
            res.redirect("/login");
        } else {
            res.redirect("/signup");
        }
    });
});

/*-----------for post login user==------------------*/
router.post("/login", (req, res) => {
    userHelpers.doLogin(req.body).then((response) => {
        if (response.status) {
            req.session.user = response.user;


            res.redirect("/");
        } else {
            res.redirect("/login");
        }
    });
});

router.get("/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/");
});

module.exports = router;
