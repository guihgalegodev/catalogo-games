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

function abrirModal(listaImagens) {
  imagens = listaImagens;
  indexAtual = 0;

  modal.style.display = "flex";
  modalImg.src = imagens[indexAtual];
}

btnNext.addEventListener("click", () => {
  indexAtual = (indexAtual + 1) % imagens.length;
  modalImg.src = imagens[indexAtual];
});

btnPrev.addEventListener("click", () => {
  indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
  modalImg.src = imagens[indexAtual];
});

fechar.addEventListener("click", () => {
  modal.style.display = "none";
});

//https://shopee.com.br/Jogos-Seminovos-de-PS3-Originais-i.490386670.58206952976?extraParams=%7B%22display_model_id%22%3A159552964230%2C%22model_selection_logic%22%3A3%7D

//https://shopee.com.br/Jogos-Seminovos-de-PS3-Originais-i.490386670.58206952976?extraParams=%7B%22display_model_id%22%3A159552964230%2C%22model_selection_logic%22%3A3%7D
