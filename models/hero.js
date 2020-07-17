const mongoose = require('mongoose');

const heroSchema= new mongoose.Schema({
    name: {
        type : String,
        minlength : 4,
        maxlength : 20,
        required : true
    },
    birthname: String,
    movies: {
        type : [String],
        enum : ["Infinity war", "Endgame", "Iron Man 2", "First Avengers"]
    },
    likeCount: Number,
    imgUrl: {
        type : String,
        default : "Placeholder image link to be updated..."
    },
    deceased: Boolean
});

const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;