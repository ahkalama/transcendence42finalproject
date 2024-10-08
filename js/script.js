loadScript('language.js', function() {
    updateContent();
});
let currentPlayer1;
let currentPlayer2;
let playerScore = 0;
let opponentScore = 0;
let player1Name;
let player2Name;
let player3Name;
let round = 1;
let ballSpeedX = 0;
let ballSpeedZ = 0;
let playerPaddleSpeed = 0;
let opponentPaddleSpeed = 0;
const paddleMoveSpeed = 0.2;
const winningScore = 3;
const countdownTime = 3;
let countdown = countdownTime;
let countdownInterval;

let ball, paddleWidth, paddleHeight, paddleDepth, tableWidth, tableHeight, tableDepth, ballSize;
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    script.onerror = function() {
        console.error(`Failed to load script: ${url}`);
    };
    document.head.appendChild(script);
}

let isSidebarOpen = false;
let isGameActive = true;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('main');
    
    if (isSidebarOpen) {
        sidebar.style.left = '-250px';
        content.style.marginLeft = '0';
    } else {
        sidebar.style.left = '0';
        content.style.marginLeft = '250px';
    }
    isSidebarOpen = !isSidebarOpen;
}

function changeContent(page, event) {
    event.preventDefault();
    isGameActive = false;
    const contentDiv = document.getElementById('content');

	if (page === 'SinglePlayer' || page === 'MultiPlayer') {
        contentDiv.style.visibility = 'visible';
        isPageChange = true;
    }
    switch (page) {
        case 'SinglePlayer':
            contentDiv.innerHTML = `
                <canvas id="gameCanvas" style="width: 100%; height: 400px;"></canvas>
                <div id="scoreBoard">Player: 0 | Opponent: 0</div>

                <button id="settingsButton">Settings</button>
                
                <div id="settingsMenu" style="display:none;">
                    <label for="playerColor">Player Paddle Color:</label>
                    <input type="color" id="playerColor" value="#ffffff">
                    <br>
                    <label for="opponentColor">Opponent Paddle Color:</label>
                    <input type="color" id="opponentColor" value="#ffffff">
                    <br>
                    <label for="paddleWidth">Paddle Width:</label>
                    <input type="range" id="paddleWidth" min="0.1" max="1.0" step="0.1" value="0.3">
                    <span id="paddleWidthValue">0.3</span>
                    <br>
                    <label for="paddleHeight">Paddle Height:</label>
                    <input type="range" id="paddleHeight" min="0.1" max="0.5" step="0.1" value="0.2">
                    <span id="paddleHeightValue">0.2</span>
                    <br>
                    <label for="paddleDepth">Paddle Depth:</label>
                    <input type="range" id="paddleDepth" min="1" max="3" step="0.1" value="2">
                    <span id="paddleDepthValue">2</span>
                    <br>
                    <button id="applySettingsButton">Apply Settings</button>
                    <button id="defaultSettingsButton">Default Settings</button>
                </div>

                <button id="startButton">Play with AI</button>
            `;

            startGame();  
            break;

            case 'MultiPlayer':
            contentDiv.innerHTML = `
                <div id="nameInput">
                    <h2>Oyuncu İsimlerini Girin</h2>
                    <form id="playerNamesForm">
                        <label for="player1Name">Oyuncu 1:</label>
                        <input type="text" id="player1NameInput" placeholder="Player 1" required>
                        <br><br>
                        <label for="player2Name">Oyuncu 2:</label>
                        <input type="text" id="player2NameInput" placeholder="Player 2" required>
                        <br><br>
                        <label for="player3Name">Oyuncu 3:</label>
                        <input type="text" id="player3NameInput" placeholder="Player 3" required>
                        <br><br>
                        <button type="submit">Oyunu Başlat</button>
                    </form>
                </div>

                <div id="settingsMenu" style="display:none;">
                    <label for="playerColor">Player Paddle Color:</label>
                    <input type="color" id="playerColor" value="#ffffff">
                    <br>
                    <label for="opponentColor">Opponent Paddle Color:</label>
                    <input type="color" id="opponentColor" value="#ffffff">
                    <br>
                    <label for="paddleWidth">Paddle Width:</label>
                    <input type="range" id="paddleWidth" min="0.1" max="1.0" step="0.1" value="0.3">
                    <span id="paddleWidthValue">0.3</span>
                    <br>
                    <label for="paddleHeight">Paddle Height:</label>
                    <input type="range" id="paddleHeight" min="0.1" max="0.5" step="0.1" value="0.2">
                    <span id="paddleHeightValue">0.2</span>
                    <br>
                    <label for="paddleDepth">Paddle Depth:</label>
                    <input type="range" id="paddleDepth" min="1" max="5" step="0.1" value="2">
                    <span id="paddleDepthValue">2</span>
                    <br>
                    <button id="applySettingsButton">Apply Settings</button>
                    <button id="defaultSettingsButton">Default Settings</button>
                </div>

                <div id="gameContainer" style="display:none;">
                    <canvas id="gameCanvas" style="width: 100%; height: 400px;"></canvas>
                    <div id="scoreBoard">Player: 0 | Opponent: 0</div>
                    <div id="countdown"></div>
                    <button id="playButton">Play</button>
                    <button id="settingsButton">Settings</button>
                </div>
            `;
                loadScript('multi.js', function() {
                    updateScore();
                });
                document.getElementById('playerNamesForm').addEventListener('submit', function(event) {
                    event.preventDefault();
            
                    player1Name = document.getElementById('player1NameInput').value;
                    player2Name = document.getElementById('player2NameInput').value;
                    player3Name = document.getElementById('player3NameInput').value;
            
                    currentPlayer1 = player1Name;
                    currentPlayer2 = player2Name;
            
                    document.getElementById('nameInput').style.display = 'none';
                    document.getElementById('gameContainer').style.display = 'block';
            
                    startMultiGame();
                });
                break;
            case 'Languages':
            
            updateLanguageContent();
                break;

                case 'Home':
                default:
                    contentDiv.innerHTML = `
                    `;
                    updateContent();
                    contentDiv.innerHTML = `
                    <h2>${translations[currentLanguage].welcome}</h2>
       
                    `;
                    break;
    }
	toggleSidebar();
}
function updateContent() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
        <h2>${translations[currentLanguage].welcome}</h2>
        <img src="ai.jpg" alt="Description of image">
    `;
}

const slider = document.querySelector(".items");
const slides = document.querySelectorAll(".item");
const buttons = document.querySelectorAll(".button");

let current = 0;
let prev = 4;
let next = 1;

buttons.forEach((button, index) => {
    button.addEventListener("click", () => index === 0 ? gotoPrev() : gotoNext());
});

const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

const gotoNext = () => current < slides.length - 1 ? gotoNum(current + 1) : gotoNum(0);

const gotoNum = number => {
    current = number;
    prev = current - 1;
    next = current + 1;

    slides.forEach(slide => {
        slide.classList.remove("active");
        slide.classList.remove("prev");
        slide.classList.remove("next");
    });

    if (next === slides.length) {
        next = 0;
    }

    if (prev === -1) {
        prev = slides.length - 1;
    }

    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
};


window.onpopstate = function(event) {
    if (event.state) {
        changeContent(event.state.page); // Durumu geri yükle
    }
};
