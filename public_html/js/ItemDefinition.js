/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
window.ItemDefinition = (function() {
    
    /**
     * Creates a new ItemDefinition.
     * @param {Number} id The ID of the item.
     * @param {String} name The name of the item.
     * @param {Image} image The image of the item.
     * @returns {ItemDefinition} The new ItemDefinition object.
     */
    function ItemDefinition(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
    
    /**
     * Draw the ItemDefinition.
     * @param {type} ctx The 2D drawing context.
     * @param {Number} x The X location to draw at.
     * @param {Number} y The Y location to draw at.
     * @returns {undefined}
     */
    ItemDefinition.prototype.draw = function(ctx, x, y) {
        if (this.image === null) {
            return;
        }
        ctx.drawImage(this.image, x, y, Game.TILE_SIZE, Game.TILE_SIZE);
    };
    
    return ItemDefinition;
})();