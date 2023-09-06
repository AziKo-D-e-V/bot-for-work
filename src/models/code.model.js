const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    code:{
      type: "String",
      required: true,
      unique: true
    },
    product_name:{
        type: "String",
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("codes", codeSchema);