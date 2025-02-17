const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const userController = require("../controllers/user");

const passport = require('passport');
const {saveRedirectUrl}  = require('../middleware.js');
router.route('/signup')
.get(userController.renderSignup)
.post(wrapAsync(userController.signupForm));

router.route('/login')
.get(userController.renderLogin)
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
userController.loginForm);



router.get("/logout",userController.logout);

module.exports = router;