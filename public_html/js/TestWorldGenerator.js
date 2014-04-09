/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
window.TestWorldGenerator = (function() {
    
    /**
     * Creates a new TestWorldGenerator.
     * @returns {TestWorldGenerator} The new TestWorldGenerator object.
     */
    function TestWorldGenerator() {
        
    }
    
    /**
     * Generate a chunk.
     * @param {Game} game The game instance.
     * @param {Coordinate} location The location of the Chunk to generate.
     * @returns {Chunk} The generated Chunk.
     */
    TestWorldGenerator.prototype.generateChunk = function(game, location) {
        
        // Put all testing stuff in here :)
        
        var chunk = new Chunk(location.x, location.y);
        
        var typeVariance = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3];
        
        var chunkType = typeVariance[Utilities.random(0, typeVariance.length)];
        
        // Generate a radius for water/salt areas
        var radius = (Math.random()*Chunk.CHUNK_SIZE/5)+2;
        var center = new Coordinate(Chunk.CHUNK_SIZE / 2, Chunk.CHUNK_SIZE / 2);
        
        // By default, initialize the chunk with grass.
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                
                var point = new Coordinate(x, y);
                
                var inRadius = Utilities.distance(point, center) <= radius;
                var onEdge = inRadius && Utilities.distance(point, center) >= radius-1;
                if (onEdge) {
                    //inRadius = Utilities.random(0, 2) === 0;
                }
                
                switch (chunkType) {
                    // Grass
                    default:
                    case 1:
                        chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+1); // 1-4 are the IDs for Grass
                        
                        // Make some pretty flowers!
                        if (Utilities.random(1, 20) === 1) {
                            chunk.tiles[x + "," + y] =  Math.floor((Math.random()*3)+9); // 9-11 are the IDs for Flower Grass
                        }
                        else if (Utilities.random(1, 500) === 1) {
                            chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+5); // 5-8 are the IDs for Dirt
                        }
                        else if (Utilities.random(1, 100) === 1) {
                            chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+16); // 16-19 are the IDs for Stone

                            if (Utilities.random(1, 5) === 1) {
                                chunk.tiles[x + "," + y] =  28; // 28 is the ID for Copper
                            }
                            else if (Utilities.random(1, 10) === 1) {
                                chunk.tiles[x + "," + y] = 29; // 29 is the ID for Iron
                            }
                            else if (Utilities.random(1, 15) === 1) {
                                chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+30); // 30-33 are the IDs for Magma
                            }

                        }
                        break;
                    case 2: // Water
                        if (inRadius) {
                            chunk.tiles[x + "," + y] = Math.floor((Math.random()*1)+12); // 12-15 are the IDs for Water, disabled the other 3 for now as they look funky when all together
                        }
                        else {
                            chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+1); // 1-4 are the IDs for Grass
                        }
                        break;
                    case 3: // Salt!
                        if (inRadius) {
                            chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+24); // 24-27 are the IDs for Salt
                        }
                        else {
                            chunk.tiles[x + "," + y] = Math.floor((Math.random()*4)+1); // 1-4 are the IDs for Grass
                        }
                        break;
                }
                
            }
            
        }
       
        return chunk;
    };
    
    return TestWorldGenerator;
})();