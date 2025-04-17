import { fetchComments, fetchArticleById, addNewComment } from "./api.js";
import {
  initalizeDarkMode,
  initalizeHamburgerMenu,
  capitalize,
} from "./utils.js";

const loadComments = async (articleId) => {
  const comments = await fetchComments(articleId);
  const container = document.getElementById("comments-list");
  container.innerHTML =
    comments.length > 0
      ? comments
          .map(
            (comment) => `
            <div class="comment">
                <h4>${comment.author}</h4>
                <p>${comment.content}</p>
                <time datetime="${comment.date}">${new Date(
              comment.date
            ).toLocaleDateString()}</time>
            </div>
        `
          )
          .join("")
      : "<p>Brak komentarzy. Bądź pierwszy!</p>";
};

const loadArticle = async (articleId) => {
  const articleContainer = document.getElementById("article-content");
  let article = await fetchArticleById(articleId);
  article = article[0];

  articleContainer.innerHTML = `
        <article>
            <header class="article-header">
                <span class="article-category">${capitalize(
                  article.category
                )}</span>
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta">
                    <time datetime="${article.date}">${article.date}</time>
                    <span class="article-views">${
                      article.views || 0
                    } wyświetleń</span>
                </div>
                <img src="${
                  article.image || "assets/Image-not-found.png"
                }" alt="${article.title}" class="article-image">
            </header>
            
            <div class="article-body">
                ${article.content}
                
                ${
                  article.sources
                    ? `
                <div class="article-sources">
                    <h3>Źródła</h3>
                    <ul>
                        ${article.sources
                          .map(
                            (source) =>
                              `<li><a href="${source.url}" target="_blank" rel="noopener">${source.title}</a></li>`
                          )
                          .join("")}
                    </ul>
                </div>
                `
                    : ""
                }
            </div>
            
            <footer class="article-footer">
                <div class="article-tags">
                    ${
                      article.tags
                        ? article.tags
                            .map((tag) => `<span class="tag">${tag}</span>`)
                            .join("")
                        : ""
                    }
                </div>
            </footer>
        </article>
    `;
};

const handleNewArticle = (articleId) => {
  document
    .getElementById("comment-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const date = new Date();
      const author = document.getElementById("comment-name").value;
      const content = document.getElementById("comment-text").value;
      if (author === "" || content === "") {
        return;
      }
      const createCommentPayload = {
        id: "2",
        articleId: articleId,
        author: author,
        content: content,
        date: date.toISOString().split("T")[0],
      };
      await addNewComment(createCommentPayload);
      form.reset();
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const articleId = new URLSearchParams(window.location.search).get("id");
  if (!articleId) {
    window.location.href = "index.html";
    return;
  }
  initalizeDarkMode();
  initalizeHamburgerMenu();
  handleNewArticle(articleId);
  loadArticle(articleId);
  loadComments(articleId);
});
