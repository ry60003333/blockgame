/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.World = (function() {
    
    function World() {
        
        // The loaded chunks in the world.
        this.chunks = [[]];
    }
    
    World.prototype.draw = function(canvas, ctx) {
        //ctx.fillStyle = "green";
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw lines for debugging
        ctx.strokeStyle = "black";
        ctx.beginPath();
        
        for (var x = 0; x < (canvas.width / Game.TILE_SIZE); x++) {
            ctx.moveTo(x*Game.TILE_SIZE, 0);
            ctx.lineTo(x*Game.TILE_SIZE, canvas.height);
        }
        
        for (var y = 0; y < (canvas.height / Game.TILE_SIZE); y++) {
            ctx.moveTo(0, y*Game.TILE_SIZE);
            ctx.lineTo(canvas.width, y*Game.TILE_SIZE);
        }
        ctx.closePath();
        ctx.stroke();
    };
    
    /**
     * Get the Chunk at the specified location.
     * @param {Number} x The X location of the chunk.
     * @param {Number} y The Y location of the chunk.
     * @returns {Chunk} The chunk.
     */
    World.prototype.getChunk = function(x, y) {
        var chunk = this.chunks[x][y];
        if (!chunk) {
            chunk = new Chunk(x, y);
            this.chunks[x][y] = chunk;
        }
        
        return chunk;
    }
    
    return World;
})();