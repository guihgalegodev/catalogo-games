export function initMenuMobile() {
  const btnMobile = document.getElementById("btn-mobile");

  const firstLi = document.querySelector("li");

  if (window.innerWidth <= 790) {
    firstLi.style.marginTop = "20px";
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 790) {
      firstLi.style.marginTop = "20px";
    } else {
      firstLi.style.marginTop = "0px";
    }
  })

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
