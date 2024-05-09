const mongoose = require('mongoose');
const {Schema} = mongoose;

let productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    reviews:[{
        type:String
    }],
    category:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('products',productSchema);