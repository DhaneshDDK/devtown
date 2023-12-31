const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    products : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "product"
        }
    ],
    token : {
        type : String,
    },
},
 {
    timestamps : true,
 }
)

module.exports = mongoose.model('user',userSchema);