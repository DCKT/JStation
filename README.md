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

You just need to use : **`npm install`**

Basic configuration :

```javascript
var JStation = require('./jstation');

// Specify a folder 
var station = new JStation({
  folder: 'musics'
});

// Fallback case, search all .mp3 files in the sounds directory
var station = new JStation();


station.run();
```

Launch the application : `node app.js`

### Coming Soon
The application should be able to read any folder (absolute or relative path).


### Help
If you have some ideas, suggestions or something else don't be scared and contact me ! 

For any errors, create an issue or join me on Twitter [@DCK__](https://twitter.com/DCK__).
