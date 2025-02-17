const mongoose = require("mongoose");
const Schema = mongoose.Schema;

reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
     
    },
    comment: {
        type: String,
       
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Review', reviewSchema);