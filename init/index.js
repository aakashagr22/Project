const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  /* The line `initData=data.map((obj)=>({...obj,owner:'67acb58e9c656ec67348a74d'}));` is mapping over
  an array of objects stored in the variable `data`. For each object in the array, it is creating a
  new object using the spread syntax (`{...obj}`) to copy all the properties of the original object,
  and then adding a new property `owner` with the value `'67acb58e9c656ec67348a74d'`. */
  initData.data=initData.data.map((obj)=>({...obj,owner:'67acb58e9c656ec67348a74d'}));  
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
