import { games } from "./modules/games.js";
import { abrirModal, initModalEvents, events } from "./modules/modal.js";
import { initMenuMobile } from "./modules/menu.js";

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
  for (let i = 0; i < events.length; i++) {
    btn.addEventListener(events[i], (e) => {
      if (e.type === "touchstart") e.preventDefault();
      const gameKey = btn.dataset.game;
      const listaImagens = games[gameKey];

      abrirModal(listaImagens);
    });
  }
});

// btnDetalhes.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const gameKey = btn.dataset.game;
//     const listaImagens = games[gameKey];

//     abrirModal(listaImagens);
//   });
// });

initModalEvents();
initMenuMobile();
