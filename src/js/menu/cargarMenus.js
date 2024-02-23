import data from "../../datos/fotosMenu";
const contenedorMenuUl = document.getElementById("menu-ul");

const cargarMenus = (id, nombre, imagen, precio, ingredientes) => {
  contenedorMenuUl.querySelector(".img-cover").src = imagen;
  contenedorMenuUl.querySelector(".card-title").innerText = nombre;
  contenedorMenuUl.querySelector(".title-2").innerText = precio;
  contenedorMenuUl.querySelector(".card-title").innerText = ingredientes;
  contenedorMenuUl.querySelector(".card-text").dataset.idImagen = id;
}
export default cargarMenus;
