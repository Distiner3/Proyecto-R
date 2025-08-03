// rizz/static/js/custom_dropdown.js

document.addEventListener('DOMContentLoaded', function() {
    const userDropdownButton = document.getElementById('userDropdownButton');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    // --- Essential Check ---
    // If the button or menu doesn't exist on this page, do nothing further.
    if (!userDropdownButton || !userDropdownMenu) {
        // console.warn('User dropdown elements (button or menu) not found on this page.');
        return;
    }

    // --- Function to Close the Menu ---
    function closeUserMenu() {
        if (userDropdownMenu.classList.contains('show')) {
            userDropdownMenu.classList.remove('show');
            // Remove the global listeners ONLY when the menu is closed
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            // console.log('User menu closed, listeners removed.'); // For debugging
        }
    }

    // --- Function to Handle Clicks Outside ---
    // This function is ADDED as a listener only when the menu is open
    function handleClickOutside(event) {
        // If the click is NOT on the button and NOT inside the menu, close it.
        if (!userDropdownButton.contains(event.target) && !userDropdownMenu.contains(event.target)) {
            // console.log('Clicked outside, closing menu.'); // For debugging
            closeUserMenu();
        }
    }

    // --- Function to Handle Escape Key ---
    // This function is ADDED as a listener only when the menu is open
    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            // console.log('Escape key pressed, closing menu.'); // For debugging
            closeUserMenu();
        }
    }

    // --- Add Click Listener to the Button ---
    userDropdownButton.addEventListener('click', function(event) {
        // IMPORTANT: Stop the click on the button from bubbling up to the document
        // and immediately triggering the handleClickOutside listener.
        event.stopPropagation();

        const isCurrentlyShown = userDropdownMenu.classList.contains('show');

        if (isCurrentlyShown) {
            // If it's already shown, close it
            // console.log('Button clicked, menu was open, closing.'); // For debugging
            closeUserMenu();
        } else {
            // If it's hidden, show it and ADD the listeners
            // console.log('Button clicked, menu was closed, opening.'); // For debugging
            userDropdownMenu.classList.add('show');
            // Add the listeners to the document to detect clicks outside or Esc key
            // Use setTimeout with 0ms delay to ensure this runs *after* the current event processing is finished,
            // preventing the listener from catching the same click that opened the menu.
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
                document.addEventListener('keydown', handleEscapeKey);
                // console.log('User menu opened, listeners added.'); // For debugging
            }, 0);
        }
    });

    // console.log('Custom dropdown script initialized successfully.'); // For debugging

}); // End DOMContentLoaded