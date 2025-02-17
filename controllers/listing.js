const Listing  = require("../models/listing");

module.exports.home = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}

module.exports.renderNewForm =  (req, res) => {
    res.render("./listings/new.ejs");
}
module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews",populate:{ path: "author",},
             })
             .populate("owner");
    if (!listing) {
        req.flash('error', "You requested a listing for doesn't exist!");
        return res.redirect("/listings");  // redirect to listings page if listing not found.  } else{
    }
    // console.log(listing);
    res.render("./listings/show.ejs", { listing });
}

module.exports.createListings = async (req, res, next) => {
    let url = req.file.path;
    let file=  req.file.filename;
    // console.log(file,"..",url);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;  // set the owner of the listing to the logged in user.  } else{
        newListing.image={url,file};
    await newListing.save();
    req.flash('success', "New Listing Created");
    res.redirect('/listings');

}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('edit', "You requested a listing for edit, doesn't exist!");
        return res.redirect("/listings");  // redirect to listings page if listing not found.  } else{
    }  // render the edit page with the listing data  // res.render("./listings/edit.ejs",{listing});
    let originalImageUrl = listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250"); //preview image ki height and width change krne ko
    res.render("./listings/edit.ejs", { listing , originalImageUrl});
}

module.exports.updateListings = async (req, res) => {
    let { id } = req.params;
   let listing= await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
   if(typeof req.file !== 'undefined'){
   let url = req.file.path;
    let file=  req.file.filename;
    listing.image={url,file};
    await listing.save();
   }
    req.flash('success', "Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListings = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', "Listing Deleted");
    res.redirect("/listings");
}