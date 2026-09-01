export default class ScrollAnimado {
  constructor(elements) {
    this.elements = document.querySelectorAll(elements);
    this.totalElements = this.elements.length;
    this.animatedElements = 0;
    this.metadeWindow = window.innerHeight * 0.5;
    this.checkDistance = this.checkDistance.bind(this);
  }

  getDistance() {
    this.distance = [...this.elements].map((element) => {
      const offset = element.offsetTop;
      return {
        element,
        offset: Math.floor(offset - this.metadeWindow),
        direcao: element.dataset.anima,
      };
    });
  }

  checkDistance() {
    this.distance.forEach((item) => {
      if (!item.element.classList.contains("ativo")) {
        if (window.pageYOffset > item.offset) {
          item.element.classList.add("ativo", item.direcao);
          this.animatedElements++;
        }
      }
    });

    if (this.animatedElements === this.totalElements) {
      this.stop();
    }
  }

  init() {
    if (this.elements.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener("scroll", this.checkDistance);
    }
    return this;
  }

  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}
