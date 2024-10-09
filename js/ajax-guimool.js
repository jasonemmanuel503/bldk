fetch('../top-singles.json')
  .then(response => response.json())
  .then(data => {
    const topSinglesContainer = document.getElementById('top-singles-cards');
    const previewMessage = document.getElementById('preview-message');
    const purchaseModal = document.getElementById('purchase-modal');
    const trackArt = document.getElementById('track-art');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackPrice = document.getElementById('track-price');
    const closeModal = document.getElementById('close-modal');
    let selectedSong; // Declare selectedSong variable

    const closePurchaseModal = () => {
      purchaseModal.style.display = 'none';
      document.getElementById('paypal-button-container').innerHTML = ''; // Clear button after closing
      previewMessage.style.display = 'none'; // Hide the preview message as well
    };

    closeModal.addEventListener('click', closePurchaseModal);

    data.forEach(single => {
      const singleElement = document.createElement('div');
      singleElement.classList.add('top-single');

      singleElement.innerHTML = `
        <img src="${single.artcover}" alt="${single.songTitle}" class="art-cover">
        <h3 class="song-title">${single.songTitle}</h3>
        <p class="artist-name">${single.artistName}</p>
        <p class="price">${single.price}</p>
        <button class="play-button" data-audio-url="${single.audioUrl}">demo</button>
      `;

      const playButton = singleElement.querySelector('.play-button');

      playButton.addEventListener('click', () => {
        const audio = document.getElementById('audio-2');
        audio.src = playButton.getAttribute('data-audio-url');

        audio.oncanplay = () => {
          audio.play();
          setTimeout(() => {
            audio.pause();
            previewMessage.style.display = 'block';
          }, 10000); // Stop playback after 3 seconds
        };

        selectedSong = single; // Set the selected song when the Play button is clicked
      });

      topSinglesContainer.appendChild(singleElement);
    });

    // PayPal integration
    document.getElementById('buy-btn').addEventListener('click', () => {
      if (selectedSong) {
        trackArt.src = selectedSong.artcover;
        trackTitle.textContent = selectedSong.songTitle;
        trackArtist.textContent = selectedSong.artistName;
        trackPrice.textContent = selectedSong.price;

        purchaseModal.style.display = 'block'; // Show the purchase modal
        renderPayPalButton(); // Call function to render PayPal button
      } else {
        console.error('No song selected for purchase.');
      }
    });

    const renderPayPalButton = () => {
      // Clear previous button instance
      document.getElementById('paypal-button-container').innerHTML = '';

      if (selectedSong) {
        paypal.Buttons({
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: selectedSong.price // Use the selected song's price for payment
                }
              }]
            });
          },
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
              purchaseModal.style.display = 'none';
              document.getElementById('success-message').style.display = 'block';
            });
          }
        }).render('#paypal-button-container'); // This will render the default button
      } else {
        console.error('No song selected for payment.');
      }
    };

    // Mobile Money and Orange Money integration
    document.getElementById('pay-mobile-money').addEventListener('click', function() {
      const phoneNumber = document.getElementById('phone-number').value;
      const email = document.getElementById('user-email').value;
      const amount = parseFloat(selectedSong.price.replace('XOF', '').trim()); // Assuming price is in XOF

      // Example API call for MTN Mobile Money
      fetch('https://api.diool.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Replace with your Diool API key
        },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: amount,
          currency: 'XOF', // Set your currency
          email: email,
          payment_method: 'momo' // Specify payment method
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Payment successful!');
          purchaseModal.style.display = 'none'; // Optionally close modal
        } else {
          alert('Payment failed: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
    });

    document.getElementById('pay-orange-money').addEventListener('click', function() {
      const phoneNumber = document.getElementById('phone-number').value;
      const email = document.getElementById('user-email').value;
      const amount = parseFloat(selectedSong.price.replace('XOF', '').trim());

      // Example API call for Orange Money
      fetch('https://api.diool.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Replace with your Diool API key
        },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: amount,
          currency: 'XOF',
          email: email,
          payment_method: 'orange' // Specify payment method
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Payment successful!');
          purchaseModal.style.display = 'none'; // Optionally close modal
        } else {
          alert('Payment failed: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
    });
  })
  .catch(error => console.error('Error loading top-singles.json:', error));