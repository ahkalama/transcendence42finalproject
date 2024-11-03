let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
const translations = {
    en: {
        home: "Home",
        singlePlayer: "Single Player",
        multiPlayer: "Multi Player",
        language: "Languages",
        english: "English",
        spanish: "Spanish",
        turkish: "Turkish",
        contactUs: "Contact Us",
        address: "Muallimköy Mahallesi, Deniz Cd. No:143-5, 41400 Gebze/Kocaeli",
        addresslabel: "Address",
        email: "Email",
        phone: "Phone",
        map: "Map",
        teamtitle: "OUR TEAM",
        player: "player",
        opponent: "opponent",
        player1: "Player1",
        player2: "Player2",
        player3: "Player3",
        playbutton: "Login",
        formTitle1: "Player1",
        formTitle2: "Player2",
        formTitle3: "Player3",
        startButton: "Play with AI",
        startButton2: "START",
        playerColor: "Player Paddle Color:",
        opponentColor: "Opponent Paddle Color:",
        paddleWidth: "Paddle Width:",
        paddleHeight: "Paddle Height:",
        paddleDepth: "Paddle Depth:",
        applySettings: "Apply Settings",
        settings: "Settings",
        defaultSettings: "Default Settings",
        delete: "Delete My Data",
        logout: "Logout",
    },
    es: {
        home: "Inicio",
        singlePlayer: "Jugador Único",
        multiPlayer: "Multijugador",
        language: "Idioma",
        english: "Inglés",
        spanish: "Español",
        turkish: "Turco",
        contactUs: "Contáctanos",
        address: "Muallimköy Mahallesi, Deniz Cd. No:143-5, 41400 Gebze/Kocaeli",
        addresslabel: "Dirección",
        email: "Correo",
        phone: "Teléfono",
        map: "Mapa",
        teamtitle: "NUESTRO EQUIPO",
        player: "Jugador",
        opponent: "Oponente",
        player1: "Jugador 1",
        player2: "Jugador 2",
        player3: "Jugador 3",
        playbutton: "iniciar sesión",
        formTitle1: "Jugador 1",
        formTitle2: "Jugador 2",
        formTitle3: "Jugador 3",
        startButton: "Jugar con IA",
        startButton2: "Iniciar",
        playerColor: "Color de la Paleta del Jugador:",
        opponentColor: "Color de la Paleta del Oponente:",
        paddleWidth: "Ancho de la Paleta:",
        paddleHeight: "Altura de la Paleta:",
        paddleDepth: "Profundidad de la Paleta:",
        settings: "Configuraciones",
        applySettings: "Aplicar Configuraciones",
        defaultSettings: "Configuraciones Predeterminadas",
        delete: "Eliminar mis datos",
        logout: "Cerrar Sesión"
    },
    tr: {
        home: "Ana Sayfa",
        singlePlayer: "Tek Oyuncu",
        multiPlayer: "Çok Oyunculu",
        language: "Dil",
        english: "İngilizce",
        spanish: "İspanyolca",
        turkish: "Türkçe",
        contactUs: "Bize Ulaşın",
        address: "Muallimköy Mahallesi, Deniz Cd. No:143-5, 41400 Gebze/Kocaeli",
        addresslabel: "Adres",
        email: "E-posta",
        phone: "Telefon",
        map: "Harita",
        teamtitle: "EKİBİMİZ",
        player: "Oyuncu",
        opponent: "Rakip",
        player1: "Oyuncu1",
        player2: "Oyuncu2",
        player3: "Oyuncu3",
        playbutton: "Giris",
        formTitle1: "Oyuncu1",
        formTitle2: "Oyuncu2",
        formTitle3: "Oyuncu3",
        startButton: "Yapay Zeka ile Oyna",
        startButton2: "Oyna",
        playerColor: "Oyuncu Paleti Rengi:",
        opponentColor: "Rakip Paleti Rengi:",
        paddleWidth: "Palet Genişliği:",
        paddleHeight: "Palet Yüksekliği:",
        paddleDepth: "Palet Derinliği:",
        settings: "Ayarlar",
        applySettings: "Ayarları Uygula",
        defaultSettings: "Varsayılan Ayarlar",
        delete: "Verilerimi Sil",
        logout: "Çıkış"
    }
};
async function changeLanguage(lang) {
    currentLanguage = lang;
    const languageSetResponse = await fetch('http://localhost:8000/set_language/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            language: lang
        })
    });
    if (!languageSetResponse.ok)
        return console.error('Failed to set language');
    localStorage.setItem('selectedLanguage', lang);
}
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll("[data-translate]").forEach(function (element) {
        const key = element.getAttribute("data-translate");
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    localStorage.setItem('selectedLanguage', lang);
}

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        const lang = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        setLanguage(lang);
        changeLanguage(lang).then(r => {
            console.log('Language changed');
        }).catch(e => {
            console.error('Failed to change language');
        });
    });
});

window.onload = function () {
    setLanguage(currentLanguage);
};
document.addEventListener("DOMContentLoaded", function () {
    setLanguage(currentLanguage);
});