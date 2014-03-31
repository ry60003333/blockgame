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
        
        var typeVariance = [1, 1, 1, 1, 1, 1, 2, 3];
        
        var chunkType = typeVariance[Utilities.random(0, typeVariance.length)];
        
        // By default, initialize the chunk with grass.
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                
                switch (chunkType) {
                    // Grass
                    default:
                    case 1:
                        this.tiles[x + "," + y] = Math.floor((Math.random()*4)+1); // 1-4 are the IDs for Grass
                        
                        // Make some pretty flowers!
                        if (Utilities.random(1, 20) === 1) {
                            this.tiles[x + "," + y] =  Math.floor((Math.random()*3)+9); // 9-11 are the IDs for Flower Grass
                        }
                        else if (Utilities.random(1, 30) === 1) {
                            this.tiles[x + "," + y] = Math.floor((Math.random()*4)+5); // 5-8 are the IDs for Dirt
                        }
                        else if (Utilities.random(1, 50) === 1) {
                            this.tiles[x + "," + y] = Math.floor((Math.random()*4)+16); // 16-19 are the IDs for Stone

                        if (Utilities.random(1, 5) === 1) {
                            this.tiles[x + "," + y] =  28; // 28 is the ID for Copper
                        }
                        else if (Utilities.random(1, 10) === 1) {
                            this.tiles[x + "," + y] = 29; // 29 is the ID for Iron
                        }
                        else if (Utilities.random(1, 15) === 1) {
                            this.tiles[x + "," + y] = Math.floor((Math.random()*4)+30); // 30-33 are the IDs for Magma
                        }

                        }
                        break;
                    case 2: // Water
                        this.tiles[x + "," + y] = Math.floor((Math.random()*1)+12); // 12-15 are the IDs for Water, disabled the other 3 for now as they look funky when all together
                        break;
                    case 3: // Salt!
                        this.tiles[x + "," + y] = Math.floor((Math.random()*4)+24); // 24-27 are the IDs for Salt
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
     * Convert local Coordinates inside the chunk to world coordinates.
     * @param {Coordinate} localCoordinate The local Coordinates.
     * @returns {Coordinate} The world Coordinates.
     */
    Chunk.prototype.getWorldCoordinates = function(localCoordinate) {
        return new Coordinate(this.x * Chunk.CHUNK_SIZE + localCoordinate.x, this.y * Chunk.CHUNK_SIZE + localCoordinate.y);
    };
    
    /**
     * Draw the Chunk. (Draws from 0, 0)
     * @param {Player} player The player.
     * @param {type} ctx The 2D drawing context.
     * @param {TileManager} tileManager The tile loader.
     * @returns {undefined}
     */
    Chunk.prototype.draw = function(player, ctx, tileManager) {
        
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                var tileId = this.tiles[x + "," + y];
                var drawX = x * Game.TILE_SIZE;
                var drawY = y * Game.TILE_SIZE;
                var tile = tileManager.getTile(tileId);
                tile.draw(ctx, drawX, drawY);
                
                // Check if the player is breaking the current tile
                if (player.blockBreakTimestamp !== -1) {
                    var world = this.getWorldCoordinates(new Coordinate(x, y));
                    if (world.equals(player.getFocus())) {
                        var delta = Utilities.currentTimeMillis()-player.blockBreakTimestamp;
                        var percent = delta/tile.timeToBreak;
                        
                        // You can never break tiles that would turn to nothing.
                        if (tile.nextId === -1 && percent > 0.5) {
                            percent = 0.5;
                        }
                        
                        if (percent > 1) {
                            percent = 1;
                        }
                        ctx.fillStyle = "rgba(255, 255, 255, " + percent + ")";
                        ctx.fillRect(drawX, drawY, Game.TILE_SIZE, Game.TILE_SIZE);
                    }
                } 
            }
        }
        
    };
    
    return Chunk;
})();