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
     * @param {Number} nextId The ID that the tile turns into when broken.
     * @param {String} category The category of the tile.
     * @param {Number} timeToBreak The time (in milliseconds) that it takes to break the tile.
     * @returns {Tile} The new tile object.
     */
    function Tile(id, name, fillStyle, image, nextId, category, timeToBreak) {
        this.id = id;
        this.name = name;
        this.fillStyle = fillStyle;
        this.image = image;
        this.nextId = nextId;
        this.category = category;
        this.timeToBreak = timeToBreak;
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