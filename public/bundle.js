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
      imagenPortada: "./src/images/service-1.jpg",
    },
    {
      id: "entradas",
      nombre: "Arroces, Pescados, Carnes y mas...",
      imagenPortada: "./src/images/service-2.jpg",
    },
    {
      id: "bebidas",
      nombre: "Bebidas",
      imagenPortada: "./src/images/service-3.jpg",
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
          imagen: "./src/images/menu-1.png",
          precio: 25.5,
          ingredientes: "Con Mahonesa de Oliva Virgen Extra y Bonito.",
        },
        {
          id: 2,
          nombre: "Salpicón de Aguacate",
          imagen: "./assets/imagens/menu-2.png",
          precio: 25.5,
          ingredientes: "Con Langostinos y Mahonesa de Mostaza.",
        },
      ],
      pescadosCarnes: [
        {
          id: 3,
          nombre: "Lomos de Boquerón",
          imagen: "./assets/imagens/menu-3.png",
          precio: 25.5,
          ingredientes: "Al natural con Tomate Dulce y Miel de Caña.",
        },
        {
          id: 4,
          nombre: "Gambas de Málaga",
          imagen: "./assets/imagens/menu-4.png",
          precio: 25.5,
          ingredientes: "Al Pil-pil y Papada Ibérica de Bellota.",
        },
        {
          id: 5,
          nombre: "Verduras de temporada",
          imagen: "./assets/imagens/menu-5.png",
          precio: 25.5,
          ingredientes: "Fritas con Foie y Huevo.",
        },
      ],
      arrocesFideuas: [
        {
          id: 6,
          nombre: "Arroz en Paella",
          imagen: "./assets/imagens/menu-6.png",
          precio: 30.0,
          ingredientes: "Ingredientes de la paella...",
        },
        {
          id: 7,
          nombre: "Arroz Caldoso",
          imagen: "./assets/imagens/menu-7.png",
          precio: 28.5,
          ingredientes: "Ingredientes del arroz caldoso...",
        },
        {
          id: 8,
          nombre: "Fideuá",
          imagen: "./assets/imagens/menu-8.png",
          precio: 27.0,
          ingredientes: "Ingredientes de la fideuá...",
        },
      ],
      postres: [
        {
          id: 9,
          nombre: "Tiramisú",
          imagen: "./assets/imagens/dessert-1.jpg",
          precio: 12.99,
          ingredientes: "Bizcochos, café, queso mascarpone y cacao en polvo.",
        },
        {
          id: 10,
          nombre: "Cheesecake de Fresa",
          imagen: "./assets/imagens/dessert-2.jpg",
          precio: 15.5,
          ingredientes: "Base de galleta, queso crema, y topping de fresas frescas.",
        },
        {
          id: 11,
          nombre: "Brownie con Helado",
          imagen: "./assets/imagens/dessert-3.jpg",
          precio: 14.75,
          ingredientes: "Brownie de chocolate caliente con helado de vainilla.",
        },
        {
          id: 12,
          nombre: "Mousse de Chocolate",
          imagen: "./assets/imagens/dessert-4.jpg",
          precio: 11.99,
          ingredientes: "Chocolate negro, huevos, azúcar y nata montada.",
        },
        {
          id: 13,
          nombre: "Frutas Frescas",
          imagen: "./assets/imagens/dessert-5.jpg",
          precio: 9.99,
          ingredientes: "Selección de frutas frescas de temporada.",
        },
      ],
      bebidas: [
        {
          id: 14,
          nombre: "Margarita",
          imagen: "./assets/imagens/drink-1.jpg",
          precio: 8.99,
          ingredientes: "Tequila, triple sec, jugo de lima y sal en el borde del vaso.",
        },
        {
          id: 15,
          nombre: "Mojito",
          imagen: "./assets/imagens/drink-2.jpg",
          precio: 7.5,
          ingredientes: "Ron, azúcar, menta, lima y soda.",
        },
        {
          id: 16,
          nombre: "Piña Colada",
          imagen: "./assets/imagens/drink-3.jpg",
          precio: 9.25,
          ingredientes: "Ron, crema de coco, piña y hielo.",
        },
        {
          id: 17,
          nombre: "Café Espresso",
          imagen: "./assets/imagens/drink-4.jpg",
          precio: 5.99,
          ingredientes: "Café fuerte servido en pequeñas cantidades.",
        },
        {
          id: 18,
          nombre: "Agua Mineral con Gas",
          imagen: "./assets/imagens/drink-5.jpg",
          precio: 3.99,
          ingredientes: "Agua mineral con gas, servida con hielo y rodaja de limón.",
        },
      ],
    },
  };

const sectionsContainers = document.querySelectorAll(".section");
const menusContainer$1 = document.getElementById("menusContainer");

const abrirMenu = () => {
    sectionsContainers.forEach((section) => {
      section.classList.add("display-none");
    });
  };

  const cerrarMenu = ()=> {
    sectionsContainers.forEach((section) => {
        section.classList.remove("display-none");
        menusContainer$1.classList.remove("active");
      });
  };

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
