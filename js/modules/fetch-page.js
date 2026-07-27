import { abrirModal, initModalEvents, events } from "./modal.js";
import { initScrollAnimado } from "./scroll-animado.js";
import { links } from "./links.js";

export default function initfetchPage() {
  function handleClick(e) {
    e.preventDefault();
    fetchPage(e.target.href);
    window.history.pushState(null, null, e.target.href);
  }

  async function fetchPage(url) {
    window.scrollTo({
      top: 0,
    });

    const pageResponse = await fetch(url);
    const pageText = await pageResponse.text();
    replaceContent(pageText);
    linkAtivo(url);
    initScrollAnimado();

    const btnDetalhes = document.querySelectorAll(".content-fetch .details");

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
  }

  function replaceContent(newText) {
    const newHtml = document.createElement("div");
    newHtml.innerHTML = newText;

    const oldContent = document.querySelector(".content-fetch");
    const newContent = newHtml.querySelector(".content-fetch");

    oldContent.innerHTML = newContent.innerHTML;
  }

  window.addEventListener("popstate", () => {
    fetchPage(window.location.href);
  });

  links.forEach((link) => {
    events.forEach((event) => {
      link.addEventListener(event, handleClick);
    });
  });
  initModalEvents();
}

function linkAtivo(urlAtual) {
  links.forEach((link) => {
    link.classList.remove("ativo");
    const href = link.getAttribute("href");
    if (urlAtual.includes(href)) {
      link.classList.add("ativo");
    }
  });
}
