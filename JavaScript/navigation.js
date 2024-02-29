// JavaScript file: navigation.js

// Function to handle navigation when a sidebar link is clicked
function handleNavigation(event) {
  // Prevent the default behavior of the link
  event.preventDefault();

  // Get the href attribute of the clicked link
  const href = event.currentTarget.getAttribute("href");

  // If href is not '#', navigate to the specified URL
  if (href !== "#") {
    window.location.href = href;
  }
}

// Get all the sidebar links
const sidebarLinks = document.querySelectorAll(".sidebar a");

// Add click event listeners to each sidebar link
sidebarLinks.forEach((link) => {
  link.addEventListener("click", handleNavigation);
});
