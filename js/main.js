document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mainMenu = document.getElementById("main-menu");

  menuToggle.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    mainMenu.classList.toggle("show");

    // Change button text based on state
    this.textContent = isExpanded ? "☰ Menu" : "✕ Zamknij";
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use system preference
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    darkModeToggle.textContent = "☀️";
  }

  darkModeToggle.addEventListener("click", function () {
    const currentTheme = document.body.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.body.removeAttribute("data-theme");
      darkModeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      darkModeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });

  // Close menu when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 768 &&
      !menuToggle.contains(e.target) &&
      !mainMenu.contains(e.target)
    ) {
      menuToggle.setAttribute("aria-expanded", "false");
      mainMenu.classList.remove("show");
      menuToggle.textContent = "☰ Menu";
    }
  });
});
