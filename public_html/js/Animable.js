/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
window.Animable = (function() {
    
    function Animable(imageUrl) {
        this.imageUrl = imageUrl;
        this.image = new Image();
    };
    
    /**
     * Load the animable's assets.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    Animable.prototype.load = function(assetLoader) {
        assetLoader.addImage(this.image, this.imageUrl);
    };
    
    /**
     * Draw the animable object.
     * @param {type} ctx The 2D drawing context.
     * @param {type} x The x location to draw at.
     * @param {type} y The y location to draw at.
     * @param {type} width The width to draw.
     * @param {type} height The height to draw.
     * @returns {undefined}
     */
    Animable.prototype.draw = function(ctx, x, y, width, height) {
        if (!this.image) {
            ctx.fillStyle = "red";
            ctx.fillRect(0, 0, width, height);
            return;
        }
        ctx.drawImage(this.image, x, y, width, height);
    };
    
    return Animable;
})();