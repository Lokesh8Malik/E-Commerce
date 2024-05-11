const products = require('../model/product');
const Users = require('../model/user');


module.exports.getShopHomePage = async(req,res)=>{
    try{
        let product = await products.find({});
        let data = {};
        product.forEach((item)=>{
            let arr = data[item.category] || [];
            arr.push(item);
            data[item.category] = arr;
        })
        res.render('shop/ShopHomePage',{
            data
        })
    }
    catch(err){
        res.send(err);
    }
}

module.exports.getProductDetails = async(req,res)=>{
    let {id} = req.params;
    try{
        let product = await products.findById(id);
        res.render('shop/product-details',{
            product
        })
    }
    catch(err){
        res.send(err);
    }
}

module.exports.getAddProductInCart = async(req,res)=>{
    let {id} = req.params;
    let cart = req.user.cart;
    let indx = -1;
    cart.forEach((item,i)=>{
        if(item.id == id){
            indx = i;
        }
    })
    if(indx==-1){
        cart.unshift({
            id : id,
            quantity : 1
        })
    }
    else{
        cart[indx].quantity++;
    }
    req.user.save();
    res.redirect('/shop/cart');
}


module.exports.getCart = async(req,res)=>{
    try{
        let user = await Users.findById({_id : req.user._id}).populate('cart.id');
        let totalPrice = 0;
        user.cart.forEach((item)=>{
            totalPrice+= item.quantity * item.id.price;
        })
        res.render('shop/cartPage',{
            cart : user.cart,
            totalPrice
        })
    }
    catch(err){

    }
}

module.exports.getIncreaseQuantity = async(req,res)=>{
    let {id} = req.params;
    let cart = req.user.cart;
    let indx = -1;
    cart.forEach((item,i)=>{
        if(item.id == id){
            indx = i;
        }
    })
    cart[indx].quantity++;
    await req.user.save();
    try{
        let user = await Users.findById({_id : req.user._id}).populate('cart.id');
        let totalPrice = 0;
        user.cart.forEach((item) => {
            totalPrice += item.id.price * item.quantity;
        })
        if(cart){
            res.send({ cart: user.cart, totalPrice });
        }
        else{
            res.redirect('/shop/cart');
        }
    }
    catch(err){

    }
}

module.exports.getDecreaseQuantity = async(req,res)=>{
    let {id} = req.params;
    let cart = req.user.cart;
    let indx = -1;
        cart.forEach((item,i)=>{
            if(item.id == id){
                indx = i;
            }
        })
        if(indx!=-1){
            if(cart[indx].quantity > 1){
                cart[indx].quantity--;
            }
            else if (cart[indx].quantity ==1){
                cart.splice(indx,1);
            }
        }
           await req.user.save();
            try{
                let user = await Users.findById({_id : req.user._id}).populate('cart.id');
                let totalPrice = 0;
                user.cart.forEach((item) => {
                    totalPrice += item.id.price * item.quantity;
                })
                res.send({
                    cart : user.cart,
                    totalPrice
                });
            }
            catch(err){
        
            }
        }
