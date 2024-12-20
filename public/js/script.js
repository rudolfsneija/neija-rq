document.getElementById('navbar').innerHTML = `
<div class="navbar-header">
  <a href="/index.html">
    <img src="../images/icons/neija-logo.svg" alt="Neija Racing Quads logo" />
  </a>
  <button class="menu-button" id="menu-button">
    <img src="../images/icons/menu.svg" alt="Menu icon" id="menu-icon"/>
  </button>
</div>

<ul id="navbar-items">
  <li><a href="/index" data-page="index">HOME</a></li>
  <li><a href="/parts" data-page="parts">PARTS</a></li>
  <li><a href="/service" data-page="service">SERVICE</a></li>
  <li><a href="/builds" data-page="builds">BUILDS</a></li>
  <li><a href="/contact" data-page="contact">CONTACT</a></li>
</ul>
`;

// Highlight current page in navbar
const currentPath = window.location.pathname;
const navbarLinks = document.querySelectorAll('#navbar-items a');

navbarLinks.forEach(link => {
  const pageName = link.getAttribute('data-page');
  if (currentPath.includes(pageName)) {
    link.style.color = 'var(--red)';
    link.style.borderBottom = '2px solid var(--red)';
  }
});

// Define color variables
const navbarBackgroundColorVisible = "rgba(251, 251, 251, 0.85)";
const navbarBackgroundColorHidden = "rgba(251, 251, 251, 0.85)";

// Store elements in variables for better performance and readability
const items = document.getElementById("navbar-items");
const navbar = document.getElementById("navbar");

document.getElementById("menu-button").addEventListener("click", function () {
  items.style.display = items.style.display === "flex" ? "none" : "flex";
  // Adjust the navbar background color based on the items visibility and window width
  if (window.innerWidth <= 1000) {
    navbar.style.backgroundColor =
      items.style.display === "flex" ? navbarBackgroundColorVisible : navbarBackgroundColorHidden;
  } else {
    navbar.style.backgroundColor = navbarBackgroundColorHidden; // Ensures it's always transparent on desktops
  }
});

function adjustNavbarDisplay() {
  if (window.innerWidth > 1000) {
    items.style.display = "flex";
    navbar.style.backgroundColor = navbarBackgroundColorHidden; // Ensure the navbar is always transparent on larger screens
  } else {
    items.style.display = "none";
    navbar.style.backgroundColor = navbarBackgroundColorHidden; // Default to transparent when resizing to smaller screens
  }
}


// Attach resize event listener to adjust display based on resizing
window.addEventListener("resize", adjustNavbarDisplay);
// Initial check to set the correct display and background on load
adjustNavbarDisplay();