// ===============================
// Données produits
// ===============================
const products = [
    {
        id: '1',
        name: {
            it: 'Quaderno A4 Bianco Premium',
            en: 'A4 Premium Blank Notebook',
            fr: 'Cahier A4 Blanc Premium'
        },
        description: {
            it: 'Quaderno bianco di alta qualità, perfetto per disegni e schizzi',
            en: 'High-quality blank notebook, perfect for drawings and sketches',
            fr: 'Cahier blanc de haute qualité, parfait pour dessins et croquis'
        },
        image: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg',
        category: 'unlined',
        basePrice: 3.50
    },
    {
        id: '2',
        name: {
            it: 'Libro Disegno A5',
            en: 'A5 Drawing Book',
            fr: 'Livre de Dessin A5'
        },
        description: {
            it: 'Libro da disegno con carta spessa, ideale per tecniche artistiche',
            en: 'Drawing book with thick paper, ideal for artistic techniques',
            fr: 'Livre de dessin avec papier épais, idéal pour techniques artistiques'
        },
        image: 'https://images.pexels.com/photos/1292241/pexels-photo-1292241.jpeg',
        category: 'unlined',
        basePrice: 5.20
    },
    {
        id: '3',
        name: {
            it: 'Quaderno Rigato A4',
            en: 'A4 Lined Notebook',
            fr: 'Cahier Ligné A4'
        },
        description: {
            it: 'Quaderno con righe standard per scrittura, ideale per studenti',
            en: 'Standard lined notebook for writing, ideal for students',
            fr: 'Cahier avec lignes standard pour écriture, idéal pour étudiants'
        },
        image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
        category: 'lined',
        basePrice: 2.80
    },
    {
        id: '4',
        name: {
            it: 'Libro Scolastico Rigato',
            en: 'Lined School Book',
            fr: 'Livre Scolaire Ligné'
        },
        description: {
            it: 'Libro scolastico con righe e margini, perfetto per appunti',
            en: 'School book with lines and margins, perfect for notes',
            fr: 'Livre scolaire avec lignes et marges, parfait pour notes'
        },
        image: 'https://images.pexels.com/photos/926680/pexels-photo-926680.jpeg',
        category: 'lined',
        basePrice: 4.10
    },
    {
        id: '5',
        name: {
            it: 'Quaderno Artistico Premium',
            en: 'Premium Art Notebook',
            fr: 'Cahier Artistique Premium'
        },
        description: {
            it: 'Quaderno bianco con carta di grammatura elevata per arte',
            en: 'Blank notebook with high-weight paper for art',
            fr: 'Cahier blanc avec papier de grammage élevé pour art'
        },
        image: 'https://images.pexels.com/photos/1314543/pexels-photo-1314543.jpeg',
        category: 'unlined',
        basePrice: 6.75
    },
    {
        id: '6',
        name: {
            it: 'Quaderno Universitario',
            en: 'University Notebook',
            fr: 'Cahier Universitaire'
        },
        description: {
            it: 'Quaderno a righe con copertina resistente per uso intensivo',
            en: 'Lined notebook with durable cover for intensive use',
            fr: 'Cahier ligné avec couverture résistante pour usage intensif'
        },
        image: 'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg',
        category: 'lined',
        basePrice: 3.90
    }
];


// ===============================
// Initialisation
// ===============================
document.addEventListener('DOMContentLoaded', initializeProducts);

function initializeProducts() {
    displayProductPreviews();
    displayGallery();
}

// ===============================
// Prévisualisation produits
// ===============================
function displayProductPreviews() {
    const unlinedPreview = document.getElementById('unlinedPreview');
    const linedPreview = document.getElementById('linedPreview');
    
    const unlinedProducts = products.filter(p => p.category === 'unlined').slice(0, 4);
    const linedProducts = products.filter(p => p.category === 'lined').slice(0, 4);
    
    unlinedPreview.innerHTML = unlinedProducts.map(product => `
        <div class="preview-item" onclick="openProductModal('${product.id}')">
            <img src="${product.image}" alt="${product.name.it}" loading="lazy">
            <div class="preview-overlay"></div>
        </div>
    `).join('');
    
    linedPreview.innerHTML = linedProducts.map(product => `
        <div class="preview-item" onclick="openProductModal('${product.id}')">
            <img src="${product.image}" alt="${product.name.it}" loading="lazy">
            <div class="preview-overlay"></div>
        </div>
    `).join('');
}

// ===============================
// Galerie Produits
// ===============================
function displayGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    galleryGrid.innerHTML = filteredProducts.map(product => `
        <div class="gallery-item fade-in" onclick="openProductModal('${product.id}')">
            <div class="gallery-image">
                <img src="${product.image}" alt="${product.name.it}" loading="lazy">
                <div class="gallery-badge ${product.category}">
                    ${product.category === 'lined' ? 'Rigato' : 'Bianco'}
                </div>
            </div>
            <div class="gallery-content">
                <h3>${product.name.it}</h3>
                <p>${product.description.it}</p>
                <div class="gallery-price">
                    <span class="price">€${product.basePrice.toFixed(2)}</span>
                    <span class="price-label">prezzo base</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterGallery(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayGallery(filter);
}

// ===============================
// Modale Produit
// ===============================
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = createModal();
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${product.name.it}</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
                <img src="${product.image}" alt="${product.name.it}" style="width: 100%; border-radius: 12px;">
                <div>
                    <p style="color: #6b7280; margin-bottom: 1rem; line-height: 1.7;">${product.description.it}</p>
                    <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px;">
                        <div style="font-size: 0.9rem; color: #6b7280; margin-bottom: 0.5rem;">Prezzo base:</div>
                        <div style="font-size: 2rem; font-weight: 700; color: #1e3a8a;">€${product.basePrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// ===============================
// Galerie Lightbox
// ===============================
 function openGallery(category) {
    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightboxContent');
    content.innerHTML = "";

    let images = [];
    if (category === 'unlined') {
        images = [ "https://www.art-production.it/imgs/gallery/19/quad-cv_1a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_1b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_2a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_2b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_3a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_3b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_4a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_4b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_5a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_5b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_6a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_6b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_7a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_7b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_8a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_8b.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_9a.jpg",
    "https://www.art-production.it/imgs/gallery/19/quad-cv_9b.jpg"];
    } else if (category === 'lined') {
        images = [ 
   "https://www.art-production.it/imgs/gallery/20/quad-sv_7b.jpg",
    "https://www.art-production.it/imgs/gallery/20/quad-sv_1a.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_1b.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_2a.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_2b.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_3a.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_3b.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_4a.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_4b.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_5a.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_5b.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_6a.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_6b.jpg",
   "https://www.art-production.it/imgs/gallery/20/quad-sv_7a.jpg",
        ]
    }

    images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = category;
        img.style.maxWidth = "300px";
        img.style.margin = "10px";
        img.style.borderRadius = "8px";
        content.appendChild(img);
    });

    lightbox.style.display = "flex";

     lightbox.onclick = function(e) {
        if (e.target === lightbox) closeGallery();
    }
}

function closeGallery() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = "none";
}



// ===============================
// Catalogue PDF
// ===============================
function showCatalog(category) {
    const pdfModal = document.getElementById("pdfModal");
    const pdfFrame = document.getElementById("pdfFrame");

    if (category === 'unlined') {
        pdfFrame.src = "catalogo_quaderni_CV1.pdf";
    } else if (category === 'lined') {
        pdfFrame.src = "catalogo_quaderni_SV_lined.pdf";
    }

    pdfModal.style.display = "block";
}

function closePDF() {
    const pdfModal = document.getElementById("pdfModal");
    const pdfFrame = document.getElementById("pdfFrame");
    pdfModal.style.display = "none";
    pdfFrame.src = "";
}


function goToProducts() {
    const pdfModal = document.getElementById('pdfModal');
    pdfModal.style.display = 'none';
    
    // Scroll vers la section produits
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
