const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image : {
        type : String,
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    processor : {
        type : String,
        required : true
    },
    simtype : {
        type : String,
        required : true
    },
    memory : {
        type : String,
        required : true
    },
    battery : {
        type : String,
        required : true
    },
    os : {
        type : String,
        required : true
    },
    customers : [
       {
         type : mongoose.Schema.Types.ObjectId,
         ref : "user"
       }
    ]
});

module.exports = mongoose.model('product', productSchema);