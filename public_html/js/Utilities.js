/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Utilities = (function() {
    
    /**
     * Creates a new Utilities.
     * @returns {undefined}
     */
    function Utilities() {
        
    }
    
    /**
     * Move a number to the nearest whole number towards the center of the number line.
     * @param {Number} i The number.
     * @returns {Number} The centered number.
     */
    Utilities.center = function(i) {
        if (i >= 0) {
            return Math.floor(i);
        } else {
            return Math.ceil(i);
        }
    };
    
    /**
     * Generate a random number between two values (inclusive).
     * @param {Number} min The minimum value.
     * @param {Number} max The maximum value.
     * @returns {Number} The resulting random number.
     */
    Utilities.random = function(min, max) {
        return Math.floor((Math.random()*max)+min);
    };
    
    /**
     * Get the current timestamp in milliseconds.
     * @returns {Number} The timestamp.
     */
    Utilities.currentTimeMillis = function() {
        return new Date().getTime();
    };
    
    return Utilities;
    
    
})();