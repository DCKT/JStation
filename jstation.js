var Speaker = require('speaker');
var fs = require('fs');
var lame = require('lame');
var async = require('async');

// Audio Options for Node-Speaker
var audioOptions = {channels: 2, bitDepth: 16, sampleRate: 44100};

var JStation = function(songs) {
	this.songs = songs;
}

JStation.prototype.run = function() {
	var self = this;
	var play = function(song, cb) {

		// Create the readStream
		var rs = fs.createReadStream(song);

		// Create the decoder
		var decoder = new lame.Decoder();

		// Set Decoder and create speaker when 
		// format event is fired
		rs.pipe(decoder).on('format', function(f) {
			var s = new Speaker(f);
			this.pipe(s);
		}).on('end', function() {
			console.log(sound);
			console.log("Song end, it's time to change");
			// Return null able to async to iterate over
			// the next item array
			cb(null);
		});

		rs.on('error', function(err) {
			cb(err);
		});
	};

	// Asynchronous loop 
	async.eachSeries(self.songs, play, function(err) {
		if (err) throw err;
	    if (typeof(done) === 'function') {
	    	done(err, self);
	    }
	    return true;
	});
};

module.exports = JStation;