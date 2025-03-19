const products = [
  {
    id: '1',
    name: "Mesa Brooklyn",
    img: "/assets/images/products/mesa-brooklyn.jpg",
    category: "Muebles",
    description: "Mesa de arrime redonda, disponible en una variedad de colores vibrantes, añade encanto y versatilidad a cualquier espacio. Su diseño elegante y compacto permite destacar la decoración, creando ambientes acogedores y modernos.",
    createdAt: 1704423600000,
    price: 150.00
  },
  {
    id: '2',
    name: "Silla Chicago",
    img: "/assets/images/products/silla-chicago.jpg",
    category: "Muebles",
    description: "Silla de madera combina elegancia y simplicidad, disponible en diversos colores. Perfecta para mesas de comedor, su diseño atemporal y confort aseguran un ambiente acogedor y estilizado en tu hogar.",
    createdAt: 1718679600000,
    price: 37.790
  },
  {
    id: '3',
    name: "Mesa de luz Rustic",
    img: "/assets/images/products/mesa-de-luz-rustic.jpg",
    category: "Muebles",
    description: "Mesa de luz, elaborada con exquisita madera de paraíso, fusiona la calidad artesanal con la elegancia natural. Con líneas refinadas y funcionalidad, aporta calidez y estilo a cualquier dormitorio.",
    createdAt: 1675566000000,
    price: 149.990
  },
  {
    id: '4',
    name: "Mesa Akira",
    img: "/assets/images/products/mesa-akira.jpg",
    category: "Muebles",
    description: "Mesa de arrime redonda, disponible en una variedad de colores vibrantes, añade encanto y versatilidad a cualquier espacio. Su diseño elegante y compacto permite destacar la decoración, creando ambientes acogedores y modernos.",
    createdAt: 1677207600000,
    price: 86.400
  },
  {
    id: '5',
    name: "Mesa ratona Mick",
    img: "/assets/images/products/mesa-ratona-mick.jpg",
    category: "Muebles",
    description: "Mesa ratona de madera, disponible en una paleta de colores vibrantes, aporta un toque moderno y funcional a tu sala de estar. Su diseño versátil complementa el ambiente, creando un espacio acogedor y contemporáneo.",
    createdAt: 1696388400000,
    price: 125.990
  },
  {
    id: '6',
    name: "Canasto Gambia",
    img: "/assets/images/products/canasto-gambia.jpg",
    category: "Muebles",
    description: "Canasto contenedor bicolor, hecho con caña silvestre y cinta plástica, combina estilo y funcionalidad. Ideal para organizar diversos objetos, añade un toque natural y moderno a tu espacio, mezclando materiales de forma armoniosa.",
    createdAt: 1677812400000,
    price: 28.000
  },
  {
    id: '7',
    name: "Vela Goudy",
    img: "/assets/images/products/vela-goudy.jpg",
    category: "Decoración",
    description: "Vela en elegante envase de vidrio negro mate, coronado con tapa dorada, es un lujo para los sentidos. Disfruta de una atmósfera sofisticada con su fragancia envolvente y diseño cautivador.",
    createdAt: 1677812400000,
    price: 16.900
  },
  {
    id: '8',
    name: "Velador Baltimmore",
    img: "/assets/images/products/velador-baltimore.jpg",
    category: "Muebles",
    description: "Lámpara de mesa de media esfera, con un diseño elegante disponible en varios colores, añade un toque de modernidad y estilo a cualquier espacio. Ilumina con distinción y personaliza tu ambiente.",
    createdAt: 1677812400000,
    price: 16.900
  },
];

// VARIABLE PARA GUARDAR PRODUCTOS DEL CARRITO
let cart = [];

const cardHTML = document.getElementById("card-container");
const cartHTML = document.getElementById("cart");
const openCartHTML = document.getElementById('btn-cart');
const productCartHTML = document.getElementById("body-cart");
const quantityItemsHTML = document.getElementById("quantity-items");
let removeProductHTML;
const totalCartHTML = document.getElementById("total-cart");
let minusQuantityCartHTML;
let plusQuantityCartHTML;

// CODIGO PARA MOSTRAR CADA UNA DE LAS CARDS
function renderProducts(products) {
  products.forEach((product) => {

    //formatea fecha
    const fecha = new Date (product.createdAt);
    const formatDate = fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    cardHTML.innerHTML +=
      `<article id="card-container" class="card">
          <div class="card-main">
            <a href="/pages/single-product.html" target="_blank">
              <img class="card-img" src=${product.img} target="_blank" alt=${product.name}>
            </a>
            <div class="card-action">
              <a href="#" class="icon-product"><i class="fa-regular fa-heart"></i></a>
              <a href="/pages/single-product.html" target="_blank" class=" icon-product ico-central"><i
                  class="fa-solid fa-magnifying-glass"></i></a>
              <a data-id="${product.id}" class="icon-product icon-product"><i
                  class="fa-solid fa-cart-plus"></i></a>
            </div>
          </div>
          <div class="card-info">
            <div class="product-info">
              <a href="pages/single-product.html" target="_blank">
                <p class="name-product">${product.name}</p>
              </a>
              <div class="start">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
              </div>
            </div>
            <div class="product-info">
              <p class="price-product">$ ${(product.price).toFixed(2)}</p>
              <div class="data">
                <a href="#">
                  <p class="category-product">${product.category}</p>
                </a>
                <p class="fecha">${formatDate}</p>
              </div>
            </div>
          </div>
        </article>`
  })
}

renderProducts(products)
loadLocalStorage();

//FUNCION QUE VERIFICA HAY PRODUCTOS EN EL CARRITO EN EL LOCALSTOREGE
function loadLocalStorage() {
  const loadCart = localStorage.getItem('cart');

  if (loadCart) {
    cart = JSON.parse(loadCart);
    renderCart(cart);
  }
}

let stateCart = 0;
// MOSTRAR O OCULTAR CARRITO
  openCartHTML.addEventListener('click', () => {
    if(stateCart === 0) {
      stateCart = 1;
      cartHTML.classList.add('open-cart');
      cartHTML.classList.remove('close-cart')
    } else {
      cartHTML.classList.remove('open-cart');
      cartHTML.classList.add('close-cart')
      stateCart = 0;
    }
  })

// FUNCION QUE ESCUCHA BOTONES Y AGREGA PRODUCTO AL ARRAY CART
function addCartProduct() {
  const addCartHTML = document.querySelectorAll('a[data-id]');

  addCartHTML.forEach((add) => {
    add.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.id;

      const product = products.find(product => product.id === id);
      const indexCart = cart.findIndex(productCart => productCart.id === id);

      if (indexCart === -1) {
        product.quantity = 1;
        product.total = product.price;
        cart.push(product)
      } else {
        cart[indexCart].quantity += 1;
        cart[indexCart].total = cart[indexCart].price * cart[indexCart].quantity;
      }
      renderCart(cart)
      saveCartLocalStorage()
    })
  })
}

addCartProduct();

//FUNCION QUE ACTUALIZA LOS PRODUCTOS DEL CARRITO
function renderCart(productCart) {
  let totalCart = 0;
  productCartHTML.innerHTML = "";
  quantityItemsHTML.innerText = cart.length;

  productCart.forEach((prod) => {
    totalCart += prod.total;
    productCartHTML.innerHTML +=
      `<div class="product-cart">
              <img class="img-cart" src="${prod.img}" alt="${prod.name}">
              <p>${prod.name}</p>
              <div class="quantity">
                <button data-minus="${prod.id}"><i class="fa-solid fa-minus"></i></button>
                <p>${prod.quantity}</p>
                <button data-plus="${prod.id}"><i class="fa-solid fa-plus"></i></button>
              </div>
              <p>${(prod.price).toFixed(2)}</p>
              <p>${(prod.total).toFixed(2)}</p>
              <button data-remove="${prod.id}" class="remove-product"><i class="fa-solid fa-trash"></i></button>
      </div>`
  })
  totalCartHTML.innerHTML = `<h6>Total = ${(totalCart).toFixed(2)}</h6>`
  deleteProductCart();
  minusQuantityCart();
  plusQuantityCart();
  saveCartLocalStorage();
}

//FUNCION QUE ELIMINA UN PRODUCTO DEL CARRITO
function deleteProductCart() {
  removeProductHTML = document.querySelectorAll('[data-remove]');
  removeProductHTML.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const id = evt.currentTarget.dataset.remove;

      const index = cart.findIndex((prod) => {
        if (prod.id === id) {
          return true
        }
      })
      cart.splice(index, 1);
      renderCart(cart)
    })
  })
}

//FUNCION QUE DISMINUYE LA CANTIDAD DE PRODUCTOS DEL CARRITO
function minusQuantityCart() {
  minusQuantityCartHTML = document.querySelectorAll('[data-minus]');
  minusQuantityCartHTML.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const id = evt.currentTarget.dataset.minus;
      const product = cart.find(product => product.id === id);
      const indexCart = cart.findIndex(productCart => productCart.id === id);

      if (product.quantity > 1) {
        product.quantity -= 1;
        product.total = product.quantity * product.price
      } else if (product.quantity <= 1) {
        cart.splice(indexCart, 1);
      }
      renderCart(cart)
    })
  })
}

//FUNCION QUE AUMENTA LA CANTIDAD DE PRODUCTOS DEL CARRTO
function plusQuantityCart() {
  plusQuantityCartHTML = document.querySelectorAll('[data-plus]');

  plusQuantityCartHTML.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const id = evt.currentTarget.dataset.plus;
      const product = cart.find(product => product.id === id);

      product.quantity += 1;
      product.total = product.quantity * product.price;

      renderCart(cart)
    })
  })
}

//FUNCION QUE GUARDA CARRITO EN LOCALSTORAGE
function saveCartLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//FUNALIZAR COMPRA
const checkoutHTML = document.getElementById("checkout");
checkoutHTML.addEventListener("click", function () {
  cart = [];
  localStorage.removeItem('cart');
  renderCart(cart)
  totalCartHTML.innerHTML = `<h3>Gracias por su compra</h3>`;
});
