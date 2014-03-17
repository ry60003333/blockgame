/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Player = (function() {
    
    /**
     * Creates a new player.
     * @param {Number} x The X Coordinate of the player.
     * @param {Number} y The Y Coordinate of the player.
     * @returns {_L7.Player}
     */
    function Player(x, y) {
        this.x = x;
        this.y = y;
        
        this.speed = 5/1000;
    }
    
        
    /**
     * The key code constants.
     * @type type
     */
    Player.KEYS = {
        "LEFT": 37,
        "UP": 38, 
        "RIGHT": 39,
        "DOWN": 40
    };
    
    
    /**
     * Update the player.
     * @param {Array} keyStatus The status of the keyboard.
     * @param {Number} deltaTimeMillis The delta time since the last update, in MS.
     * @returns {undefined}
     */
    Player.prototype.update = function(keyStatus, deltaTimeMillis) {
        if (keyStatus[Player.KEYS.LEFT]) {
            this.x -= this.speed * deltaTimeMillis;
	}
	if (keyStatus[Player.KEYS.RIGHT]) {
            this.x += this.speed * deltaTimeMillis;
	}
	if (keyStatus[Player.KEYS.UP]) {
            this.y -= this.speed * deltaTimeMillis;
	}
	if (keyStatus[Player.KEYS.DOWN]) {
            this.y += this.speed * deltaTimeMillis;
	}
    };
    
    /**
     * Draw the player.
     * @param {type} ctx The 2D drawing context.
     * @returns {undefined}
     */
    Player.prototype.draw = function(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, Game.TILE_SIZE, Game.TILE_SIZE);
    };
    
    return Player;
})();