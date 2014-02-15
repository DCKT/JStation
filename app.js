var JStation = require('./jstation');

var songs = ['sounds/ff.mp3','sounds/test.mp3'];

var station = new JStation(songs);

station.run();