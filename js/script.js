import initfetchPage from "./modules/fetch-page.js";
import MenuMobile from "./modules/menu.js";
import { initScrollAnimado } from "./modules/scroll-animado.js";

initfetchPage();

const menuMobile = new MenuMobile("btn-mobile", "nav-menu", ".jogo-img");
menuMobile.init();

initScrollAnimado();
