const mongoose = require('mongoose');
const {Schema} = mongoose;

let userSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    password : String,
    cart : [{
        id : {
            type : Schema.Types.ObjectId,
            required: true,
            ref : "products"
        },
        quantity : Number
    }],
})

module.exports = mongoose.model('users',userSchema);