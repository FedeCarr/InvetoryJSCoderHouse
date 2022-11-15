const url = "../dataBase/products.json";
//QUERY SELECTORS
const arrivInp = document.querySelector("#arriv-input");
const btnForm = document.querySelector("#btn-form");
const expInp = document.querySelector("#exp-input");
const invform = document.querySelector("#inv-form");
const invList = document.querySelector("#invetory-list");
const losesInp = document.querySelector("#loses-input");
const prodInp = document.querySelector("#product-input");
const totalInp = document.querySelector("#total-input");
const skuInp = document.querySelector("#sku-input");
const stockInp = document.querySelector("#stock-input");
const dateToday = document.querySelector("#dateNow");

let date = new Date();
let output =
  String(date.getDate()).padStart(2, "0") +
  "/" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "/" +
  date.getFullYear();
console.log(output);
const saludo = (output) => {
  dateToday.innerHTML += output;
};
saludo(output);
//-----*****-----******-------*****-------
//LISTA DE PRODUCTOS
const productList = JSON.parse(localStorage.getItem("invStorage")) || []; //Con JSON.parse lo transformo a un arreglo
function addProduct() {
  let prod = prodInp.value;
  let total = totalInp.value;
  let loses = losesInp.value;
  let arrDate = arrivInp.value;
  const price = (datosProd) => {
    const result = datosProd.find((e) => e.item === prodInp.value);
    return result.price;
  };
  productList.push(new itemInv(prod, total, loses, arrDate, price(datosProd)));
  listadoProductos.forEach((el, i) => {
    if (el.item === prodInp.value) {
      listadoProductos.splice(i, 1);
    }
  });
  console.table(listadoProductos);
}
//LIMPIAR FORMULARIO
function cleanForm() {
  prodInp.value = "...";
  totalInp.value = 0;
  losesInp.value = 0;
  arrivInp.value = "";
}
//ARRAY DE OBJETOS

let datosProd = [];
let listadoProductos = [];
//LISTAR PRODUCTOS
const cargarProd = (array, select) => {
  prodInp.innerHTML = "";
  array.forEach(
    (elemento) =>
      (select.innerHTML += `<option value="${elemento.item}">${elemento.item}</option>`)
  );
};
//ACCESO A LA BASE DE DATOS: ASYNC - AWAIT
const getDatosProd = async () => {
  try {
    const response = await fetch(url);
    datosProd = await response.json();
    console.table(datosProd);
  } catch (error) {
    console.log("error");
  } finally {
    listadoProductos = [...datosProd];
    cargarProd(listadoProductos, prodInp);
  }
};
getDatosProd();

//upInvArr: Función que actualiza los array en el localStorage
const upInvArr = (productList) => {
  if (productList.length > 0) {
    localStorage.setItem("invStorage", JSON.stringify(productList)); //Con JSON.stringify transformo el array a String
  }
};

//RENDER: Se renderiza para sincronizar los indices del arrInv
const render = () => {
  const invListTemplate = productList.map((t) => {
    return `
    <ul class="inventory__row">
      <li class="inventory__value">${t.arrDate}</li>
      <li class="inventory__value">${t.prod}</li>
      <li class="inventory__value">${t.stock}</li>
      <li class="inventory__value">${t.price * t.stock} €</li>
    </ul>
    `;
  });
  invList.innerHTML = invListTemplate.join("");
  const invSelector = document.querySelectorAll(".inventory ul");
  invSelector.forEach((el, i) => {
    el.addEventListener("click", () => {
      el.parentNode.removeChild(el);
      const result = datosProd.find((e) => e.item === productList[i].prod);
      productList.splice(i, 1);
      listadoProductos.push({
        item: result.item,
        price: result.price,
      });
      upInvArr(productList);
      cargarProd(listadoProductos, prodInp);
      render();
    });
  });
};

//CAPTURAR FORMULARIO
invform.onsubmit = (e) => {
  e.preventDefault();
  if (
    validationProd() === "valid" &&
    validationStock() === "valid" &&
    validationDate() === "valid"
  ) {
    addProduct();
    cleanForm();
    upInvArr(productList);
    render();
  } else {
    validationDate();
    validationProd();
    validationStock();
  }
  cargarProd(listadoProductos, prodInp);
};

//Llamo a Render para que se inicialice el LocalStorage
render();
