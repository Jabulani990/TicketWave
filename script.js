const eventGrid = document.querySelector('.event-grid');
const categoryFilter = document.querySelector('.category-filter');
const dateFilter = document.querySelector('.date-filter');
const regionFilter = document.querySelector('.region-filter');
const cityFilter = document.querySelector('.city-filter');

let eventsData =;

function createEventCard(event, index) {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event-item");

    const eventLink = document.createElement('a'); // Add link to event details
    eventLink.href = `event-details.html?id=${index}`;
    eventLink.style.textDecoration = 'none'; // Remove underline from link
    eventLink.style.color = 'inherit'; // Inherit color from parent

    eventLink.innerHTML = `
        <img src="<span class="math-inline">\{event\.image\}" alt\="</span>{event.title}">
        <h3>${event.title}</h3>
        <p>Date: ${event.date}</p>
        <p>Location: ${event.location}</p>
        <p>Price: ${event.price}</p>
    `;

    eventDiv.appendChild(eventLink); // Add link to the card
    return eventDiv;
}

function displayEvents(events) {
    eventGrid.innerHTML = '';
    events.forEach((event, index) => { // Add index parameter
        const eventCard = createEventCard(event, index); // Pass index to createEventCard
        eventGrid.appendChild(eventCard);
    });
}


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
        eventGrid.innerHTML = "<p>Error loading events. Please try again later.</p>";
    });


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

categoryFilter.addEventListener('change', filterEvents);
dateFilter.addEventListener('change', filterEvents);
regionFilter.addEventListener('input', filterEvents);
cityFilter.addEventListener('change', filterEvents);


// Image Slider
const bannerContainer = document.querySelector('.banner-container');
const bannerImages = bannerContainer.querySelectorAll('img');
let currentImageIndex = 0;

function slideImages() {
    bannerImages.forEach((image, index) => {
        image.style.opacity = index === currentImageIndex? 1: 0;
    });
    currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
}

if (bannerImages.length > 0) {
    setInterval(slideImages, 5000);
}


// Event Details Page Code (This goes in the same script.js file)
const urlParams = new URLSearchParams(window.location.search);
const eventIndex = urlParams.get('id');

if (eventIndex!== null && eventsData.length > 0) {
    const event = eventsData[eventIndex];
    if (event) {
        document.getElementById('event-detail-image').src = event.image;
        document.getElementById('event-detail-title').textContent = event.title;
        document.getElementById('event-detail-date').textContent = event.date;
        document.getElementById('event-detail-location').textContent = event.location;
        document.getElementById('event-detail-price').textContent = event.price;
        document.getElementById('event-detail-description').textContent = event.description || "No description available";
    } else {
        document.getElementById('event-detail-title').textContent = "Event Not Found";
    }
} else if (eventsData.length === 0) { // Handle data not loaded yet
    document.getElementById('event-detail-title').textContent = "Loading...";
    fetch('data.json')
  .then(response => response.json())
  .then(data => {
        eventsData = data;
        const event = eventsData[eventIndex];
        if (event) {
            document.getElementById('event-detail-image').src = event.image;
            document.getElementById('event-detail-title').textContent = event.title;
            document.getElementById('event-detail-date').textContent = event.date;
            document.getElementById('event-detail-location').textContent = event.location;
            document.getElementById('event-detail-price').textContent = event.price;
            document.getElementById('event-detail-description').textContent = event.description || "No description available";
        } else {
            document.getElementById('event-detail-title').textContent = "Event Not Found";
        }
    });
} else {
    document.getElementById('event-detail-title').textContent = "Invalid Event ID";
