var Speaker = require('speaker');
var fs = require('fs');
var lame = require('lame');
var async = require('async');
var Sound = require('./Sound');
var path = require('path');

// Add clean method, remove all value matching with the parameter (null, undefined, ..)
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

// Audio Options for Node-Speaker
var audioOptions = {channels: 2, bitDepth: 16, sampleRate: 44100};

var JStation = function(params) {
    console.log("\033[36m## Constructor called ## \033[39m\n");

    var folder = params != undefined ? params.folder : "sounds";

    // Take all .mp3 files in sounds directory if no params supplied
    this.songs = fs.readdirSync(process.cwd() + '/'+ folder).map(function(item, index) {
        if (item.indexOf('.mp3') != -1) {
            var sound = new Sound({
                name: item,
                folder: folder
            });
            return sound;
        }
    });
}


JStation.prototype.run = function() {
    console.log("\033[36m## Run method called ##\033[39m\n");
    
    this.songs.clean(undefined);
    var self = this;

    var play = function(song, cb) {
        // Create the readStream
        var rs = fs.createReadStream(song.getPath());

        // Create the decoder
        var decoder = new lame.Decoder();

        // Set Decoder and create speaker when 
        // format event is fired
        rs.pipe(decoder).on('format', function(f) {
            var s = new Speaker(f);
            this.pipe(s);
            console.log("We play this song : \033[33m"+ song.getName()+"\033[39m");
        }).on('end', function() {
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