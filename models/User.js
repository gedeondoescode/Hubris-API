const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 2,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true, 
        max:50,
        unique:true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 500,
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    followers: {
        type:Array,
        default:[]
    },
    following: {
        type:Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 100
    },
    badge: {
        type: String,
        default: "",
        enum: ["Owner", "Administrator", "Moderator", "Verified Creator", "Supporter"]
    }
},
{timestamps: true}
);

module.exports = mongoose.model("user", UserSchema);