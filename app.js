require('dotenv').config(); // for loading env file keys and value
console.log(process.env.SECRET);  // for cloud, .env key is printed


// for major project we setup basic 
// 1. Database set up
// 2. Rest APIs for CRUD operations

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");


const listingRouter = require('./Routes/listings.js');
const reviewRouter = require('./Routes/review.js');
const userRouter = require('./Routes/user.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const dbUrl = process.env.ATLASDB_URL;

let port = 8080;
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});
main()
.then((req, res)=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

// app.get('/testListing',async function(req, res){
    
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description:"By the beach",
//         price:"1200",
//         location:"Goa",
//         country:"India",
//     });
//     sampleListing.save();
//     console.log("sampleListing was saved successfully");
//     res.send('Success!');
// });
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({ extended: true }));


app.use(methodOverride("_method"));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",(err)=>console.error("Error in MongoStore",err));

let sessionOptions = {
    store:store,
    name: "mySessionID",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true ,
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true ,
    cookie:{
        expires:  Date.now()+7 * 24 * 60  *60 * 1000,
        maxAge: 7* 24 * 60 *60 * 1000,
        httpOnly:true
    }
}



app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // basicaly user relaetd information stored while single session
passport.deserializeUser(User.deserializeUser()); // & it is used to remove/deserialize the user information after closing single session 



app.use((req,res,next) => {
    // res.locals.currentUser = req.session.userId;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.edit = req.flash("edit");
    res.locals.currUser = req.user; // not getting use req.user in navbar in login so store here & use there currUser
    // console.log(res.locals.success);
    next();
});

// app.get('/demouser',async (req,res)=>{
//     let fakeUser = new User({
//         email: "student@example.com",
//         username: "delta-student",
//     });
//    let newUser= await User.register(fakeUser,"password");
//    console.log(newUser);
//    res.send(newUser);
// })

app.use('/',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',userRouter);
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err, req, res, next) =>{
    // console.error(err.stack);
    let {status = 500,message ="Something Went Wrong!"} =err;
    // res.status(status).send(message);
    res.render("./listings/error.ejs", {message});
})


