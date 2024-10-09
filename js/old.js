document.addEventListener("DOMContentLoaded", function() {
  // Load initial content
  loadContent('top-singles');
  loadContent('top-artists');
  loadContent('top-albums');

  // Load content based on the type
  function loadContent(contentType) {
      const urlMap = {
          'top-singles': '/top-singles.json',
          'top-artists': '/top-artists.json',
          'top-albums': '/top-albums.json'
      };

      fetch(urlMap[contentType])
          .then(response => {
              if (!response.ok) throw new Error('Network response was not ok');
              return response.json();
          })
          .then(data => {
              renderContent(contentType, data);
          })
          .catch(error => console.error(`Error fetching ${contentType}:`, error));
  }

  function renderContent(contentType, data) {
      const container = document.getElementById(contentType);
      container.innerHTML = data.map(item => {
          if (contentType === 'top-singles') {
              return `
                  <div class="singles-card">
                      <img class="singles-image" src="${item.artcover}" alt="${item.songTitle}" />
                      <h3 class="song-title">${item.songTitle}</h3>
                      <p class="artist-name">${item.artistName}</p>
                      <p class="price">Price: ${item.price}</p>
                      <audio class="audio" src="${item.audioUrl}" id="audio-${item.songTitle}" style="display:none;"></audio>
                      <i class="fas fa-play play-icon" onclick="playPreview('${item.audioUrl}', '${item.songTitle}', '${item.artistName}', '${item.price}', '${item.artcover}')"></i>
                  </div>
              `;
          } else if (contentType === 'top-artists') {
              return `
                  <div class="card">
                      <img src="${item.image}" alt="${item.name}" />
                      <h3>${item.name}</h3>
                  </div>
              `;
          } else if (contentType === 'top-albums') {
              return `
                  <div class="card">
                      <img src="${item.image}" alt="${item.name}" />
                      <h3>${item.name}</h3>
                      <p>${item.artistName}</p>
                  </div>
              `;
          }
      }).join('');
  }

  // Function to play audio preview and show track info
  window.playPreview = function(audioUrl, songTitle, artistName, price, artcover) {
      const audioElement = document.getElementById('preview-audio');
      const previewMessage = document.getElementById('preview-message');
      const purchaseModal = document.getElementById('purchase-modal');
      const closeModal = document.getElementById('close-modal');

      audioElement.src = audioUrl;
      audioElement.style.display = 'block';
      audioElement.play();
      previewMessage.style.display = 'block';

      // Show track info in purchase modal
      document.getElementById('track-art').src = artcover;
      document.getElementById('track-title').innerText = songTitle;
      document.getElementById('track-artist').innerText = artistName;
      document.getElementById('track-price').innerText = price;

      // Stop the audio after 4 seconds and show the purchase modal
      setTimeout(() => {
          audioElement.pause();
          audioElement.currentTime = 0; // Reset to start
          previewMessage.style.display = 'none';
          purchaseModal.style.display = 'block'; // Show purchase modal
      }, 4000);

      // Close the modal
      closeModal.onclick = function() {
          purchaseModal.style.display = 'none';
      };
  };

  // Payment methods
  document.getElementById('pay-paypal').onclick = function() {
      processPayment('paypal');
  };

  document.getElementById('pay-mobile-money').onclick = function() {
      processPayment('mobile-money');
  };

  document.getElementById('pay-orange-money').onclick = function() {
      processPayment('orange-money');
  };

  // General payment processing function
  function processPayment(method) {
      const successMessage = document.getElementById('success-message');
      const purchaseModal = document.getElementById('purchase-modal');
      const userNumber = document.getElementById('phone-number').value;
      const userEmail = document.getElementById('user-email').value;

      // Validate user input
      if (!userNumber || !userEmail) {
          alert("Please provide all required information.");
          return;
      }

      let transactionId;

      switch (method) {
          case 'paypal':
              // PayPal payment processing
              const paypalClientId = 'YOUR_PAYPAL_CLIENT_ID';
              const paypalSecret = 'YOUR_PAYPAL_SECRET';
              
              // Example API call to PayPal
              console.log("Processing payment with PayPal...");
              // Mock payment processing with success
              setTimeout(() => {
                  transactionId = 'PAYPAL-TRANS-ID-12345'; // Simulated transaction ID
                  purchaseModal.style.display = 'none';
                  successMessage.style.display = 'block';
                  successMessage.innerHTML += `<p>Transaction ID: ${transactionId}</p>`;
              }, 2000);
              break;

          case 'mobile-money':
              // MTN Mobile Money payment processing
              const mtnApiKey = 'YOUR_MTN_API_KEY';
              const mtnApiSecret = 'YOUR_MTN_API_SECRET';
              
              // Example API call to MTN Mobile Money
              console.log("Processing payment with Mobile Money...");
              // Mock payment processing with success
              setTimeout(() => {
                  transactionId = 'MTN-TRANS-ID-67890'; // Simulated transaction ID
                  purchaseModal.style.display = 'none';
                  successMessage.style.display = 'block';
                  successMessage.innerHTML += `<p>Transaction ID: ${transactionId}</p>`;
              }, 2000);
              break;

          case 'orange-money':
              // Orange Money payment processing
              const orangeApiKey = 'YOUR_ORANGE_API_KEY';
              const orangeApiSecret = 'YOUR_ORANGE_API_SECRET';
              
              // Example API call to Orange Money
              console.log("Processing payment with Orange Money...");
              // Mock payment processing with success
              setTimeout(() => {
                  transactionId = 'ORANGE-TRANS-ID-54321'; // Simulated transaction ID
                  purchaseModal.style.display = 'none';
                  successMessage.style.display = 'block';
                  successMessage.innerHTML += `<p>Transaction ID: ${transactionId}</p>`;
              }, 2000);
              break;

          default:
              console.error("Unknown payment method");
      }
  }
});



 // NEW CODES ODL ////////////////////
 // Fetch data from top-singles.json
fetch('../top-singles.json')
.then(response => response.json())
.then(data => {
  const topSinglesContainer = document.getElementById('top-singles');
  const previewMessage = document.getElementById('preview-message');

  data.forEach(single => {
    const singleElement = document.createElement('div');
    singleElement.classList.add('top-single');

    singleElement.innerHTML = `
      <img src="${single.artcover}" alt="${single.songTitle}" class="art-cover">
      <h3 class="song-title">${single.songTitle}</h3>
      <p class="artist-name">${single.artistName}</p>
      <p class="price">${single.price}</p>
      <button class="play-button" data-audio-url="${single.audioUrl}">Play</button>
    `;

    const playButton = singleElement.querySelector('.play-button');

    playButton.addEventListener('click', () => {
      const audio = document.getElementById('audio-2');
      audio.src = playButton.getAttribute('data-audio-url');

      audio.oncanplay = () => {
        audio.play();
        setTimeout(() => {
          audio.pause();
          // Display purchase modal after audio preview
          previewMessage.style.display = 'block';
        }, 3000); // Stop playback after 3 seconds
      };
    });

    topSinglesContainer.appendChild(singleElement);
  });
})
.catch(error => console.error('Error loading top-singles.json:', error));