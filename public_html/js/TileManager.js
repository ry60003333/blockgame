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
                "id": "0",
                "name": "Air",
                "image": ""
            },
            
            // Four different grass variations, ids 1-4
            {
                "id": "1",
                "name": "Grass",
                "image": "grass.png"
            },
            {
                "id": "2",
                "name": "Grass",
                "image": "grass2.png"
            },
            {
                "id": "3",
                "name": "Grass",
                "image": "grass3.png"
            },
            {
                "id": "4",
                "name": "Grass",
                "image": "grass4.png"
            },
            
            // Four different dirt variations, ids 5-8
            {
                "id": "5",
                "name": "Dirt",
                "image": "dirt.png"
            },
            {
                "id": "6",
                "name": "Dirt",
                "image": "dirt2.png"
            },
            {
                "id": "7",
                "name": "Dirt",
                "image": "dirt3.png"
            },
            {
                "id": "8",
                "name": "Dirt",
                "image": "dirt4.png"
            },
            
            // Three different flower grass variations, ids 9-11
            {
                "id": "9",
                "name": "Flower Grass",
                "image": "flower_grass.png"
            },
            {
                "id": "10",
                "name": "Flower Grass",
                "image": "flower_grass2.png"
            },
            {
                "id": "11",
                "name": "Flower Grass",
                "image": "flower_grass3.png"
            },
            
            // Four different water variations, ids 12-15
            {
                "id": "12",
                "name": "Water",
                "image": "water.png"
            },
            {
                "id": "13",
                "name": "Water",
                "image": "water2.png"
            },
            {
                "id": "14",
                "name": "Water",
                "image": "water3.png"
            },
            {
                "id": "15",
                "name": "Water",
                "image": "water4.png"
            },
            
            // Four different stone variations, ids 16-19
            {
                "id": "16",
                "name": "Stone",
                "image": "stone.png"
            },
            {
                "id": "17",
                "name": "Stone",
                "image": "stone2.png"
            },
            {
                "id": "18",
                "name": "Stone",
                "image": "stone3.png"
            },
            {
                "id": "19",
                "name": "Stone",
                "image": "stone4.png"
            },
            
            // Four different sand variations, ids 20-23
            {
                "id": "20",
                "name": "Sand",
                "image": "sand.png"
            },
            {
                "id": "21",
                "name": "Sand",
                "image": "sand2.png"
            },
            {
                "id": "22",
                "name": "Sand",
                "image": "sand3.png"
            },
            {
                "id": "23",
                "name": "Sand",
                "image": "sand4.png"
            },
            
            // Four different salt variations, ids 24-27
            {
                "id": "24",
                "name": "Salt",
                "image": "salt.png"
            },
            {
                "id": "25",
                "name": "Salt",
                "image": "salt2.png"
            },
            {
                "id": "26",
                "name": "Salt",
                "image": "salt3.png"
            },
            {
                "id": "27",
                "name": "Salt",
                "image": "salt4.png"
            },
            
            // One copper tile, id 28
            {
                "id": "28",
                "name": "Copper",
                "image": "copper.png"
            },
            
            // One iron tile, id 29
            {
                "id": "29",
                "name": "Iron",
                "image": "iron.png"
            },
            
            // Four different magma variations, ids 30-33
            {
                "id": "30",
                "name": "Magma",
                "image": "magma.png"
            },
            {
                "id": "31",
                "name": "Magma",
                "image": "magma2.png"
            },
            {
                "id": "32",
                "name": "Magma",
                "image": "magma3.png"
            },
            {
                "id": "33",
                "name": "Magma",
                "image": "magma4.png"
            },
            
            // One brick tile, id 34
            {
                "id": "34",
                "name": "Brick",
                "image": "brick.png"
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
            
            loader.tiles[next.id] = new Tile(
                    next.id, 
                    next.name, 
                    null, 
                    tileImage, 
                    -1, 
                    "null", 
                    3000);
            
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

