let imagens = [];
let indexAtual = 0;

let escala = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const fechar = document.querySelector(".fechar");
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

export function abrirModal(listaImagens) {
  imagens = listaImagens;
  indexAtual = 0;

  modal.style.display = "flex";
  modalImg.src = imagens[indexAtual];
}

function resetarImagem() {
  escala = 1;
  posX = 0;
  posY = 0;
  aplicarTransform();
}

function aplicarTransform() {
  modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${escala})`;
}

export function initModalEvents() {
  const isDesktop = window.innerWidth > 768;

  modalImg.addEventListener("wheel", (e) => {
    if (!isDesktop) return;

    e.preventDefault();

    const zoomSpeed = 0.1;

    if (e.deltaY < 0) {
      escala += zoomSpeed;
    } else {
      escala -= zoomSpeed;
    }

    if (escala < 1) escala = 1;
    if (escala > 3) escala = 3;

    // modalImg.style.transform = `scale(${escala})`;
    aplicarTransform();
  });

  modalImg.addEventListener("mousedown", (e) => {
    if (escala <= 1) return;

    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;

    modalImg.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    aplicarTransform();
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    modalImg.style.cursor = escala > 1 ? "grab" : "zoom-in";
  });

  btnNext.addEventListener("click", () => {
    indexAtual = (indexAtual + 1) % imagens.length;
    modalImg.src = imagens[indexAtual];
    resetarImagem();
    // escala = 1;
    // modalImg.style.transform = "scale(1)";
  });

  btnPrev.addEventListener("click", () => {
    indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
    modalImg.src = imagens[indexAtual];
    resetarImagem();
    // escala = 1;
    // modalImg.style.transform = "scale(1)";
  });

  fechar.addEventListener("click", () => {
    modal.style.display = "none";
    resetarImagem();
    // escala = 1;
    // modalImg.style.transform = "scale(1)";
  });
}
