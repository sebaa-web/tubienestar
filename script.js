/* Codigo creado por IA */

function scrollLento(destino, duracion = 1000) {
    const inicio = window.pageYOffset;
    const final = destino.getBoundingClientRect().top + inicio;
    const distancia = final - inicio;
    let inicioTiempo = null;

    function animarScroll(tiempoActual) {
        if (!inicioTiempo) inicioTiempo = tiempoActual;
        const tiempoPasado = tiempoActual - inicioTiempo;
        const progreso = Math.min(tiempoPasado / duracion, 1);
        window.scrollTo(0, inicio + distancia * progreso);
        if (progreso < 1) requestAnimationFrame(animarScroll);
    }

    requestAnimationFrame(animarScroll);
    }

    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        scrollLento(destino, 200);
    });
    });

    window.addEventListener('scroll', function () {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    });

    window.addEventListener('load', () => {
        const loader = document.getElementById('pantalla-carga');
        loader.style.opacity = '0';
        setTimeout(() => {
        loader.style.display = 'none';
        }, 500);
    });

    window.addEventListener('load', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.add('visible');
        document.getElementById('banner_div').style.display = 'block';
    });

    const elementosAnimables = document.querySelectorAll('.scroll-animado');

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elementosAnimables.forEach(el => observer.observe(el));

    const acceptBtn = document.getElementById('accept-cookies');

    document.getElementById('contact_form').addEventListener('submit', function(e) {
        const nombre = document.getElementById('name_form');
        const email = document.getElementById('email_form');
        const mensaje = document.getElementById('message_form');
        const cookiesDiv = document.getElementById('cookie-banner');
        const erroresDiv = document.getElementById('errores_formulario');

        let errores = [];

        if (nombre.value.trim().length < 3) {
            errores.push("El nombre debe tener al menos 3 caracteres.");
            nombre.style.border = "2px solid red";
        }

        if (email.value.trim() === "") {
            errores.push("El correo electrónico es obligatorio.");
            email.style.border = "2px solid red";
        } 
        else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                errores.push("El correo electrónico no es válido.");
                email.style.border = "2px solid red";
            }
        }

        if (mensaje.value.trim().length < 10) {
            errores.push("El mensaje debe tener al menos 10 caracteres.");
            mensaje.style.border = "2px solid red";
        }

        if (!localStorage.getItem('cookiesAccepted')) {
            errores.push("Para contactarnos debes aceptar las cookies.");
            cookiesDiv.style.border = "2px solid red";
            acceptBtn.style.border = "2px solid red";
        }

        if (errores.length > 0) {
            e.preventDefault();
            erroresDiv.innerHTML = errores.map(e => `<p><span class="error">• ${e} </span></p>`).join("");
            erroresDiv.style.opacity = "1";

            setTimeout(() => {
                erroresDiv.style.opacity = "0";
                nombre.style.border = "2px solid #663a4b";
                email.style.border = "2px solid #663a4b";
                mensaje.style.border = "2px solid #663a4b";
                cookiesDiv.style.border = "none";
                acceptBtn.style.border = "none";
            }, 7000);

            setTimeout(() => {
                erroresDiv.innerHTML = "";
            }, 7500);
        
        } else {
            nombre.style.border = "2px solid #663a4b";
            email.style.border = "2px solid #663a4b";
            mensaje.style.border = "2px solid #663a4b";
            erroresDiv.innerHTML = "";
            erroresDiv.style.opacity = "0";
        }
    });

    const banner = document.getElementById('cookie-banner');

    if (!localStorage.getItem('cookiesAccepted')) {
        banner.style.display = 'flex';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.style.display = 'none';
    });

    if (!localStorage.getItem('cookiesAccepted')) {
        banner.style.display = 'flex'; // Mostrar cartel
    } else {
        banner.style.display = 'none'; // Ocultar si ya aceptó
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.classList.add('fade-out');

        setTimeout(() => {
            banner.style.display = 'none';
        }, 800);
    });

const phrases = [
  '<span class="title_spans">Relajate</span> con el <span class="title_spans">Reiki</span>,',
  '<span class="title_spans">Relajate</span> con la <span class="title_spans">Meditación</span>,',
  '<span class="title_spans">Relajate</span> con <span class="title_spans">Magnified Healing</span>,',
  '<span class="title_spans">Relajate</span> con <span class="title_spans">Masajes</span>,'
];

let index = 0;
const textElement = document.getElementById("relax-text");

setInterval(() => {
  textElement.style.opacity = 0;
  setTimeout(() => {
    index = (index + 1) % phrases.length;
    textElement.innerHTML = phrases[index];
    textElement.style.opacity = 1;
  }, 1000);
}, 4000);

const navbar = document.getElementById("navbar");

let lastScrollY = window.pageYOffset;
let isScrollingDown = false;
let hideTimer = null;

const HIDE_DELAY = 800;        // delay para scroll suave
const FAST_SCROLL = 50;        // umbral de velocidad para ocultar instantáneo
const SCROLL_THRESHOLD = 5;    // evita sensibilidad a pequeños movimientos
const SAFE_TOP = 100;          // siempre visible cerca del inicio

window.addEventListener("scroll", () => {
  const y = window.pageYOffset;
  const delta = y - lastScrollY;

  // Mantener visible cerca del inicio
  if (y < SAFE_TOP) {
    isScrollingDown = false;
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    navbar.classList.remove("hidden");
    lastScrollY = y;
    return;
  }

  if (delta > SCROLL_THRESHOLD) {
    // Bajando
    if (!isScrollingDown) {
      isScrollingDown = true;

      if (delta > FAST_SCROLL) {
        // Bajada rápida → ocultar sin delay
        navbar.classList.add("hidden");
      } else {
        // Bajada suave → esperar antes de ocultar
        hideTimer = setTimeout(() => {
          navbar.classList.add("hidden");
        }, HIDE_DELAY);
      }
    }
    // Si ya estaba bajando, no reiniciar timers
  } else if (delta < -SCROLL_THRESHOLD) {
    // Subiendo → mostrar inmediatamente
    isScrollingDown = false;
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    navbar.classList.remove("hidden");
  }

  lastScrollY = y <= 0 ? 0 : y;
});

/* Fin del codigo creado por IA */

/* Servicios */

let servicios = [
    {
        id: 1,
        nombre: "Reiki",
        descripcion: "Sesiones de Reiki para equilibrar tu energía y promover la sanación.",
    },
    {
        id: 2,
        nombre: "Masajes",
        descripcion: "Masajes terapéuticos para aliviar el estrés y mejorar el bienestar.",
    },
    {
        id: 3,
        nombre: "Meditacion",
        descripcion: "Sesiones de meditación para encontrar paz interior y reducir la ansiedad.",
    },
    {
        id: 4,
        nombre: "Magnified Healing",
        descripcion: "Terapia de Magnified Healing para sanar a nivel físico, emocional y espiritual.",
    }
];

const serviciosContainer = document.getElementById("cards_container");

servicios.forEach(servicio => {
    const article = document.createElement("article");
    article.classList.add("card");
    article.innerHTML = `
        <h3 class="card_name">${servicio.nombre}</h3>
        <p class="card_description">${servicio.descripcion}</p>
    `;
    serviciosContainer.appendChild(article);
});