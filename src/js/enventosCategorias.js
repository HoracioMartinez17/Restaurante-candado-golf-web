import { renderMenuItems } from "../js/menu/cargarMenus";
import dataMenuFotos from "../datos/fotosMenu";
import { abrirMenu, cerrarMenu } from "./menu/cerrarAbrirMenu";
const btnBack = document.getElementById("btn-back");
const contenedorCategoriasMenu = document.getElementById("categorias");
const menusContainer = document.getElementById("menusContainer");
const radioButtonsContainer = document.getElementById("radio-buttons");


btnBack.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest("a")) {
    cerrarMenu();
  }
});



contenedorCategoriasMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest("a")) {
    abrirMenu();
    menusContainer.classList.add("active");
    const menuActive = e.target.closest("li").dataset.categoria;
    const fotosMenu = dataMenuFotos.fotos[menuActive];
    menuActive === "entradas"
      ? radioButtonsContainer.classList.remove("container-radio-buttons--active")
      : radioButtonsContainer.classList.add("container-radio-buttons--active");

      window.scrollTo(0, 0);
      renderMenuItems(fotosMenu);
  }
});

const radioButtons = document.querySelectorAll('input[name="category"]');

radioButtons.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      const selectedValue = radio.value;
      const fotosMenu = dataMenuFotos.fotos[selectedValue];
      renderMenuItems(fotosMenu);
    }
  });
});
