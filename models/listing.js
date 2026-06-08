const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image : {
        url: String,
        filename : String,
        // url : {
        //     type : String,
        //     default : "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
        //     set : (v) => v === "" 
        //     ? "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D" 
        //     : v,
        // },
    },
    price : Number,
    location : String,
    country : String,
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
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    }
});


listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in: listing.reviews}});
    };
    
});

const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;