/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Game = (function() {
    
    /**
     * Creates a new Game.
     * @param {TileManager} tileManager The tile loader.
     * @returns {_L7.Game}
     */
    function Game(tileManager) {
        this.tileManager = tileManager;
        this.player = new Player(0, 0);
        this.world = new World();
        this.onlyDrawWorld = false;
    }
    
    /**
     * The build number of the game.
     */
    Game.BUILD = 0;
    
    /**
     * The version number of the game.
     */
    Game.VERSION = "0.0";
    
    /**
     * The size of a tile, in pixels.
     */
    Game.TILE_SIZE = 32;
    
    /**
     * The key code constants.
     * @type type
     */
    Game.KEYS = {
        "D": 68, 
        "W" : 87
    };
    
    /**
     * Update the contents of the game.
     * @param {Array} keyStatus The status of the keyboard.
     * @param {Array} keyUp The array of keys that went up and haven't been handled.
     * @param {Number} deltaTimeMillis The delta time since the last update, in MS.
     * @returns {undefined}
     */
    Game.prototype.update = function(keyStatus, keyUp, deltaTimeMillis) {
        this.player.update(keyStatus, deltaTimeMillis);
        if (keyUp[Game.KEYS.D]) {
            this.world.drawGrid = !this.world.drawGrid;
            keyUp[Game.KEYS.D] = false;
        }
        if (keyUp[Game.KEYS.W]) {
            this.onlyDrawWorld = !this.onlyDrawWorld;
            keyUp[Game.KEYS.W] = false;
        }
    };
    
    /**
     * Draw the contents of the game.
     * @param {type} canvas The canvas.
     * @param {type} ctx The 2D drawing context.
     * @returns {undefined}
     */
    Game.prototype.draw = function(canvas, ctx) {
        
        if (this.onlyDrawWorld) {
            this.world.draw(this.player, canvas, ctx, this.tileManager);
            return;
        }
        // Draw the world centered around the player
        ctx.save();
        
        /*
         * To calculate the offset to draw the map at, the following formula is
         * used:
         * Take the half width/height of the canvas and divide by two
         * Take the remainer of dividing that by the size of each tile (mod operator)
         * and then subtract the half width/height of the player.
         * 
         * This ensures that the map, when drawn behind the player, 
         * always locks the player onto the grid! :D
         * - Ryan
         */
        var offsetX = ((canvas.width / 2) % Game.TILE_SIZE) - (Game.TILE_SIZE / 2);
        var offsetY = ((canvas.height / 2) % Game.TILE_SIZE) - (Game.TILE_SIZE / 2);
        
        // However, the formula leaves the offset too large by 
        // 1 tile in each dimension, for reasons I cannot understand
        offsetX -= Game.TILE_SIZE;
        offsetY -= Game.TILE_SIZE;
        
        // But we also need to see when the player is moving between tiles
        offsetX -= (this.player.x % 1) * Game.TILE_SIZE;
        offsetY -= (this.player.y % 1) * Game.TILE_SIZE;
        
        ctx.translate(offsetX, offsetY);
        this.world.draw(this.player, canvas, ctx, this.tileManager);
        ctx.restore();
        
        
        
        // Draw the player, in the center
        var x = (canvas.width / 2) - (Game.TILE_SIZE / 2);
        var y = (canvas.height / 2) - (Game.TILE_SIZE / 2);
        ctx.save();
        ctx.translate(x, y);
        this.player.draw(ctx);
        ctx.restore();
        
        // Draw build and debugging info
        ctx.font = "bold 20px Comic Sans";
        var y = 30;
        ctx.fillText("Block Game " + Game.VERSION + " (Build " + Game.BUILD + ")", 5, y);
        ctx.font = "bold 15px Comic Sans";
        ctx.fillText("Arrow keys - Movement", 5, y += 15);
        ctx.fillText("D - Toggle world grid", 5, y += 15);
        ctx.fillText("W - Draw only world", 5, y += 15);
    };
    
    return Game;
    
})(); // 