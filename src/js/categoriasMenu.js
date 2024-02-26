import dataCategoria from "../datos/dataMenu";
const { categorias } = dataCategoria;

const contenedorCategoria = document.getElementById("categorias");

categorias.forEach((categoria) => {
  const nuevaCategoria = document.createElement("li");

  const plantilla = `
    <div class="service-card">
      <a href="#" class="has-before hover:shine">
        <figure class="card-banner img-holder" style="--width: ; --height: ">
          <img
            src="${categoria.imagenPortada}"
            alt="${categoria.nombre}"
            width="285"
            height="336"
            class="img-cover"
          />
        </figure>
      </a>
      <div class="card-content">
        <h3 class="title-4 card-title">
          <a href="#">${categoria.nombre}</a>
        </h3>
        <a href="#" class="btn-text btn-carta hover-underline label-2"> <p>Ver carta</p> <svg xmlns="http://www.w3.org/2000/svg" width="328" height="328" viewBox="0 0 24 24"><path fill="#999999" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg></a>
      </div>
    </div>
    `;
  nuevaCategoria.innerHTML = plantilla;
  nuevaCategoria.dataset.categoria = categoria.id;

  contenedorCategoria.append(nuevaCategoria);
});
