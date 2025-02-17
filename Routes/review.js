const express  = require('express');
const router = express.Router({mergeParams: true});
const Listing = require('../models/listing.js');
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require('../utils/wrapAsync.js');
const {listingSchema,reviewSchema} = require('../schema.js');
const Review = require('../models/review.js');
const {isLoggedin,isOwner,validateReviews,isReviewAuthor}  = require('../middleware.js');
const reviewController  = require('../controllers/review.js');

// post reviews Route
router.post("/",isLoggedin,validateReviews,wrapAsync(reviewController.createReview));
    
// delete review route

router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));


    module.exports = router;