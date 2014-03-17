/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Chunk = (function() {
    
    /**
     * The dimensions of a Chunk.
     * @type Number
     */
    Chunk.CHUNK_SIZE = 8;
    
    /**
     * Creates a Chunk object.
     * @param {Number} x The X location of the chunk.
     * @param {Number} y The Y location of the chunk.
     * @returns {_L6.Chunk}
     */
    function Chunk(x, y) {
        /**
         * The two dimensional array of tiles in the chunk.
         * @type Array
         */
        this.tiles = [];
        
        this.x = x;
        this.y = y;
        
        // By default, initialize the chunk with grass.
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                this.tiles[x + "," + y] = 1; // 1 is the ID for Grass
            }
        }
        this.tiles[0 + "," + 0] = 3;
        this.tiles[0 + "," + (Chunk.CHUNK_SIZE-1)] = 2;
        this.tiles[(Chunk.CHUNK_SIZE-1) + "," + 0] = 2;
        this.tiles[(Chunk.CHUNK_SIZE-1) + "," + (Chunk.CHUNK_SIZE-1)] = 3;
    }
    
    /**
     * Draw the Chunk. (Draws from 0, 0)
     * @param {type} ctx The 2D drawing context.
     * @param {TileManager} tileManager The tile loader.
     * @returns {undefined}
     */
    Chunk.prototype.draw = function(ctx, tileManager) {
        
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                var tileId = this.tiles[x + "," + y];
                var drawX = x * Game.TILE_SIZE;
                var drawY = y * Game.TILE_SIZE;
                tileManager.getTile(tileId).draw(ctx, drawX, drawY);
            }
        }
        
    };
    
    return Chunk;
})();