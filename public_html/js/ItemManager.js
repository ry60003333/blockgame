/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
window.ItemManager = (function() {
    
    /**
     * Creates a new ItemManager.
     * @returns {ItemManager} The new ItemManager object.
     */
    function ItemManager() {
        /**
         * The array of loaded item definitions.
         * @type Array
         */
        this.items = [];
    }
    
    /**
     * The JSON item data.
     */
    ItemManager.jsonData = {
        "items" : [
            {
                "id" : "0", 
                "name" : "null", 
                "image" : "null"
            }, 
            {
                "id" : "1", 
                "name" : "Stone", 
                "image" : "stone.png"
            }, 
            {
                "id" : "2", 
                "name" : "Sand", 
                "image" : "sand.png"
            },
            {
                "id" : "3", 
                "name" : "Salt", 
                "image" : "salt.png"
            },
            {
                "id" : "4", 
                "name" : "Copper", 
                "image" : "copper.png"
            },
            {
                "id" : "5", 
                "name" : "Iron", 
                "image" : "iron.png"
            },
            {
                "id" : "6", 
                "name" : "Brick", 
                "image" : "brick.png"
            }
        ]
    };
    
    /**
     * Load the item definitions.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    ItemManager.prototype.load = function(assetLoader) {
        var items = this.items;
        var loader = this;
        // Load the tiles JSON file
        ItemManager.jsonData["items"].forEach(function(next) {
            
            var image = null;
            
            if (next.image !== "") {
                // Load the image of the tile
                image = new Image();
                var imageName = next.image;
                if (imageName === "null") {
                    imageName = "generic_item.png";
                }
                
                assetLoader.addImage(image, "assets/items/" + imageName);
            }
            
            loader.items[next.id] = new ItemDefinition(
                    parseInt(next.id), 
                    next.name, 
                    image);
            
        });
    };
    
    /**
     * Get an item definition by it's ID.
     * @param {Number} id The ID of the item.
     * @returns {ItemDefinition} The item definition.
     */
    ItemManager.prototype.getDefinition = function(id) {
        return this.items[id];
    };
    
    return ItemManager;
})();