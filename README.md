JStation
========


### What is JStation ?

JStation is a music player written in Node.js. 
For the moment, it can be launched with command linebut in the future, I would like to use Node-webkit and
create an User Interface. 


### Setup

At the moment, some modules are **required** :
  - speaker
  - lime
  - fs
  - async

You can found them with [npm](https://www.npmjs.org/).

Basic configuration :

```javascript
var JStation = require('./jstation');

var songs = ['sounds/ff.mp3','sounds/test.mp3'];

var station = new JStation(songs);

station.run();
```

Launch the application : `node app.js`
