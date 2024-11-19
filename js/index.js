document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".btn-search");
  const categoryButtons = document.querySelectorAll(".category-card");

  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);

    return {
      search: params.get("search") || "",
      category: params.get("category") || "",
    };
  };

  const urlParams = getUrlParams();
  if (urlParams.search) {
    searchInput.value = urlParams.search;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchInput.value.trim();

    if (search) {
      const searchParams = new URLSearchParams();

      searchParams.set("search", search);
      window.location.href = `products.html?${searchParams.toString()}`;
    } else {
      window.location.href = "products.html";
    }
  };

  searchButton.addEventListener("click", handleSearch);

  // Add event listeners to category buttons and redirect to products.html with the category parameter
});
