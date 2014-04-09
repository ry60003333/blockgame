/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
window.NpcManager = (function() {
    
    /**
     * Creates a new NpcManager.
     * @returns {NpcManager} The new NpcManager object.
     */
    function NpcManager() {
        /**
         * The array of loaded Npc definitions.
         * @type Array
         */
        this.npcs = [];
    }
    
    /**
     * The JSON item data.
     */
    NpcManager.jsonData = {
        "npcs" : [
            {
                "id" : "0", 
                "name" : "null", 
                "image" : "null"
            }
        ]
    };
    
    /**
     * Load the Npc definitions.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    NpcManager.prototype.load = function(assetLoader) {
        var npcs = this.npcs;
        var loader = this;
        // Load the tiles JSON file
        NpcManager.jsonData["npcs"].forEach(function(next) {
            
            var image = null;
            
            if (next.image !== "") {
                // Load the image of the tile
                image = new Image();
                var imageName = next.image;
                if (imageName === "null") {
                    imageName = "generic_npc.png";
                }
                
                assetLoader.addImage(image, "assets/npcs/" + imageName);
            }
            
            loader.npcs[next.id] = new NpcDefinition(
                    parseInt(next.id), 
                    next.name, 
                    image);
            
        });
    };
    
    /**
     * Get an Npc definition by it's ID.
     * @param {Number} id The ID of the Npc.
     * @returns {NpcDefinition} The Npc definition.
     */
    NpcManager.prototype.getDefinition = function(id) {
        return this.npcs[id];
    };
    
    return NpcManager;
})();