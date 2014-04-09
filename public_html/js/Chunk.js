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
        
        /**
         * The X location of the Chunk.
         * @type Number
         */
        this.x = x;
        
        /**
         * The Y location of the Chunk.
         * @type Number
         */
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
     * @param {Game} game The game instance.
     * @returns {undefined}
     */
    Chunk.prototype.draw = function(player, ctx, game) {
        var tileManager = game.tileManager;
        for (var x = 0; x < Chunk.CHUNK_SIZE; x++) {
            for (var y = 0; y < Chunk.CHUNK_SIZE; y++) {
                var key = x + "," + y;
                var tileId = this.tiles[key];
                var drawX = x * Game.TILE_SIZE;
                var drawY = y * Game.TILE_SIZE;
                var tile = tileManager.getTile(tileId);
                tile.draw(ctx, drawX, drawY);
                
                // Check if the player is breaking the current tile
                if (player.blockBreakTimestamp !== -1) {
                    var world = this.getWorldCoordinates(new Coordinate(x, y));
                    if (world.equals(player.getFocus())) {
                        var delta = Utilities.currentTimeMillis()-player.blockBreakTimestamp;
                        var time = tile.timeToBreak;
                        if (time === -1) {
                            time = 10000;
                        }
                        var percent = delta/time;
                        
                        // You can never break tiles that would turn to nothing.
                        if (tile.nextId === -1 && percent > 0.5) {
                            percent = 0.5;
                        }
                        
                        if (percent >= 1) {
                            percent = 1;
                            
                            // Break the tile!
                            player.blockBreakTimestamp = -1;
                            this.tiles[key] = tile.nextId;
                            
                            // Check if it gives an item
                            if (tile.breakItemId !== -1) {
                                var itemDefinition = game.itemManager.getDefinition(tile.breakItemId);
                                var item = new Item(itemDefinition, x, y);
                                this.items.push(item);
                            }
                        }
                        ctx.fillStyle = "rgba(255, 255, 255, " + percent/1.3 + ")";
                        ctx.fillRect(drawX, drawY, Game.TILE_SIZE, Game.TILE_SIZE);
                    }
                } 
            }
        }
        
        // Draw the items!
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var drawX = item.x * Game.TILE_SIZE;
            var drawY = item.y * Game.TILE_SIZE;
            item.getDefinition().draw(ctx, drawX, drawY);
            
            // Lets do collision detection here because why not xD
            if (player.getMoved()) {
                var world = this.getWorldCoordinates(new Coordinate(item.x, item.y));
                if (world.equals(player.getFocus())) {
                    player.inventory.addItem(item);
                    this.items.splice(this.items.indexOf(item), 1);
                }
            }
        }
        
    };
    
    return Chunk;
})();