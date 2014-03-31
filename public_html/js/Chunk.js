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
     * @returns {Chunk} The new Chunk object.
     */
    function Chunk(x, y) {
        /**
         * The associative array of tiles in the chunk.
         * @type Array
         */
        this.tiles = [];
        
        /**
         * The array of items in the chunk.
         * @type Array
         */
        this.items = [];
        
        this.x = x;
        this.y = y;
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