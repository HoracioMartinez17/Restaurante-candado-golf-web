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
        <a href="#" class="btn-text hover-underline label-2"> Ver carta </a>
      </div>
    </div>
    `;
  nuevaCategoria.innerHTML = plantilla;
  nuevaCategoria.dataset.categoria = categoria.id;

  contenedorCategoria.append(nuevaCategoria);
});
