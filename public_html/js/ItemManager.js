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
     * Load the item definitions.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    ItemManager.prototype.load = function(assetLoader) {
        
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