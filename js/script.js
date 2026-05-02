import { games } from "./modules/games.js";
import { abrirModal, initModalEvents } from "./modules/modal.js";

const btnDetalhes = document.querySelectorAll(".details");

btnDetalhes.forEach((btn) => {
  btn.addEventListener("click", () => {
    const gameKey = btn.dataset.game;
    const listaImagens = games[gameKey];

    abrirModal(listaImagens);
  });
});

initModalEvents();
