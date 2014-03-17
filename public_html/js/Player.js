/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.Player = (function() {
    
    function Player() {
        
    }
    
    Player.prototype.draw = function(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, Game.TILE_SIZE, Game.TILE_SIZE);
    };
    
    return Player;
})();