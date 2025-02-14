// Search Filters Functionality

const categoryFilter = document.querySelector('.category-filter');
const dateFilter = document.querySelector('.date-filter');
const regionFilter = document.querySelector('.region-filter');
const cityFilter = document.querySelector('.city-filter');
const eventGrid = document.querySelector('.event-grid');

let eventsData =;

function createEventCard(event) {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event-item");

    eventDiv.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <h3>${event.title}</h3>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Price: ${event.price}</p>
    `;
    return eventDiv;
}

function displayEvents(events) {
    eventGrid.innerHTML = '';
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventGrid.appendChild(eventCard);
    });
}

// Fetch event data from JSON
fetch('data.json')
  .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
  .then(data => {
        eventsData = data;
        displayEvents(eventsData);

        // Populate city filter
        const cities = [...new Set(data.map(event => event.location.split(',').trim()))];
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.text = city;
            cityFilter.appendChild(option);
        });

    })
  .catch(error => {
        console.error("Error fetching data:", error);
        // Display an error message to the user or take other appropriate action
        eventGrid.innerHTML = "<p>Error loading events. Please try again later.</p>"; // Example error message
    });


// Filter Function (Generalized)
function filterEvents() {
    const selectedCategory = categoryFilter.value;
    const selectedDate = dateFilter.value;
    const selectedRegion = regionFilter.value.toLowerCase();
    const selectedCity = cityFilter.value;

    const filteredEvents = eventsData.filter(event => {
        const eventCategory = event.category || "other";
        const eventDate = event.date;
        const eventLocation = event.location.toLowerCase();

        return (
            (selectedCategory === "" || eventCategory === selectedCategory) &&
            (selectedDate === "" || eventDate === selectedDate) &&
            (eventLocation.includes(selectedRegion)) &&
            (selectedCity === "" || eventLocation.startsWith(selectedCity))
        );
    });

    displayEvents(filteredEvents);
}

// Add event listeners to filters
categoryFilter.addEventListener('change', filterEvents);
dateFilter.addEventListener('change', filterEvents);
regionFilter.addEventListener('input', filterEvents);
cityFilter.addEventListener('change', filterEvents);


// Image Slider Functionality (Improved)

const bannerContainer = document.querySelector('.banner-container');
const bannerImages = bannerContainer.querySelectorAll('img');
let currentImageIndex = 0;

function slideImages() {
    bannerImages.forEach((image, index) => {
        image.style.opacity = index === currentImageIndex? 1: 0;
    });
    currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
}

if (bannerImages.length > 0) { // Check if there are banner images
    setInterval(slideImages, 5000);
}

    currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
}

setInterval(slideImages, 5000);
