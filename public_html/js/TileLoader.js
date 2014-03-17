/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.TileLoader = (function () {
    
    /**
     * Creates a new TileLoader.
     * @returns {_L7.TileLoader}
     */
    function TileLoader() {
        /**
         * The array of loaded tiles.
         * @type Array
         */
        this.tiles = [];
    }
    
    /**
     * Load the tiles.
     * @returns {undefined}
     */
    TileLoader.prototype.load = function() {
        var tiles = this.tiles;
        tiles[0] = new Tile(0, null);
        tiles[1] = new Tile(1, "green");
        tiles[2] = new Tile(2, "red");
        tiles[3] = new Tile(3, "blue");
    };
    
    /**
     * Get a tile by it's ID.
     * @param {Number} id The ID of the tile.
     * @returns {Tile} The tile.
     */
    TileLoader.prototype.getTile = function(id) {
        return this.tiles[id];
    };
    
    
    return TileLoader;
    
})();

