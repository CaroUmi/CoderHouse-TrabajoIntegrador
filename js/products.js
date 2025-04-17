import { transformTimestampToDate } from "./utils/date.js";

const productsURL = `https://6623db803e17a3ac8470752a.mockapi.io/api/products`;
let products = [];
let isEditing;
const tableHTML = document.getElementById("table-body");
const inputSearchHTML = document.getElementById("product-search");
const sortAscHTML = document.getElementById("sortAsc");
const sortDescHTML = document.getElementById("sortDesc");
const productsFormHTML = document.getElementById("products-form");
const btnSubmitHTML = productsFormHTML.querySelector("button[type='submit']");
const titleFormHTML = document.getElementById("form-title");

let productBtnsEditHTML;

//PETICION DE PRODUCTOS A LA API
function productsAPI() {
  fetch(productsURL)
    .then((respuesta) => respuesta.json())
    .then((productsAPI) => {
      // console.log(productsAPI);

      products = productsAPI
      //pintar esos elementos en nuestro 
      renderProducts(products)
      console.log(products)
    })
    .catch((error) => {
      console.log("Error hola", error)
    })
}
productsAPI();

function renderProducts(products) {
  tableHTML.innerHTML = '';

  products.forEach((product) => {
    tableHTML.innerHTML += `<tr>
                              <td class="td-image">
                                  <img src="${product.image}" alt="" class="img-table">
                              </td>
                              <td class="td-product">${product.name}</td>
                              <td class="td-description">${product.description}</td>
                              <td>${transformTimestampToDate(product.createdAt)}</td>
                              <td class="td-price">$ ${product.price}</td>
                              <td class="td-action">
                                  <button data-edit="${product.id}" class="bt-edit"><i class="fa-regular fa-pen-to-square"></i></button>
                                  <button data-delete="${product.id}" class="bt-remove"><i class="fa-regular fa-trash-can"></i></button>
                              </td>
                            </tr>`
  });

  deleteProduct()
  updateEditbuttons()
}

//FILTRA PRODUCTOS POR LO INGRESADO EN EL INPUT
inputSearchHTML.addEventListener("keyup", (evt) => {
  const search = evt.target.value.toLowerCase()

  const filterProducts = products.filter((product) => {
    if (product.name.toLowerCase().includes(search)) {
      return true
    }
    return false
  })
  renderProducts(filterProducts)
})

//ORDENA LOS PRODUCTOS DE LA A - Z
sortAscHTML.addEventListener("click", () => {
  products.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    return 0
  })
  renderProducts(products)
})

//ORDENA LOS PRODUCTOS DE LA Z - A
sortDescHTML.addEventListener("click", () => {
  products.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return 1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return -1;
    }
    return 0
  })
  renderProducts(products)
})

//ELIMINAR PRODUCTO
function deleteProduct() {
  const productDeleteHTML = document.querySelectorAll('button[data-delete]')

  productDeleteHTML.forEach((boton) => {
    boton.addEventListener("click", (evt) => {
      const id = evt.currentTarget.dataset.delete;

      const productFind = products.find(product => product.id === id)

      Swal.fire({
        title: `Se eliminara el producto: <h3>${productFind.name}</h3>`,
        text: "Esta acción no se puede deshacer, desea continuar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${productsURL}/${id}`, {
            method: 'DELETE'
          })
            .then(response => response.json())
            .then(data => productsAPI());
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto eliminado",
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    })
  })
}

class ProcuctClass {
  constructor(name, img, category, description, createdAt, price) {
    this.name = name
    this.img = img
    this.category = category
    this.description = description
    this.createdAt = createdAt
    this.price = price
  }
}

//INGRESAR NUEVO PRODUCTO
productsFormHTML.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const el = evt.target.elements

  const name = el.name.value
  const img = el.img.value
  const category = el.category.value
  const description = el.description.value
  const createdAt = new Date(el.createdAt.value).getTime()
  const price = el.price.value

  const newProduct = new ProcuctClass(name, img, category, description, createdAt, price)

  if (isEditing) {
    console.log(newProduct)

    fetch(`${productsURL}/${isEditing}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then(response => response.json())
      .then(data => productsAPI())
      .catch(error => console.error("Error al actualizar:", error));

    isEditing = null;

    titleFormHTML.innerText = "Alta de Producto"
    btnSubmitHTML.classList.add('btn-primary')
    btnSubmitHTML.classList.remove('btn-edit')
    btnSubmitHTML.innerText = "Agregar"

  } else {
    fetch(productsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then(response => response.json())
      .then(data => productsAPI())
      .catch(error => console.log("se ha producido un error:", error))
    console.log(newProduct)
  }

  productsFormHTML.reset()
  el.name.focus()
})

//EDITAR PRODUCTO
function updateEditbuttons() {
  productBtnsEditHTML = document.querySelectorAll('[data-edit]');

  productBtnsEditHTML.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const id = evt.currentTarget.dataset.edit
      completeProductForm(id)
    })
  })
}

//FUNCION QUE COMPLETA EN FORMULARIO PARA EDITAR PRODUCTO
function completeProductForm(id) {

  isEditing = id;

  const product = products.find((product) => {
    if (product.id === id) {
      return true
    } else {
      return
    }
  })

  const el = productsFormHTML.elements;

  el.name.value = product.name;
  el.img.value = product.img;
  el.category.value = product.category;
  el.description.value = product.description;
  el.createdAt.valueAsNumber = product.createdAt;
  el.price.value = product.price;

  titleFormHTML.innerText = "Edición de Producto"
  btnSubmitHTML.classList.remove('btn-primary')
  btnSubmitHTML.classList.add('btn-edit')
  btnSubmitHTML.innerText = "Editar"
}