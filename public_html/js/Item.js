/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
window.Item = (function() {
    
    /**
     * Creates a new Item.
     * @param {ItemDefiniton} definition The definition of the item.
     * @param {Number} x The X location of the item. (local)
     * @param {Number} y The Y location of the item. (local)
     * @returns {Item} The new Item object.
     */
    function Item(definition, x, y) {
        this.definition = definition;
        this.x = x;
        this.y = y;
    }
    
    /**
     * Get the definition of the Item.
     * @returns {ItemDefiniton} The ItemDefinition.
     */
    Item.prototype.getDefinition = function() {
        return this.definition;
    };
    
    return Item;
})();