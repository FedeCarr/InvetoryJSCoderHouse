const alert = (title, menssage, icon) => {
  Swal.fire({
    icon: icon || "",
    title: title || "",
    text: menssage,
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    width: "480px",
  });
};
const validationProd = () =>
  prodInp.value !== "..."
    ? "valid"
    : alert(
        "Insert product",
        "You must enter the name of the product",
        "error"
      );

const validationStock = () =>
  totalInp.value >= losesInp.value
    ? "valid"
    : alert("Inconsistency", "There can be no more losses than stock", "error");

const validationDate = () =>
  arrivInp.value !== ""
    ? "valid"
    : alert("Inconsistency", "Insert a date", "error");
