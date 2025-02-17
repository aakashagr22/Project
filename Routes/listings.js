const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const { isLoggedin, isOwner, validateListings } = require('../middleware.js');
const listingController  = require('../controllers/listing.js');
const multer  = require('multer')
const {storage} =  require('../CloudConfig.js');
const upload = multer({storage});



router.get('/listings', wrapAsync(listingController.index));
router.get('/', wrapAsync(listingController.home));
router.post('/listings', isLoggedin, validateListings,upload.single("listing[image]") ,wrapAsync(listingController.createListings));


// new route
router.get('/listings/new', isLoggedin,listingController.renderNewForm);


// show route

router.get('/listings/:id', wrapAsync(listingController.showListings));


//Edit Route
router.get('/listings/:id/edit', isLoggedin, isOwner, validateListings, wrapAsync(listingController.renderEditForm));

// UPDATE ROUTE

router.put('/listings/:id', isLoggedin, isOwner, validateListings,upload.single("listing[image]"), wrapAsync(listingController.updateListings));

// Delete Route

router.delete('/listings/:id', isLoggedin, wrapAsync(listingController.deleteListings));

module.exports = router;
