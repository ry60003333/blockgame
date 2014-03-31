/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

window.Coordinate = (function() {
    
    /**
     * Creates a new Coordinate.
     * @param {Number} x The x location.
     * @param {Number} y The y location.
     * @returns {Coordinate} The new Coordinate object.
     */
    function Coordinate(x, y) {
        this.x = x;
        this.y = y;
    };
    
    /**
     * Check is one Coordinate is the same point as other.
     * @param {Coordinate} other The other Coordinate.
     * @returns {Boolean} If the Coordinates are the same.
     */
    Coordinate.prototype.equals = function(other) {
        return this.x === other.x && this.y === other.y;
    };
    
    return Coordinate;
})();