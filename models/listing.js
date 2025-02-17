// // const mongoose = require("mongoose");
// // const Schema = mongoose.Schema;


// // const listingSchema = new Schema({
// //   title: {
// //     type: String,
// //     required: true,
// //   },
// //   description: String,
// //   image: {
// //     type: String,
// //     default:
// //       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
// //     set: (v) =>
// //       v === ""
// //         ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
// //         : v,
// //   },
// //   price: Number,
// //   location: String,
// //   country: String,
// // });

// // const Listing = mongoose.model("Listing", listingSchema);
// // module.exports = Listing;


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");


// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description:{type: String,
//      required: true
//     },
//   image: {
//     filename: String,
// url:{
// type: String,
//     default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     set: (v) =>
//         v === ""? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v,
//     },
//   },
//   price:{
//     type: Number,
//     required: true,
//     // min: 1,
//   },
//   location:{
//     type: String,
//     required: true,
//   },
//   country:{
//     type: String,
//     required: true,
//   },
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref:"Review",
//     },
//   ],
//   // owner:{
//   //   type:Schema.Types.ObjectId,
//   //   ref:"User",

//   // },
// });

// listingSchema.post("findOneAndDelete",async(listing) =>{
//   if(listing){
//     await Review.deleteMany({_id :{$in:listing.reviews}});
//   } 

// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing; 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    filename: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v.trim() === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          : v,
    },
  },
  price: {
    type: Number,
    required: true,
    min: 1, // Ensures the price is at least 1
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing && listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
