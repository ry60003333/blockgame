/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.Inventory = (function() {
    
    /**
     * Creates a new Inventory.
     * @returns {Inventory} The new Inventory object.
     */
    function Inventory() {
        this.items = [];
        for (var i = 1; i <= 6; i++) {
            this.items[i] = 0;
        }
    }
    
    /**
     * Add an item to the inventory.
     * @param {Item} item The item to add.
     * @returns {undefined}
     */
    Inventory.prototype.addItem = function(item) {
        var key = item.getDefinition().id;
        if (!(key in this.items)) {
            this.items[key] = 0;
        }
        this.items[key]++;
    };
    
    /**
     * Draw the Inventory.
     * @param {Game} game The game instance.
     * @param {type} ctx The 2D drawing context.
     * @returns {undefined}
     */
    Inventory.prototype.draw = function(game, ctx) {
        var y = 10;
        ctx.font = "bold 15px Comic Sans";
        ctx.fillStyle = "black";
        ctx.fillText("Inventory:", Game.TILE_SIZE - 20 - 30, 15);
        for (var key in this.items) {
            var itemDefinition = game.itemManager.getDefinition(key);
            itemDefinition.draw(ctx, 0, y);
            var text = "x " + this.items[key];
            var textSize = ctx.measureText(text);
            ctx.fillText(text, Game.TILE_SIZE, y + (Game.TILE_SIZE / 2) + 5);
            y += Game.TILE_SIZE + 10;
        }
    };
    
    return Inventory;
})();