// List of video IDs
const videos = ['video1', 'video2', 'video3', 'video4'];

// Initialize counts from localStorage
videos.forEach(video => {
    const likes = localStorage.getItem(`${video}_likes`) || 0;
    const loves = localStorage.getItem(`${video}_loves`) || 0;
    const shares = localStorage.getItem(`${video}_shares`) || 0;

    // Update the displayed counts
    document.querySelector(`[data-id="${video}"] .like-count`).textContent = likes;
    document.querySelector(`[data-id="${video}"] .love-count`).textContent = loves;
    document.querySelector(`[data-id="${video}"] .share-count`).textContent = shares;
});

// Function to toggle like state
function toggleLike(videoId) {
    const button = document.querySelector(`[data-id="${videoId}"] .like`);
    const countElement = document.querySelector(`[data-id="${videoId}"] .like-count`);
    let count = parseInt(countElement.textContent);
    
    // Toggle liked state
    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        count--; // Decrease count
    } else {
        button.classList.add('liked');
        count++; // Increase count
    }
    
    // Update displayed count and localStorage
    countElement.textContent = count;
    localStorage.setItem(`${videoId}_likes`, count);
}

// Function to toggle love state
function toggleLove(videoId) {
    const button = document.querySelector(`[data-id="${videoId}"] .love`);
    const countElement = document.querySelector(`[data-id="${videoId}"] .love-count`);
    let count = parseInt(countElement.textContent);
    
    // Toggle loved state
    if (button.classList.contains('loved')) {
        button.classList.remove('loved');
        count--; // Decrease count
    } else {
        button.classList.add('Aimé');
        count++; // Increase count
    }
    
    // Update displayed count and localStorage
    countElement.textContent = count;
    localStorage.setItem(`${videoId}_loves`, count);
}

// Function to open the share popup
function openSharePopup(videoId) {
    const overlay = document.getElementById('shareOverlay');
    overlay.style.display = 'flex'; // Show the overlay
    overlay.setAttribute('data-video-id', videoId); // Store video ID in overlay
}

// Function to close the share popup
function closeSharePopup() {
    const overlay = document.getElementById('shareOverlay');
    overlay.style.display = 'none'; // Hide the overlay
}

// Function to share on social media
function shareOn(platform) {
    const videoId = document.getElementById('shareOverlay').getAttribute('data-video-id');
    const videoUrl = `https://www.youtube.com/watch?v=${videoId.replace('video', 'VIDEO_ID_')}`; // Replace with actual video URL logic

    let shareUrl;
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
            break;
        case 'instagram':
            alert("Sharing to Instagram is done through the app. Please copy the link.");
            closeSharePopup();
            return;
        case 'twitter':
            shareUrl = `https://twitter.com/share?url=${encodeURIComponent(videoUrl)}`;
            break;
        case 'tiktok':
            alert("Sharing to TikTok is done through the app. Please copy the link.");
            closeSharePopup();
            return;
        default:
            return;
    }

    // Open the share URL in a new tab
    window.open(shareUrl, '_blank');
    closeSharePopup(); // Close the popup after sharing
  }