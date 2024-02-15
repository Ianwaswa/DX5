document.addEventListener('DOMContentLoaded', function () {
  const productsContainer = document.getElementById('products-container');
  const categoryFilter = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort');
  const cartItems = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  const confirmationModal = document.getElementById('confirmation-modal');
  const confirmationMessage = document.getElementById('confirmation-message');
  const closeBtn = document.querySelector('.close');

  let products = [];
  let filteredProducts = [];
  let cart = [];

  // Fetch products from fake store API
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      products = data;
      filteredProducts = data;
      displayProducts(filteredProducts);
    })
    .catch(error => console.error('Error fetching products:', error));

  // Display products
  function displayProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(product => {
      const productCard = createProductCard(product);
      productsContainer.appendChild(productCard);
    });
  }

  // Create product card
  function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>${product.price}</p>
      <p>${product.description}</p>
      <p>${product.category}</p>
    `;
    productCard.addEventListener('click', () => addToCart(product));
    return productCard;
  }

  // Filter products
  categoryFilter.addEventListener('change', () => {
    const category = categoryFilter.value;
    if (category === 'all') {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(product => product.category === category);
    }
    displayProducts(filteredProducts);
  });

  // Sort products
  sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    if (sortBy === 'price-low-to-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-to-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      filteredProducts = products;
    }
    displayProducts(filteredProducts);
  });

  // Add product to cart
  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  // Render cart items
  function renderCart() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.title} - $${item.price}`;
      cartItems.appendChild(li);
    });
  }

  // Checkout
  checkoutBtn.addEventListener('click', () => {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    confirmationMessage.textContent = `Total price: $${totalPrice}. Thank you for your purchase!`;
    confirmationModal.style.display = 'block';
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === confirmationModal) {
      confirmationModal.style.display = 'none';
    }
  });
});
