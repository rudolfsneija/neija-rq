document.getElementById('navbar').innerHTML = `
<div class="navbar-header">
          <a href="/index.html">
            <img
              src="/source/images/icons/neija-logo.svg"
              alt="Neija Racing Quads logo"
          /></a>
          <button class="menu-button" id="menu-button">
            <i class="fa-solid fa-bars fa-2xl"></i>
          </button>
        </div>

        <ul id="navbar-items">
          <li><a href="/index.html">HOME</a></li>
          <li><a href="/source/html/parts.html">PARTS</a></li>
          <li><a href="/source/html/service.html">SERVICE</a></li>
          <li><a href="/source/html/builds.html">BUILDS</a></li>
          <li><a href="/source/html/contact.html">CONTACT</a></li>
        </ul>
`

const items = document.getElementById("navbar-items");
const navbar = document.getElementById("navbar");

document
  .getElementById("menu-button")
  .addEventListener("click", function () {
    items.style.display = items.style.display === "flex" ? "none" : "flex";
    // Adjust the navbar background color based on the items visibility and window width
    if (window.innerWidth <= 800) {
      navbar.style.backgroundColor =
        items.style.display === "flex" ? "#141414c7" : "transparent";
    } else {
      navbar.style.backgroundColor = "transparent"; // Ensures it's always transparent on desktops
    }
  });

function adjustNavbarDisplay() {
  if (window.innerWidth > 800) {
    items.style.display = "flex";
    navbar.style.backgroundColor = "transparent"; // Ensure the navbar is always transparent on larger screens
  } else {
    items.style.display = "none";
    navbar.style.backgroundColor = "transparent"; // Default to transparent when resizing to smaller screens
  }
}

// Attach resize event listener to adjust display based on resizing
window.addEventListener("resize", adjustNavbarDisplay);
// Initial check to set the correct display and background on load
adjustNavbarDisplay();