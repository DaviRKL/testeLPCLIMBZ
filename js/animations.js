// --- LÓGICA PARA ANIMAÇÃO AO ROLAR (INTERSECTION OBSERVER) ---
  document.addEventListener('DOMContentLoaded', function() {
    
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
      root: null, // usa a viewport como área de observação
      rootMargin: '0px',
      threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Se o elemento está na viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Opcional: para de observar o elemento após a animação para economizar recursos
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Começa a observar cada elemento marcado
    revealElements.forEach(el => {
      observer.observe(el);
    });

  });
