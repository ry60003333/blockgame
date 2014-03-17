/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Tile = (function () {
    
    /**
     * Creates a new Tile.
     * @param {type} id The unique ID of the tile.
     * @param {type} color The color of the tile.
     * @returns {_L7.Tile}
     */
    function Tile(id, color) {
        this.id = id;
        this.color = color;
    }
    
    /**
     * Draw the tile.
     * @param {type} ctx The 2D drawing context.
     * @param {Number} x The X location to draw at.
     * @param {Number} y The Y location to draw at.
     * @returns {undefined}
     */
    Tile.prototype.draw = function(ctx, x, y) {

        // Clear tile; such as air
        if (this.color === null) {
            return;
        }
        
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, Game.TILE_SIZE, Game.TILE_SIZE);
    };
    
    return Tile;
    
})();