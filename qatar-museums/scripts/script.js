function approach1Fn(className) {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
      if (box.classList.contains(className)) {
          box.style.filter = 'none'; // Remove filter from the chosen photo
      } else {
          box.style.filter = 'brightness(50%)'; // Apply darker filter to others
      }
  });
}

function showFn() {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
      box.style.filter = 'none'; // Remove filters to show all photos normally
  });
}

// Infinite scrolling and drag-to-scroll functionality remains unchanged
const scrollContainer = document.querySelector('.scroll-container');
const grid = document.querySelector('.grid');
let isDragging = false;
let startX, startY;
let scrollLeft, scrollTop;

// Function to duplicate the images for infinite effect
function duplicateImages() {
  const images = document.querySelectorAll('.grid img');
  images.forEach(image => {
    const clone = image.cloneNode(true);
    grid.appendChild(clone);
  });
}

// Duplicate images multiple times to ensure smooth infinite scrolling
for (let i = 0; i < 10; i++) {
  duplicateImages();
}

// Drag to scroll functionality
scrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  startY = e.pageY - scrollContainer.offsetTop;
  scrollLeft = scrollContainer.scrollLeft;
  scrollTop = scrollContainer.scrollTop;
  e.preventDefault(); // Prevent text selection
});
scrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
});
scrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
});
scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const y = e.pageY - scrollContainer.offsetTop;
  const walkX = (x - startX) * 2; // Increase scroll speed by multiplying the difference
  const walkY = (y - startY) * 2;
  scrollContainer.scrollLeft = scrollLeft - walkX;
  scrollContainer.scrollTop = scrollTop - walkY;
});
/*test*/
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.grid img');
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');
  const closePopup = document.getElementById('close-popup');

  // Show popup with image and description
  images.forEach(image => {
    image.addEventListener('click', () => {
      const description = image.getAttribute('data-description');
      const imageUrl = image.getAttribute('src');

      popupImage.src = imageUrl; // Set the popup image
      popupText.textContent = description; // Set the popup text
      popup.style.display = 'flex'; // Show the popup
    });
  });

  // Hide popup when clicking the close button
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none'; // Hide the popup
  });

  // Hide popup when clicking outside the popup content
  window.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none'; // Hide the popup
    }
  });
});
