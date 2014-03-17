/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Game = (function() {
    
    function Game() {
        this.player = new Player(0, 0);
        this.world = new World();
    }
    
    /**
     * The size of a tile, in pixels.
     */
    Game.TILE_SIZE = 32;
    
    /**
     * Update the contents of the game.
     * @param {Array} keyStatus The status of the keyboard.
     * @param {Number} deltaTimeMillis The delta time since the last update, in MS.
     * @returns {undefined}
     */
    Game.prototype.update = function(keyStatus, deltaTimeMillis) {
        this.player.update(keyStatus, deltaTimeMillis);
    };
    
    /**
     * Draw the contents of the game.
     * @param {type} canvas The canvas.
     * @param {type} ctx The 2D drawing context.
     * @returns {undefined}
     */
    Game.prototype.draw = function(canvas, ctx) {
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
        
        // But we also need to see when the player is moving between tiles
        offsetX -= (this.player.x % 1) * Game.TILE_SIZE;
        offsetY -= (this.player.y % 1) * Game.TILE_SIZE;
        
        ctx.translate(offsetX, offsetY);
        this.world.draw(this.player, canvas, ctx);
        ctx.restore();
        
        
        
        // Draw the player, in the center
        var x = (canvas.width / 2) - (Game.TILE_SIZE / 2);
        var y = (canvas.height / 2) - (Game.TILE_SIZE / 2);
        ctx.save();
        ctx.translate(x, y);
        this.player.draw(ctx);
        ctx.restore();
    };
    
    return Game;
    
})(); // 