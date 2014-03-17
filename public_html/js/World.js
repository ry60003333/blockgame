/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.World = (function() {
    
    function World() {
        
        // The loaded chunks in the world.
        this.chunks = [];
        this.drawGrid = true;
        
        /* The amount of tiles to draw "offscreen"
         * This prevents whitespace on the border when the world is translated
         * behind the player.
         */
        this.offscreenTileBufferSize = 2;
    }
    
    /**
     * Draw the world.
     * @param {Player} player The player.
     * @param {type} canvas The canvas.
     * @param {type} ctx The 2D drawing context of the canvas.
     * @returns {undefined}
     */
    World.prototype.draw = function(player, canvas, ctx) {
        
        // Create a local copy of this for now instead of adding this.
        // in front of everything.
        var offscreenTileBufferSize = this.offscreenTileBufferSize;
        
        /*
         * Calculate the starting (top left corner)
         * world X and Y values.
         */
        var startWorldX = Math.floor(Utilities.center(player.x) - Math.ceil(((canvas.width / 2) / Game.TILE_SIZE)));
        var startWorldY = Math.floor(Utilities.center(player.y) - Math.ceil(((canvas.height / 2) / Game.TILE_SIZE)));
        
        // Calculate the starting chunk coordinates
        // Subtract two for buffer space
        var startChunkX = Math.floor(startWorldX / Chunk.CHUNK_SIZE) - 2;
        var startChunkY = Math.floor(startWorldY / Chunk.CHUNK_SIZE) - 2;
        
        // Calculate the width & height of the drawing area in chunks, and round up.
        var canvasChunkWidth = Math.ceil(canvas.width / Game.TILE_SIZE / Chunk.CHUNK_SIZE);
        var canvasChunkHeight = Math.ceil(canvas.height / Game.TILE_SIZE / Chunk.CHUNK_SIZE);
        
        // Use the width and height to get the end chunk coordinates.
        // Add 4 for buffer space; this is 4 instead of two
        // because we must offset the -2 in the start X and Y formula above, 
        // and add another chunk to prevent flicker on the right and bottom side.
        var endChunkX = startChunkX + canvasChunkWidth + 4;
        var endChunkY = startChunkY + canvasChunkHeight + 4;
        
        // Keep track of the "active" chunks so other ones can be unloaded.
        var activeChunks = [];

        ctx.font = "bold 10px Comic Sans";
        for (var chunkX = startChunkX; chunkX < endChunkX; chunkX++) {
            for (var chunkY = startChunkY; chunkY < endChunkY; chunkY++) {
                
                // Calculate the world X and Y of the start of the chunk.
                var worldX = chunkX * Chunk.CHUNK_SIZE;
                var worldY = chunkY * Chunk.CHUNK_SIZE;

                // Calculate the local X and Y of the chunk on the screen
                var localX = worldX-startWorldX;
                var localY = worldY-startWorldY;

                // Now convert those to actual canvas coordinates.
                // That was a lot of work!
                var drawX = (localX * Game.TILE_SIZE);
                var drawY = (localY * Game.TILE_SIZE);
                
                // Save our drawing context
                ctx.save();
                
                // Translate to where we want the chunk drawn.
                ctx.translate(drawX, drawY);
                
                // Make sure the chunk is loaded!
                var chunkKey = chunkX + "," + chunkY;
                var chunk = this.chunks[chunkKey];
                if (!chunk) {
                    chunk = new Chunk();
                    this.chunks[chunkKey] = chunk;
                }
                
                // Mark the chunk as active
                activeChunks[chunkKey] = true;
                
                // Draw the chunk
                chunk.draw(ctx);
                
                // Draw the chunk coordinate if the grid is enabled.
                if (this.drawGrid) {
                    ctx.fillStyle = "black";
                    ctx.fillText(chunkX + "," + chunkY, 13, (Game.TILE_SIZE - 5));
                }
                ctx.restore();
            }
        }
        
        // Unload chunks that are not active.
        for (var key in this.chunks) {
            if (!activeChunks[key]) {
                delete this.chunks[key];
            }
        }
        
        if (this.drawGrid) {
            // Draw lines for debugging 
            ctx.strokeStyle = "black";
            ctx.beginPath();


            /*
             * For the following methods, we draw the lines longer then the size of the canvas
             * so that when the world is traslated, there isn't white borders on the edges.
             * This is also why we draw extra tiles!
             */

            for (var x = 0; x < (canvas.width / Game.TILE_SIZE) + offscreenTileBufferSize; x++) {
                ctx.moveTo(x*Game.TILE_SIZE, -(Game.TILE_SIZE * offscreenTileBufferSize));
                ctx.lineTo(x*Game.TILE_SIZE, canvas.height + (Game.TILE_SIZE * offscreenTileBufferSize));
            }

            for (var y = 0; y < (canvas.height / Game.TILE_SIZE) + offscreenTileBufferSize; y++) {
                ctx.moveTo(-(Game.TILE_SIZE * offscreenTileBufferSize), y*Game.TILE_SIZE);
                ctx.lineTo(canvas.width + (Game.TILE_SIZE * offscreenTileBufferSize), y*Game.TILE_SIZE);
            }
            ctx.closePath();
            ctx.stroke();
            
            var tileLabelX = startWorldX-offscreenTileBufferSize;
            ctx.font = "10px Comic Sans";
            // Label each tile with it's location
            for (var x = -offscreenTileBufferSize; x < (canvas.width / Game.TILE_SIZE) + offscreenTileBufferSize; x++) {
                var tileLabelY = startWorldY-offscreenTileBufferSize;
                for (var y = -offscreenTileBufferSize; y < (canvas.height / Game.TILE_SIZE) + offscreenTileBufferSize; y++) {
                    var drawX = x * Game.TILE_SIZE + 1;
                    var drawY = y * Game.TILE_SIZE + 10;
                    ctx.fillText(tileLabelX + "," + tileLabelY, drawX, drawY);
                    tileLabelY++;
                }
                tileLabelX++;
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