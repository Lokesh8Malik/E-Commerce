const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');


const Users = require('./model/user');
app.use(async(req,res,next)=>{
    let user = await Users.findOne({
        _id : "6639cf4ed6e8459a6019d7ac"
    })
    req.user = user;
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// requiring hbs module 
const hbs = require('hbs');
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs'); // We have to write this everytime after registering partials

// common request
app.get('/',(req,res)=>{
    res.render('index');
})

//All admin requests using admin route
let adminRouter = require('./routes/admin');
app.use('/admin',adminRouter);

// All shop request for user using shop route
let shopRouter = require('./routes/shopRouter');
const { MongoUnexpectedServerResponseError } = require('mongodb');
app.use('/shop',shopRouter);


async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        console.log("Server connected successfully.");
        app.listen(PORT,()=>{
            console.log(`http://localhost:${PORT}`);
        })
    }
    catch(err){
        console.log("Server not connected");
    }
}
main()