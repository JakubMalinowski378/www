import {
  initalizeDarkMode,
  initalizeHamburgerMenu,
  capitalize,
} from "./utils.js";
import { fetchArticles } from "./api.js";

let articles;

const renderArticles = (articles) => {
  const articlesContainer = document.getElementById("all-articles-container");

  if (articles.length === 0) {
    articlesContainer.innerHTML = `<p class="no-articles">Nie znaleziono artykułów.</p>`;
    return;
  }
  articlesContainer.innerHTML = articles
    .map(
      (article) => `
    <article class="article-card">
                <img src="${
                  article.image || "assets/Image-not-found.png"
                }" alt="${article.title}">
                <div class="article-content">
                    <span class="category-badge">${capitalize(
                      article.category
                    )}</span>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <div class="article-meta">
                        <time datetime="${article.date}">${article.date}</time>
                        <span>${article.views || 0} wyświetleń</span>
                    </div>
                    <a href="article.html?id=${
                      article.id
                    }" class="btn">Czytaj więcej</a>
                </div>
            </article>`
    )
    .join("");
};

const loadArticlesAndCategories = async () => {
  articles = await fetchArticles();
  const selectHandler = document.getElementById("category-filter");
  const categories = new Set(articles.map((article) => article.category));
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = capitalize(category);
    selectHandler.appendChild(option);
  }
  renderArticles(articles);
};

const filterArticles = () => {
  const selectedCategory = document.getElementById("category-filter").value;
  const searchPhrase = document.getElementById("search-input").value;
  var filteredArticles = articles.filter(
    (article) =>
      article.category === selectedCategory &&
      article.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );
  if (selectedCategory === "all") {
    filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchPhrase.toLowerCase())
    );
  }
  renderArticles(filteredArticles);
};

document.addEventListener("DOMContentLoaded", () => {
  initalizeDarkMode();
  initalizeHamburgerMenu();
  loadArticlesAndCategories();
});

document
  .getElementById("category-filter")
  .addEventListener("change", filterArticles);

document
  .getElementById("search-input")
  .addEventListener("input", filterArticles);
