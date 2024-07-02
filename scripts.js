const gridContainer = document.getElementById('gridContainer');
const modal = document.getElementById('imageModal');
const fullImage = document.getElementById('fullImage');
const imageName = document.getElementById('imageName');
const closeBtn = document.getElementsByClassName('close')[0];

async function fetchImages() {
    try {
        const response = await fetch('/api/images');
        if (response.ok) {
            const images = await response.json();
            return images;
        } else {
            console.error('Failed to load images');
            return [];
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

function getBaseName(file) {
    return file.split('.').slice(0, -1).join('.');
}

function createSquares(images) {
    images.forEach((image) => {
        const square = document.createElement('div');
        square.className = 'square';
        const encodedImage = encodeURIComponent(image);
        square.style.backgroundImage = `url(images/${encodedImage})`;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = getBaseName(image);
        square.appendChild(tooltip);

        square.addEventListener('mousemove', (e) => {
            tooltip.style.left = `${e.clientX + 10}px`; // Adjust the offset as needed
            tooltip.style.top = `${e.clientY}px`;
        });

        square.addEventListener('click', () => {
            fullImage.src = `images/${encodedImage}`;
            imageName.textContent = getBaseName(image);
            modal.style.display = 'block';
        });

        gridContainer.appendChild(square);
    });
}

async function init() {
    const images = await fetchImages();
    images.sort(() => Math.random() - 0.5); // Shuffle the images array
    createSquares(images);
}

init();

// Close the modal when the user clicks on <span> (x)
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Ensure the modal is hidden on page load
modal.style.display = "none";
