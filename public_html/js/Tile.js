/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Tile = (function () {
    
    /**
     * Creates a new Tile.
     * @param {Number} id The unique ID of the tile.
     * @param {String} name The name of the tile.
     * @param {String} fillStyle The fill style of the tile, if it does not use an image.
     * @param {Image} image The image of the tile.
     * @returns {_L7.Tile}
     */
    function Tile(id, name, fillStyle, image) {
        this.id = id;
        this.name = name;
        this.fillStyle = fillStyle;
        this.image = image;
    }
    
    /**
     * Draw the tile.
     * @param {type} ctx The 2D drawing context.
     * @param {Number} x The X location to draw at.
     * @param {Number} y The Y location to draw at.
     * @returns {undefined}
     */
    Tile.prototype.draw = function(ctx, x, y) {

        if (this.image === null) {
            if (this.fillStyle === null) {
                return;
            }
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, Game.TILE_SIZE, Game.TILE_SIZE);
            return;
        }
        
        ctx.drawImage(this.image, x, y, Game.TILE_SIZE, Game.TILE_SIZE);
        
    };
    
    return Tile;
    
})();