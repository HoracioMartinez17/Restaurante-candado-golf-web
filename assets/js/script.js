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
    // Recorre todos los elementos proporcionados en el array 'elements'
    for (let i = 0, len = elements.length; i < len; i++) {
      // Agrega un event listener del tipo 'eventType' a cada elemento con la función 'callback'
      elements[i].addEventListener(eventType, callback);
    }
  };
  

/* Navbar */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglersNavbar = () => {
  // Alternar clases para mostrar/ocultar la barra de navegación
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", togglersNavbar);

/* Header */
const header = document.querySelector("[data-header]");

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
    hideHeader();
  } else {
    header.classList.remove("active");
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
