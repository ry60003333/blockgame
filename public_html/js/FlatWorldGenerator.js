/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
window.FlatWorldGenerator = (function() {
    
    /**
     * Creates a new FlatWorldGenerator.
     * @returns {FlatWorldGenerator} The new FlatWorldGenerator object.
     */
    function FlatWorldGenerator() {
        
    }
    
    /**
     * Generate a chunk.
     * @param {Game} game The game instance.
     * @param {Coordinate} location The location of the Chunk to generate.
     * @returns {Chunk} The generated Chunk.
     */
    FlatWorldGenerator.prototype.generateChunk = function(game, location) {
        var chunk = new Chunk(location.x, location.y);
        
        // By default, initialize the chunk with grass.
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+1); // 1-4 are the IDs for Grass
                
                // Make some pretty flowers!
                if (Utilities.random(1, 20) === 1) {
                    chunk.tiles[x + "," + y] =  Math.floor((Math.random()*3)+9); // 9-11 are the IDs for Flower Grass
                }
            }
            
        }
                    
        return chunk;
    };
    
    return FlatWorldGenerator;
})();