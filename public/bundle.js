'use strict';

/* Preload */
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  // Cuando la página está completamente cargada
  preloader.classList.add("loaded"); // Marcar el preloader como cargado
  document.body.classList.add("loaded"); // Marcar el cuerpo del documento como cargado
});

/* Añadir evento listener en múltiples elementos */
 const addEventOnElements = (elements, eventType, callback) => {
  // Recorre todos los elementos proporcionados en el parallaxItems 'elements'
  for (let i = 0, len = elements.length; i < len; i++) {
    // Agrega un event listener del tipo 'eventType' a cada elemento con la función 'callback'
    elements[i].addEventListener(eventType, callback);
  }
};

/* Navbar */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

document.addEventListener('DOMContentLoaded', function() {
    var navbarLinks = document.querySelectorAll('.navbar-link');

    navbarLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // Elimina la clase 'active' de todos los enlaces
        navbarLinks.forEach(function(link) {
          link.classList.remove('active');
        });

        // Agrega la clase 'active' al enlace clicado
        link.classList.add('active');

        // Cierra el sidebar al hacer clic en un enlace
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-active');
      });
    });
  });

  
const toggleNavbar = () => {
  // Alternar clases para mostrar/ocultar la barra de navegación
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/* Header & back-top-btn */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = () => {
  // Ocultar o mostrar el encabezado al hacer scroll hacia abajo o arriba
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", () => {
  // Mostrar el encabezado como activo después de hacer scroll
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/* Hero Slider */
document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPosition = () => {
  // Actualizar la posición del slider y marcar el slider activo
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = () => {
  // Mover al siguiente slide
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPosition();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = () => {
  // Mover al slide anterior
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPosition();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

/* Auto Slide */
let autoSlideInterval;

const autoSlide = () => {
  // Iniciar el auto slide con un intervalo de tiempo
  autoSlideInterval = setInterval(() => {
    slideNext();
  }, 8000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => {
  // Detener el auto slide al pasar el ratón sobre los botones del slider
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide); // Iniciar auto slide cuando la página está completamente cargada

// parallax effect

// Seleccionar todos los elementos con el atributo 'data-parallax-item'
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

// Escuchar el evento 'mousemove' en la ventana
window.addEventListener("mousemove", (e) => {
  // Calcular la posición relativa del mouse en el eje X e Y
  x = (e.clientX / window.innerWidth) * 10 - 5;
  y = (e.clientY / window.innerHeight) * 10 - 5;

  // Invertir los valores para obtener un efecto de parallax opuesto al movimiento del mouse
  x = x - x * 2;
  y = y - y * 2;

  // Iterar sobre cada elemento con efecto de parallax
  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    // Aplicar el efecto de parallax multiplicando la posición del mouse por la velocidad del parallax del elemento
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);

    // Aplicar la transformación en 3D para el efecto de parallax
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});

var dataCategoria = {
  categorias: [
    {
      id: "postres",
      nombre: "Postres",
      imagenPortada: "./src/images/postres/postre-3.webp",
    },
    {
      id: "entradas",
      nombre: "Arroces, Pescados, Carnes y mas...",
      imagenPortada: "./src/images/entradas/portada-entradas.avif",
    },
    {
      id: "bebidas",
      nombre: "Bebidas",
      imagenPortada: "./src/images/bebidas/portada-bebidas.avif",
    },
  ],
};

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

var dataMenuFotos = {
  fotos: {
    entradas: [
      {
        id: 1,
        nombre: "Ensaladilla Rusa",
        imagen: "./src/images/entradas/entradas-1.webp",
        precio: 25.5,
        ingredientes: "Con Mahonesa de Oliva Virgen Extra y Bonito.",
      },
      {
        id: 2,
        nombre: "Salpicón de Aguacate",
        imagen: "./src/images/entradas/entradas-2.webp",
        precio: 15.5,
        ingredientes: "Con Langostinos y Mahonesa de Mostaza.",
      },
      {
        id: 3,
        nombre: "Croquetas",
        imagen: "./src/images/entradas/entradas-3.webp",
        precio: 20.5,
        ingredientes: "Al natural con Tomate Dulce y Miel de Caña.",
      },
      {
        id: 4,
        nombre: "Gambas Pil-pil",
        imagen: "./src/images/entradas/entradas-4.webp",
        precio: 12.5,
        ingredientes: "Al Pil-pil y Papada Ibérica de Bellota.",
      },
      {
        id: 5,
        nombre: "Steak tartar",
        imagen: "./src/images/entradas/entradas-5.webp",
        precio: 10.5,
        ingredientes: "Al Pil-pil y Papada Ibérica de Bellota.",
      },
      {
        id: 6,
        nombre: "Huevos rotos con Foie",
        imagen: "./src/images/entradas/entradas-6.webp",
        precio: 15.5,
        ingredientes: "Al Pil-pil y Papada Ibérica de Bellota.",
      },
    ],
    pescadosCarnes: [
      {
        id: 7,
        nombre: "Lomo de Vaca",
        imagen: "./src/images/entradas/carne-1.webp",
        precio: 12.00,
        ingredientes: "Madurado con Patatas Fritas y miel de caña.",
      },
      {
        id: 8,
        nombre: "Bacalao Desalado",
        imagen: "./src/images/entradas/carne-2.webp",
        precio: 16.5,
        ingredientes: "Con Pisto y Tomate Casero.",
      },
      {
        id: 9,
        nombre: "Vieiras a la Sartén",
        imagen: "./src/images/entradas/carne-3.webp",
        precio: 22.5,
        ingredientes: "Con Guiso de Centollo y Puré de Chirivía.",
      },
      {
        id: 10,
        nombre: "Lomo de Vaca Madurado",
        imagen: "./src/images/entradas/carne-4.webp",
        precio: 25.5,
        ingredientes: "Con Patatas Fritas y verduras.",
      },
      {
        id: 11,
        nombre: "Canelones de Pollo",
        imagen: "./src/images/entradas/carne-5.webp",
        precio: 17.5,
        ingredientes: "De Corral con Boletus y salsa Gorgonzola.",
      },
    ],
    arrocesFideuas: [
      {
        id: 12,
        nombre: "Arroz en Paella Negro",
        imagen: "./src/images/entradas/paella-1.webp",
        precio: 20.5,
        ingredientes: "Con Calamar y su Tinta.",
      },
      {
        id: 13,
        nombre: "Arroz en Paella con Pollo",
        imagen: "./src/images/entradas/paella-2.webp",
        precio: 19.5,
        ingredientes: "De Campo, Judías y Alcachofas.",
      },
      {
        id: 14,
        nombre: "Arroz en Paella con Jamón Ibérico ",
        imagen: "./src/images/entradas/paella-3.webp",
        precio: 23.5,
        ingredientes: "De Bellota y Gambas de Málaga.",
      },
      {
        id: 15,
        nombre: "Fideuá Clásica",
        imagen: "./src/images/entradas/paella-4.webp",
        precio: 18.5,
        ingredientes: "Estilo Gandía con Pescados y Mariscos.",
      },
      {
        id: 16,
        nombre: "Arroz en Paella con Presa Ibérica",
        imagen: "./src/images/entradas/paella-5.webp",
        precio: 10.5,
        ingredientes: "Cabezal Ibérico de Bellota y Alcachofas.",
      },
    ],
    postres: [
      {
        id: 17,
        nombre: "Tarta de Lima",
        imagen: "./src/images/postres/postre-1.webp",
        precio: 25.5,
        ingredientes:
          "Deliciosa tarta con un toque refrescante de lima, perfecta para los amantes de los cítricos.",
      },
      {
        id: 18,
        nombre: "Tarta de Queso",
        imagen: "./src/images/postres/postre-2.webp",
        precio: 5.5,
        ingredientes:
          "Una clásica tarta de queso con una suave y cremosa textura que te hará querer repetir.",
      },
      {
        id: 19,
        nombre: "Tarta de Chocolate",
        imagen: "./src/images/postres/postre-5.webp",
        precio: 11.5,
        ingredientes:
          "Irresistible tarta de chocolate con capas intensas de sabor y un indulgente glaseado.",
      },
      {
        id: 20,
        nombre: "Brownie de Chocolate",
        imagen: "./src/images/postres/postre-3.webp",
        precio: 15.5,
        ingredientes:
          "Un clásico brownie de chocolate con nueces, esponjoso por dentro y con una crujiente capa superior.",
      },
      {
        id: 21,
        nombre: "Milhojas",
        imagen: "./src/images/postres/postre-4.webp",
        precio: 12.5,
        ingredientes:
          "Delicadas capas de hojaldre intercaladas con crema, una exquisita opción para los amantes de las texturas crujientes.",
      },
    ],
    bebidas: [
      {
          id: 22,
          nombre: "Dominio del Águila",
          imagen: "./src/images/bebidas/bebidas-1.webp",
          precio: 8.99,
          ingredientes: "Cóctel refrescante con tequila, triple sec, jugo de lima y sal en el borde del vaso. Perfecto para los amantes de los sabores cítricos y vibrantes.",
      },
      {
          id: 23,
          nombre: "Manzanilla Micaela",
          imagen: "./src/images/bebidas/bebidas-2.webp",
          precio: 7.5,
          ingredientes: "Elegante combinación de ron, azúcar, menta, lima y soda. Una opción ligera y sofisticada para disfrutar en cualquier ocasión.",
      },
      {
          id: 24,
          nombre: "Martín Códax",
          imagen: "./src/images/bebidas/bebidas-3.webp",
          precio: 9.25,
          ingredientes: "Refrescante mezcla de ron, crema de coco, piña y hielo. Una bebida tropical que transportará tus sentidos a lugares exóticos.",
      },
      {
          id: 25,
          nombre: "Vino Finca la Montesa",
          imagen: "./src/images/bebidas/bebidas-4.webp",
          precio: 5.99,
          ingredientes: "Copa de vino con cuerpo, aromático y lleno de sabor. La elección perfecta para acompañar tus platos con una experiencia vinícola única.",
      },
      {
          id: 26,
          nombre: "Brandy Miguel Torres",
          imagen: "./src/images/bebidas/bebidas-5.webp",
          precio: 3.99,
          ingredientes: "Una opción clásica y sofisticada para los amantes de brandy.",
      },
  ],
  
  },
};

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

const sectionsContainers = document.querySelectorAll(".display-hidden");
const menusContainer$1 = document.getElementById("menusContainer");

const abrirMenu = () => {
  sectionsContainers.forEach((section) => {
    section.classList.add("display-none");
  });
};

const cerrarMenu = () => {
  sectionsContainers.forEach((section) => {
    section.classList.remove("display-none");
  });
  menusContainer$1.classList.remove("active");
};

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
