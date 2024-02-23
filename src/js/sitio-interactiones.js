"use strict";

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
const heroSlider = document.querySelector("[data-hero-slider]");
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


export default {
  addEventOnElements
}