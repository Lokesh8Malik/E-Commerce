let cartList = document.querySelector('.container');

function updateCart(cart,totalPrice){
    console.log(cart);
    cartList.innerText = "";
    let div1;
    if(cart,totalPrice){
        cart.forEach((c)=>{
            let div = document.createElement('div');
            div.classList.add('product');
            div1 = document.createElement('div');
            div1.classList.add('TotalPrice');
            console.log(c.quantity);
            div.innerHTML = `
            <div class="image" style="background-image: url(${c.id.imageUrl});"></div>
        <div class="name">Name : ${c.id.name}</div>
        <div class="price">Price : ${c.id.price}</div>
        <div class="description">Description : ${c.id.description}</div>
        <div class="category">Category : ${c.id.category}</div>
        <div class="quantity">
            <a href="/shop/cart/increase/${c.id._id}">
            <button class="increaseQuantity">
                +
            </button>
            </a>${c.quantity}
            <a href="/shop/cart/decrease/${c.id._id}">
            <button class="decreaseQuantity">
                -
            </button>
            </a>
            <div id=${c.id._id}></div>
        </div>`
        div1.innerHTML = `
        TotalPrice : ${totalPrice}
        `
        cartList.appendChild(div);
        })
        cartList.appendChild(div1);
    }
}
cartList.addEventListener('click',async (ev)=>{
    ev.preventDefault();

    let item = ev.target;

    if(item.classList.contains('increaseQuantity')){
        item = item.parentElement.parentElement;
        item = item.lastElementChild;
        let id = item.getAttribute('id');
        let {data} = await axios.get(`/shop/cart/increase/${id}`);
        updateCart(data.cart,data.totalPrice);
    }
    else if(item.classList.contains('decreaseQuantity')){
        item = item.parentElement.parentElement;
        item = item.lastElementChild;
        let productDiv = item;
        let id = item.getAttribute('id');
        let {data} = await axios.get(`/shop/cart/decrease/${id}`);
        console.log(data);
        cart = data;
        const itemIndex = cart.cart.findIndex(c => c.id._id == id);
        if (itemIndex != -1 && cart.cart[itemIndex].quantity == 0) {
            cartList.removeChild(productDiv);
        }
        updateCart(data.cart,data.totalPrice)
    }
})