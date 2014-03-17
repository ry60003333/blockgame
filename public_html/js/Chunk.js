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
    var CHUNK_SIZE = 32;
    
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
        this.tiles = [[]];
        
        this.x = x;
        this.y = y;
        
        // By default, initialize the chunk with grass.
        for (var x = 0; x < CHUNK_SIZE; x++) {
            for (var y = 0; y < CHUNK_SIZE; y++) {
                tiles[x][y] = 1; // 1 is the ID for Grass
            }
        }
    }
    
    return Chunk;
})();