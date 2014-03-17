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
        
        var typeVariance = [1, 1, 1, 1, 1, 1];
        
        var chunkType = typeVariance[Utilities.random(0, typeVariance.length)];
        
        // By default, initialize the chunk with grass.
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                
                switch (chunkType) {
                    // Grass
                    default:
                    case 1:
                        this.tiles[x + "," + y] = 1; // 1 is the ID for Grass

                        // Make some pretty flowers!
                        if (Utilities.random(1, 20) === 1) {
                            this.tiles[x + "," + y] = 3;
                        } else if (Utilities.random(1, 30) === 1) {
                            this.tiles[x + "," + y] = 2; // Dirt
                        } else if (Utilities.random(1, 100) === 1) {
                            this.tiles[x + "," + y] = 5; // Stone
                        }
                        break;
                    case 2: // Water
                        this.tiles[x + "," + y] = 4;
                        break;
                }
                
            }
        }
        
        /*this.tiles[0 + "," + 0] = 3;
        this.tiles[0 + "," + (Chunk.CHUNK_SIZE-1)] = 2;
        this.tiles[(Chunk.CHUNK_SIZE-1) + "," + 0] = 2;
        this.tiles[(Chunk.CHUNK_SIZE-1) + "," + (Chunk.CHUNK_SIZE-1)] = 3;*/
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