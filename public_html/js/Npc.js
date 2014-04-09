/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
window.Npc = (function() {
    
    
    function Npc(definition) {
        this.definition = definition;
    }
    
    /**
     * Get the definition of the Npc.
     * @returns {NpcDefinition} The NpcDefinition.
     */
    Npc.prototype.getDefinition = function() {
        return this.definition;
    };
    
    return Npc;
})();