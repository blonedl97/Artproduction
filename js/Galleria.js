class ArtproductionGallery {
    constructor() {
        this.currentFilter = 'all';
        this.currentImageIndex = 0;
        this.images = [];
        this.filteredImages = [];

        this.initializeElements();
        this.bindEvents();
        this.loadImages();
    }

    initializeElements() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.galleryGrid = document.querySelector('.gallery-grid');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.querySelector('.lightbox-image');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.lightboxPrev = document.querySelector('.lightbox-prev');
        this.lightboxNext = document.querySelector('.lightbox-next');
        this.lightboxOverlay = document.querySelector('.lightbox-overlay');
        this.loadMoreBtn = document.querySelector('.load-more-btn');
        this.heroCtaBtn = document.querySelector('.hero-cta');
        this.navLinks = document.querySelectorAll('.nav-link');
    }

    bindEvents() {
        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // View buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-btn')) {
                const imageUrl = e.target.dataset.image;
                this.openLightbox(imageUrl);
            }
        });

        // Lightbox controls
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxOverlay.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.previousImage());
        this.lightboxNext.addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Load more button
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreImages());

        // Hero CTA button
        this.heroCtaBtn.addEventListener('click', () => {
            document.getElementById('galleria').scrollIntoView({ behavior: 'smooth' });
        });

        // Smooth scroll for navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Intersection Observer for animations
        this.setupScrollAnimations();
    }

    loadImages() {
        this.images = Array.from(this.galleryItems).map(item => {
            const img = item.querySelector('img');
            const viewBtn = item.querySelector('.view-btn');
            return {
                element: item,
                category: item.dataset.category,
                thumbnail: img.src,
                fullSize: viewBtn.dataset.image,
                title: item.querySelector('h4').textContent,
                description: item.querySelector('p').textContent
            };
        });
        this.filteredImages = [...this.images];
    }

    handleFilterClick(e) {
        const filter = e.target.dataset.filter;

        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        this.currentFilter = filter;
        this.filterImages();
    }

    filterImages() {
        this.galleryItems.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = this.currentFilter === 'all' || category === this.currentFilter;

            if (shouldShow) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        this.filteredImages = this.images.filter(img =>
            this.currentFilter === 'all' || img.category === this.currentFilter
        );
    }

    openLightbox(imageUrl) {
        this.currentImageIndex = this.filteredImages.findIndex(img => img.fullSize === imageUrl);
        this.lightboxImage.src = imageUrl;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.preloadAdjacentImages();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    previousImage() {
        this.currentImageIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : this.filteredImages.length - 1;
        this.updateLightboxImage();
    }

    nextImage() {
        this.currentImageIndex = this.currentImageIndex < this.filteredImages.length - 1 ? this.currentImageIndex + 1 : 0;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        if (this.filteredImages[this.currentImageIndex]) {
            this.lightboxImage.src = this.filteredImages[this.currentImageIndex].fullSize;
            this.preloadAdjacentImages();
        }
    }

    preloadAdjacentImages() {
        const preloadIndexes = [
            this.currentImageIndex - 1 >= 0 ? this.currentImageIndex - 1 : this.filteredImages.length - 1,
            this.currentImageIndex + 1 < this.filteredImages.length ? this.currentImageIndex + 1 : 0
        ];

        preloadIndexes.forEach(index => {
            if (this.filteredImages[index]) {
                const img = new Image();
                img.src = this.filteredImages[index].fullSize;
            }
        });
    }

    handleKeydown(e) {
        if (!this.lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.previousImage();
                break;
            case 'ArrowRight':
                this.nextImage();
                break;
        }
    }

    loadMoreImages() {
        const newImages = [
            // --- Exemple de structure pour tes images ---
            {
                src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_7b.jpg',
                fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_7b.jpg',
                category: 'quadretti',
                title: 'Quaderno 7B',
                description: 'Quaderno quadretti'
            },
            {
                src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_1a.jpg',
                fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_1a.jpg',
                category: 'quadretti',
                title: 'Quaderno 1A',
                description: 'Quaderno quadretti'
            },
            {
                src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_1a.jpg',
                fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_1a.jpg',
                category: 'quadri',
                title: 'Quaderno CV 1A',
                description: 'Quaderno quadri'
            },
            // ... ajoute toutes tes autres images ici

           // Série 19 - quad-cv
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_1a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_1a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 1A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_1b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_1b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 1B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_2a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_2a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 2A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_2b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_2b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 2B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_3a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_3a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 3A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_3b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_3b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 3B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_4a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_4a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 4A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_4b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_4b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 4B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_5a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_5a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 5A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_5b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_5b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 5B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_6a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_6a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 6A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_6b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_6b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 6B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_7a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_7a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 7A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_7b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_7b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 7B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_8a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_8a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 8A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_8b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_8b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 8B',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_9a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_9a.jpg',
        category: 'quadri',
        title: 'Quaderno CV 9A',
        description: 'Quaderno quadri'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/19/quad-cv_9b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/19/quad-cv_9b.jpg',
        category: 'quadri',
        title: 'Quaderno CV 9B',
        description: 'Quaderno quadri'
    },

    // Série 20 - quad-sv
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_7b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_7b.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 7B',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_1a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_1a.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 1A',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_1b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_1b.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 1B',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_2a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_2a.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 2A',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_2b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_2b.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 2B',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_3a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_3a.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 3A',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_3b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_3b.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 3B',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_4a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_4a.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 4A',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_4b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_4b.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 4B',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_5a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_5a.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 5A',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_5b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_5b.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 5B',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_6a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_6a.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 6A',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_6b.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_6b.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 6B',
        description: 'Quaderno quadretti'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/20/quad-sv_7a.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/20/quad-sv_7a.jpg',
        category: 'quadretti',
        title: 'Quaderno SV 7A',
        description: 'Quaderno quadretti'
    },


    {
        src: 'https://www.art-production.it/imgs/gallery/17/steinera4_1.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/17/steinera4_1.jpg',
        category: 'steiner-a4',
        title: 'Steiner A4 1',
        description: 'Pagina Steiner A4'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/17/steinera4_2.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/17/steinera4_2.jpg',
        category: 'steiner-a4',
        title: 'Steiner A4 2',
        description: 'Pagina Steiner A4'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/17/steinera4_3.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/17/steinera4_3.jpg',
        category: 'steiner-a4',
        title: 'Steiner A4 3',
        description: 'Pagina Steiner A4'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/17/steinera4_4.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/17/steinera4_4.jpg',
        category: 'steiner-a4',
        title: 'Steiner A4 4',
        description: 'Pagina Steiner A4'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/17/steinera4_5.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/17/steinera4_5.jpg',
        category: 'steiner-a4',
        title: 'Steiner A4 5',
        description: 'Pagina Steiner A4'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/17/steinera4_6.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/17/steinera4_6.jpg',
        category: 'steiner-a4',
        title: 'Steiner A4 6',
        description: 'Pagina Steiner A4'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/17/steiner_interno%20a4.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/17/steiner_interno%20a4.jpg',
        category: 'steiner-a4',
        title: 'Steiner Interno A4',
        description: 'Pagina interna Steiner A4'
    },

    // Steiner A5
    {
        src: 'https://www.art-production.it/imgs/gallery/18/steinera5_1.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/18/steinera5_1.jpg',
        category: 'steiner-a5',
        title: 'Steiner A5 1',
        description: 'Pagina Steiner A5'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/18/steinera5_2.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/18/steinera5_2.jpg',
        category: 'steiner-a5',
        title: 'Steiner A5 2',
        description: 'Pagina Steiner A5'
    },
    {
        src: 'https://www.art-production.it/imgs/gallery/18/steinera5_3.jpg',
        fullSize: 'https://www.art-production.it/imgs/gallery/18/steinera5_3.jpg',
        category: 'steiner-a5',
        title: 'Steiner A5 3',
        description: 'Pagina Steiner A5'
    }

        ];

        newImages.forEach((imageData, index) => {
            setTimeout(() => {
                this.createGalleryItem(imageData);
            }, index * 200);
        });

        // Mettre à jour galleryItems et filteredImages après ajout
        setTimeout(() => {
            this.galleryItems = document.querySelectorAll('.gallery-item');
            this.filterImages();
        }, newImages.length * 200 + 50);

        // Animation du bouton
        this.loadMoreBtn.textContent = 'Caricamento...';
        this.loadMoreBtn.disabled = true;

        setTimeout(() => {
            this.loadMoreBtn.textContent = 'Carica altri quaderni';
            this.loadMoreBtn.disabled = false;
        }, 1000);
    }

    createGalleryItem(imageData) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = imageData.category;

        galleryItem.innerHTML = `
            <img src="${imageData.src}" alt="${imageData.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${imageData.title}</h4>
                <p>${imageData.description}</p>
                <button class="view-btn" data-image="${imageData.fullSize}">Vedi</button>
            </div>
        `;

        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(30px)';

        this.galleryGrid.appendChild(galleryItem);

        setTimeout(() => {
            galleryItem.style.transition = 'all 0.6s ease';
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, 100);

        this.images.push({
            element: galleryItem,
            category: imageData.category,
            thumbnail: imageData.src,
            fullSize: imageData.fullSize,
            title: imageData.title,
            description: imageData.description
        });

        if (this.currentFilter === 'all' || this.currentFilter === imageData.category) {
            this.filteredImages.push(this.images[this.images.length - 1]);
        }
    }

    setupScrollAnimations() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('animate-in');
            });
        }, observerOptions);

        document.querySelectorAll('.gallery-item, .filter-buttons, .hero-content').forEach(el => {
            observer.observe(el);
        });
    }

    updateGallery() {
        this.loadImages();
        this.filterImages();
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    window.artproductionGallery = new ArtproductionGallery();
});

// Polyfill smooth scroll
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    };
    smoothScrollPolyfill();
}

// Lazy loading
const lazyLoadImages = () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);

function toggleMobileMenu() {
    const menu = document.getElementById("nav-mobile");
    menu.classList.toggle("show");
}
