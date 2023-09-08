class Product {
  constructor(title, imgUrl, price, description) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
    <div>
          <img src="${this.product.imgUrl}" alt="${this.product.title}">
          <div class="product-item__content"> 
              <h2>${this.product.title}</h2>
              <h3>Rp. ${this.product.price},00</h3>
              <p>${this.product.description}</p>
              <button class='add-to-cart'>Tambah ke keranjang</button>
          </div>
    </div>
    ,
    `;
    const addToCartButton = prodEl.querySelector("button");
    addToCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOuput.innerHTML = ` <h2>Total : Rp.${this.totalAmount}</h2>`;
  }
  get totalAmount() {
    const sum = this.items.reduce((prev, curr) => {
      return prev + parseInt(curr.price);
    }, 0);
    return sum;
  }

  addProduct(product) {
    const updateItems = [...this.items];
    updateItems.push(product);
    this.cartItems = updateItems;
    // this.totalOuput.innerHTML = ` <h2>Total : Rp.${1}</h2>`;
  }

  render() {
    const cartElement = document.createElement("section");
    cartElement.className = "cart";
    cartElement.innerHTML = `
    <h2>Total : Rp.${0}</h2>
    <button>Pesan Sekarang</button>
    `;
    this.totalOuput = cartElement.querySelector("h2");
    return cartElement;
  }
}

class ProductList {
  products = [
    new Product(
      "bantal",
      "https://contents.mediadecathlon.com/p1749048/k$f0b275c3207e208e12771a5c385d3ff8/camping-pillow-comfort.jpg?format=auto&quality=70&f=768x768",
      "10000",
      "Bantal ini lembut"
    ),
    new Product(
      "karpet",
      "https://cdn2.tstatic.net/travel/foto/bank/images/ilustrasi-karpet-terbang-aladdin.jpg",
      "80000",
      "Karpet terbang"
    ),
  ];
  constructor() {}
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";

    for (const prod of this.products) {
      const item = new ProductItem(prod);
      const prodEl = item.render();
      prodList.append(prodEl);
    }

    return prodList;
  }
}

class FSW2 {
  render() {
    const renderHook = document.getElementById("app");
    this.cart = new ShoppingCart();
    const cartElement = this.cart.render();

    const productList = new ProductList();
    const productListElement = productList.render();

    renderHook.append(cartElement);
    renderHook.append(productListElement);
  }
}

class App {
  static init() {
    const shop = new FSW2();
    shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

// const fsw2 = new FSW2();
// fsw2.render();
