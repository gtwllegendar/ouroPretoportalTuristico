/**
 * Portal Turístico de Ouro Preto (MG)
 * Comportamentos interativos:
 * - Navbar dinâmica ao rolar + fechamento automático no mobile
 * - Scroll reveal suave com IntersectionObserver
 * - Filtro de pontos turísticos por categoria
 * - Modal dinâmico "Saiba mais" dos pontos turísticos
 * - Galeria integrada com Carousel Bootstrap 5 em Lightbox Modal
 * - Filtro de opções demonstrativas de hospedagem
 * - Validação de formulário Bootstrap + feedback demonstrativo (sem backend)
 * - Botão voltar ao topo
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScrollBehavior();
  initMobileNavAutoClose();
  initScrollReveal();
  initAttractionFilters();
  initAttractionDetailModal();
  initGalleryLightbox();
  initLodgingFilters();
  initContactFormValidation();
  initBackToTopButton();
});

/**
 * Alterna aparência da navbar conforme a rolagem da página.
 */
function initNavbarScrollBehavior() {
  const navbar = document.getElementById("mainNavbar");
  if (!navbar) return;

  const updateNavbarState = () => {
    if (window.scrollY > 48) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };

  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });
}

/**
 * Fecha o menu colapsável no mobile após clicar em um link âncora.
 */
function initMobileNavAutoClose() {
  const navCollapseEl = document.getElementById("navbarNav");
  if (!navCollapseEl || typeof bootstrap === "undefined") return;

  const navLinks = navCollapseEl.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapseEl.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
        bsCollapse.hide();
      }
    });
  });
}

/**
 * Aplica animação sutil de entrada aos blocos conforme entram na viewport.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Filtra os cards de pontos turísticos por categoria.
 */
function initAttractionFilters() {
  const filterButtons = document.querySelectorAll("[data-attraction-filter]");
  const attractionItems = document.querySelectorAll("[data-attraction-category]");
  if (!filterButtons.length || !attractionItems.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.attractionFilter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      attractionItems.forEach((item) => {
        const itemCategory = item.dataset.attractionCategory;
        const shouldShow =
          selectedCategory === "todos" || itemCategory === selectedCategory;

        item.classList.toggle("d-none", !shouldShow);
      });
    });
  });
}

/**
 * Popula e exibe o Modal Bootstrap com detalhes verificados do ponto turístico.
 */
function initAttractionDetailModal() {
  const modalEl = document.getElementById("attractionModal");
  if (!modalEl) return;

  const attractionDetails = {
    "sao-francisco": {
      title: "Igreja de São Francisco de Assis",
      category: "Arquitetura Barroca",
      location: "Largo de Coimbra, s/n — Centro Histórico",
      image: "assets/images/atracao-sao-francisco.jpg",
      alt: "Fachada barroca da Igreja de São Francisco de Assis em Ouro Preto",
      description:
        "Considerada uma das maiores expressões do Barroco e do Rococó brasileiro, reúne arquitetura e esculturas em pedra-sabão de Antônio Francisco Lisboa (Aleijadinho) e a célebre pintura no forro da nave feita por Manuel da Costa Ataíde (Mestre Ataíde).",
      highlights: [
        "Medalhão central e portada esculpidos em pedra-sabão por Aleijadinho.",
        "Pintura ilusionista no teto representando a Assunção da Virgem, de Mestre Ataíde.",
        "Entorno movimentado pela tradicional Feirinha de Pedra-Sabão no Largo de Coimbra."
      ],
      tip: "Horários de visitação e eventuais taxas de acesso devem ser confirmados previamente nos canais oficiais da paróquia ou da Secretaria de Turismo."
    },
    "praca-tiradentes": {
      title: "Praça Tiradentes e Museu da Inconfidência",
      category: "História & Museus",
      location: "Praça Tiradentes — Coração do Centro Histórico",
      image: "assets/images/atracao-praca-tiradentes.jpg",
      alt: "Praça Tiradentes e fachada do Museu da Inconfidência em Ouro Preto",
      description:
        "Marco central da antiga Vila Rica, a praça abriga o monumento a Tiradentes e é cercada por casarões coloniais. Em destaque ergue-se a antiga Casa da Câmara e Cadeia, hoje sede do Museu da Inconfidência, que preserva documentos, objetos históricos e o Panteão dos Inconfidentes.",
      highlights: [
        "Acervo dedicado à Inconfidência Mineira (1789) e à sociedade setecentista.",
        "Ponto de partida ideal para caminhadas pelas ladeiras históricas em pé-de-moleque.",
        "Proximidade imediata de outros museus, como o Museu de Ciência e Técnica da UFOP."
      ],
      tip: "Por ser o ponto mais alto do eixo central, facilita o deslocamento a pé em direção às demais igrejas e largos."
    },
    "matriz-pilar": {
      title: "Basílica Matriz de Nossa Senhora do Pilar",
      category: "Arte Sacra",
      location: "Praça Monsenhor Castilho Barbosa — Bairro Pilar",
      image: "assets/images/atracao-matriz-pilar.jpg",
      alt: "Interior dourado e talhas barrocas da Matriz de Nossa Senhora do Pilar",
      description:
        "Erguida no século XVIII, é uma das igrejas mais suntuosas do período colonial brasileiro. Seu interior impressiona pela exuberância da talha dourada, pelos altares ricamente trabalhados e pela atmosfera devocional ligada às antigas irmandades de Vila Rica.",
      highlights: [
        "Nave poligonal com intensa ornamentação dourada e peças de arte sacra.",
        "Espaço tradicional das celebrações e concertos da Semana Santa e do Festival de Inverno.",
        "Museu de Arte Sacra anexo com peças históricas da paróquia."
      ],
      tip: "Visite com calma para observar os detalhes das capelas laterais e respeite as normas de preservação e fotografia do templo."
    },
    "casa-contos": {
      title: "Casa dos Contos",
      category: "Patrimônio & Memória",
      location: "Rua São José, 12 — Centro Histórico",
      image: "assets/images/atracao-casa-contos.jpg",
      alt: "Casarão colonial da Casa dos Contos com ponte de pedra em Ouro Preto",
      description:
        "Antigo casarão do século XVIII ligado à administração real, à arrecadação de impostos e à Casa de Fundição do Ouro. Hoje funciona como museu e centro cultural voltado à história da moeda, da economia colonial e da memória das pessoas escravizadas na mineração.",
      highlights: [
        "Exemplar notável da arquitetura civil colonial mineira.",
        "Acervo numismático e exposições sobre o Ciclo do Ouro e a senzala histórica.",
        "Jardins internos e ponte de pedra que compõem o conjunto arquitetônico."
      ],
      tip: "Confirme previamente os horários de funcionamento e a programação de exposições temporárias antes da visita."
    },
    "pico-itacolomi": {
      title: "Parque Estadual do Itacolomi",
      category: "Ecoturismo & Natureza",
      location: "Zona Sul — Limite entre Ouro Preto e Mariana",
      image: "assets/images/hero-ouro-preto.jpg",
      alt: "Pico do Itacolomi cercado por montanhas e vegetação da Serra do Espinhaço",
      description:
        "Unidade de conservação marcada pelo imponente Pico do Itacolomi, com mais de 1.700 metros de altitude na Serra do Espinhaço. O parque combina trilhas ecológicas, mirantes panorâmicos, lagoas, fauna silvestre e construções históricas ligadas ao antigo ciclo do chá.",
      highlights: [
        "Formação rochosa emblemática que servia de referência geográfica aos antigos viajantes.",
        "Trilhas com diferentes níveis de dificuldade em áreas de Cerrado e Mata Atlântica.",
        "Contato direto com a natureza a poucos quilômetros do centro histórico."
      ],
      tip: "Use calçados adequados para trilha, leve água e verifique previamente as condições climáticas e regras de acesso do parque."
    }
  };

  const titleEl = document.getElementById("attractionModalLabel");
  const categoryEl = document.getElementById("attractionModalCategory");
  const locationEl = document.getElementById("attractionModalLocation");
  const imgEl = document.getElementById("attractionModalImg");
  const descEl = document.getElementById("attractionModalDesc");
  const highlightsEl = document.getElementById("attractionModalHighlights");
  const tipEl = document.getElementById("attractionModalTip");

  modalEl.addEventListener("show.bs.modal", (event) => {
    const triggerBtn = event.relatedTarget;
    if (!triggerBtn) return;

    const key = triggerBtn.getAttribute("data-attraction-id");
    const data = attractionDetails[key];
    if (!data) return;

    titleEl.textContent = data.title;
    categoryEl.textContent = data.category;
    locationEl.textContent = data.location;
    imgEl.src = data.image;
    imgEl.alt = data.alt;
    descEl.textContent = data.description;
    tipEl.textContent = data.tip;

    highlightsEl.innerHTML = "";
    data.highlights.forEach((text) => {
      const li = document.createElement("li");
      li.className = "mb-1";
      li.innerHTML = `<i class="bi bi-check2-circle text-warning me-2"></i>`;
      li.appendChild(document.createTextNode(text));
      highlightsEl.appendChild(li);
    });
  });
}

/**
 * Integra o grid da galeria com o Carousel dentro do Modal Lightbox.
 */
function initGalleryLightbox() {
  const lightboxModalEl = document.getElementById("galleryLightboxModal");
  const lightboxCarouselEl = document.getElementById("galleryLightboxCarousel");
  if (!lightboxModalEl || !lightboxCarouselEl || typeof bootstrap === "undefined") {
    return;
  }

  const galleryButtons = document.querySelectorAll("[data-gallery-index]");
  const carouselInstance = bootstrap.Carousel.getOrCreateInstance(lightboxCarouselEl, {
    interval: false,
    ride: false,
  });

  galleryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetIndex = Number(btn.getAttribute("data-gallery-index")) || 0;
      carouselInstance.to(targetIndex);
      const modalInstance = bootstrap.Modal.getOrCreateInstance(lightboxModalEl);
      modalInstance.show();
    });
  });
}

/**
 * Filtra as opções demonstrativas de hospedagem pelas abas de categoria.
 */
function initLodgingFilters() {
  const tabButtons = document.querySelectorAll("[data-lodging-filter]");
  const lodgingCards = document.querySelectorAll("[data-lodging-type]");
  if (!tabButtons.length || !lodgingCards.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedType = btn.dataset.lodgingFilter;

      tabButtons.forEach((tab) => {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      lodgingCards.forEach((card) => {
        const cardType = card.dataset.lodgingType;
        const visible = selectedType === "todos" || cardType === selectedType;
        card.classList.toggle("d-none", !visible);
      });
    });
  });
}

/**
 * Valida o formulário de contato e exibe confirmação demonstrativa clara (sem backend).
 */
function initContactFormValidation() {
  const form = document.getElementById("contactForm");
  const feedbackBox = document.getElementById("contactFeedback");
  const resetBtn = document.getElementById("resetContactBtn");
  if (!form || !feedbackBox) return;

  const emailInput = document.getElementById("contactEmail");
  const messageInput = document.getElementById("contactMessage");

  const validateCustomFields = () => {
    if (emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.setCustomValidity("Informe um endereço de e-mail válido.");
      } else {
        emailInput.setCustomValidity("");
      }
    }

    if (messageInput) {
      if (messageInput.value.trim().length < 15) {
        messageInput.setCustomValidity(
          "Escreva uma mensagem com pelo menos 15 caracteres."
        );
      } else {
        messageInput.setCustomValidity("");
      }
    }
  };

  if (emailInput) {
    emailInput.addEventListener("input", validateCustomFields);
  }
  if (messageInput) {
    messageInput.addEventListener("input", validateCustomFields);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    validateCustomFields();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      feedbackBox.classList.add("d-none");
      return;
    }

    const nameVal = document.getElementById("contactName").value.trim();
    const emailVal = emailInput.value.trim();
    const subjectVal = document.getElementById("contactSubject").value.trim();

    feedbackBox.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "alert alert-success border-0 shadow-sm mt-3 mb-0";
    wrapper.setAttribute("role", "status");

    const title = document.createElement("h4");
    title.className = "alert-heading h6 fw-bold mb-1";
    title.innerHTML =
      '<i class="bi bi-check-circle-fill me-2"></i>Validação concluída (Modo Demonstrativo)';

    const summary = document.createElement("p");
    summary.className = "mb-2 small";
    summary.textContent = `Olá, ${nameVal}! Seus dados referentes a "${subjectVal}" (${emailVal}) foram validados localmente com sucesso.`;

    const notice = document.createElement("p");
    notice.className = "mb-0 small text-dark-emphasis fw-medium";
    notice.innerHTML =
      '<i class="bi bi-info-circle me-1"></i>Este portal é exclusivamente Front-End: nenhuma mensagem foi transmitida pela internet. Para envio real, é necessária integração com um servidor (backend) ou API de atendimento.';

    wrapper.append(title, summary, notice);
    feedbackBox.appendChild(wrapper);
    feedbackBox.classList.remove("d-none");

    form.reset();
    form.classList.remove("was-validated");
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      form.classList.remove("was-validated");
      feedbackBox.classList.add("d-none");
      feedbackBox.innerHTML = "";
    });
  }
}

/**
 * Controla a visibilidade e ação do botão Voltar ao Topo.
 */
function initBackToTopButton() {
  const btnTop = document.getElementById("btnTop");
  if (!btnTop) return;

  window.addEventListener(
    "scroll",
    () => {
      btnTop.classList.toggle("show", window.scrollY > 420);
    },
    { passive: true }
  );

  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}