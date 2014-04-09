/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

// Global variables

/**
 * The Canvas that is being drawn to.
 * @type @exp;document@call;getElementById
 */
var canvas;

/**
 * The drawing context of the Canvas.
 * @type @exp;canvas@call;getContext
 */
var ctx;

/**
 * The status of the keyboard keys.
 * @type Array
 */
var keyStatus = [];

/**
 * The array of keys that have been pressed.
 * @type Array
 */
var keyPressed = [];

/**
 * The array of keys that are now up.
 * @type Array
 */
var keyUp = [];

/**
 * The key code constants.
 * @type type
 */
var KEYS = {
    "ESC" : 27
};

/**
 * The menu div.
 * @type type
 */
var menuDiv = null;

/**
 * The array of menu buttons.
 * @type Array
 */
var menuButtons = [];

/**
 * The array of button listeners.
 * @type Array
 */
var buttonListeners = [];

/**
 * The game state constants.
 * @type type
 */
var GAME_STATE = {
    "MENU" : 0, 
    "RUNNING" : 1, 
    "PAUSED" : 2  
};

/**
 * The state of the game.
 * @type Number
 */
var gameState;

/**
 * The timestamp of when an update was last performed.
 * @type Number
 */
var lastUpdateTimestamp;

/**
 * The game.
 * @type Game
 */
var game;

/**
 * The asset loader.
 * @type AssetLoader
 */
var assetLoader;

/**
 * Initialize the game.
 * @returns {undefined}
 */
function init() {
    
    // Grab the canvas object
    canvas = document.getElementById('canvas');

    // Make the canvas fullscreen!
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Make it stay fullscreen.
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } , false);
    
    // Grab our canvas context.
    ctx = canvas.getContext('2d');
    
    // Create an instance of the game
    game = new Game();
    
    // Create our asset loader
    assetLoader = new AssetLoader();
    
    // Queue up assets for loading
    game.load(assetLoader);
    
    // Load our assets and start the game.
    assetLoader.load(function() {
        
        // We are now in the callback function
        // for when everything has finished loading.
        

        // Register our event listeners
        window.addEventListener("keydown", function(e) {
            keyStatus[e.keyCode] = true;
        });
        window.addEventListener("keyup", function(e) {
            keyStatus[e.keyCode] = false;
            keyUp[e.keyCode] = true;
        });
        window.addEventListener("keypress", function(e) {
            keyPressed[e.keyCode] = true;
        });
        
        // Register our menu event listeners
        // and start off on the main menu
        setupMenu();

        // Start the game loop!
        tick();
        
    });
}

/**
 * Set the current game state.
 * @param {Number} newGameState The new game state.
 * @returns {undefined}
 */
function setGameState(newGameState) {
    if (newGameState === GAME_STATE.RUNNING) {
        // Hide the menu!
        menuDiv.style.display = 'none';
        
        // Hide the individual buttons as well
        // for menus that don't use all the buttons
        for (var i = 0; i < menuButtons.length; i++) {
            menuButtons[i].style.display = 'none';
        }
    }
    else if (newGameState === GAME_STATE.MENU) {
        displayMenu("New Game", function() {
            setGameState(GAME_STATE.RUNNING);
        });
    }
    else if (newGameState === GAME_STATE.PAUSED) {
        displayMenu("Resume Game", function() {
            setGameState(GAME_STATE.RUNNING);
        });
    }
    gameState = newGameState;
}

/**
 * Display a menu. Takes in button names and listener functions in pairs.
 * @returns {undefined}
 */
function displayMenu() {
    for (var i = 0; i < arguments.length; i += 2) {
        menuButtons[i].innerHTML = arguments[i];
        buttonListeners[i] = arguments[i+1];
        menuButtons[i].style.display = 'inline-block';
    }
    menuDiv.style.display = 'block';
}

/**
 * Setup the listeners for the menu.
 * @returns {undefined}
 */
function setupMenu() {
    menuDiv = document.querySelector("#menu");
    for (var i = 0; i < 1; i++) {
        var nextButton = document.querySelector("#button" + i);
        menuButtons[i] = nextButton;
        var index = i;
        nextButton.addEventListener("click", function() {
            buttonListeners[index]();
        });
    }
    setGameState(GAME_STATE.MENU);
}

/**
 * Perform a game tick.
 * @returns {undefined}
 */
function tick() {
    // Erase everything!
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Check for key presses!
    if (keyUp[KEYS.ESC]) {
        if (gameState === GAME_STATE.RUNNING) {
            setGameState(GAME_STATE.PAUSED);
        }
        else if (gameState === GAME_STATE.PAUSED) {
            setGameState(GAME_STATE.RUNNING);
        }
        keyUp[KEYS.ESC] = false;
    }
    
    switch(gameState) {
        case GAME_STATE.MENU:
            // TODO: Implement menu drawing here.
            
            // Here is some placeholder stuff.
            ctx.fillStyle = "rgba(71, 234, 255, 0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = "42px Comic Sans";
            ctx.fillStyle = "Black";
            
            var y = (canvas.height / 2) - 30;
            drawHorzCenteredText("Droid World", 0, y);

            y += 15;
            ctx.font = "13px Comic Sans";
            drawHorzCenteredText("for Rich Media Web App", 0, y);
            
            break;
        case GAME_STATE.RUNNING:
            // Update everything before we draw it.
            update();
            
            drawGame();
            break;
        case GAME_STATE.PAUSED:
            // Draw the game under the pause menu
            drawGame();
            
            // Overlay the pause menu
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = "42px Comic Sans";
            ctx.fillStyle = "Black";
            
            var y = (canvas.height / 2) - 30;
            drawHorzCenteredText("Paused", 0, y);
            break;
    }
    
    window.requestAnimationFrame(tick);
}

/**
 * Draw horizontally centered text.
 * @param {String} message The text.
 * @param {Number} xOffset The X offset to draw at.
 * @param {Number} y The Y location to draw at.
 * @returns {undefined}
 */
function drawHorzCenteredText(message, xOffset, y) {
    var textSize = ctx.measureText(message);
    var textX = ((canvas.width / 2) - (textSize.width / 2)) + xOffset;
    var textY = y;
    ctx.fillText(message, textX, textY);
}

/**
 * Draw the game.
 * @returns {undefined}
 */
function drawGame() {
    game.draw(canvas, ctx);
}

/**
 * Update the contents of the game.
 * @returns {undefined}
 */
function update() {
    // Calculate how much time has passed since the last tick.
    var currentTimestamp = new Date().getTime();
    var deltaTimeMillis = currentTimestamp-lastUpdateTimestamp;
    lastUpdateTimestamp = currentTimestamp;
    
    // Update the contents of the game.
    game.update(keyStatus, keyUp, deltaTimeMillis);
}

// Make the init function run on startup.
window.onload = init;