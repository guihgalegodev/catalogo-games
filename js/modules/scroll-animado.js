export function initScrollAnimado() {
  const jogosAnimar = document.querySelectorAll("[data-anima]");
  const metadeWindow = window.innerHeight * 0.5;
  function animaScroll() {
    jogosAnimar.forEach((jogo) => {
      const jogoTop = jogo.getBoundingClientRect().top;
      const isVisible = jogoTop - metadeWindow < 0;
      if (isVisible) {
        const direcao = jogo.dataset.anima;
        jogo.classList.add("ativo", direcao);
      }
    });
  }

  animaScroll();
  window.addEventListener("scroll", animaScroll);
}
