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
    
    World.prototype.draw = function(player, canvas, ctx) {
        //ctx.fillStyle = "green";
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        var startX = Math.floor(player.x - ((canvas.width / 2) / Game.TILE_SIZE));
        var startY = Math.floor(player.y - ((canvas.height / 2) / Game.TILE_SIZE));
        
        //console.log("Canvas width: " + canvas.width + " Half:" + (canvas.width/2));
        //console.log("Canvas height: " + canvas.height + " Half:" + (canvas.height/2));
        //console.log("StartX: " + startX + " StartY: " + startY);
        
        // Draw lines for debugging 
        ctx.strokeStyle = "black";
        ctx.beginPath();
        
        for (var x = 0; x < (canvas.width / Game.TILE_SIZE); x++) {
            ctx.moveTo(x*Game.TILE_SIZE, -Game.TILE_SIZE);
            ctx.lineTo(x*Game.TILE_SIZE, canvas.height);
        }
        
        for (var y = 0; y < (canvas.height / Game.TILE_SIZE); y++) {
            ctx.moveTo(-Game.TILE_SIZE, y*Game.TILE_SIZE);
            ctx.lineTo(canvas.width, y*Game.TILE_SIZE);
        }
        ctx.closePath();
        ctx.stroke();
        
        var localStartY = startY;
        ctx.font = "10px Comic Sans";
        // Label each tile with it's location
        for (var x = -1; x < (canvas.width / Game.TILE_SIZE); x++) {
            var localStartY = startY;
            for (var y = -1; y < (canvas.height / Game.TILE_SIZE); y++) {
                var drawX = x * Game.TILE_SIZE + 1;
                var drawY = y * Game.TILE_SIZE + 10;
                ctx.fillText(startX + "," + localStartY, drawX, drawY);
                localStartY++;
            }
            startX++;
        }
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