export function initMenuMobile() {
  const btnMobile = document.getElementById("btn-mobile");

  function abrirFecharMenu() {
    const nav = document.getElementById("nav-menu");
    nav.classList.toggle("active");
  }

  btnMobile.addEventListener("click", abrirFecharMenu);
}
