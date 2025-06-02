// Get a reference to the menu element
const myMenu = document.getElementById('Menu');
const hideButton = document.getElementById('hideMenuButton');
const showButton = document.getElementById('showMenuButton');

// Function to hide the menu
function hideMenu() {
    if (myMenu) { // Check if the element exists
        myMenu.style.display = 'none';
    }
}

// Function to show the menu
function showMenu() {
    if (myMenu) {
        myMenu.style.display = 'block'; // Or 'flex', 'grid', etc., depending on its original display type
    }
}

// Add event listeners to the buttons
if (hideButton) {
    hideButton.addEventListener('click', hideMenu);
}

if (showButton) {
    showButton.addEventListener('click', showMenu);
}

// You could also call hideMenu() directly if you want it hidden on page load
// hideMenu();