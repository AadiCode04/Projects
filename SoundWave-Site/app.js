// --- Carousel and Modal Functionality ---

let currentSlide = 0;
const productList = document.querySelector('.product-list');
const slides = document.querySelectorAll('.product-item');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Pre-defined product data for the modal
const products = [
    {
        name: "AuraFlow Earbuds",
        description: "Premium earbuds with sophisticated design and superior sound quality.",
        specs: {
            "Battery Life": "8 hours + 24h case",
            "Charging": "USB-C Fast Charge",
            "Connectivity": "Bluetooth 5.3",
            "Water Rating": "IPX5",
            "Drivers": "11mm Dynamic",
            "Frequency": "20Hz - 20kHz"
        }
    },
    {
        name: "VividBeats Pro",
        description: "Dynamic earphones with vibrant design and powerful bass response.",
        specs: {
            "Battery Life": "6 hours + 18h case",
            "Charging": "USB-C",
            "Connectivity": "Bluetooth 5.2",
            "Water Rating": "IPX4",
            "Drivers": "10mm Dynamic",
            "Frequency": "20Hz - 22kHz"
        }
    },
    {
        name: "Orbis Touch",
        description: "Futuristic earbuds with advanced touch controls and smart features.",
        specs: {
            "Battery Life": "10 hours + 30h case",
            "Charging": "Wireless + USB-C",
            "Connectivity": "Bluetooth 5.4",
            "Water Rating": "IPX6",
            "Drivers": "12mm Hybrid",
            "ANC": "Active Noise Cancellation"
        }
    },
    {
        name: "ApexCore Urban",
        description: "Rugged earbuds designed for active lifestyles and urban environments.",
        specs: {
            "Battery Life": "7 hours + 21h case",
            "Charging": "USB-C Fast Charge",
            "Connectivity": "Bluetooth 5.3",
            "Water Rating": "IPX7",
            "Drivers": "10mm Titanium",
            "Build": "Military Grade"
        }
    },
    {
        name: "AcousticPro Studio",
        description: "Studio-grade earbuds for professional audio monitoring and mixing.",
        specs: {
            "Battery Life": "12 hours + 36h case",
            "Charging": "USB-C Pro Charge",
            "Connectivity": "Bluetooth 5.4 + Wired",
            "Drivers": "14mm Planar Magnetic",
            "Frequency": "5Hz - 40kHz",
            "THD": "< 0.1%"
        }
    },
    {
        name: "ZenithFlow Comfort",
        description: "Ultra-comfortable earbuds for extended listening sessions.",
        specs: {
            "Battery Life": "9 hours + 27h case",
            "Charging": "USB-C",
            "Connectivity": "Bluetooth 5.3",
            "Water Rating": "IPX4",
            "Weight": "4.2g each",
            "Tips": "Memory Foam"
        }
    }
];

// Function to update the carousel slide position
function updateSlide() {
    const slideWidth = productList.clientWidth; // Get the visible width of the carousel
    productList.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Navigate to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

// Navigate to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

// Navigate to a specific slide using indicators
function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

// Display product details in a modal
function showDetails(index) {
    const product = products[index];
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('modalContent');
    
    // Construct the HTML for the modal content
    content.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: 1.25rem; color: #00f5ff;">${product.name}</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.875rem; color: rgba(255,255,255,0.8);">${product.description}</p>
        <h3 style="font-size: 1.5rem; margin-bottom: 1.25rem;">Specifications</h3>
        <div class="specs-grid">
            ${Object.entries(product.specs).map(([key, value]) => `
                <div class="spec-item">
                    <div class="spec-label">${key}</div>
                    <div class="spec-value">${value}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.classList.add('show');
}

// Close the product details modal
function closeDetails() {
    document.getElementById('detailModal').classList.remove('show');
}

// Event Listeners for controls and keyboard navigation
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

document.getElementById('detailModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeDetails();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') closeDetails();
});

// Auto-advance carousel for user convenience
let autoAdvance = setInterval(nextSlide, 5000);

// Pause auto-advance when the user interacts with the carousel
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(autoAdvance);
});

document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoAdvance = setInterval(nextSlide, 5000);
});

// Initialize the carousel on page load
updateSlide();