var Speaker = require('speaker');
var fs = require('fs');
var lame = require('lame');
var async = require('async');

// Audio Options for Node-Speaker
var audioOptions = {channels: 2, bitDepth: 16, sampleRate: 44100};

var JStation = function(songs) {
    console.log("\033[36m## Constructor called ## \033[39m\n");
    this.songsSupplied = true;

    if (songs == undefined) {
        this.songsSupplied = false;
        // Take all .mp3 files in sounds directory if no songs supplied
        this.songs = fs.readdirSync(__dirname+'/sounds/').filter(function(item) {
            return item.indexOf('.mp3') != -1;
        });
    }
    else {
        this.songs = songs;
    }
}


JStation.prototype.run = function() {
    console.log("\033[36m## Run method called ##\033[39m\n");
    
    var self = this;
    var play = function(song, cb) {

        // Create the readStream
        var rs = this.songsSupplied ? fs.createReadStream(song) : fs.createReadStream('sounds/'+song);

        // Create the decoder
        var decoder = new lame.Decoder();

        // Set Decoder and create speaker when 
        // format event is fired
        rs.pipe(decoder).on('format', function(f) {
            var s = new Speaker(f);
            this.pipe(s);
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

JStation.prototype.addFile = function(file) {
    this.songs.push(file);
};


module.exports = JStation;