export const initalizeDarkMode = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainMenu = document.getElementById("main-menu");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    darkModeToggle.textContent = "☀️";
  }

  darkModeToggle.addEventListener("click", () => {
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

  document.addEventListener("click", (e) => {
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
};

export const initalizeHamburgerMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainMenu = document.getElementById("main-menu");

  menuToggle.addEventListener("click", () => {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    mainMenu.classList.toggle("show");

    this.textContent = isExpanded ? "☰ Menu" : "✕ Zamknij";
  });
};
