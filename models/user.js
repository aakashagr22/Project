const mongoose = require("mongoose");
const { authorize } = require("passport");
const Schema = mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");


const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        // unique: true
    }
});


userSchema.plugin(passportLocalMongoose); // basicallly  plugin is used for automatically add hash & salt &username also
module.exports = mongoose.model('User', userSchema);
