// Translation system
const translations = {
    it: {
        nav: {
            home: 'Home',
            products: 'Prodotti',
            gallery: 'Galleria',
            quote: 'Preventivo',
            faq: 'FAQ',
            contact: 'Contatti'
        },
        hero: {
            title: 'Art Production',
            subtitle: 'Stampiamo i tuoi sogni educativi. Libri e quaderni di qualità per le scuole dell\'Emilia-Romagna.',
            cta: 'Scopri i nostri prodotti'
        },
        products: {
            title: 'I Nostri Prodotti',
            unlined: {
                title: 'Libri e Quaderni Bianchi',
                description: 'Perfetti per disegno, arte e creatività. Carta di alta qualità per esprimere liberamente le tue idee.',
                viewCatalog: 'Visualizza Catalogo'
            },
            lined: {
                title: 'Libri e Quaderni Rigati',
                description: 'Ideali per scrittura e appunti. Righe precise per una scrittura ordinata e professionale.',
                viewCatalog: 'Visualizza Catalogo'
            }
        },
        gallery: {
            title: 'La Nostra Galleria',
            subtitle: 'Scopri la qualità e varietà dei nostri prodotti'
        },
        quote: {
            title: 'Richiedi un Preventivo',
            subtitle: 'Ottieni un preventivo personalizzato per i tuoi prodotti',
            form: {
                productType: 'Tipo di Prodotto',
                width: 'Larghezza (cm)',
                height: 'Altezza (cm)',
                pages: 'Numero di Pagine',
                color: 'Colore',
                quantity: 'Quantità',
                calculate: 'Calcola Preventivo',
                result: 'Preventivo Stimato'
            },
            colors: {
                black: 'Nero',
                blue: 'Blu',
                red: 'Rosso',
                green: 'Verde',
                custom: 'Personalizzato'
            }
        },
        faq: {
            title: 'Domande Frequenti',
            questions: [
                {
                    question: 'Qual è il tempo di consegna per gli ordini?',
                    answer: 'I tempi di consegna variano da 5 a 15 giorni lavorativi a seconda della quantità e complessità dell\'ordine.'
                },
                {
                    question: 'Offrite sconti per ordini di grandi quantità?',
                    answer: 'Sì, offriamo sconti progressivi per ordini superiori a 1000 pezzi. Contattaci per un preventivo personalizzato.'
                },
                {
                    question: 'Posso personalizzare il design della copertina?',
                    answer: 'Assolutamente! Offriamo servizi di personalizzazione completa per copertine, inclusi loghi e design specifici.'
                },
                {
                    question: 'Che tipo di carta utilizzate?',
                    answer: 'Utilizziamo solo carta di alta qualità, certificata FSC, disponibile in diverse grammature (80g, 90g, 100g).'
                }
            ]
        },
        contact: {
            title: 'Contattaci',
            subtitle: 'Siamo qui per aiutarti con qualsiasi domanda o richiesta',
            form: {
                name: 'Nome Completo',
                email: 'Email',
                phone: 'Telefono',
                subject: 'Oggetto',
                message: 'Messaggio',
                send: 'Invia Messaggio'
            },
            info: {
                address: 'Via Roma 123, 40121 Bologna, Emilia-Romagna',
                phone: '+39 051 123 4567',
                email: 'info@art-production.it',
                hours: 'Lun-Ven: 8:00-18:00, Sab: 9:00-13:00'
            }
        },
        footer: {
            description: 'Art Production è la vostra stamperia di fiducia in Emilia-Romagna, specializzata in libri e quaderni per l\'educazione.',
            quickLinks: 'Link Rapidi',
            followUs: 'Seguici',
            rights: 'Tutti i diritti riservati.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            products: 'Products',
            gallery: 'Gallery',
            quote: 'Quote',
            faq: 'FAQ',
            contact: 'Contact'
        },
        hero: {
            title: 'Art Production',
            subtitle: 'We print your educational dreams. Quality books and notebooks for schools in Emilia-Romagna.',
            cta: 'Discover our products'
        },
        products: {
            title: 'Our Products',
            unlined: {
                title: 'Blank Books & Notebooks',
                description: 'Perfect for drawing, art and creativity. High-quality paper to freely express your ideas.',
                viewCatalog: 'View Catalog'
            },
            lined: {
                title: 'Lined Books & Notebooks',
                description: 'Ideal for writing and notes. Precise lines for neat and professional writing.',
                viewCatalog: 'View Catalog'
            }
        },
        gallery: {
            title: 'Our Gallery',
            subtitle: 'Discover the quality and variety of our products'
        },
        quote: {
            title: 'Request a Quote',
            subtitle: 'Get a personalized quote for your products',
            form: {
                productType: 'Product Type',
                width: 'Width (cm)',
                height: 'Height (cm)',
                pages: 'Number of Pages',
                color: 'Color',
                quantity: 'Quantity',
                calculate: 'Calculate Quote',
                result: 'Estimated Quote'
            },
            colors: {
                black: 'Black',
                blue: 'Blue',
                red: 'Red',
                green: 'Green',
                custom: 'Custom'
            }
        },
        faq: {
            title: 'Frequently Asked Questions',
            questions: [
                {
                    question: 'What is the delivery time for orders?',
                    answer: 'Delivery times vary from 5 to 15 working days depending on the quantity and complexity of the order.'
                },
                {
                    question: 'Do you offer discounts for large quantity orders?',
                    answer: 'Yes, we offer progressive discounts for orders over 1000 pieces. Contact us for a personalized quote.'
                },
                {
                    question: 'Can I customize the cover design?',
                    answer: 'Absolutely! We offer complete customization services for covers, including logos and specific designs.'
                },
                {
                    question: 'What type of paper do you use?',
                    answer: 'We only use high-quality, FSC-certified paper, available in different weights (80g, 90g, 100g).'
                }
            ]
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'We\'re here to help with any questions or requests',
            form: {
                name: 'Full Name',
                email: 'Email',
                phone: 'Phone',
                subject: 'Subject',
                message: 'Message',
                send: 'Send Message'
            },
            info: {
                address: 'Via Roma 123, 40121 Bologna, Emilia-Romagna',
                phone: '+39 051 123 4567',
                email: 'info@art-production.it',
                hours: 'Mon-Fri: 8:00-18:00, Sat: 9:00-13:00'
            }
        },
        footer: {
            description: 'Art Production is your trusted printing company in Emilia-Romagna, specialized in books and notebooks for education.',
            quickLinks: 'Quick Links',
            followUs: 'Follow Us',
            rights: 'All rights reserved.'
        }
    },
    fr: {
        nav: {
            home: 'Accueil',
            products: 'Produits',
            gallery: 'Galerie',
            quote: 'Devis',
            faq: 'FAQ',
            contact: 'Contact'
        },
        hero: {
            title: 'Art Production',
            subtitle: 'Nous imprimons vos rêves éducatifs. Livres et cahiers de qualité pour les écoles d\'Émilie-Romagne.',
            cta: 'Découvrir nos produits'
        },
        products: {
            title: 'Nos Produits',
            unlined: {
                title: 'Livres et Cahiers Blancs',
                description: 'Parfaits pour le dessin, l\'art et la créativité. Papier de haute qualité pour exprimer librement vos idées.',
                viewCatalog: 'Voir le Catalogue'
            },
            lined: {
                title: 'Livres et Cahiers Lignés',
                description: 'Idéaux pour l\'écriture et les notes. Lignes précises pour une écriture ordonnée et professionnelle.',
                viewCatalog: 'Voir le Catalogue'
            }
        },
        gallery: {
            title: 'Notre Galerie',
            subtitle: 'Découvrez la qualité et la variété de nos produits'
        },
        quote: {
            title: 'Demander un Devis',
            subtitle: 'Obtenez un devis personnalisé pour vos produits',
            form: {
                productType: 'Type de Produit',
                width: 'Largeur (cm)',
                height: 'Hauteur (cm)',
                pages: 'Nombre de Pages',
                color: 'Couleur',
                quantity: 'Quantité',
                calculate: 'Calculer le Devis',
                result: 'Devis Estimé'
            },
            colors: {
                black: 'Noir',
                blue: 'Bleu',
                red: 'Rouge',
                green: 'Vert',
                custom: 'Personnalisé'
            }
        },
        faq: {
            title: 'Questions Fréquentes',
            questions: [
                {
                    question: 'Quel est le délai de livraison pour les commandes ?',
                    answer: 'Les délais de livraison varient de 5 à 15 jours ouvrables selon la quantité et la complexité de la commande.'
                },
                {
                    question: 'Offrez-vous des remises pour les commandes en grande quantité ?',
                    answer: 'Oui, nous offrons des remises progressives pour les commandes de plus de 1000 pièces. Contactez-nous pour un devis personnalisé.'
                },
                {
                    question: 'Puis-je personnaliser le design de la couverture ?',
                    answer: 'Absolument ! Nous offrons des services de personnalisation complète pour les couvertures, y compris logos et designs spécifiques.'
                },
                {
                    question: 'Quel type de papier utilisez-vous ?',
                    answer: 'Nous utilisons uniquement du papier de haute qualité, certifié FSC, disponible en différents grammages (80g, 90g, 100g).'
                }
            ]
        },
        contact: {
            title: 'Nous Contacter',
            subtitle: 'Nous sommes là pour vous aider avec toute question ou demande',
            form: {
                name: 'Nom Complet',
                email: 'Email',
                phone: 'Téléphone',
                subject: 'Sujet',
                message: 'Message',
                send: 'Envoyer le Message'
            },
            info: {
                address: 'Via Roma 123, 40121 Bologne, Émilie-Romagne',
                phone: '+39 051 123 4567',
                email: 'info@art-production.it',
                hours: 'Lun-Ven: 8:00-18:00, Sam: 9:00-13:00'
            }
        },
        footer: {
            description: 'Art Production est votre imprimerie de confiance en Émilie-Romagne, spécialisée dans les livres et cahiers pour l\'éducation.',
            quickLinks: 'Liens Rapides',
            followUs: 'Suivez-nous',
            rights: 'Tous droits réservés.'
        }
    }
};

// Language management
let currentLanguage = 'it';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update flag
    const flags = { it: '🇮🇹', en: '🇬🇧', fr: '🇫🇷' };
    document.getElementById('current-flag').textContent = flags[lang];
    
    // Update all translatable elements
    updateTranslations();
    
    // Update navigation
    updateNavigation();
    
    // Update FAQ
    updateFAQ();
    
    // Close language menu
    document.getElementById('langMenu').classList.remove('active');
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(translations[currentLanguage], key);
        if (translation) {
            element.textContent = translation;
        }
    });
}

function updateNavigation() {
    const t = translations[currentLanguage];
    const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
    
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section && t.nav[section]) {
            link.textContent = t.nav[section];
        }
    });
}

function updateFAQ() {
    const t = translations[currentLanguage];
    const faqList = document.getElementById('faqList');
    
    faqList.innerHTML = '';
    
    t.faq.questions.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <button class="faq-question" onclick="toggleFAQ(${index})">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-content">
                    ${faq.answer}
                </div>
            </div>
        `;
        faqList.appendChild(faqItem);
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language') || 'it';
    changeLanguage(savedLanguage);
});