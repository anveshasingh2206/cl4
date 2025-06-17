let allProducts = [];

window.onload = () => {
    fetchProducts();
};

function fetchProducts() {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
        });
}

function displayProducts(products) {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = ""; // Clear previous products

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${products.thumbnail}" alt="${products.title}" />
            <h3>${products.title}</h3>
            <p><strong>Brand:</strong> ${products.brand}</p>
            <p><strong>Price:</strong> $${products.price}</p>
            <p><strong>Rating:</strong> ${products.rating}</p>`;
        productContainer.appendChild(card);

    });
}

function searchProducts() {
    const sortBy = document.getElementById("sort").value;
    let sortedProducts = [...allProducts];

    if(sortBy === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    else if(sortBy === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    else if(sortBy === "ratingDesc") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    displayProducts(sortedProducts);
}

function applyFilter() {
    const minPrice = parseFloat(document.getElementById("minPrice").value);
    const maxPrice = parseFloat(document.getElementById("maxPrice").value);

    let filtered = allProducts.filter(p => {
        return(
            (!isNaN(minPrice) ? p.price >= minPrice : true) &&
            (!isNaN(maxPrice) ? p.price <= maxPrice : true)
        );
    });
    
    displayProducts(filtered);
}