const sectionsContainers = document.querySelectorAll(".display-hidden");
const menusContainer = document.getElementById("menusContainer");

const abrirMenu = () => {
  sectionsContainers.forEach((section) => {
    section.classList.add("display-none");
  });
};

const cerrarMenu = () => {
  sectionsContainers.forEach((section) => {
    section.classList.remove("display-none");
  });
  menusContainer.classList.remove("active");
};

export { abrirMenu, cerrarMenu };
