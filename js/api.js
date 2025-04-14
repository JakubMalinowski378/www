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
