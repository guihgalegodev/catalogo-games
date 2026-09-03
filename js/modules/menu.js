import { links } from "./links.js";
export default class MenuMobile {
  constructor(btnMobile, navMenu) {
    this.btnMobile = document.getElementById(btnMobile);
    this.navMenu = document.getElementById(navMenu);

    this.events = ["touchstart", "click"];

    this.openCloseMenu = this.openCloseMenu.bind(this);
  }

  openCloseMenu(e) {
    if (e.type === "touchstart") e.preventDefault();
    this.navMenu.classList.toggle("active");
    const active = this.navMenu.classList.contains("active");
    if (e.currentTarget.hasAttribute("aria-label")) {
      e.currentTarget.setAttribute("aria-expanded", active);
      if (active) {
        e.currentTarget.setAttribute("aria-label", "Fechar Menu");
      } else {
        e.currentTarget.setAttribute("aria-label", "Abrir Menu");
      }
    } else {
      this.btnMobile.setAttribute("aria-expanded", false);
      this.btnMobile.setAttribute("aria-label", "Abrir Menu");
    }
  }

  closeMenuPopState() {
    window.addEventListener("popstate", () => {
      this.navMenu.classList.remove("active");
      this.btnMobile.setAttribute("aria-expanded", false);
      this.btnMobile.setAttribute("aria-label", "Abrir Menu");
    });
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
      this.closeMenuPopState();
    }
    return this;
  }
}
