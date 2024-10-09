// TOGGLE MOBILE MENU
const menu = document.getElementById('navMenuGuimoool');
const ham = document.getElementById('menu-btn-2');

// Function to update menu visibility based on screen size
function updateMenuVisibility() {
    if (window.innerWidth <= 768) { // Adjust this breakpoint as needed
        menu.style.display = 'none'; // Hide menu on mobile
    } else {
        menu.style.display = 'flex'; // Show menu on larger screens
    }
}

// Initialize menu visibility on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    updateMenuVisibility();
});

// Toggle the menu on button click
ham.addEventListener('click', function() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
});

// Close the menu when clicking outside of it
document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && event.target !== ham) {
        menu.style.display = 'none';
    }
});

// Update menu visibility on window resize
window.addEventListener('resize', function() {
    updateMenuVisibility();
});


// Fetch track data from the JSON file
// fetch("tracks.json")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		const tracksContainer = document.getElementById("tracks-container");

// 		// Loop through the track data and create track cards
// 		data.forEach((track) => {
// 			const trackCard = document.createElement("div");
// 			trackCard.classList.add("track-card");

// 			const coverImg = document.createElement("img");
// 			coverImg.src = track.coverArt;
// 			coverImg.alt = `${track.title} - ${track.artist}`;
// 			trackCard.appendChild(coverImg);

// 			const title = document.createElement("p");
// 			title.classList.add("track-title");
// 			title.textContent = track.title;
// 			trackCard.appendChild(title);

// 			const artist = document.createElement("p");
// 			artist.classList.add("artist-name");
// 			artist.textContent = track.artist;
// 			trackCard.appendChild(artist);

// 			const price = document.createElement("p");
// 			price.classList.add("price");
// 			price.textContent = `${track.price} XAF`;
// 			trackCard.appendChild(price);

// 			// Append the track card to the tracks container
// 			tracksContainer.appendChild(trackCard);
// 		});
// 	})
// 	.catch((error) => console.error("Error fetching data:", error));

// // Function to play track preview for a specific duration
// function playPreview(trackUrl) {
// 	const audioPlayer = document.getElementById("audio-player");
// 	audioPlayer.src = trackUrl;
// 	audioPlayer.play();

// 	// Pause the audio player and show the buy popup after 30 seconds
// 	setTimeout(() => {
// 		audioPlayer.pause();
// 		document.getElementById("buy-popup").style.display = "block";
// 	}, 30000); // Adjust the time duration as needed
// }

// // Event listener for track cards to play previews and show buy popup
// document
// 	.getElementById("tracks-container")
// 	.addEventListener("click", (event) => {
// 		if (event.target.classList.contains("track-card")) {
// 			// Get the track URL from the data attribute or any other source
// 			const trackUrl = "path/to/track-preview.mp3"; // Replace with actual track URL
// 			playPreview(trackUrl);
// 		}
// 	});

// // Event listener for buy button click to show payment options popup
// document.getElementById("buy-btn").addEventListener("click", () => {
// 	document.getElementById("payment-popup").style.display = "block";
// });

// // Event listener for payment method selection
// document.getElementById("payment-method").addEventListener("change", () => {
// 	const selectedPaymentMethod = document.getElementById("payment-method").value;
// 	if (selectedPaymentMethod === "mobile-money") {
// 		document.getElementById("mobile-money-options").style.display = "block";
// 	} else {
// 		document.getElementById("mobile-money-options").style.display = "none";
// 	}
// });

// // Event listener for pay button click to process the payment
// document.getElementById("pay-btn").addEventListener("click", () => {
// 	const selectedPaymentMethod = document.getElementById("payment-method").value;

// 	switch (selectedPaymentMethod) {
// 		case "paypal":
// 			// Implement PayPal payment processing logic
// 			const paypalSecretKey = "YOUR_PAYPAL_SECRET_KEY";
// 			console.log("Processing payment with PayPal...");
// 			break;
// 		case "credit-card":
// 			// Implement credit card payment processing logic
// 			const creditCardSecretKey = "YOUR_CREDIT_CARD_SECRET_KEY";
// 			console.log("Processing payment with credit card...");
// 			break;
// 		case "mobile-money":
// 			const mobileMoneyProvider = document.getElementById(
// 				"mobile-money-provider"
// 			).value;
// 			switch (mobileMoneyProvider) {
// 				case "mtn":
// 					// Implement MTN Mobile Money payment processing logic using ZitoPay
// 					const zitoPayApiKey = "YOUR_ZITOPAY_API_KEY";
// 					const zitoPayApiSecret = "YOUR_ZITOPAY_API_SECRET";
// 					console.log("Processing MTN Mobile Money payment with ZitoPay...");
// 			}
// 			break;
// 		default:
// 			console.log("Invalid payment method selected");
// 	}

// 	// Close the payment popup after processing
// 	document.getElementById("payment-popup").style.display = "none";
// });
