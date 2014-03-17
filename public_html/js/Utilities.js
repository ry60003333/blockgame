/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Utilities = (function() {
    
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
    
    return Utilities;
    
    
})();