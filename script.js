     // Footer year
      document.getElementById("year").textContent = new Date().getFullYear();

      // ===== Gallery: build slides from /gallery/1.jpg..N.jpg
      const track = document.getElementById("sliderTrack");
      const GALLERY_COUNT = 17;
      const GALLERY_PATH = "gallery";
      track.innerHTML = "";
      for (let i = 1; i <= GALLERY_COUNT; i++) {
        const slide = document.createElement("div");
        slide.className = "slider-item";
        const img = new Image();
        img.src = `${GALLERY_PATH}/${i}.jpg`;
        img.alt = `Realizacja ${i}`;
        img.loading = "lazy";
        slide.appendChild(img);
        track.appendChild(slide);
      }

      // ===== Slider: autoplay + manual nav (single interval)
      const items = track.children;
      let index = 0;
      let timer = null;
      const INTERVAL_MS = 4000;
      const ANIM_MS = 600;
      let animating = false;

      function goTo(i) {
        if (animating) return;
        animating = true;
        index = (i + items.length) % items.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        setTimeout(() => {
          animating = false;
        }, ANIM_MS + 50);
      }
      function next() {
        goTo(index + 1);
      }
      function prev() {
        goTo(index - 1);
      }
      function autoplay() {
        if (timer) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return;
        timer = setInterval(next, INTERVAL_MS);
      }
      function stop() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }
      function restart() {
        stop();
        autoplay();
      }

      document.getElementById("nextBtn").addEventListener("click", () => {
        next();
        restart();
      });
      document.getElementById("prevBtn").addEventListener("click", () => {
        prev();
        restart();
      });

      const sliderViewport = track.parentElement;
      sliderViewport.addEventListener("mouseenter", stop);
      sliderViewport.addEventListener("mouseleave", autoplay);

      window.addEventListener("load", () => {
        goTo(0);
        autoplay();
      });

      // ===== Contact FAB toggle
      const fab = document.getElementById("contactFab");
      const panel = document.getElementById("contactPanel");
      function togglePanel(force) {
        const show =
          force !== undefined ? force : panel.classList.contains("hidden");
        panel.classList.toggle("hidden", !show);
        fab.setAttribute("aria-expanded", String(show));
      }
      fab.addEventListener("click", () => togglePanel());
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") togglePanel(false);
      });
      document.addEventListener("click", (e) => {
        if (!document.getElementById("contactWidget").contains(e.target))
          togglePanel(false);
      });

      // ===== i18n dictionaries
      const i18n = {
        pl: {
          "nav.services": "Usługi",
          "nav.about": "O firmie",
          "nav.gallery": "Galeria",
          "nav.contact": "Kontakt",
          "hero.title":
            'Transport <span class="text-amber-400">&</span> Magazynowanie',
          "hero.lead":
            "L-S-M Logistik zapewnia bezpieczny i terminowy przewóz ładunków oraz elastyczne rozwiązania magazynowe. Skalujemy zasoby do Twoich potrzeb — od pojedynczych zleceń po długofalową współpracę.",
          "hero.ctaPrimary": "Zapytaj o termin",
          "hero.ctaSecondary": "Poznaj usługi",
          "hero.b1": "Trasy krajowe i międzynarodowe",
          "hero.b2": "Stała komunikacja i monitoring zleceń",
          "hero.b3": "Elastyczna dostępność pojazdów",
          "hero.b4": "Uporządkowane procesy załadunku/rozładunku",
          "hero.badge": "Terminowość, bezpieczeństwo, elastyczność.",
          "svc.transport.h": "Transport drogowy",
          "svc.transport.p":
            "Kompleksowa obsługa przewozów całopojazdowych i częściowych. Dbamy o właściwe zabezpieczenie ładunków, optymalną trasę oraz sprawną komunikację na każdym etapie. Obsługujemy zarówno zlecenia jednorazowe, jak i stałe linie.",
          "svc.transport.b1": "Kraj i zagranica",
          "svc.transport.b2": "Ładunki na paletach, w opakowaniach i luzem",
          "svc.transport.b3": "Elastyczne okna załadunku/rozładunku",
          "svc.ware.h": "Magazynowanie",
          "svc.ware.p":
            "Krótkoterminowe i okresowe przechowywanie towarów, kompletacja oraz wsparcie operacyjne przy dystrybucji. Usługę dopasowujemy do wolumenów i częstotliwości wysyłek.",
          "svc.ware.b1": "Odbiór, składowanie, przygotowanie do wysyłki",
          "svc.ware.b2": "Przeładunki i kompletacja według potrzeb",
          "svc.ware.b3": "Proste SLA i jasne warunki współpracy",
          "about.h": "O L-S-M Logistik",
          "about.p1":
            "Krótka historia L-S-M Logistik. Firma została założona 31.12.2024 r. przez dwóch facetów marzących o zrobieniu czegoś wielkiego — ludzi, którzy chcieli mieć własny biznes i postawili sobie cel, do którego wspólnymi siłami chcą dążyć.",
          "about.p2":
            "Jeden z 12-letnim doświadczeniem w branży TSL. Najpierw jako kierowca, później jako spedytor w firmie z własnym taborem. Drugi z dużym doświadczeniem w logistyce i magazynowaniu, planowaniu dostaw i szeroko pojętej dystrybucji.",
          "about.p3":
            "Naszym obszarem działania jest cała Europa. Mamy do dyspozycji powierzchnię magazynową i własny tabor. Realizujemy transporty całopojazdowe i częściowe, w tym przewozy kręgów stali naczepami typu Coilmulde oraz transporty przestrzenne naczepami MEGA. Nasze naczepy posiadają Code XL oraz certyfikaty do przewozu napojów i towarów dla przemysłu samochodowego.",
          "about.p4":
            "Możemy realizować transporty w podwójnej załodze, co daje możliwość dostawy w 48–72 h praktycznie na obszarze całej Europy. Stawiamy na rozwój i unowocześnianie posiadanej floty, żeby sprostać wymaganiom naszych klientów i przyczyniać się również do ich rozwoju. Ważne jest dla nas zacieśnianie współpracy i budowanie długotrwałych relacji.",
          "about.p5": "Dla nas najważniejsi są ludzie i relacje!",
          "gallery.sr":
            "Sekcja prezentująca wybrane realizacje — automatyczny pokaz slajdów.",
          "cta.h": "Szukasz partnera do transportu lub magazynowania?",
          "cta.btn": "Porozmawiajmy",
          "contact.h": "Kontakt",
          "contact.lead":
            "Zadzwoń lub napisz — odpowiadamy szybko i konkretnie.",
          "contact.phoneLabel": "Telefon:",
          "contact.mailLabel": "E-mail:",
          "contact.officeLabel": "Biuro:",
          "footer.rights": "Wszelkie prawa zastrzeżone.",
          "footer.tag": "Transport & Magazynowanie",
          "fab.call": "Zadzwoń",
          "fab.mail": "Napisz e-mail",
          "svc.transport.b4": "Transport kręgów stali (naczepa Coilmulde)",
          "svc.transport.b5": "Transport przestrzenny — naczepy MEGA",
        },
        en: {
          "nav.services": "Services",
          "nav.about": "About",
          "nav.gallery": "Gallery",
          "nav.contact": "Contact",
          "hero.title":
            'Transport <span class="text-amber-400">&</span> Warehousing',
          "hero.lead":
            "L-S-M Logistik provides safe, on-time transport and flexible warehousing solutions. We scale resources to your needs — from one-off jobs to long-term cooperation.",
          "hero.ctaPrimary": "Request availability",
          "hero.ctaSecondary": "See services",
          "hero.b1": "Domestic and international routes",
          "hero.b2": "Constant communication and order tracking",
          "hero.b3": "Flexible vehicle availability",
          "hero.b4": "Structured loading/unloading processes",
          "hero.badge": "On-time, safe, flexible.",
          "svc.transport.h": "Road transport",
          "svc.transport.p":
            "Comprehensive FTL and LTL services. We ensure proper cargo securing, optimal routing and clear communication at every stage. We handle both one-off jobs and regular lanes.",
          "svc.transport.b1": "Domestic & international",
          "svc.transport.b2": "Palletised, packaged and loose cargo",
          "svc.transport.b3": "Flexible loading/unloading windows",
          "svc.ware.h": "Warehousing",
          "svc.ware.p":
            "Short-term and periodic storage, order picking and operational support for distribution. The service adapts to volumes and dispatch frequency.",
          "svc.ware.b1": "Inbound, storage, outbound prep",
          "svc.ware.b2": "Cross-docking and picking as needed",
          "svc.ware.b3": "Simple SLAs and clear terms",
          "about.h": "About L-S-M Logistik",
          "about.p1":
            "A brief history of L-S-M Logistik. The company was founded on 31.12.2024 by two people aiming to build something great — entrepreneurs with a clear goal they pursue together.",
          "about.p2":
            "One brings 12 years of experience in TSL — first as a driver, later as a dispatcher in a fleet company. The other has strong experience in logistics and warehousing, delivery planning and distribution.",
          "about.p3":
            "We operate across Europe with warehouse capacity and our own fleet. We provide FTL and LTL, including steel coil transport with Coilmulde trailers and high-volume moves with MEGA trailers. Our trailers are Code XL certified and suitable for beverages and the automotive industry.",
          "about.p4":
            "We can run double-manned transports, enabling delivery within 48–72h across most of Europe. We invest in modernising our fleet to meet customers’ requirements and support their growth. Building long-term relationships matters to us.",
          "about.p5": "People and relationships come first!",
          "gallery.sr": "Selected projects — automatic slideshow.",
          "cta.h": "Looking for a partner for transport or warehousing?",
          "cta.btn": "Let’s talk",
          "contact.h": "Contact",
          "contact.lead": "Call or email — we respond quickly and clearly.",
          "contact.phoneLabel": "Phone:",
          "contact.mailLabel": "Email:",
          "contact.officeLabel": "Office:",
          "footer.rights": "All rights reserved.",
          "footer.tag": "Transport & Warehousing",
          "fab.call": "Call",
          "fab.mail": "Send email",
          "svc.transport.b4": "Steel coil transport (Coilmulde trailers)",
          "svc.transport.b5": "High-volume transport — MEGA trailers",
        },
        de: {
          "nav.services": "Leistungen",
          "nav.about": "Über uns",
          "nav.gallery": "Galerie",
          "nav.contact": "Kontakt",
          "hero.title":
            'Transport <span class="text-amber-400">&</span> Lagerung',
          "hero.lead":
            "L-S-M Logistik bietet sicheren und termingerechten Transport sowie flexible Lagerlösungen. Wir skalieren unsere Ressourcen — von Einzelaufträgen bis zu langfristiger Zusammenarbeit.",
          "hero.ctaPrimary": "Termin anfragen",
          "hero.ctaSecondary": "Leistungen ansehen",
          "hero.b1": "Inland und international",
          "hero.b2": "Ständige Kommunikation und Sendungsverfolgung",
          "hero.b3": "Flexible Fahrzeugverfügbarkeit",
          "hero.b4": "Strukturierte Be-/Entladeprozesse",
          "hero.badge": "Pünktlich, sicher, flexibel.",
          "svc.transport.h": "Straßentransport",
          "svc.transport.p":
            "Umfassende FTL- und LTL-Abwicklung. Wir sorgen für Ladungssicherung, optimale Routen und klare Kommunikation in jeder Phase. Einzelaufträge und feste Linien.",
          "svc.transport.b1": "Inland & Ausland",
          "svc.transport.b2": "Palettierte, verpackte und lose Güter",
          "svc.transport.b3": "Flexible Lade-/Entladefenster",
          "svc.ware.h": "Lagerung",
          "svc.ware.p":
            "Kurzfristige und periodische Einlagerung, Kommissionierung sowie operative Unterstützung in der Distribution. Der Service passt sich Volumen und Versandfrequenz an.",
          "svc.ware.b1": "Wareneingang, Lagerung, Versandvorbereitung",
          "svc.ware.b2": "Umschlag und Kommissionierung nach Bedarf",
          "svc.ware.b3": "Einfache SLAs und klare Konditionen",
          "about.h": "Über L-S-M Logistik",
          "about.p1":
            "Kurzgeschichte von L-S-M Logistik. Gegründet am 31.12.2024 von zwei Menschen mit dem Ziel, etwas Großes aufzubauen — Unternehmer mit einem gemeinsamen Ziel.",
          "about.p2":
            "Der eine mit 12 Jahren Erfahrung in TSL — zuerst Fahrer, später Disponent in einem Unternehmen mit eigenem Fuhrpark. Der andere mit großer Erfahrung in Logistik und Lager, Lieferplanung und Distribution.",
          "about.p3":
            "Wir sind europaweit tätig, mit Lagerkapazität und eigenem Fuhrpark. Wir fahren FTL und LTL, darunter Stahlcoil-Transporte mit Coilmulde-Aufliegern sowie Volumentransporte mit MEGA-Aufliegern. Unsere Auflieger sind nach Code XL zertifiziert und für Getränke sowie die Automobilindustrie geeignet.",
          "about.p4":
            "Wir können mit Doppelbesatzung fahren und so Lieferungen in 48–72h nahezu in ganz Europa ermöglichen. Wir investieren in die Modernisierung des Fuhrparks, um Anforderungen unserer Kunden zu erfüllen und deren Wachstum zu unterstützen. Langfristige Beziehungen sind uns wichtig.",
          "about.p5": "Menschen und Beziehungen stehen an erster Stelle!",
          "gallery.sr": "Ausgewählte Projekte – automatische Slideshow.",
          "cta.h": "Sie suchen einen Partner für Transport oder Lagerung?",
          "cta.btn": "Kontakt aufnehmen",
          "contact.h": "Kontakt",
          "contact.lead":
            "Rufen Sie an oder schreiben Sie — wir antworten schnell und konkret.",
          "contact.phoneLabel": "Telefon:",
          "contact.mailLabel": "E-Mail:",
          "contact.officeLabel": "Büro:",
          "footer.rights": "Alle Rechte vorbehalten.",
          "footer.tag": "Transport & Lagerung",
          "fab.call": "Anrufen",
          "fab.mail": "E-Mail schreiben",
          "svc.transport.b4": "Stahlcoil-Transporte (Coilmulde-Auflieger)",
          "svc.transport.b5": "Volumentransporte — MEGA-Auflieger",
        },
      };

      // Apply translations
      function applyI18n(lang) {
        document.documentElement.lang =
          lang === "en" ? "en" : lang === "de" ? "de" : "pl";
        document.querySelectorAll("[data-i18n]").forEach((el) => {
          const key = el.getAttribute("data-i18n");
          const dict = i18n[lang] || i18n.pl;
          if (dict[key] !== undefined) el.innerHTML = dict[key];
        });
        // Toggle pressed state
        document
          .getElementById("lang-pl")
          .setAttribute("aria-pressed", String(lang === "pl"));
        document
          .getElementById("lang-en")
          .setAttribute("aria-pressed", String(lang === "en"));
        document
          .getElementById("lang-de")
          .setAttribute("aria-pressed", String(lang === "de"));
      }

      function setLang(lang) {
        localStorage.setItem("lsm_lang", lang);
        applyI18n(lang);
      }

      // Init language
      const saved = localStorage.getItem("lsm_lang") || "pl";
      applyI18n(saved);

      // Lang switch handlers
      document
        .getElementById("lang-pl")
        .addEventListener("click", () => setLang("pl"));
      document
        .getElementById("lang-en")
        .addEventListener("click", () => setLang("en"));
      document
        .getElementById("lang-de")
        .addEventListener("click", () => setLang("de"));