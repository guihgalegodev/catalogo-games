let imagens = [];
let indexAtual = 0;

let escala = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let touchStartDistance = 0;
let touchStartScale = 1;

export const events = ["click", "touchstart"];

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalVideo = document.getElementById("modal-video");
const fechar = document.querySelector(".fechar");
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

export function abrirModal(listaImagens) {
  imagens = listaImagens;
  indexAtual = 0;

  modal.style.display = "flex";
  atualizarMidia();
}

// Verifica a extensão do arquivo
function isVideo(url) {
  return url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
}
// Controla a exibição de imagem ou vídeo no modal
function atualizarMidia() {
  const midiaAtual = imagens[indexAtual];
  // Sempre pausa e limpa o vídeo anterior ao trocar de mídia
  modalVideo.pause();
  modalVideo.src = "";
  if (isVideo(midiaAtual)) {
    // Esconde a imagem, mostra o vídeo
    modalImg.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = midiaAtual;
    modalVideo.load();
  } else {
    // Esconde o vídeo, mostra a imagem
    modalVideo.style.display = "none";
    modalImg.style.display = "block";
    modalImg.src = midiaAtual;
  }
}

function resetarImagem() {
  escala = 1;
  posX = 0;
  posY = 0;
  aplicarTransform();
}

function aplicarTransform() {
  modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${escala})`;
}

export function initModalEvents() {
  const isDesktop = window.innerWidth > 768;

  modalImg.addEventListener("wheel", (e) => {
    if (!isDesktop) return;

    e.preventDefault();

    const zoomSpeed = 0.1;

    if (e.deltaY < 0) {
      escala += zoomSpeed;
    } else {
      escala -= zoomSpeed;
    }

    if (escala < 1) escala = 1;
    if (escala > 3) escala = 3;

    aplicarTransform();
  });

  modalImg.addEventListener("mousedown", (e) => {
    if (escala <= 1) return;

    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;

    modalImg.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    aplicarTransform();
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    modalImg.style.cursor = escala > 1 ? "grab" : "zoom-in";
  });

  // Eventos de toque para dispositivos móveis (zoom por pinça e arrasto)
  modalImg.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      if (escala > 1) {
        isDragging = true;
        startX = e.touches[0].clientX - posX;
        startY = e.touches[0].clientY - posY;
      }
    } else if (e.touches.length === 2) {
      isDragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDistance = Math.hypot(dx, dy);
      touchStartScale = escala;
    }
  });

  window.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1 && isDragging) {
      posX = e.touches[0].clientX - startX;
      posY = e.touches[0].clientY - startY;
      aplicarTransform();
    } else if (e.touches.length === 2 && touchStartDistance > 0) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDistance = Math.hypot(dx, dy);
      const factor = currentDistance / touchStartDistance;
      escala = touchStartScale * factor;

      if (escala < 1) escala = 1;
      if (escala > 3) escala = 3;

      aplicarTransform();
    }
  });

  window.addEventListener("touchend", (e) => {
    if (e.touches.length === 0) {
      isDragging = false;
      touchStartDistance = 0;
    } else if (e.touches.length === 1) {
      if (escala > 1) {
        isDragging = true;
        startX = e.touches[0].clientX - posX;
        startY = e.touches[0].clientY - posY;
      }
      touchStartDistance = 0;
    }
  });

  window.addEventListener("touchcancel", () => {
    isDragging = false;
    touchStartDistance = 0;
  });

  for (let i = 0; i < events.length; i++) {
    btnNext.addEventListener(events[i], (e) => {
      if (e.type === "touchstart") e.preventDefault();
      indexAtual = (indexAtual + 1) % imagens.length;
      atualizarMidia();
      resetarImagem();
    });

    btnPrev.addEventListener(events[i], (e) => {
      if (e.type === "touchstart") e.preventDefault();
      indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
      atualizarMidia();
      resetarImagem();
    });

    fechar.addEventListener(events[i], (e) => {
      if (e.type === "touchstart") e.preventDefault();
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.src = "";
      resetarImagem();
    });
  }
}
