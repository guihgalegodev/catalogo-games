export default class CheckWindowMobile {
  constructor(windowWidth, cards) {
    this.windowWidth = windowWidth;
    this.cards = document.querySelectorAll(cards);
  }

  checkIsMobile() {
    const isMobile = window.innerWidth < this.windowWidth;
    if (isMobile) {
      this.cards.forEach((card) => {
        setInterval(() => {
          card.classList.toggle("ativo");
        }, 3000);
      });
    }
  }

  init() {
    if (this.windowWidth && this.cards.length) {
      this.checkIsMobile();
    }
    return this;
  }
}
