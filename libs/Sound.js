var Sound = function(params) {
	this.folder = params.folder;
	this.file = params.name;
	this.path = params.folder + '/' + params.name;
};

Sound.prototype.getFile = function() {
	return this.file;
};

Sound.prototype.getPath = function() {
	return this.path;
};

module.exports = Sound;