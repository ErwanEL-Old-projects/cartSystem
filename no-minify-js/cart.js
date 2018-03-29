let cart = [];

const cartItemsCount = () => {
    let counter = document.getElementById('cartCounter');
    cartCounter = cart.length;
    if (cartCounter > 0) {
        counter.textContent = cartCounter;
    } else {
        counter.textContent = "";
    }
};

//check if there are items in local storage
const checkLocalStorage = () => {
    if (localStorage.items) {
        // load cart data from local storage
        cart = JSON.parse(localStorage.items);  
        cart = JSON.parse(localStorage.getItem("items"));
        cartItemsCount();
    };
};

//function that set the local storage
const setLocalStorage = () => {
    localStorage.setItem("items", JSON.stringify(cart));
    cart = JSON.parse(localStorage.getItem("items"));
};

const addToCart = (clicked_id) => {
    const product_id = document.getElementById(`${clicked_id}`);
    const product_code = product_id.dataset.code;
    const product_name = product_id.dataset.name;
    const product_price = product_id.dataset.price;
    cart.push([product_code, product_name, product_price]);
    cartItemsCount();
    setLocalStorage();
};

//print items from local storage into the unordered list
function printShoppingCart(){
    shoppingCart = document.getElementById("shoppingCart");
    cart = JSON.parse(localStorage.items);
    let item = "";
    for (var i = 0; i < cart.length; i++ ) { 
        item += `<li class="list-group-item" data-index="${i}">${cart[i]} <button data-index="${i}" class="btn btn-primary btn-sm float-right delete" type="button" onclick="removeCartItem();"><i class="fas fa-trash"></i></button></li> `
    }
    shoppingCart.innerHTML = item;
    items = Array.from(shoppingCart.children);
    deleteButtons = Array.from(document.getElementsByClassName('delete'));
    return removeCartItem();
};

//function to calculate the total of the cart or put the empty cart message if the cart is empty (try by changing the product_price data set of the report add to cart button)
const totalCart = () => {
    let shoppingCart = document.getElementById("shoppingCart");
    let total = document.getElementById("total");
    shoppingCart = Array.from(shoppingCart.children);
    if (shoppingCart.length === 0) {
        total.textContent = "Your cart is empty.";
    } else {
        shoppingPrices = [];
    for(let i = 0;i<shoppingCart.length; i+=1) {
        let item = shoppingCart[i];
        let itemPrice = Number(item.textContent.split(',')[2]);
        shoppingPrices.push(itemPrice);
    }
    totalShoppingCart = shoppingPrices.reduce((count,itemPrice) => count + itemPrice);
    total.textContent = `Total: ${totalShoppingCart}`;
    }
};


const removeCartItem = () => {
    shoppingCart = document.getElementById("shoppingCart");
    items = Array.from(shoppingCart.children);
    for (const [buttonIndex, button] of deleteButtons.entries()) {
        button.addEventListener('click', () => {
            cart.splice(buttonIndex,1);
            shoppingCart.removeChild(items[buttonIndex]);
            cartItemsCount();
            setLocalStorage();
            totalCart();
            return printShoppingCart();
        });
    }
};