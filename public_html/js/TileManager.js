/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.TileManager = (function () {
    
    /**
     * Creates a new TileManager.
     * @returns {_L7.TileManager}
     */
    function TileManager() {
        /**
         * The array of loaded tiles.
         * @type Array
         */
        this.tiles = [];
    }
    
    /**
     * The JSON tile data; this will live here until
     * we get the okay to use JQuery or another library
     * to load the JSON file; doing it in pure JS is not fun!
     */
    TileManager.jsonData = {
        "tiles": [
            {
                "id" : "0",
                "name" : "Air", 
                "image" : ""
            }, 
            {
                "id" : "1",
                "name" : "Grass", 
                "image" : "grass.png"
            }, 
            {
                "id" : "2",
                "name" : "Dirt", 
                "image" : "dirt.png"
            },
            {
                "id" : "3",
                "name" : "Flower Grass", 
                "image" : "flower_grass.png"
            }, 
            {
                "id" : "4",
                "name" : "Water", 
                "image" : "water.png"
            }, 
            {
                "id" : "5",
                "name" : "Stone", 
                "image" : "stone.png"
            }, 
            {
                "id" : "6",
                "name" : "Sand", 
                "image" : "sand.png"
            }, 
            {
                "id" : "7",
                "name" : "Brick", 
                "image" : "brick.png"
            }, 
            {
                "id" : "8",
                "name" : "Salt", 
                "image" : "salt.png"
            }
        ]
    }
    ;
    
    /**
     * Load the tiles.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    TileManager.prototype.load = function(assetLoader) {
        var tiles = this.tiles;
        var loader = this;
        // Load the tiles JSON file
        TileManager.jsonData["tiles"].forEach(function(next) {
            
            var tileImage = null;
            
            if (next.image !== "") {
                // Load the image of the tile
                tileImage = new Image();
                
                assetLoader.addImage(tileImage, "assets/tiles/" + next.image);
            }
            
            loader.tiles[next.id] = new Tile(next.id, next.name, null, tileImage);
            
        });
    };
    
    /**
     * Get a tile by it's ID.
     * @param {Number} id The ID of the tile.
     * @returns {Tile} The tile.
     */
    TileManager.prototype.getTile = function(id) {
        return this.tiles[id];
    };
    
    
    return TileManager;
    
    
    
})();

