// Main JavaScript functionality

// Global variables
let isMobileMenuOpen = false;
let isLanguageMenuOpen = false;

// Navigation functionality
function navigateToSection(section) {
    // Update active navigation
    updateActiveNavigation(section);
    
    // Scroll to section
    if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const element = document.getElementById(section);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.offsetTop - headerOffset;
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
    }
}

function updateActiveNavigation(activeSection) {
    // Update desktop navigation
    document.querySelectorAll('.nav-desktop a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.getElementById('menuIcon');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileNav.classList.add('active');
        menuIcon.className = 'fas fa-times';
    } else {
        mobileNav.classList.remove('active');
        menuIcon.className = 'fas fa-bars';
    }
}

// Language menu functionality
function toggleLanguageMenu() {
    const langMenu = document.getElementById('langMenu');
    isLanguageMenuOpen = !isLanguageMenuOpen;
    
    if (isLanguageMenuOpen) {
        langMenu.classList.add('active');
    } else {
        langMenu.classList.remove('active');
    }
}

// Quote calculator functionality
function calculateQuote() {
    const form = document.getElementById('quoteForm');
    const formData = new FormData(form);
    
    const productType = formData.get('productType');
    const width = parseFloat(formData.get('width'));
    const height = parseFloat(formData.get('height'));
    const pages = parseInt(formData.get('pages'));
    const color = formData.get('color');
    const quantity = parseInt(formData.get('quantity'));
    
    // Calculate quote
    const basePrice = productType === 'lined' ? 2.80 : 3.50;
    const sizeMultiplier = (width * height) / (21 * 29.7);
    const pageMultiplier = Math.max(0.5, pages / 100);
    const colorMultiplier = color === 'custom' ? 1.3 : color === 'black' ? 1 : 1.1;
    
    let quantityDiscount = 1;
    if (quantity >= 5000) quantityDiscount = 0.7;
    else if (quantity >= 2000) quantityDiscount = 0.8;
    else if (quantity >= 1000) quantityDiscount = 0.9;
    
    const totalPrice = basePrice * sizeMultiplier * pageMultiplier * colorMultiplier * quantity * quantityDiscount;
    
    // Show result
    const resultDiv = document.getElementById('quoteResult');
    const priceDiv = document.getElementById('resultPrice');
    
    priceDiv.textContent = `€${totalPrice.toFixed(2)}`;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// FAQ functionality
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const currentItem = faqItems[index];
    
    // Close all other items
    faqItems.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    currentItem.classList.toggle('active');
}

// Contact form functionality
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    const submitBtn = form.querySelector('.contact-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="loading"></div> Invio in corso...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Show success message
        showMessage('success', 'Messaggio inviato con successo! Ti risponderemo presto.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Message display functionality
function showMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${text}
    `;
    
    const form = document.getElementById('contactForm');
    form.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Scroll handling for navigation
function handleScroll() {
    const sections = ['home', 'products', 'gallery', 'quote', 'faq', 'contact'];
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = section === 'home' 
            ? { offsetTop: 0 }
            : document.getElementById(section);
        
        if (element && scrollPosition >= element.offsetTop) {
            updateActiveNavigation(section);
            break;
        }
    }
    
    // Header background on scroll
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        img.classList.add('lazy-image');
        imageObserver.observe(img);
    });
}

// Close menus when clicking outside
function handleOutsideClick(event) {
    const langMenu = document.getElementById('langMenu');
    const langBtn = document.querySelector('.lang-btn');
    
    if (!langBtn.contains(event.target) && !langMenu.contains(event.target)) {
        langMenu.classList.remove('active');
        isLanguageMenuOpen = false;
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop - headerOffset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });
    
    return isValid;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeProducts();
    initializeAnimations();
    initializeLazyLoading();
    initializeSmoothScrolling();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleOutsideClick);
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Quote form validation
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        const inputs = quoteForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // Hide previous result when form changes
                const resultDiv = document.getElementById('quoteResult');
                if (resultDiv.style.display === 'block') {
                    resultDiv.style.display = 'none';
                }
            });
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.getElementById('langMenu').classList.remove('active');
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        }
    });
    
    // Initialize language
    const savedLanguage = localStorage.getItem('language') || 'it';
    if (savedLanguage !== 'it') {
        changeLanguage(savedLanguage);
    }
    
    console.log('Art Production website initialized successfully!');
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg',
        'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg',
        'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

 /*function showCatalog(category) {
    if (category === 'unlined') {
        window.open('catalogo_quaderni_SV.pdf', '_blank');
    } else if (category === 'lined') {
        window.open('catalogo_quaderni_CV1.pdf', '_blank');
    }
}

function goToProducts() {
    closePDF(); // Ferme le PDF modal
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
*/

// Ouvrir le PDF dans le modal
 /*function showCatalog(type) {
    const pdfModal = document.getElementById('pdfModal');
    const pdfFrame = document.getElementById('pdfFrame');

    // Charger le PDF correspondant
    pdfFrame.src = 'catalog-' + type + '.pdf';

    // Afficher le modal
    pdfModal.style.display = 'flex';
}

// Fermer le modal
function closePDF() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfFrame = document.getElementById('pdfFrame');

    pdfModal.style.display = 'none';
    pdfFrame.src = '';
}

// Naviguer vers la section Produits
function goToProducts() {
    closePDF(); // Ferme le PDF
    setTimeout(() => { 
        navigateToSection('products'); // Va à la section Produits
    }, 100); // délai pour s'assurer que le modal est fermé
} */

   // Ouvre le PDF du catalogue

 function showCatalog(type) {
    let pdfFile = '';
    if(type === 'unlined') pdfFile = 'catalogo_quaderni_CV1.pdf';
    if(type === 'lined') pdfFile = 'catalogo_quaderni_SV.pdf';

    // Détection mobile simple
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(isMobile) {
        // Sur mobile : ouvrir le PDF dans un nouvel onglet
        window.open(pdfFile, '_blank');
    } else {
        // Sur desktop : ouvrir le PDF dans le modal
        const pdfModal = document.getElementById('pdfModal');
        const pdfFrame = document.getElementById('pdfFrame');
        pdfFrame.src = pdfFile;
        pdfModal.style.display = 'flex';
    }
}

// Fonction pour fermer le modal PDF
function closePDF() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfFrame = document.getElementById('pdfFrame');
    pdfFrame.src = ''; // reset pour libérer la mémoire
    pdfModal.style.display = 'none';
}

// Bouton "Torna ai Prodotti" pour desktop
function goToProducts() {
    closePDF();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}


// Quand tu ouvres la lightbox ou le catalogue
document.body.classList.add("modal-open");

// Quand tu fermes la lightbox ou le catalogue
document.body.classList.remove("modal-open");



function goToProducts() {
    const pdfModal = document.getElementById('pdfModal');
    pdfModal.style.display = 'none';
    
    // Scroll vers la section produits
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
