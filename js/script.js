import { abrirModal, initModalEvents, events } from "./modules/modal.js";
import { initMenuMobile } from "./modules/menu.js";
import { initScrollAnimado } from "./modules/scroll-animado.js";

const btnDetalhes = document.querySelectorAll(".details");

btnDetalhes.forEach((btn) => {
  for (let i = 0; i < events.length; i++) {
    btn.addEventListener(events[i], async (e) => {
      if (e.type === "touchstart") e.preventDefault();
      const gameKey = btn.dataset.game;

      try {
        // Desabilita temporariamente o botão e adiciona feedback visual
        btn.style.opacity = "0.5";
        btn.style.pointerEvents = "none";

        const response = await fetch("./games.json");
        if (!response.ok) {
          throw new Error("Não foi possível carregar os dados dos jogos.");
        }

        const games = await response.json();
        const listaImagens = games[gameKey];

        if (listaImagens) {
          abrirModal(listaImagens);
        } else {
          throw new Error(
            `Jogo com a chave "${gameKey}" não foi encontrado no arquivo de dados.`,
          );
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao carregar as imagens do jogo.");
      } finally {
        // Restaura o estado original do botão
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      }
    });
  }
});

// const pricePix = document.querySelectorAll(".price-pix");
// const priceCredit = document.querySelectorAll(".price-credit-card");

// pricePix.forEach((price) => {
//   const $price = +price.innerText;
//   price.innerText = $price.toLocaleString("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   });
// });

// priceCredit.forEach((price) => {
//   const $price = +price.innerText;
//   price.innerText = $price.toLocaleString("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   });
// });

initMenuMobile();
initScrollAnimado();
initModalEvents();
