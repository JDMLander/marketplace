document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.querySelector(".products-grid");
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".btn-search");
  const subjectFilter = document.querySelector(".filter-select:nth-child(1)");
  const priceFilter = document.querySelector(".filter-select:nth-child(2)");
  const conditionFilter = document.querySelector(".filter-select:nth-child(3)");

  const products = [
    {
      title: "Introduction to E-commerce",
      author: "Daniel Prieto",
      edition: "5th Edition, 2023",
      price: 20.0,
      image: "../assets/images/intro-e-comm.webp",
      location: "New York, NY",
      condition: "Like New",
      subject: "Business",
    },
    {
      title: "Introduction to Computer Science",
      author: "Michael Nastro",
      edition: "3rd Edition, 2022",
      price: 35.0,
      image: "../assets/images/intro-to-cs.jpeg",
      location: "Boston, MA",
      condition: "Good",
      subject: "Computer Science",
    },
    {
      title: "Organic Chemistry",
      author: "Joaquin Villegas",
      edition: "8th Edition, 2024",
      price: 85.0,
      image: "../assets/images/org-chem.jpeg",
      location: "Los Angeles, CA",
      condition: "New",
      subject: "Science",
    },
  ];

  let filteredProducts = [...products];

  const getUrlParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("Search Parameters:", Array.from(searchParams.entries()));
    return {
      search: searchParams.get("search") || "",
      subject: searchParams.get("subject") || "",
      price: searchParams.get("price") || "",
      condition: searchParams.get("condition") || "",
    };
  };

  const startFiltersFromUrl = () => {
    const { search, subject, price, condition } = getUrlParams();

    searchInput.value = search;
    subjectFilter.value = subject;
    priceFilter.value = price;
    conditionFilter.value = condition;
  }

  const setNewUrl = () => {
    const searchParams = new URLSearchParams();

    const searchValue = searchInput.value;
    const subjectValue = subjectFilter.value;
    const priceValue = priceFilter.value;
    const conditionValue = conditionFilter.value;

    if (searchValue) searchParams.set("search", searchValue);
    if (subjectValue) searchParams.set("subject", subjectValue);
    if (priceValue) searchParams.set("price", priceValue);
    if (conditionValue) searchParams.set("condition", conditionValue);

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  }

  const renderProducts = (products) => {
    productsGrid.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.title}" />
            <span class="condition">${product.condition}</span>
          </div>
          <div class="product-info">
            <h3>${product.title}</h3>
            <p class="author">${product.author}</p>
            <p class="edition">${product.edition}</p>
            <div class="product-meta">
              <p class="price">${product.price}$</p>
              <p class="location">${product.location}</p>
            </div>
            <button class="btn btn-contact">Contact Seller</button>
          </div>
      `;

      productsGrid.appendChild(productCard);
    });
  };

  const filterProducts = () => {
    const searchValue = searchInput.value.toLowerCase();
    const subjectValue = subjectFilter.value.toLowerCase();
    const priceValue = priceFilter.value;
    const conditionValue = conditionFilter.value.toLowerCase();

    filteredProducts = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchValue) ||
        product.author.toLowerCase().includes(searchValue);

      const matchesSubject =
        subjectValue === "" || product.subject.toLowerCase() === subjectValue;

      const matchesPrice =
        priceValue === "" || checkPrice(product.price, priceValue);

      const matchesCondition =
        conditionValue === "" ||
        product.condition.toLowerCase() === conditionValue;

      return (
        matchesSearch && matchesSubject && matchesPrice && matchesCondition
      );
    });

    renderProducts(filteredProducts);
    setNewUrl();
  };

  const checkPrice = (price, range) => {
    switch (range) {
      case "0-25":
        return price >= 0 && price <= 25;
      case "25-50":
        return price > 25 && price <= 50;
      case "50-100":
        return price > 50 && price <= 100;
      case "100+":
        return price > 100;
      default:
        return true;
    }
  };

  searchButton.addEventListener("click", filterProducts);
  searchInput.addEventListener("input", filterProducts);
  subjectFilter.addEventListener("change", filterProducts);
  priceFilter.addEventListener("change", filterProducts);
  conditionFilter.addEventListener("change", filterProducts);

  startFiltersFromUrl();
  filterProducts();
  renderProducts(filteredProducts);
});
