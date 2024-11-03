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
let isGameActive = true;
let playerPaddleColor = new THREE.Color('#FFFFFF');
let opponentPaddleColor = new THREE.Color('#FFFFFF');


function changeContent(page, event) {
    isGameActive = false;
    const contentDiv = document.getElementById('content');

    if (event !== 'popstate') {
        window.history.pushState({ page: page }, '');
        localStorage.setItem('currentPage', page);
    }

    if (page === 'SinglePlayer' || page === 'MultiPlayer') {
        contentDiv.style.visibility = 'visible';
        isPageChange = true;
    }
    switch (page) {
        case 'Home':
            contentDiv.innerHTML = `
        `;
        break;
        case 'SinglePlayer':
            contentDiv.innerHTML = `
            <div id="canvasWrapper">
                <canvas id="gameCanvas"></canvas>
				<div id="scoreBoard">
					<span data-translate="player">${translations[currentLanguage].player}</span>: 0 | 
					<span data-translate="opponent">${translations[currentLanguage].opponent}</span>: 0
				</div>
            </div>
                <div id="buttonsWrapper">
                    <div>
                        <div id="settingsMenu" style="display:none;">
                            <label id ="settingsMenuText1" for="playerColor" data-translate="playerColor">${translations[currentLanguage].playerColor}:</label>
                            <input type="color" id="playerColor" value="#FFFFFF">
                            <br>
                            <label id ="settingsMenuText2" for="opponentColor" data-translate="opponentColor" >${translations[currentLanguage].opponentColor}:</label>
                            <input type="color" id="opponentColor" value="#FFFFFF">
                            <div class = "settingtext3">
                                <br>
                                <label id ="settingsMenuText3" for="paddleWidth" data-translate="paddleWidth">${translations[currentLanguage].paddleWidth}:</label>
                                <div class="range-container">
                                     <input type="range" id="paddleWidth" min="0.1" max="1.0" step="0.1" value="0.3"  class="slider">
                                     <span id="paddleWidthValue">0.3</span>
                                </div>
                            </div>
                            <div class = "settingtext4">
                                <br>
                                <label id ="settingsMenuText4" for="paddleHeight" data-translate="paddleHeight" >${translations[currentLanguage].paddleHeight}:</label>
                                <div class="range-container">
                                    <input type="range" id="paddleHeight" min="0.1" max="0.5" step="0.1" value="0.2"  class="slider">
                                    <span id="paddleHeightValue">0.2</span>
                                </div>
                            </div>
                            <div class = "settingtext5">
                                <br>
                                <label id ="settingsMenuText5" for="paddleDepth" data-translate="paddleDepth" >${translations[currentLanguage].paddleDepth}:</label>
                                <div class="range-container">
                                    <input type="range" id="paddleDepth" min="1" max="3" step="0.1" value="2"  class="slider">
                                    <span id="paddleDepthValue">2</span>
                                </div>
                            </div>
                            <br>
                            <button id="applySettingsButton" data-translate="applySettings">${translations[currentLanguage].applySettings}</button>
                            <button id="defaultSettingsButtons" class="singleDefult"data-translate="defaultSettings" >${translations[currentLanguage].defaultSettings}</button>
                        </div>
                        </div>
                        <div class="singleplayerbutton">
                            <button class="singleSettings" id="settingsButton" data-translate="settings" >${translations[currentLanguage].settings}</button>
                            <button id="startButton" data-translate="startButton">${translations[currentLanguage].startButton}</button>
                        </div>
                </div>
            `;
            startGame();
            break;
            case 'MultiPlayer':
				contentDiv.innerHTML = `
				<div id="nameInput">
					<form id="playerNamesForm">
						<label for="player1Name" id="formTitle1" data-translate="formTitle1">${translations[currentLanguage].formTitle1}:</label>
						<input type="text" id="player1NameInput"required>
						<br><br>
						<label for="player2Name" id="formTitle2" data-translate="formTitle2">${translations[currentLanguage].formTitle2}:</label>
						<input type="text" id="player2NameInput"required>
						<br><br>
						<label for="player3Name" id="formTitle3" data-translate="formTitle3">${translations[currentLanguage].formTitle3}:</label>
						<input type="text" id="player3NameInput"required>
						<br><br>
						<button type="submit" id="formButton" data-translate="playbutton">${translations[currentLanguage].playbutton}</button>
					</form>
				</div>
				<div id="settingsMenu2" style="display:none;">
					<div class="Multisettings">
						<label id="MsettingsText1" for="playerColor" data-translate="playerColor">${translations[currentLanguage].playerColor}:</label>
						<input type="color" id="playerColor" value="#FFFFFF">
						<br>
						<label id="MsettingsMenuText2" for="opponentColor" data-translate="opponentColor">${translations[currentLanguage].opponentColor}:</label>
						<input type="color" id="opponentColor" value="#FFFFFF">
						<br>
						<label id="MsettingsMenuText3" for="paddleWidth" data-translate="paddleWidth">${translations[currentLanguage].paddleWidth}:</label>
						<input type="range" id="paddleWidth" min="0.1" max="1.0" step="0.1" value="0.3">
						<span id="paddleWidthValue">0.3</span>
						<br>
						<label id="MsettingsMenuText4" for="paddleHeight" data-translate="paddleHeight">${translations[currentLanguage].paddleHeight}:</label>
						<input type="range" id="paddleHeight" min="0.1" max="0.5" step="0.1" value="0.2">
						<span id="paddleHeightValue">0.2</span>
						<br>
						<label id="MsettingsMenuText5" for="paddleDepth" data-translate="paddleDepth">${translations[currentLanguage].paddleDepth}:</label>
						<input type="range" id="paddleDepth" min="1" max="3" step="0.1" value="2">
						<span id="paddleDepthValue">2</span>
					</div>
					<br>
					<button id="applySettingsButton2" class="settingButton" data-translate="applySettings">${translations[currentLanguage].applySettings}</button>
					<button id="defaultSettingsButton" class="settingButton" data-translate="defaultSettings">${translations[currentLanguage].defaultSettings}</button>
				</div>
				<div id="gameContainer" style="display:none;">
					<canvas id="gameCanvas"></canvas>
					<div id="countdown"></div>
					<div>
						<div id="scoreBoard2" data-translate="score">${translations[currentLanguage].player}: 0 | ${translations[currentLanguage].opponent}: 0</div>
						<button id="settingsButton2" class="settingButton2" data-translate="settings">${translations[currentLanguage].settings}</button>
						<button id="playButton" class="startButton" data-translate="startButton2">${translations[currentLanguage].startButton2}</button>
					</div>
				</div>
			`;
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
            }
}

let currentPage = 'login';

function showLogin() {
    currentPage = 'login';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    history.pushState({ page: 'login' }, '', '');
}

function showSignup() {
    currentPage = 'signup';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    history.pushState({ page: 'signup' }, '', '');
}

window.onpopstate = function (event) {
    if (event.state && event.state.page) {
        switch (event.state.page) {
            case 'signup':
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('signup-form').style.display = 'block';
                break;
            case 'login':
                document.getElementById('login-form').style.display = 'block';
                document.getElementById('signup-form').style.display = 'none';
                break;
            case 'SinglePlayer':
            case 'MultiPlayer':
            case 'Home':
                changeContent(event.state.page, 'popstate');
                break;
        }
        currentPage = event.state.page;
    }
};

window.onload = function() {

    const savedPage = localStorage.getItem('currentPage');

    if (savedPage == 'SinglePlayer' ||savedPage == 'MultiPlayer' ||savedPage == 'Home' ) {
        changeContent(savedPage, 'popstate');
    } 
};