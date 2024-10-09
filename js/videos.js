// List of video IDs
const videos = ['video1', 'video2', 'video3', 'video4'];

// Initialize share counts from localStorage
videos.forEach(video => {
    const shares = localStorage.getItem(`${video}_shares`) || "";

    // Update the displayed counts
    document.querySelector(`[data-id="${video}"] .share-count`).textContent = shares;
});

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