import { links } from "./links.js";
export default class MenuMobile {
  constructor(btnMobile, navMenu, cards) {
    this.btnMobile = document.getElementById(btnMobile);
    this.navMenu = document.getElementById(navMenu);
    // this.cards = document.querySelectorAll(cards);
    // this.windowMobile = 790;

    this.events = ["touchstart", "click"];

    this.openCloseMenu = this.openCloseMenu.bind(this);
  }

  // checkIsMobile() {
  //   const isMobile = window.innerWidth < this.windowMobile;
  //   if (isMobile) {
  //     this.cards.forEach((card) => {
  //       setInterval(() => {
  //         card.classList.toggle("ativo");
  //       }, 3000);
  //     });
  //   }
  // }

  openCloseMenu(e) {
    if (e.type === "touchstart") e.preventDefault();
    this.navMenu.classList.toggle("active");
    const active = this.navMenu.classList.contains("active");
    e.currentTarget.setAttribute("aria-expanded", active);
    if (active) {
      e.currentTarget.setAttribute("aria-label", "Fechar Menu");
    } else {
      e.currentTarget.setAttribute("aria-label", "Abrir Menu");
    }
  }

  linkCloseMenu() {
    links.forEach((link) => {
      this.events.forEach((event) => {
        link.addEventListener(event, this.openCloseMenu);
      });
    });
  }

  addBtnMobileEvents() {
    this.events.forEach((event) => {
      this.btnMobile.addEventListener(event, this.openCloseMenu);
    });
    this.linkCloseMenu();
  }

  init() {
    if (this.btnMobile && this.navMenu) {
      this.addBtnMobileEvents();
      // this.checkIsMobile();
    }
    return this;
  }
}
