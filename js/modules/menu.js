export function initMenuMobile() {
  const btnMobile = document.getElementById("btn-mobile");

  function abrirFecharMenu(e) {
    if (e.type === "touchstart") e.preventDefault();
    const nav = document.getElementById("nav-menu");
    nav.classList.toggle("active");
    const active = nav.classList.contains("active");
    e.currentTarget.setAttribute("aria-expanded", active);
    if (active) {
      e.currentTarget.setAttribute("aria-label", "Fechar Menu");
    } else {
      e.currentTarget.setAttribute("aria-label", "Abrir Menu");
    }
  }

  btnMobile.addEventListener("touchstart", abrirFecharMenu);
  btnMobile.addEventListener("click", abrirFecharMenu);
}
