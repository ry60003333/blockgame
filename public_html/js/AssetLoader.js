/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.AssetLoader = (function() {
    
    /**
     * Creates a new AssetLoader.
     * @returns {undefined}
     */
    function AssetLoader() {
        this.images = [];
        this.sources = [];
        this.totalImages = 0;
        this.loadedImages = 0;
    }
    
    /**
     * Add an image to be loaded.
     * @param {Image} image The image to add.
     * @param {String} source The source (URL) of the image.
     * @returns {undefined}
     */
    AssetLoader.prototype.addImage = function(image, source) {
        
        // Add the image to the list of images to be loaded.
        this.images.push(image);
        this.sources.push(source);
        
        // Increment the total amount of images that need to be loaded.
        this.totalImages++;
    };
    
    /**
     * Load all assets.
     * @param {Function} callback The function to call when loading is complete.
     * @returns {undefined}
     */
    AssetLoader.prototype.load = function(callback) {
        
        var loader = this;
        
        for (var i = 0; i < this.images.length; i++) {
            this.images[i].onload = function() {
                loader.loadedImages++;
                if (loader.loadedImages >= loader.totalImages) {
                    // Once all the images are loaded, call our callback!
                    callback();
                }
            };
            this.images[i].src = this.sources[i];
        }
    };
    
    return AssetLoader;
    
})();

