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
     * Load the Npc definitions.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    NpcManager.prototype.load = function(assetLoader) {
        
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