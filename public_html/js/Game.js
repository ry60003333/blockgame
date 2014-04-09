/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
window.Game = (function() {
    
    /**
     * Creates a new Game.
     * @returns {Game} The new Game object.
     */
    function Game() {
        this.tileManager = new TileManager();
        this.itemManager = new ItemManager();
        this.npcManager = new NpcManager();
        this.player = new Player(0, 0);
        this.world = new World(this);
        this.onlyDrawWorld = false;
    }
    
    /**
     * The build number of the game.
     */
    Game.BUILD = 30;
    
    /**
     * The version number of the game.
     */
    Game.VERSION = "1.0";
    
    /**
     * The size of a tile, in pixels.
     */
    Game.TILE_SIZE = 64;
    
    /**
     * The key code constants.
     * @type type
     */
    Game.KEYS = {
        "D": 68, 
        "W" : 87,
        "Z" : 90, 
        "SPACE" : 32
    };
    
    /**
     * Queue up the game assets in the loader.
     * @param {AssetLoader} assetLoader The asset loader.
     * @returns {undefined}
     */
    Game.prototype.load = function(assetLoader) {
        // Load all the tiles!
        this.tileManager.load(assetLoader);
        
        // Load all the item definitions!
        this.itemManager.load(assetLoader);
        
        // Load all the Npc definitions!
        this.npcManager.load(assetLoader);

        // Load the player images!
        this.player.load(assetLoader);
    };
    
    /**
     * Update the contents of the game.
     * @param {Array} keyStatus The status of the keyboard.
     * @param {Array} keyUp The array of keys that went up and haven't been handled.
     * @param {Number} deltaTimeMillis The delta time since the last update, in MS.
     * @returns {undefined}
     */
    Game.prototype.update = function(keyStatus, keyUp, deltaTimeMillis) {
        this.player.update(keyStatus, deltaTimeMillis);
        if (keyUp[Game.KEYS.D]) {
            this.world.drawGrid = !this.world.drawGrid;
            keyUp[Game.KEYS.D] = false;
        }
        if (keyUp[Game.KEYS.W]) {
            this.onlyDrawWorld = !this.onlyDrawWorld;
            keyUp[Game.KEYS.W] = false;
        }
        if (keyUp[Game.KEYS.Z]) {
            switch (Game.TILE_SIZE) {
                default:
                    break;
                case 32:
                    Game.TILE_SIZE = 64;
                    break;
                case 64:
                    Game.TILE_SIZE = 128;
                    break;
                case 128:
                    Game.TILE_SIZE = 32;
                    break;
            }
            keyUp[Game.KEYS.Z] = false;
        }
    };
    
    /**
     * Draw the contents of the game.
     * @param {type} canvas The canvas.
     * @param {type} ctx The 2D drawing context.
     * @param {Boolean} demo Is the world being drawn as a demo.
     * @returns {undefined}
     */
    Game.prototype.draw = function(canvas, ctx, demo) {
        
        if (this.onlyDrawWorld) {
            this.world.draw(this.player, canvas, ctx, this.tileManager);
            return;
        }
        // Draw the world centered around the player
        ctx.save();
        
        /*
         * To calculate the offset to draw the map at, the following formula is
         * used:
         * Take the half width/height of the canvas and divide by two
         * Take the remainer of dividing that by the size of each tile (mod operator)
         * and then subtract the half width/height of the player.
         * 
         * This ensures that the map, when drawn behind the player, 
         * always locks the player onto the grid! :D
         * - Ryan
         */
        var offsetX = (((canvas.width / 2)) % Game.TILE_SIZE);
        var offsetY = (((canvas.height / 2)) % Game.TILE_SIZE);
        
        // The follow is a fix for a very strange bug that occured
        // When the width of the canvas/2 resulted in the offset being 0.
        // This would result in tiles being drawn with an off-by-one error.
        if (offsetX === 0) {
            offsetX = Game.TILE_SIZE;
        }
        
        if (offsetY === 0) {
            offsetY = Game.TILE_SIZE;
        }
        
        offsetX -= (Game.TILE_SIZE / 2);
        offsetY -= (Game.TILE_SIZE / 2);
        
        // However, the formula leaves the offset too large by 
        // 1 tile in each dimension, for reasons I cannot understand
        offsetX -= Game.TILE_SIZE;
        offsetY -= Game.TILE_SIZE;
        
        // But we also need to see when the player is moving between tiles
        offsetX -= (this.player.x % 1) * Game.TILE_SIZE;
        offsetY -= (this.player.y % 1) * Game.TILE_SIZE;
        
        ctx.translate(offsetX, offsetY);
        this.world.draw(this.player, canvas, ctx, this.tileManager);
        ctx.restore();
        
        
        if (!demo) {
            // Draw the player, in the center
            var x = (canvas.width / 2) - (Game.TILE_SIZE / 2);
            var y = (canvas.height / 2) - (Game.TILE_SIZE / 2);
            ctx.save();
            ctx.translate(x, y);
            this.player.draw(ctx);
            ctx.restore();

            // Draw build and debugging info
            ctx.font = "bold 20px Comic Sans";
            var y = 30;
            ctx.fillText("Droid World " + Game.VERSION + " (Build " + Game.BUILD + ")", 5, y);
            ctx.font = "bold 15px Comic Sans";
            ctx.fillText("Player: " + this.player.x.toFixed(2) + "," + this.player.y.toFixed(2), 5, y += 15);
            ctx.fillText("Canvas Size: " + canvas.width + "," + canvas.height, 5, y += 15);
            ctx.fillText("Tile Size: " + Game.TILE_SIZE, 5, y += 15);
            ctx.fillText("Loaded chunks: " + Object.keys(this.world.chunks).length, 5, y += 15);
            ctx.fillText("Arrow keys - Movement", 5, y += 15);
            ctx.fillText("D - Toggle world grid", 5, y += 15);
            ctx.fillText("W - Draw only world", 5, y += 15);
            ctx.fillText("Z - Zoom", 5, y += 15);
            ctx.fillText("Space - Break Tile", 5, y += 15);

            // Draw the inventory
            ctx.save();
            ctx.translate(canvas.width - Game.TILE_SIZE - 20, 0);
            this.player.inventory.draw(this, ctx);
            ctx.restore();
        }
    };
    
    /**
     * Reset the game.
     * @returns {undefined}
     */
    Game.prototype.reset = function() {
        this.player.x = 0;
        this.player.y = 0;
    };
    
    return Game;
    
})(); // 