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


document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".grid img");
  const gridWidth = document.querySelector(".grid").offsetWidth;
  const gridHeight = document.querySelector(".grid").offsetHeight;

  const usedPositions = [];

  images.forEach(img => {
    let randomSize, randomTop, randomLeft;
    let overlaps;

    do {
      // Generate random size between 100px and 200px
      randomSize = Math.floor(Math.random() * 100) + 100;

      // Generate random position within the grid
      randomTop = Math.floor(Math.random() * (gridHeight - randomSize));
      randomLeft = Math.floor(Math.random() * (gridWidth - randomSize));

      // Check for overlaps with previous positions
      overlaps = usedPositions.some(pos => {
        const withinXRange = randomLeft < pos.left + pos.size && randomLeft + randomSize > pos.left;
        const withinYRange = randomTop < pos.top + pos.size && randomTop + randomSize > pos.top;
        return withinXRange && withinYRange;
      });
    } while (overlaps); // Keep generating new positions until no overlap is detected

    // Store the current image's position
    usedPositions.push({ top: randomTop, left: randomLeft, size: randomSize });

    // Apply styles to the image
    img.style.position = "absolute";
    img.style.width = `${randomSize}px`;
    img.style.height = `${randomSize}px`;
    img.style.top = `${randomTop}px`;
    img.style.left = `${randomLeft}px`;
  });
});