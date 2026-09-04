export default class Modal {
  constructor(btns, modal, modalImg, modalVideo, fechar, btnNext, btnPrev) {
    this.btnsDetalhes = document.querySelectorAll(btns);
    this.modal = document.getElementById(modal);
    this.modalImg = document.getElementById(modalImg);
    this.modalVideo = document.getElementById(modalVideo);
    this.fechar = document.querySelector(fechar);
    this.btnNext = document.querySelector(btnNext);
    this.btnPrev = document.querySelector(btnPrev);

    this.imagens = [];
    this.indexAtual = 0;
    this.escala = 1;
    this.posX = 0;
    this.posY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.touchStartDistance = 0;
    this.touchStartScale = 1;

    this.events = ["touchstart", "click"];
  }

  abrirModal(listaImagens) {
    this.imagens = listaImagens;
    this.indexAtual = 0;

    this.modal.style.display = "flex";
    this.atualizarMidia();
  }

  // Verifica a extensão do arquivo
  isVideo(url) {
    return (
      url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg")
    );
  }
  // Controla a exibição de imagem ou vídeo no moda
  atualizarMidia() {
    const midiaAtual = this.imagens[this.indexAtual];
    // Sempre pausa e limpa o vídeo anterior ao trocar de mídia
    this.modalVideo.pause();
    this.modalVideo.src = "";
    if (this.isVideo(midiaAtual)) {
      // Esconde a imagem, mostra o vídeo
      this.modalImg.style.display = "none";
      this.modalVideo.style.display = "block";
      this.modalVideo.src = midiaAtual;
      this.modalVideo.load();
    } else {
      // Esconde o vídeo, mostra a imagem
      this.modalVideo.style.display = "none";
      this.modalImg.style.display = "block";
      this.modalImg.src = midiaAtual;
    }
  }

  resetarImagem() {
    this.escala = 1;
    this.posX = 0;
    this.posY = 0;
    this.aplicarTransform();
  }

  aplicarTransform() {
    this.modalImg.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${this.escala})`;
  }

  initModalEvents() {
    if (!this.modal || !this.modalImg) return;

    const isDesktop = window.innerWidth > 768;

    this.modalImg.addEventListener("wheel", (e) => {
      if (!isDesktop) return;

      e.preventDefault();

      const zoomSpeed = 0.1;

      if (e.deltaY < 0) {
        this.escala += zoomSpeed;
      } else {
        this.escala -= zoomSpeed;
      }

      if (escala < 1) escala = 1;
      if (escala > 3) escala = 3;

      this.aplicarTransform();
    });

    this.modalImg.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (this.escala <= 1) return;

      this.isDragging = true;
      this.startX = e.clientX - this.posX;
      this.startY = e.clientY - this.posY;

      this.modalImg.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;

      this.posX = e.clientX - this.startX;
      posY = e.clientY - this.startY;

      this.aplicarTransform();
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.modalImg.style.cursor = this.escala > 1 ? "grab" : "zoom-in";
    });

    // Eventos de toque para dispositivos móveis (zoom por pinça e arrasto)
    this.modalImg.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        if (this.escala > 1) {
          this.isDragging = true;
          this.startX = e.touches[0].clientX - this.posX;
          this.startY = e.touches[0].clientY - this.posY;
        }
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.touchStartDistance = Math.hypot(dx, dy);
        this.touchStartScale = escala;
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        this.posX = e.touches[0].clientX - this.startX;
        this.posY = e.touches[0].clientY - this.startY;
        this.aplicarTransform();
      } else if (e.touches.length === 2 && this.touchStartDistance > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        const factor = currentDistance / this.touchStartDistance;
        this.escala = this.touchStartScale * factor;

        if (this.escala < 1) this.escala = 1;
        if (this.escala > 3) this.escala = 3;

        this.aplicarTransform();
      }
    });

    window.addEventListener("touchend", (e) => {
      if (e.touches.length === 0) {
        this.isDragging = false;
        this.touchStartDistance = 0;
      } else if (e.touches.length === 1) {
        if (this.escala > 1) {
          this.isDragging = true;
          this.startX = e.touches[0].clientX - this.posX;
          this.startY = e.touches[0].clientY - this.posY;
        }
        this.touchStartDistance = 0;
      }
    });

    window.addEventListener("touchcancel", () => {
      this.isDragging = false;
      this.touchStartDistance = 0;
    });

    this.events.forEach((event) => {
      this.btnNext.addEventListener(event, (e) => {
        if (e.type === "touchstart") e.preventDefault();
        this.indexAtual = (this.indexAtual + 1) % this.imagens.length;
        this.atualizarMidia();
        this.resetarImagem();
      });

      this.btnPrev.addEventListener(event, (e) => {
        if (e.type === "touchstart") e.preventDefault();
        this.indexAtual =
          (this.indexAtual - 1 + this.imagens.length) % this.imagens.length;
        this.atualizarMidia();
        this.resetarImagem();
      });

      this.fechar.addEventListener(event, (e) => {
        if (e.type === "touchstart") e.preventDefault();
        this.modal.style.display = "none";
        this.modalVideo.pause();
        this.modalVideo.src = "";
        this.resetarImagem();
      });
    });
  }

  addEventsBtnDetalhe() {
    this.btnsDetalhes.forEach((btn) => {
      this.events.forEach((event) => {
        btn.addEventListener(event, (e) => {
          this.salvarBtnDados(e);
        });
      });
    });
  }

  salvarBtnDados(e) {
    if (e.type === "touchstart") e.preventDefault();
    this.btnsDados = [...this.btnsDetalhes].map((btn) => {
      return {
        btn,
        gameKey: btn.dataset.game,
      };
    });
    this.mostrarGameObj(e);
  }

  async initFetch(objBtn) {
    try {
      objBtn.btn.style.opacity = "0.5";
      objBtn.btn.style.pointerEvents = "none";
      const response = await fetch("./games.json");
      if (!response.ok) {
        throw new Error("Não foi possível carregar os dados dos jogos.");
      }

      const games = await response.json();

      const listaImagens = games[objBtn.gameKey];

      if (listaImagens) {
        this.abrirModal(listaImagens);
      } else {
        throw new Error(
          `Jogo com a chave "${objBtn.gameKey}" não foi encontrado no arquivo de dados.`,
        );
      }
    } catch (error) {
      console.error("Erro:", error);
      // alert("Ocorreu um erro ao carregar as imagens do jogo.");
    } finally {
      objBtn.btn.style.opacity = "1";
      objBtn.btn.style.pointerEvents = "auto";
    }
  }

  mostrarGameObj(e) {
    const btnTargetDataGame = e.currentTarget.dataset.game;
    this.btnsDados.forEach((objBtn) => {
      if (objBtn.gameKey === btnTargetDataGame) {
        this.initFetch(objBtn);
      }
    });
  }

  bindEvents() {
    this.salvarBtnDados = this.salvarBtnDados.bind(this);
    this.initModalEvents = this.initModalEvents.bind(this);
  }

  init() {
    if (this.btnsDetalhes.length) {
      this.addEventsBtnDetalhe();
      this.initModalEvents();
      this.bindEvents();
    }
    return this;
  }
}
