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
    Chunk.CHUNK_SIZE = 4; //32
    
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
    }
    
    Chunk.prototype.draw = function(ctx) {
        
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                var tileId = this.tiles[x + "," + y];
                switch (tileId) {
                    default:
                        break;
                    case 1:
                        ctx.fillStyle = "green";
                        ctx.fillRect(x * Game.TILE_SIZE, y * Game.TILE_SIZE, Game.TILE_SIZE, Game.TILE_SIZE);
                        break;
                }
            }
        }
        
    };
    
    return Chunk;
})();