// AceMotion - Virtual Tennis Practice App
// Interactive Demo Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize splash screen animation
    initSplashScreen();

    // Initialize all interactive elements
    initModeCards();
    initGameplayAnimations();
    initChecklistDemo();
    initSwingDetection();
});

// Screen Navigation
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');

        // Trigger screen-specific animations
        if (screenId === 'gameplay') {
            startGameplay();
        } else if (screenId === 'session-summary') {
            animateSummary();
        } else if (screenId === 'analytics') {
            animateCharts();
        }
    }
}

// Splash Screen
function initSplashScreen() {
    const loadingTexts = [
        'Initializing pose detection...',
        'Loading motion tracking...',
        'Calibrating swing analysis...',
        'Preparing virtual court...',
        'Ready to play!'
    ];

    const loadingText = document.querySelector('.loading-text');
    let textIndex = 0;

    const textInterval = setInterval(() => {
        textIndex++;
        if (textIndex < loadingTexts.length) {
            loadingText.textContent = loadingTexts[textIndex];
        }
    }, 500);

    // Auto-transition to home after loading
    setTimeout(() => {
        clearInterval(textInterval);
        showScreen('home');
    }, 2800);
}

// Mode Cards Interaction
function initModeCards() {
    const modeCards = document.querySelectorAll('.mode-card');

    modeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Gameplay Animations
let gameInterval;
let rallyCount = 0;
let score = 0;
let comboMultiplier = 1;

function startGameplay() {
    rallyCount = 0;
    score = 0;
    comboMultiplier = 1;

    updateGameHUD();
    animateBall();
    startPoseAnimation();
}

function animateBall() {
    const ball = document.querySelector('.tennis-ball');
    const impactZone = document.querySelector('.impact-zone');

    if (!ball) return;

    const positions = [
        { top: '30%', left: '30%' },
        { top: '35%', left: '70%' },
        { top: '25%', left: '50%' },
        { top: '40%', left: '35%' },
        { top: '30%', left: '65%' }
    ];

    let posIndex = 0;

    gameInterval = setInterval(() => {
        const pos = positions[posIndex % positions.length];
        ball.style.top = pos.top;
        ball.style.left = pos.left;

        // Simulate swing detection
        if (Math.random() > 0.3) {
            simulateSwing();
        }

        posIndex++;
    }, 1500);
}

function simulateSwing() {
    rallyCount++;
    const points = [50, 100, 150, 200][Math.floor(Math.random() * 4)];
    score += points * comboMultiplier;

    // Update combo
    if (rallyCount % 5 === 0) {
        comboMultiplier = Math.min(comboMultiplier + 1, 5);
    }

    updateGameHUD();
    showSwingFeedback(points);
}

function updateGameHUD() {
    const scoreDisplay = document.querySelector('.score-value');
    const rallyDisplay = document.querySelector('.rally-value');
    const comboText = document.querySelector('.combo-text');
    const comboFill = document.querySelector('.combo-fill');

    if (scoreDisplay) scoreDisplay.textContent = score.toLocaleString();
    if (rallyDisplay) rallyDisplay.textContent = rallyCount;
    if (comboText) comboText.textContent = `x${comboMultiplier}`;
    if (comboFill) comboFill.style.height = `${Math.min(comboMultiplier * 20, 100)}%`;
}

function showSwingFeedback(points) {
    const feedback = document.querySelector('.swing-feedback');
    const feedbackText = document.querySelector('.feedback-text');
    const feedbackPoints = document.querySelector('.feedback-points');

    if (!feedback) return;

    const ratings = ['Good!', 'Great!', 'PERFECT!', 'AMAZING!'];
    const rating = ratings[Math.min(Math.floor(points / 60), 3)];

    if (feedbackText) feedbackText.textContent = rating;
    if (feedbackPoints) feedbackPoints.textContent = `+${points * comboMultiplier}`;

    feedback.style.animation = 'none';
    feedback.offsetHeight; // Trigger reflow
    feedback.style.animation = 'feedbackPop 0.5s ease-out';
}

function startPoseAnimation() {
    const skeleton = document.querySelector('.pose-skeleton svg');
    if (!skeleton) return;

    // Animate arm movement
    const activeArm = skeleton.querySelectorAll('.active-arm');
    let armPhase = 0;

    setInterval(() => {
        armPhase = (armPhase + 1) % 4;

        activeArm.forEach(line => {
            const phases = [
                { x2: '85', y2: '40' },
                { x2: '95', y2: '35' },
                { x2: '90', y2: '30' },
                { x2: '95', y2: '35' }
            ];

            if (line.getAttribute('x1') === '75') {
                line.setAttribute('x2', phases[armPhase].x2);
                line.setAttribute('y2', phases[armPhase].y2);
            }
        });
    }, 200);
}

// Camera Setup Checklist Demo
function initChecklistDemo() {
    const checkItems = document.querySelectorAll('.check-item:not(.checked)');

    let checkIndex = 0;
    const checkInterval = setInterval(() => {
        if (checkIndex < checkItems.length) {
            checkItems[checkIndex].classList.add('checked');
            checkIndex++;
        } else {
            clearInterval(checkInterval);
        }
    }, 1500);
}

// Swing Detection Simulation
function initSwingDetection() {
    // Keyboard simulation for demo
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            const gameplayScreen = document.getElementById('gameplay');
            if (gameplayScreen && gameplayScreen.classList.contains('active')) {
                simulateSwing();
            }
        }
    });

    // Touch/click on gameplay screen
    const gameplayScreen = document.getElementById('gameplay');
    if (gameplayScreen) {
        gameplayScreen.addEventListener('click', function(e) {
            if (!e.target.closest('.pause-btn') && !e.target.closest('.pose-camera-pip')) {
                simulateSwing();
            }
        });
    }
}

// Session Summary Animations
function animateSummary() {
    // Stop gameplay
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Animate score counting
    const scoreNumber = document.querySelector('.score-number');
    if (scoreNumber) {
        animateNumber(scoreNumber, 0, score || 2450, 1500);
    }

    // Animate progress bars
    setTimeout(() => {
        const swingFills = document.querySelectorAll('.swing-fill');
        swingFills.forEach(fill => {
            fill.style.transition = 'width 1s ease-out';
        });
    }, 500);

    // Animate XP bar
    const levelFill = document.querySelector('.level-fill');
    if (levelFill) {
        levelFill.style.width = '0%';
        setTimeout(() => {
            levelFill.style.width = '75%';
        }, 800);
    }
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Analytics Charts Animation
function animateCharts() {
    // Animate bar chart
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0%';

        setTimeout(() => {
            bar.style.transition = 'height 0.5s ease-out';
            bar.style.height = height;
        }, index * 100);
    });

    // Animate radar chart
    const radarFill = document.querySelector('.radar-fill');
    if (radarFill) {
        radarFill.style.opacity = '0';
        radarFill.style.transform = 'scale(0.5)';

        setTimeout(() => {
            radarFill.style.transition = 'all 0.8s ease-out';
            radarFill.style.opacity = '1';
            radarFill.style.transform = 'scale(1)';
        }, 300);
    }
}

// Touch/Swipe Gesture Detection (for mobile)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Detect horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const gameplayScreen = document.getElementById('gameplay');
        if (gameplayScreen && gameplayScreen.classList.contains('active')) {
            // Swipe detected - simulate forehand or backhand
            simulateSwing();
        }
    }
});

// Utility: Debounce function
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

// Performance optimization: Pause animations when not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        if (gameInterval) {
            clearInterval(gameInterval);
        }
    } else {
        const gameplayScreen = document.getElementById('gameplay');
        if (gameplayScreen && gameplayScreen.classList.contains('active')) {
            animateBall();
        }
    }
});

// Make showScreen globally available
window.showScreen = showScreen;
