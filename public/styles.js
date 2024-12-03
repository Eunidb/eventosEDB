document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const intervalTime = 5000; // Tiempo en milisegundos
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    slideInterval = setTimeout(nextSlide, intervalTime); // Reinicia el temporizador
  }

  function startSlider() {
    slideInterval = setTimeout(nextSlide, intervalTime);
  }

  function stopSlider() {
    clearTimeout(slideInterval);
  }

  // Inicia el carrusel
  startSlider();


  document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".event-card img");
    const options = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                observer.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => {
        observer.observe(img);
    });
});


  /* nav*/
  let prevScrollPos = window.scrollY;
  const header = document.getElementById("header");
  
  window.onscroll = function() {
      let currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
          header.classList.remove("header-hidden");
      } else {
          header.classList.add("header-hidden");
      }
      prevScrollPos = currentScrollPos;
  }

  document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const curveUp = document.querySelector('.curveUpColor');
    const scrollTop = window.scrollY;

    // Ajusta la posición del header si el desplazamiento es mayor a un valor específico
    if (scrollTop > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
});

});
