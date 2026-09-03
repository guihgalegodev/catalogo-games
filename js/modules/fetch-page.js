import { abrirModal, initModalEvents, events } from "./modal.js";
import ScrollAnimado from "./scroll-animado.js";
import CheckWindowMobile from "./check-is-mobile.js";
import { links } from "./links.js";

export default function initfetchPage() {
  let initialUrl = window.location.href;

  if (initialUrl.endsWith("/") && !initialUrl.includes(".html")) {
    initialUrl += "index.html";
  }

  fetchPage(initialUrl);

  function handleClick(e) {
    e.preventDefault();
    fetchPage(e.target.href);
    window.history.pushState(null, null, e.target.href);
  }

  let currentScrollAnimado = null;

  async function fetchPage(url) {
    window.scrollTo({
      top: 0,
    });

    const pageResponse = await fetch(url);
    const pageText = await pageResponse.text();
    replaceContent(pageText);
    linkAtivo(url);

    // Se já existir uma instância rodando, remove o eventos de scroll antigo
    if (currentScrollAnimado) {
      currentScrollAnimado.stop();
    }

    //Cria a nova instância
    currentScrollAnimado = new ScrollAnimado("[data-anima]");
    currentScrollAnimado.init();

    const images = document.querySelectorAll(".content-fetch img");
    let loadedImages = 0;

    // Verifica se as imagens já estão baixadas
    // para pegar o valor correto de offsett
    if (images.length > 0) {
      images.forEach((img) => {
        if (img.complete) {
          loadedImages++;
          if (loadedImages === images.length)
            currentScrollAnimado.getDistance();
        } else {
          // Espera as imagens carregarem
          img.addEventListener("load", () => {
            loadedImages++;
            if (loadedImages === images.length) {
              currentScrollAnimado.getDistance();
              currentScrollAnimado.checkDistance();
            }
          });
        }
      });
    }

    if (!pageResponse.url.endsWith("index.html")) {
      const isMobile = 790;
      const mobileWindow = new CheckWindowMobile(isMobile, ".jogo-img");
      mobileWindow.init();

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
                throw new Error(
                  "Não foi possível carregar os dados dos jogos.",
                );
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
