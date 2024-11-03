document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('main-navbar').style.display = 'none';

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        document.getElementById('main-navbar').style.display = 'block';

    } else {
        showLogin();
    }

    document.querySelector('#login-form form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-form input[name="email"]').value;
    const password = document.querySelector('#login-form input[name="password"]').value;

    if (!email || !password) {
        alert('Email or Username and Password are required');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                email: email,
                password
            })
        });

        const data = await response.json();

        if (response.ok && response.status === 226) {
            alert("2FA code sent to your email. Please verify to continue.");
            promptFor2FACode(email);
        } else if (response.ok) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            document.getElementById('main-navbar').style.display = 'block';
            showHome();
            const lang = data.language;
            setLanguage(lang);
            await changeLanguage(lang);
        } else {
            const errorMessages = Object.entries(data.errors || data)
                .map(([field, message]) => `${field}: ${message}`)
                .join('\n');
            alert(`Login failed:\n${errorMessages}`);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert(`Login failed. Please check your credentials:\n${error}`);
    }
});

    document.querySelector('#signup-form form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.querySelector('#signup-form input[name="username"]').value;
        const email = document.querySelector('#signup-form input[name="email"]').value;
        const password = document.querySelector('#signup-form input[name="password"]').value;
        const confirmPassword = document.querySelector('#signup-form input[name="confirmPassword"]').value;
        const twofactorElement = document.querySelector('#two-factor');
        const twofactor = twofactorElement ? twofactorElement.checked : false;
        const language = document.querySelector('#signup-form select[name="language"]').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    is_2fa_enabled: twofactor,
                    language: language
                })
            });

            const data = await response.json();
            if (response.ok) {
                showLogin();
            } else {
                const errorMessages = Object.entries(data.errors || data)
                    .map(([field, message]) => `${field}: ${message}`)
                    .join('\n');
                alert(`Sign-up failed:\n${errorMessages}`);
            }
        } catch (error) {
            alert(`An expected error occurred while trying to sign up:\n${error}`);
        }
    });
    const logoutButton = document.querySelector('#logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentPage');
            localStorage.setItem('currentPage', 'logout');
            logoutUser();
        });
    }

    const singlePlayerButton = document.querySelector('#single-player-button');
    if (singlePlayerButton) {
        singlePlayerButton.addEventListener('click', () => {
            localStorage.setItem('currentMode', 'singlePlayer');
            showSinglePlayer();
        });
    }

    const multiPlayerButton = document.querySelector('#multi-player-button');
    if (multiPlayerButton) {
        multiPlayerButton.addEventListener('click', () => {
            localStorage.setItem('currentMode', 'multiPlayer');
            showMultiPlayer();
        });
    }
});

function promptFor2FACode(email) {
    alert('2FA code has been sent to your email. Please enter the code to proceed.');

    const code = prompt('Please enter your 2FA code:');
    if (code) {
        verify2FACode(email, code);
    } else {
        alert('2FA code is required for login.');
    }
}

async function verify2FACode(email, code) {
    try {
        const response = await fetch('http://localhost:8000/verify_2fa_code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                code
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            document.getElementById('main-navbar').style.display = 'block';
            showHome();
        } else {
            alert('Invalid 2FA code. Please try again.');
        }
    } catch (error) {
        console.error('2FA verification error:', error);
        alert('2FA verification failed. Please try again.');
    }
}

function showLogin() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (!loginForm || !signupForm) {
        console.error('Login or Signup form not found!');
        return;
    }

    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
}

function showSignup() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (!loginForm || !signupForm) {
        console.error('Login or Signup form not found!');
        return;
    }
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'signup');
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
}

function showHome() {
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
        navbar.style.display = 'block';
    }
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'Home');
    hideGameScreen();
}

function showSinglePlayer() {
    hideGameScreen();
    const singlePlayerScreen = document.getElementById('single-player-screen');
    if (singlePlayerScreen) {
        singlePlayerScreen.style.display = 'block';
    }
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'SinglePlayer');
}

function showMultiPlayer() {
    hideGameScreen();
    const multiPlayerScreen = document.getElementById('multi-player-screen');
    if (multiPlayerScreen) {
        multiPlayerScreen.style.display = 'block';
    }

}

function hideGameScreen() {
    const gameScreen = document.getElementById('game-screen');
    if (gameScreen) {
        gameScreen.style.display = 'none';
    }

    const homeScreen = document.getElementById('home-screen');
    if (homeScreen) {
        homeScreen.style.display = 'none';
    }
}

const deleteDataButton = document.querySelector('#delete-data-button');
if (deleteDataButton) {
    deleteDataButton.addEventListener('click', deleteUserData);
}

async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        console.error('No refresh token available');
        throw new Error('No refresh token available');
    }

    try {
        const response = await fetch('http://localhost:8000/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh: refreshToken})
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to refresh token:', errorData);
            throw new Error('Failed to refresh token: ' + (errorData.detail || 'Unknown error'));
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
    } catch (error) {
        console.error('Error in refreshToken:', error);
        throw error;
    }
}


async function logoutUser() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        try {
            const response = await fetch('http://localhost:8000/users/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({refresh: localStorage.getItem('refreshToken')})
            });

            if (!response.ok) {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentMode');
    localStorage.removeItem('currentPage');
    window.location.reload();
}


async function deleteUserData() {
    if (confirm("Are you sure you want to delete all your personal data? This action cannot be undone.")) {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            alert('You need to log in to delete your data.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/delete_user_data/', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                console.log('Token expired or blacklisted, logging out...');
                await logoutUser();
                return;
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => {
                    console.error('Response is not valid JSON');
                    return {};
                });

                console.error('Failed to delete user data:', errorData.detail || errorData);
                alert('Failed to delete user data.');
                return;
            }

            alert('Your data has been deleted successfully.');
            await logoutUser();
        } catch (error) {
            console.error('Failed to delete user data:', error);
            alert('An error occurred while trying to delete your data.');
        }
    }
}
