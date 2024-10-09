// Retrieve elements from the DOM
const cartContainer = document.getElementById('cart-container');
const cartCartCounter = document.getElementById('cart-counter');

// Retrieve the cart items from local storage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cartItems); // Log the cart items for debugging

// Function to update the cart counter
function updateCartCounter() {
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartCartCounter) {
        cartCartCounter.innerText = cartItems.reduce((total, item) => total + item.quantity, 0);
    } else {
        console.error('cart-counter element not found');
    }
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to display the cart items
function displayCartItems() {
    cartContainer.innerHTML = ''; // Clear the cart container

    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.productName}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.productName}</p>
                <p class="cart-item-price">$${item.productPrice.toFixed(2)}</p>
                <p class="cart-item-quantity">Quantity: <span id="quantity-${item.id}">${item.quantity}</span></p>
                <span class="cart-button" onclick="removeItem(${item.id})">Supprimé</span>
            </div>
        `;
        cartContainer.appendChild(cartItemDiv);
    });
}

// Function to adjust the quantity
function adjustQuantity(productId, change) {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(productId); // Call removeItem if quantity is zero
        } else {
            updateLocalStorage();
            updateCartCounter();
            displayCartItems();
        }
    }
}

// Function to remove an item from the cart
function removeItem(productId) {
    const index = cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateLocalStorage();
        updateCartCounter();
        displayCartItems();
    } else {
        console.error('Item not found in the cart.');
    }
}

// Call the function to display cart items and update the cart counter
displayCartItems();
updateCartCounter();