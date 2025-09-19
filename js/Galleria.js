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
            document.getElementById('galleria').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });

        // Smooth scroll for navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active nav link
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
        
        // Update active filter button
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

        // Update filtered images array for lightbox navigation
        this.filteredImages = this.images.filter(img => 
            this.currentFilter === 'all' || img.category === this.currentFilter
        );
    }

    openLightbox(imageUrl) {
        this.currentImageIndex = this.filteredImages.findIndex(img => img.fullSize === imageUrl);
        this.lightboxImage.src = imageUrl;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Preload adjacent images
        this.preloadAdjacentImages();
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    previousImage() {
        this.currentImageIndex = this.currentImageIndex > 0 
            ? this.currentImageIndex - 1 
            : this.filteredImages.length - 1;
        this.updateLightboxImage();
    }

    nextImage() {
        this.currentImageIndex = this.currentImageIndex < this.filteredImages.length - 1 
            ? this.currentImageIndex + 1 
            : 0;
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
        
        switch(e.key) {
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
        // Simuler le chargement de nouvelles images
        const newImages = [
            {
                src: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
                fullSize: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
                category: 'bianco',
                title: 'Quaderno Ecologico',
                description: 'Carta riciclata'
            },
            {
                src: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
                fullSize: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
                category: 'quadretti',
                title: 'Quaderno Tecnico',
                description: 'Per disegno tecnico'
            },
            {
                src: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
                fullSize: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
                category: 'premium',
                title: 'Quaderno Executive',
                description: 'Business collection'
            }
        ];

        newImages.forEach((imageData, index) => {
            setTimeout(() => {
                this.createGalleryItem(imageData);
            }, index * 200);
        });

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

        // Animation d'entrée
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(30px)';
        
        this.galleryGrid.appendChild(galleryItem);
        
        // Trigger animation
        setTimeout(() => {
            galleryItem.style.transition = 'all 0.6s ease';
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        }, 100);

        // Update images array
        this.images.push({
            element: galleryItem,
            category: imageData.category,
            thumbnail: imageData.src,
            fullSize: imageData.fullSize,
            title: imageData.title,
            description: imageData.description
        });

        // Update filtered images if current filter matches
        if (this.currentFilter === 'all' || this.currentFilter === imageData.category) {
            this.filteredImages.push(this.images[this.images.length - 1]);
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        document.querySelectorAll('.gallery-item, .filter-buttons, .hero-content').forEach(el => {
            observer.observe(el);
        });
    }

    // Method to handle dynamic content updates
    updateGallery() {
        this.loadImages();
        this.filterImages();
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.artproductionGallery = new ArtproductionGallery();
});

// Smooth scroll behavior for older browsers
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
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    smoothScrollPolyfill();
}

// Performance optimization: Lazy loading enhancement
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

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

function toggleMobileMenu() {
  const menu = document.getElementById("nav-mobile");
  menu.classList.toggle("show");
}