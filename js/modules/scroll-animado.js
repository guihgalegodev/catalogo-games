export default class ScrollAnimado {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.metadeWindow = window.innerHeight * 0.5;

    this.animaScroll = this.animaScroll.bind(this);
  }
  animaScroll() {
    this.elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const isVisible = elementTop - this.metadeWindow < 0;

      if (isVisible && !element.classList.contains("ativo")) {
        const direcao = element.dataset.anima;
        element.classList.add("ativo", direcao);
      }
    });
  }

  init() {
    if (this.elements.length) {
      this.animaScroll();
      window.addEventListener("scroll", this.animaScroll);
    }
    return this;
  }
}
