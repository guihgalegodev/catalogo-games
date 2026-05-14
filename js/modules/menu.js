export function initMenuMobile() {
  const btnMobile = document.getElementById("btn-mobile");

  function abrirFecharMenu(e) {
    if (e.type === "touchstart") e.preventDefault();
    const nav = document.getElementById("nav-menu");
    nav.classList.toggle("active");
  }

  btnMobile.addEventListener("touchstart", abrirFecharMenu);
  btnMobile.addEventListener("click", abrirFecharMenu);
}
