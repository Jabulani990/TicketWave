// Search Filters Functionality

const categoryFilter = document.querySelector('.category-filter');
const dateFilter = document.querySelector('.date-filter');
const regionFilter = document.querySelector('.region-filter');
const cityFilter = document.querySelector('.city-filter');
const eventGrid = document.querySelector('.event-grid'); // Get the event grid container

let eventsData =; // Store event data here after fetching

// Function to create event cards
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

// Function to display events
function displayEvents(events) {
    eventGrid.innerHTML = ''; // Clear existing events
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventGrid.appendChild(eventCard);
    });
}


// Fetch event data from JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
        eventsData = data; // Store the fetched data
        displayEvents(eventsData); // Initial display of all events

        // Populate city filter (after data is fetched)
        const cities = [...new Set(data.map(event => event.location.split(',').trim()))]; // Extract unique cities
        cities.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.text = city;
          cityFilter.appendChild(option);
        });

    });


// Filter Function (Generalized)
function filterEvents() {
    const selectedCategory = categoryFilter.value;
    const selectedDate = dateFilter.value;
    const selectedRegion = regionFilter.value.toLowerCase(); // Case-insensitive search
    const selectedCity = cityFilter.value;

    const filteredEvents = eventsData.filter(event => {
        const eventCategory = event.category || "other"; // Handle missing categories
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
regionFilter.addEventListener('input', filterEvents); // Use 'input' for real-time filtering
cityFilter.addEventListener('change', filterEvents);


// Image Slider Functionality (Improved)

const bannerContainer = document.querySelector('.banner-container');
const bannerImages = bannerContainer.querySelectorAll('img'); // Select all images

let currentImageIndex = 0;

function slideImages() {
    bannerImages.forEach((image, index) => {
        if (index === currentImageIndex) {
            image.style.opacity = 1; // Show current image
        } else {
            image.style.opacity = 0; // Hide other images
        }
    });

    currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
}

setInterval(slideImages, 5000);
