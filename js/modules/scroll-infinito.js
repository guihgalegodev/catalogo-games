export default class ScrollInfinito {
  constructor(elemScroll, elemContainer) {
    this.elemScroll = document.querySelector(elemScroll);
    this.elemContainer = this.elemScroll.querySelector(elemContainer);
    this.elemFilhos = Array.from(this.elemContainer.children);
  }

  clonarElementos() {
    this.elemFilhos.forEach((item) => {
      let elemDuplicado = item.cloneNode(true);
      elemDuplicado.setAttribute("aria-hidden", true);
      this.elemContainer.appendChild(elemDuplicado);
    });
  }

  init() {
    if (this.elemScroll && this.elemContainer) {
      this.clonarElementos();
    }
  }
}
