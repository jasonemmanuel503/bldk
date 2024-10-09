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
          }, 3000); // Stop playback after 3 seconds
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
  })
  .catch(error => console.error('Error loading top-singles.json:', error));



