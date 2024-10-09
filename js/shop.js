// Retrieve elements from the DOM
const productContainer = document.getElementById('products-container');
const shopCartCounter = document.getElementById('cart-counter');
const popup = document.getElementById('popup');

// Initialize the cart with items from local storage or an empty array
let shopCart = JSON.parse(localStorage.getItem('cart')) || [];
updateShopCartCounter();

// Fetch product data from a JSON file and display products
fetch('/shopData.json')
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            displayProduct(product);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

// Function to display a product on the page
function displayProduct(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.productName}" style="width: 100%;">
        <h1 class="product-name">${product.productName}</h1>
        <h4 class="product-price">xaf${product.productPrice.toFixed(2)}</h4>
        <button class="add-to-cart">Ajouter au panier</button>
    `;
    productContainer.appendChild(productDiv);

    const addToCartButton = productDiv.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', function() {
        addToShopCart(product);
        updateShopCartCounter();
        showPopup(product);
        addToCartButton.textContent = 'Voir le panier'; // Change button text to 'View'
        addToCartButton.classList.remove('add-to-cart');
        addToCartButton.classList.add('view-cart-btn');
    });
}

// Function to show a popup when a product is added to the cart
function showPopup(product) {
    popup.innerHTML = ''; // Clear previous content

    const productDiv = document.createElement('div');
    productDiv.className = 'popup-product-item';
    productDiv.innerHTML = `
        <img class="pop-image" src="${product.image}" alt="${product.productName}" style="width: 50px;">
        <p><strong>${product.productName}</strong><br>Price: XAF${product.productPrice.toFixed(2)}</p>
    `;
    
    popup.appendChild(productDiv);

    popup.style.display = 'block';

    // Hide the popup after 3 seconds
    setTimeout(function() {
        popup.style.display = 'none';
    }, 3000);
}

// Update the cart counter displayed on the page
function updateShopCartCounter() {
    shopCart = JSON.parse(localStorage.getItem('cart')) || [];
    shopCartCounter.innerText = shopCart.reduce((total, item) => total + item.quantity, 0);
}

// Function to add a product to the cart
function addToShopCart(product) {
    const existingProduct = shopCart.find(item => item.productId === product.productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        shopCart.push({ productId: product.productId, productName: product.productName, productPrice: product.productPrice, image: product.image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(shopCart));
}