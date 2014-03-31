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
     * @returns {Player} The new Player object.
     */
    function Player(x, y) {
        this.x = x;
        this.y = y;
        
        /**
         * The image of the player.
         * @type Image
         */
        this.image = null;
        
        /**
         * The movement speed of the player.
         * @type Number
         */
        this.speed = 5/1000;
        
        /**
         * The timestamp of when the player started breaking a block.
         * -1 means the player is not breaking a block.
         * @type Number
         */
        this.blockBreakTimestamp = -1;
    }
    
        
    /**
     * The key code constants.
     * @type type
     */
    Player.KEYS = {
        "LEFT": 37,
        "UP": 38, 
        "RIGHT": 39,
        "DOWN": 40,
        "SPACE" : 32
    };
    
    /**
     * Load the player's assets.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    Player.prototype.load = function(assetLoader) {
        this.image = new Image();
        assetLoader.addImage(this.image, "assets/player/player.png");
    };
    
    
    /**
     * Update the player.
     * @param {Array} keyStatus The status of the keyboard.
     * @param {Number} deltaTimeMillis The delta time since the last update, in MS.
     * @returns {undefined}
     */
    Player.prototype.update = function(keyStatus, deltaTimeMillis) {
        var originalX = this.x;
        var originalY = this.y;
        
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
        
        var moved = false;
        if (this.x !== originalX || this.y !== originalY) {
            moved = true;
        }
        
        // Check if the player is trying to break a block
        if (keyStatus[Game.KEYS.SPACE] && !moved) {
            // Set the time that they started breaking the block.
            if (this.blockBreakTimestamp === -1) {
                this.blockBreakTimestamp = Utilities.currentTimeMillis();
            }
        }
        else {
            // Reset their block breaking status.
            this.blockBreakTimestamp = -1;
        }
    };
    
    /**
     * Draw the player.
     * @param {type} ctx The 2D drawing context.
     * @returns {undefined}
     */
    Player.prototype.draw = function(ctx) {
        if (!this.image) {
            ctx.fillStyle = "red";
            ctx.fillRect(0, 0, Game.TILE_SIZE, Game.TILE_SIZE);
            return;
        }
        ctx.drawImage(this.image, 0, 0, Game.TILE_SIZE, Game.TILE_SIZE);
    };
    
    /**
     * Get the location that the player is focusing on.
     * @returns {Coordinate} The Coordinate.
     */
    Player.prototype.getFocus = function() {
        // Focus on the center of the player.
        return new Coordinate(Math.floor(this.x + 0.5), Math.floor(this.y + 0.5));
    };
    
    return Player;
})();