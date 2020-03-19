export const getArticles = updateState => {
    const url = "/api/internal/articles"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => updateState(response.data))
      .catch(() => console.log("Didn't work"));
}
