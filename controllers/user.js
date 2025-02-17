const User = require("../models/user.js");


module.exports.renderSignup = (req, res) => {
    res.render("../views/users/signup.ejs");
}

module.exports.signupForm= async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        let registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {  // after signup autologin krne k liye
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to Wanderlust!');
            res.redirect('/listings');
        })
        // req.flash('success', 'Welcome to Wanderlust!');
        // res.redirect('/listings');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("../views/users/login.ejs");
}

module.exports.loginForm=  async (req, res) => {
    req.flash('success', 'Welcome back!');
let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            next();
        }
        req.flash("success", "You are logged out");  // success message after logout
        res.redirect("/login"); // redirect to login page after logout
    })
}
