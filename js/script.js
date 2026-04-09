const games = {
  game1: [
    "img/gta-4-otm.jpg",
    "img/gta-iv-gameplay.jpg",
    "img/gta-iv-gameplay-2.jpg",
  ],
  game2: [
    "img/gta-5-otm.jpg",
    "img/gta-iv-gameplay.jpg",
    "img/gta-iv-gameplay-2.jpg",
  ],
  game3: [
    "img/naruto-2-otm.jpg",
    "img/gta-iv-gameplay.jpg",
    "img/gta-iv-gameplay-2.jpg",
  ],
};

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const fechar = document.querySelector(".fechar");
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

let imagens = [];
let indexAtual = 0;
let escala = 1;

function abrirModal(listaImagens) {
  imagens = listaImagens;
  indexAtual = 0;

  modal.style.display = "flex";
  modalImg.src = imagens[indexAtual];

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

    modalImg.style.transform = `scale(${escala})`;
  });
}

btnNext.addEventListener("click", () => {
  indexAtual = (indexAtual + 1) % imagens.length;
  escala = 1;
  modalImg.style.transform = "scale(1)";
  modalImg.src = imagens[indexAtual];
});

btnPrev.addEventListener("click", () => {
  indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
  escala = 1;
  modalImg.style.transform = "scale(1)";
  modalImg.src = imagens[indexAtual];
});

fechar.addEventListener("click", () => {
  modal.style.display = "none";
  escala = 1;
  modalImg.style.transform = "scale(1)";
});

//https://shopee.com.br/Jogos-Seminovos-de-PS3-Originais-i.490386670.58206952976?extraParams=%7B%22display_model_id%22%3A159552964230%2C%22model_selection_logic%22%3A3%7D

//https://shopee.com.br/Jogos-Seminovos-de-PS3-Originais-i.490386670.58206952976?extraParams=%7B%22display_model_id%22%3A159552964230%2C%22model_selection_logic%22%3A3%7D
