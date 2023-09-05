const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name:{
        type: "String",
    },
    username:{
        type: "String",
    },
    phone_number:{
      type: "String",
      required: true,
    },
    user_id:{
        type: Number,
        required: true
    },language:{
        type: "String",
        enum: ["en", "uz"],
        required: true,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Users", userSchema);