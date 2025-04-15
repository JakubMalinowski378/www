import { fetchArticles } from "./api.js";
import { initalizeDarkMode, initalizeHamburgerMenu } from "./utils.js";

const loadFeaturedArticles = async () => {
  try {
    const articles = await fetchArticles();
    const featured = articles.slice(0, 3);
    const container = document.getElementById("featured-articles-container");

    container.innerHTML = featured
      .map(
        (article) => `
            <article class="article-card" data-animate="fade">
                <img src="${
                  article.image || "assets/Image-not-found.png"
                }" alt="${article.title}">
                <div class="article-content">
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <a href="article.html?id=${article.id}">Czytaj więcej</a>
                </div>
            </article>
        `
      )
      .join("");
  } catch (error) {
    console.error("Błąd ładowania artykułów:", error);
    document.getElementById("featured-articles-container").innerHTML = `
            <p class="error">Nie udało się załadować artykułów. Spróbuj ponownie później.</p>
        `;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initalizeDarkMode();
  initalizeHamburgerMenu();
  loadFeaturedArticles();
});
