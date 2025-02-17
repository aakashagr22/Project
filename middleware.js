// const Listing = require('../models/listing.js');
const ExpressError = require("./utils/ExpressError.js");
const Listing  = require("./models/listing");
const {listingSchema,reviewSchema} = require('./schema.js');
const Review  = require("./models/review.js");

module.exports.isLoggedin =  (req,res,next)=>{
    if(!req.isAuthenticated()){
        // console.log(req.path,"..", req.originalUrl);
        req.session.redirectUrl = req.originalUrl;  // if user tries to access a protected route, it will be stored in session.  // req.session.save(()=>{res.redirect("/login");});  // redirect to login page if not logged in.  } else{
        
        req.flash('error',"You must be logged in to create a listing!");
        return res.redirect("/login");  // redirect to login page if not logged in.  } else{
    }
    else{
        next();
    }
}
// there is some issue with passport and that is when some extra info added to session like 
// redirect url  then passport automaticaly delete the session so req.session.redirectUrl undefined
// so handling with this isssue what we do in following code store in locals which is not deleted by passsport
module.exports.saveRedirectUrl = (req, res,next)=>{
if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
 // after storing in locals, we remove it from session.  }
   
}
next();
}

module.exports.isOwner  = async (req,res,next) => {
    let {id} = req.params;
let listing =await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash('error',"You are not authorized to edit this listing!");
    return res.redirect(`/listings/${id}`);  // redirect to listing page if not authorized to edit.  } else{
   // update the listing data and save  // if(error){
}
next();
}

module.exports.validateListings = async(req, res,next) => {
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
       let errMes = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400,errMes);  // 400 Bad Request  for invalid data  or form data  not sent correctly. 404 Not Found for invalid URL. 500 Internal Server Error for server errors.  }else{
    }else{
        next();
    }
};

module.exports.validateReviews =async (req, res,next) => {
        let {error} = reviewSchema.validate(req.body);
        if(error){
           let errMes = error.details.map((el) => el.message).join(', ');
            throw new ExpressError(400,errMes);  // 400 Bad Request  for invalid data  or form data  not sent correctly. 404 Not Found for invalid URL. 500 Internal Server Error for server errors.  }else{
        }else{
            next();
        }
    }

    module.exports.isReviewAuthor  = async (req,res,next) => {
        let {reviewId} = req.params;
    let review =await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash('error',"You are not authorized to edit this listing!");
        return res.redirect(`/listings/${reviewId}`);  // redirect to listing page if not authorized to edit.  } else{
       // update the listing data and save  // if(error){
    }
    next();
    }