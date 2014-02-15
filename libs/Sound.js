var Sound = function(params) {
	this.folder = params.folder;
	this.file = params.name;
	this.name = params.name.slice(0, params.name.length - 4);
	this.path = params.folder + '/' + params.name;
};

Sound.prototype.getFile = function() {
	return this.file;
};

Sound.prototype.getPath = function() {
	return this.path;
};

Sound.prototype.getName = function() {
	return this.name;
};

module.exports = Sound;