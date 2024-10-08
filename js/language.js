let currentLanguage = 'en'; // Varsayılan dil
const translations = {
    en: {
        welcome: "Welcome to Transcendence",
        home: "Home",
        singlePlayer: "Single Player",
        multiPlayer: "Multi Player",
        languages: "Languages",
        playerNames: "Enter Player Names",
        player1: "Player 1",
        player2: "Player 2",
        player3: "Player 3",
        startGame: "Start Game",
        contactUs: "Contact Us",
        address: "Address: 123 Game St, Fun City, 45678",
        email: "Email: contact@transcendence.com",
        phone: "Phone: (123) 456-7890"
    },
    es: {
        welcome: "Bienvenido a Transcendence",
        home: "Inicio", // Yeni ekleme
        singlePlayer: "Jugador Único",
        multiPlayer: "Multijugador",
        languages: "Idiomas",
        playerNames: "Ingrese los Nombres de los Jugadores",
        player1: "Jugador 1",
        player2: "Jugador 2",
        player3: "Jugador 3",
        startGame: "Iniciar Juego",
        contactUs: "Contáctanos",
        address: "Dirección: 123 Game St, Fun City, 45678",
        email: "Correo: contact@transcendence.com",
        phone: "Teléfono: (123) 456-7890"
    },
    tr: {
        welcome: "Transcendence'e Hoşgeldiniz",
        home: "Ana Sayfa", // Yeni ekleme
        singlePlayer: "Tek Oyuncu",
        multiPlayer: "Çok Oyunculu",
        languages: "Diller",
        playerNames: "Oyuncu İsimlerini Girin",
        player1: "Oyuncu 1",
        player2: "Oyuncu 2",
        player3: "Oyuncu 3",
        startGame: "Oyunu Başlat",
        contactUs: "Bize Ulaşın",
        address: "Adres: 123 Oyun Cad, Eğlence Şehri, 45678",
        email: "E-posta: contact@transcendence.com",
        phone: "Telefon: (123) 456-7890"
    }
};

function changeLanguage(lang) {
    currentLanguage = lang;
    updateSidebar(); // Yan menüyü güncelle
    updateContactSection(); // İletişim bölümünü güncelle

    const currentPage = document.getElementById('content').getAttribute('data-page');
    if (currentPage === 'Languages') {
        updateLanguageContent(); // Dil seçim sayfasını güncelle
    } else if (currentPage) {
        changeContent(currentPage, { preventDefault: () => {} }); // Mevcut sayfada kal
    }
}

function updateSidebar() {
    const sidebarLinks = document.querySelectorAll('#sidebar ul li a');

    // Ana sayfa (Home) butonunu güncelle
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.innerText = translations[currentLanguage].home; // Home butonunun çevirisini ayarla
    }

    if (sidebarLinks.length > 1) {
        sidebarLinks[1].innerText = translations[currentLanguage].singlePlayer;
        sidebarLinks[2].innerText = translations[currentLanguage].multiPlayer;
        sidebarLinks[3].innerText = translations[currentLanguage].languages;
    }
}

function updateLanguageContent() {
    const contentDiv = document.getElementById('content');
    contentDiv.setAttribute('data-page', 'Languages'); // Sayfa bilgisi ekleniyor
    contentDiv.innerHTML = `
        <h2>${translations[currentLanguage].languages}</h2>
        <button onclick="changeLanguage('en')">English</button>
        <button onclick="changeLanguage('es')">Español</button>
        <button onclick="changeLanguage('tr')">Türkçe</button>
    `;
}

function updateContactSection() {
    const contactSection = document.getElementById('address-section');
    if (contactSection) {
        contactSection.innerHTML = `
            <div class="address-content">
                <div class="text-content">
                    <h2>${translations[currentLanguage].contactUs}</h2>
                    <p>${translations[currentLanguage].address}</p>
                    <p>${translations[currentLanguage].email}</p>
                    <p>${translations[currentLanguage].phone}</p>
                </div>
                <div class="divider"></div>
                <div class="image-content">
                    <img src="contact.jpg" alt="Contact Image" class="contact-image"> <!-- Fotoğrafın yolu -->
                </div>
            </div>
        `;
    }
}

function updateContent() {
    const contentDiv = document.getElementById('content');
    contentDiv.setAttribute('data-page', 'Home'); // Sayfa bilgisi ekleniyor
    contentDiv.innerHTML = `
        <h2>${translations[currentLanguage].welcome}</h2>
    `;
}
