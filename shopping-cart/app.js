

//Select Elements
const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal');
const totalItemsInCarEl = document.querySelector('.total-items-in-cart');

//Render products
/* 
Funcion  que genera el contenido de el contenedor products apartir de el array de objetos products
Por cada elemento dentro del array la funcion crea un elemento html apartir del template reemplazando los datos con los del elemento del array
*/
function renderProducts() {
    //el parametro product se utiliza para nombrar al elemento de la iteracion actual
    products.forEach((product) => {
        //productsEl es el contenedor para los products en el archivo html
        productsEl.innerHTML +=
            //template utilizado para la creacion del elemento html
            `
        <div class="item">
           <div class="item-container">
                <div class="item-img">
                    <img src="${product.imgSrc}" alt="${product.name}">
                </div>
                <div class="desc">
                    <h2>${product.name}</h2>
                    <h2><small>$</small>${product.price}</h2>
                    <p>
                        ${product.description}
                    </p>
                </div>
                <div class="add-to-wishlist">
                    <img src="./icons/heart.png" alt="add to wish list">
                </div>
                <div class="add-to-cart" onclick="addToCart(${product.id})">
                    <img src="./icons/bag-plus.png" alt="add to cart">
                </div>
            </div>
        </div>
        `
    })
}
//se llama ala funcion render del contenido
renderProducts();

//cart array que almacenara los elementos del carrito
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//funcion que agrega el elemento seleccionado al carrito
/*
Esta funcion es llamada desde el elemento product como una inlinefunction la cual obtiene como parametro el id del producto desde el que fue invocada.
por medio de el metodo some comprobamos si ya existe un elemento con ese id dentro del cart si es asi lanzamos una alerta.
En caso contrario buscamos dentro de el array de productos un objeto que contenga dicho id y lo agregamos al cart
*/
function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits('plus', id);
    } else {
        const item = products.find((product) => product.id === id)
        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }
    updateCart();
}

//update cart

function updateCart() {
    renderCartItems();
    renderSubtotal();

    //guardar cart en localStorage
    localStorage.setItem("CART", JSON.stringify(cart));
}
//calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCarEl.innerHTML = `${totalItems}`
}


function renderCartItems() {
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>  
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</div>
            </div>
        </div>
        `
    })
}
//remove item from car
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

//change number of units for an item
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.instock) {
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits: numberOfUnits
        }
    });
    updateCart();
}