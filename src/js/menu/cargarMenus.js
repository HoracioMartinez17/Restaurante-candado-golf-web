import data from "../../datos/fotosMenu";
const contenedorMenuUl = document.getElementById("menu-ul");
// Función para formatear un número como euros
const formatToEuro = (amount) => {
    const formatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    });
  
    return formatter.format(amount);
  };

const createMenuItem = (menuFoto) => {
    const precioFormateado = formatToEuro(menuFoto.precio);
    const menuContanerLi = document.createElement("li");
    const plantilla= `
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
    `;

    menuContanerLi.innerHTML = plantilla;
    return menuContanerLi;
};

const renderMenuItems = (fotosMenu) => {
    contenedorMenuUl.innerHTML = "";
    fotosMenu.forEach((menuFoto) => {
        const menuItem = createMenuItem(menuFoto);
        contenedorMenuUl.append(menuItem);
    });
};

export { createMenuItem, renderMenuItems };
