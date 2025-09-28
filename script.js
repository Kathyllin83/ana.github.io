
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA TELA DE CARREGAMENTO (PRELOADER) ---
    // Adiciona a classe 'loaded' ao body quando toda a página, incluindo imagens, carregar.
    // O CSS usa essa classe para fazer a transição e esconder o preloader.
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // --- LÓGICA PARA ANIMAÇÃO DE ROLAGEM GERAL E DA LINHA DO TEMPO ---
    // Usa a API IntersectionObserver para detectar quando um elemento entra na tela.
    const animatedItems = document.querySelectorAll('.content-section, .timeline-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Se o item estiver visível, adiciona a classe 'visible'.
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // A animação começa quando 10% do item estiver visível.

    animatedItems.forEach(item => {
        observer.observe(item);
    });

    // --- LÓGICA PARA O MENU DE NAVEGAÇÃO E BOTÃO VOLTAR AO TOPO ---
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero');
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Um único evento de rolagem para controlar ambos os elementos por eficiência.
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Lógica de visibilidade do Menu
        if (scrollPosition > heroSection.offsetHeight) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }

        // Lógica de visibilidade do Botão Voltar ao Topo
        if (scrollPosition > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Adiciona o efeito de rolagem suave para todos os links de navegação e para o botão "Voltar ao Topo".
    document.querySelectorAll('.nav-links a, .back-to-top').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- LÓGICA PARA O PLAYER DE MÚSICA ---
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.classList.add('playing');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });
    }
    
    // --- LÓGICA PARA O SLIDER "ANTES & DEPOIS" ---
    const slider = document.getElementById('comparison-slider');
    if (slider) {
        const overlay = document.getElementById('comparison-overlay');
        const handle = document.getElementById('comparison-handle');
        let isDragging = false;

        // Função que move a barra e a imagem de sobreposição.
        function moveSlider(x) {
            const rect = slider.getBoundingClientRect();
            // Calcula a posição do cursor como uma porcentagem da largura do slider.
            let position = ((x - rect.left) / rect.width) * 100;
            // Garante que a posição fique entre 0 e 100.
            position = Math.max(0, Math.min(100, position)); 
            
            overlay.style.width = position + '%';
            handle.style.left = position + '%';
        }

        // Eventos para mouse
        slider.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
        slider.addEventListener('mouseup', () => { isDragging = false; });
        slider.addEventListener('mouseleave', () => { isDragging = false; });
        slider.addEventListener('mousemove', (e) => {
            if (isDragging) { moveSlider(e.clientX); }
        });

        // Eventos para toque (dispositivos móveis)
        slider.addEventListener('touchstart', (e) => { isDragging = true; });
        slider.addEventListener('touchend', () => { isDragging = false; });
        slider.addEventListener('touchmove', (e) => {
            if (isDragging) { moveSlider(e.touches[0].clientX); }
        });
    }

    // --- LÓGICA PARA A GALERIA LIGHTBOX ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    function showLightbox(index) {
        lightbox.style.display = 'flex'; // Usar flex para melhor centralização
        lightboxImg.src = galleryItems[index].src;
        currentIndex = index;
    }

    function hideLightbox() {
        lightbox.style.display = 'none';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showLightbox(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => showLightbox(index));
    });

    closeBtn.addEventListener('click', hideLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Adiciona navegação por teclado (Esc, Setas) e fechar clicando fora.
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') hideLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
    });
});
