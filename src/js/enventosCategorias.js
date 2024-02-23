import dataMenu from "../datos/dataMenu";
import dataMenuFotos from "../datos/fotosMenu";
import { abrirMenu, cerrarMenu } from "./menu/cerrarAbrirMenu";
const btnBack = document.getElementById("btn-back");
const contenedorCategoriasMenu = document.getElementById("categorias");
const contenedorMenuUl = document.getElementById("menu-ul");
const menusContainer = document.getElementById("menusContainer");

// Función para formatear un número como euros
const formatToEuro = (amount) => {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  return formatter.format(amount);
};

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
    fotosMenu.forEach((menuFoto) => {
      const menuContanerLi = document.createElement("li");
      const precioFormateado = formatToEuro(menuFoto.precio);
      const plantillaMenu = `
    <li id="${menuFoto.id}">
    <div class="menu-card hover:card">
      <figure
        class="card-banner img-holder"
        style="--widht: 100; --height: 100"
      >
        <img
          src="${menuFoto.imagen}"
          alt="${menuFoto.nombre}"
          class="img-cover"
          widht="100"
          height="100"
          loading="lazy"
        />
      </figure>
      <div>
        <div class="title-wrapper">
          <h3 class="title-3">
            <a href="#" class="card-title">${menuFoto.nombre}</a>
          </h3>
          <span class="span title-2">${precioFormateado}</span>
        </div>
        <p class="card-text label-1">
          ${menuFoto.ingredientes}
        </p>
      </div>
    </div>
  </li>
    `;
      menuContanerLi.innerHTML = plantillaMenu;

      contenedorMenuUl.append(menuContanerLi);
    });
  }
});
