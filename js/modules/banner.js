export default class Banner {
  constructor(banner, controls, urlAtual) {
    this.banner = document.querySelector(banner);
    this.urlAtual = urlAtual;
    // console.log(this.banner);

    // Explicação bloco abaixo

    if (this.banner) {
      this.bannerImgs = Array.from(this.banner.querySelectorAll("img"));
      // console.log(this.bannerImgs);
      if (
        this.bannerImgs.length === 0 &&
        this.banner.classList.contains("banner-wrapper")
      ) {
        const innerBanner = this.banner.querySelector(".banner");
        if (innerBanner) {
          this.bannerImgs = Array.from(innerBanner.querySelectorAll("img"));
        }
      }
    } else {
      this.bannerImgs = [];
    }

    /* Explicação aqui:
       Este bloco é responsável por localizar e selecionar todas as imagens (<img>) do banner e armazená-las em um Array (`this.bannerImgs`):
       
       1. Verificação do Banner (`if (this.banner)`):
          - Verifica se o elemento do banner foi encontrado no DOM.
          - Tenta buscar as imagens diretamente dentro dele (`this.banner.querySelectorAll("img")`) e as converte para Array.
       
       2. Tratamento para Container Wrapper (Fallback):
          - Se nenhuma imagem for encontrada e o elemento selecionado for o container principal (`.banner-wrapper`), busca a div interna `.banner` e captura as imagens localizadas nela.
       
       3. Prevenção de Erros (`else`):
          - Se o elemento do banner não existir no DOM, inicializa `this.bannerImgs` como um Array vazio (`[]`), prevenindo erros ao tentar manipular `undefined`.
    */

    // Explicação bloco

    if (typeof controls === "string") {
      this.controls = Array.from(document.querySelectorAll(controls));
    } else if (controls instanceof NodeList || Array.isArray(controls)) {
      this.controls = Array.from(controls);
    } else {
      this.controls = Array.from(document.querySelectorAll(".controls li"));
    }

    this.activeClass = "active";
    this.currentIndex = 0;

    //  this.timer = this.timer.bind(this)
  }
  /* Explicação aqui:
     O trecho de código acima realiza a validação, normalização e inicialização das propriedades dos controles do banner:
     
     1. Trata o parâmetro 'controls':
        - Se for uma string (ex: ".controls li"), busca no DOM com `querySelectorAll` e converte o resultado em uma Array.
        - Se já for uma NodeList ou Array de elementos DOM, apenas garante a conversão para Array em `this.controls`.
        - Se nada for informado ou for um tipo inválido, busca por padrão os elementos ".controls li".
     
     2. Define as propriedades iniciais do banner:
        - `this.activeClass = "active"`: Guarda o nome da classe CSS utilizada para destacar o controle da imagem atual.
        - `this.currentIndex = 0`: Define o índice inicial apontando para a primeira imagem (slide 0).
  */

  changeImage(index) {
    if (!this.bannerImgs.length) return;
    this.currentIndex = index;
    // console.log(this.currentIndex);

    // Desloca cada imagem para realizar a troca suave via CSS transform
    this.bannerImgs.forEach((img) => {
      console.log(img);
      img.style.transform = `translateX(-${index * 100}%)`;
    });

    this.updateControls(index);
  }

  updateControls(activeIndex) {
    if (!this.controls.length) return;
    this.controls.forEach((control, index) => {
      // console.log(control);
      if (index === activeIndex) {
        control.classList.add(this.activeClass);
      } else {
        control.classList.remove(this.activeClass);
      }
    });
  }

  nextImage() {
    const nextIndex = (this.currentIndex + 1) % this.bannerImgs.length;
    // console.log(nextIndex);
    this.changeImage(nextIndex);
  }

  startAutoSlide(time = 3000) {
    this.stopAutoSlide();

    this.timer = setInterval(() => {
      this.nextImage();
    }, time);
  }

  stopAutoSlide() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  updatePage(urlAtual) {
    this.urlAtual = urlAtual;

    if (this.urlAtual.endsWith("index.html") && this.bannerImgs.length > 0) {
      this.changeImage(0);
      this.startAutoSlide(3000);
    } else {
      this.stopAutoSlide();
    }
  }

  init() {
    this.updatePage(this.urlAtual)
    return this;
  }
}
