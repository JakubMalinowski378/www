const API_BASE = "http://localhost:3000";

export const fetchArticles = async () => {
  try {
    const response = await fetch(`${API_BASE}/articles`);
    if (!response.ok) throw new Error("Błąd sieci");
    return await response.json();
  } catch (error) {
    console.error("Błąd API:", error);
    throw error;
  }
};

export const fetchComments = async (articleId) => {
  try {
    const response = await fetch(`${API_BASE}/comments?articleId=${articleId}`);
    if (!response.ok) throw new Error("Błąd sieci");
    return await response.json();
  } catch (error) {
    console.error("Błąd API:", error);
    throw error;
  }
};

export const fetchArticleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/articles?id=${id}`);
    if (!response.ok) throw new Error("Artykuł nie znaleziony");
    return await response.json();
  } catch (error) {
    console.error("Błąd API:", error);
    throw error;
  }
};

export const addNewComment = async (comment) => {
  try {
    const response = await fetch(`${API_BASE}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) throw new Error("Błąd sieci");
    return await response.json();
  } catch (error) {
    console.error("Błąd API:", error);
    throw error;
  }
};
