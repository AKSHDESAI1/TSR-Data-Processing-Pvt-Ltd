const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    mobile_no: {
        type: Number,
        required: true
    },
    adhar_number: {
        type: Number,
        required: true
    },
    nprc_location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    station_id: {
        required: true,
        type: String
    },
    district: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    payment_screenshot: {
        default: null,
        type: String
    },
    tsr_report: {
        default: null,
        type: String
    }
})

const User = new mongoose.model("User", UserSchema);

module.exports = User;