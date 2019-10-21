/**
 * util.js
 */

HashMap = function(){
	this.map = new Array();
}

HashMap.prototype = {
	put: function(key, value){
		this.map[key] = value;
	},
	get: function(key){
		return this.map[key];
	},
	length: function(){
		return Object.keys(this.map).length
	},
	keys: function(){
		return Object.keys(this.map)
	}
}
