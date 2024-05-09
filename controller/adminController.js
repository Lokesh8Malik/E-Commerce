const products = require('../model/product');

module.exports.getAdminPage = async(req,res)=>{
    res.render('admin/home');
}

module.exports.getAllProducts = async(req,res)=>{
    let pro = await products.find();
    let data = {};
    pro.forEach(product=>{
        let arr = data[product.category] || [];
        arr.push(product);
        data[product.category] = arr;
    })
    res.render('admin/allproducts',{
        data
    })
}

module.exports.getAddProduct = async(req,res)=>{
    try{
        res.render('admin/addproducts')
    }
    catch(err){
        res.render(err);
    }
}

module.exports.postAddProduct = async(req,res)=>{
    try{
        const {name,price,description,seller,imageUrl,category} = req.body;
        let pro = await products.create({
            name,price,description,seller,imageUrl,category
        })
        res.redirect('/admin/products/all');
    }
    catch(err){
        res.render(err);
    }
}

module.exports.getUpdateProduct = async(req,res)=>{
    const {id} = req.params;
    try{
        let pro = await products.findById(id);

        res.render('admin/updateproduct',{
            id,
            pro
        })
    }
    catch(err){
        console.log(err);
    }
}

module.exports.postUpdateProduct = async(req,res)=>{
    let {name,price,description,seller,imageUrl,category,id} = req.body;
    try{
        await products.updateOne({_id : id},{name,price,description,seller,category,imageUrl});
        res.redirect('/admin/products/all')
    }
    catch(err){
        res.send(err);
    }
}

module.exports.getDeleteProduct = async(req,res)=>{
    const {id} = req.params;
    try{
        await products.findByIdAndDelete(id);  // Finds the element by its id and deletes that element.
        res.redirect('/admin/products/all');
    }
    catch(err){
    }
}