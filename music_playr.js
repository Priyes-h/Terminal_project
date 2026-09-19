const { spawn } = require('child_process')
const songschoice = 'songs/BEN_10.mp3' // song path 
let playingmusic = undefined // variable to store the spawned process

process.stdin.setRawMode(true) // recive input for the enter key

console.log("press enter key to play the song")
process.stdin.on('data', (data) => {

    if (data[0] === 0x0d){ // find the enter key
        console.log('Enter key pressed, playing song...')



        playingmusic = spawn("vlc", ["--intf","rc",songschoice]) // spawn vlc with the song path

    }
    console.log('Data received: ', data,'Song started playing ')


})
