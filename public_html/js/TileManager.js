/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.TileManager = (function () {
    
    /**
     * Creates a new TileManager.
     * @returns {TileManager} The new TileManager object.
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
                "image": "", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            
            // Four different grass variations, ids 1-4
            {
                "id": "1",
                "name": "Grass",
                "image": "grass.png", 
                "nextId" : "5", 
                "category" : "null", 
                "timeToBreak" : "1000", 
                "breakItemId" : "-1"
            },
            {
                "id": "2",
                "name": "Grass",
                "image": "grass2.png", 
                "nextId" : "6", 
                "category" : "null", 
                "timeToBreak" : "1000", 
                "breakItemId" : "-1"
            },
            {
                "id": "3",
                "name": "Grass",
                "image": "grass3.png", 
                "nextId" : "7", 
                "category" : "null", 
                "timeToBreak" : "1000", 
                "breakItemId" : "-1"
            },
            {
                "id": "4",
                "name": "Grass",
                "image": "grass4.png", 
                "nextId" : "8", 
                "category" : "null", 
                "timeToBreak" : "1000", 
                "breakItemId" : "-1"
            },
            
            // Four different dirt variations, ids 5-8
            {
                "id": "5",
                "name": "Dirt",
                "image": "dirt.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "6",
                "name": "Dirt",
                "image": "dirt2.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "7",
                "name": "Dirt",
                "image": "dirt3.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "8",
                "name": "Dirt",
                "image": "dirt4.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            
            // Three different flower grass variations, ids 9-11
            {
                "id": "9",
                "name": "Flower Grass",
                "image": "flower_grass.png", 
                "nextId" : "1", 
                "category" : "null", 
                "timeToBreak" : "1500", 
                "breakItemId" : "-1"
            },
            {
                "id": "10",
                "name": "Flower Grass",
                "image": "flower_grass2.png", 
                "nextId" : "2", 
                "category" : "null", 
                "timeToBreak" : "1500", 
                "breakItemId" : "-1"
            },
            {
                "id": "11",
                "name": "Flower Grass",
                "image": "flower_grass3.png", 
                "nextId" : "3", 
                "category" : "null", 
                "timeToBreak" : "1500", 
                "breakItemId" : "-1"
            },
            
            // Four different water variations, ids 12-15
            {
                "id": "12",
                "name": "Water",
                "image": "water.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "13",
                "name": "Water",
                "image": "water2.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "14",
                "name": "Water",
                "image": "water3.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "15",
                "name": "Water",
                "image": "water4.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            
            // Four different stone variations, ids 16-19
            {
                "id": "16",
                "name": "Stone",
                "image": "stone.png", 
                "nextId" : "5", 
                "category" : "null", 
                "timeToBreak" : "3000", 
                "breakItemId" : "1"
            },
            {
                "id": "17",
                "name": "Stone",
                "image": "stone2.png", 
                "nextId" : "6", 
                "category" : "null", 
                "timeToBreak" : "3000", 
                "breakItemId" : "1"
            },
            {
                "id": "18",
                "name": "Stone",
                "image": "stone3.png", 
                "nextId" : "7", 
                "category" : "null", 
                "timeToBreak" : "3000", 
                "breakItemId" : "1"
            },
            {
                "id": "19",
                "name": "Stone",
                "image": "stone4.png", 
                "nextId" : "8", 
                "category" : "null", 
                "timeToBreak" : "3000", 
                "breakItemId" : "1"
            },
            
            // Four different sand variations, ids 20-23
            {
                "id": "20",
                "name": "Sand",
                "image": "sand.png", 
                "nextId" : "5", 
                "category" : "null", 
                "timeToBreak" : "800", 
                "breakItemId" : "2"
            },
            {
                "id": "21",
                "name": "Sand",
                "image": "sand2.png", 
                "nextId" : "6", 
                "category" : "null", 
                "timeToBreak" : "800", 
                "breakItemId" : "2"
            },
            {
                "id": "22",
                "name": "Sand",
                "image": "sand3.png", 
                "nextId" : "7", 
                "category" : "null", 
                "timeToBreak" : "800", 
                "breakItemId" : "2"
            },
            {
                "id": "23",
                "name": "Sand",
                "image": "sand4.png", 
                "nextId" : "8", 
                "category" : "null", 
                "timeToBreak" : "800", 
                "breakItemId" : "2"
            },
            
            // Four different salt variations, ids 24-27
            {
                "id": "24",
                "name": "Salt",
                "image": "salt.png", 
                "nextId" : "5", 
                "category" : "null", 
                "timeToBreak" : "2500", 
                "breakItemId" : "3"
            },
            {
                "id": "25",
                "name": "Salt",
                "image": "salt2.png", 
                "nextId" : "6", 
                "category" : "null", 
                "timeToBreak" : "2500", 
                "breakItemId" : "3"
            },
            {
                "id": "26",
                "name": "Salt",
                "image": "salt3.png", 
                "nextId" : "7", 
                "category" : "null", 
                "timeToBreak" : "2500", 
                "breakItemId" : "3"
            },
            {
                "id": "27",
                "name": "Salt",
                "image": "salt4.png", 
                "nextId" : "8", 
                "category" : "null", 
                "timeToBreak" : "2500", 
                "breakItemId" : "3"
            },
            
            // One copper tile, id 28
            {
                "id": "28",
                "name": "Copper",
                "image": "copper.png", 
                "nextId" : "5", 
                "category" : "null", 
                "timeToBreak" : "3500", 
                "breakItemId" : "4"
            },
            
            // One iron tile, id 29
            {
                "id": "29",
                "name": "Iron",
                "image": "iron.png", 
                "nextId" : "6", 
                "category" : "null", 
                "timeToBreak" : "4000", 
                "breakItemId" : "5"
            },
            
            // Four different magma variations, ids 30-33
            {
                "id": "30",
                "name": "Magma",
                "image": "magma.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "31",
                "name": "Magma",
                "image": "magma2.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "32",
                "name": "Magma",
                "image": "magma3.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            {
                "id": "33",
                "name": "Magma",
                "image": "magma4.png", 
                "nextId" : "-1", 
                "category" : "null", 
                "timeToBreak" : "-1", 
                "breakItemId" : "-1"
            },
            
            // One brick tile, id 34
            {
                "id": "34",
                "name": "Brick",
                "image": "brick.png", 
                "nextId" : "7", 
                "category" : "null", 
                "timeToBreak" : "2700", 
                "breakItemId" : "6"
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
                    parseInt(next.id), 
                    next.name, 
                    null, 
                    tileImage, 
                    parseInt(next.nextId), 
                    next.category, 
                    parseInt(next.timeToBreak), 
                    parseInt(next.breakItemId)
                    );
            
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

