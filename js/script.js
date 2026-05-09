import { games } from "./modules/games.js";
import { abrirModal, initModalEvents } from "./modules/modal.js";

const btnDetalhes = document.querySelectorAll(".details");
const isMobile = window.innerWidth <= 980;

if (isMobile) {
  const cards = document.querySelectorAll(".jogo-img");

  cards.forEach((card) => {
    setInterval(() => {
      card.classList.toggle("ativo");
    }, 3000);
  });
}

btnDetalhes.forEach((btn) => {
  btn.addEventListener("click", () => {
    const gameKey = btn.dataset.game;
    const listaImagens = games[gameKey];

    abrirModal(listaImagens);
  });
});

initModalEvents();
