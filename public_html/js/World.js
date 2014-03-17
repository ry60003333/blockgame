/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.World = (function() {
    
    function World() {
        
        // The loaded chunks in the world.
        this.chunks = [[]];
    }
    
    World.prototype.draw = function(player, canvas, ctx) {
        /*
         * Calculate the starting (top left corner)
         * local X and Y values.
         */
        var startX = Math.floor(Utilities.center(player.x) - Math.ceil(((canvas.width / 2) / Game.TILE_SIZE)));
        var startY = Math.floor(Utilities.center(player.y) - Math.ceil(((canvas.height / 2) / Game.TILE_SIZE)));
        
        // TODO: Load chunks into view if needed, and unload unneeded ones
        
        // TODO: Draw those chunks!
        
        if (true) {
            // Draw lines for debugging 
            ctx.strokeStyle = "black";
            ctx.beginPath();

            /*
             * For the following methods, we draw the lines longer then the size of the canvas
             * so that when the world is traslated, there isn't white borders on the edges.
             * This is also why we draw extra tiles!
             */

            for (var x = 0; x < (canvas.width / Game.TILE_SIZE) + 1; x++) {
                ctx.moveTo(x*Game.TILE_SIZE, -Game.TILE_SIZE);
                ctx.lineTo(x*Game.TILE_SIZE, canvas.height + (Game.TILE_SIZE*2));
            }

            for (var y = 0; y < (canvas.height / Game.TILE_SIZE) + 1; y++) {
                ctx.moveTo(-Game.TILE_SIZE, y*Game.TILE_SIZE);
                ctx.lineTo(canvas.width + (Game.TILE_SIZE * 2), y*Game.TILE_SIZE);
            }
            ctx.closePath();
            ctx.stroke();

            var localX = startX;
            ctx.font = "10px Comic Sans";
            // Label each tile with it's location
            for (var x = -1; x < (canvas.width / Game.TILE_SIZE) + 1; x++) {
                var localY = startY;
                for (var y = -1; y < (canvas.height / Game.TILE_SIZE) + 1; y++) {
                    var drawX = x * Game.TILE_SIZE + 1;
                    var drawY = y * Game.TILE_SIZE + 10;
                    ctx.fillText(localX + "," + localY, drawX, drawY);
                    localY++;
                }
                localX++;
            }
        }
    };
    
    /**
     * Get the Chunk at the specified location.
     * @param {Number} x The X location of the chunk.
     * @param {Number} y The Y location of the chunk.
     * @returns {Chunk} The chunk.
     */
    World.prototype.getChunk = function(x, y) {
        var chunk = this.chunks[x][y];
        if (!chunk) {
            chunk = new Chunk(x, y);
            this.chunks[x][y] = chunk;
        }
        
        return chunk;
    };
    
    return World;
})();