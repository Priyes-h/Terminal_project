const { spawn } = require('child_process')
let playingmusic = undefined // variable to store the spawned process
let userchoice = 0 // variable to store the user choice
let ispausedmusic = true // variable to store the paused state of the music
let elapseduration = 0
let totalduration = 0
let volume = 100
let repeat = false
const fs = require("fs");

 // recive input for the enter key


const songlist = ['songs/BEN_10.mp3', 'songs/POKEMON.mp3', 'songs/SPIDER_MAN.mp3', 'songs/ULTIMATE_SPIDER_MAN.mp3','songs/Amazing_spiderMan.mp3','songs/Black_spiderMan.mp3','songs/Iron Man_ Armored Adventure.mp3','songs/Phineas and Ferb .mp3'] // list of songs


function listingSongs() {
    console.clear()
    // volume = 100

    // process.stdout.write('\x1b[2J')
    

    // process.stdout.write('\x1b[2;0H')


    console.log('Available songs:')

    songlist.forEach((song, index) => {
        if ( index === userchoice) {
            console.log(`> ${index + 1}. ${song}`)
        } else {
            console.log(`  ${index + 1}. ${song}`)
        }
    })

    // PROGESS BARR BELOW 
    if(playingmusic !== undefined && totalduration > 0){

        let progress = Math.min(
            elapseduration/ totalduration,
            1
        )

        let barLength = 30

        let filled = Math.floor(progress * barLength)

        let empty = barLength - filled
        console.log("progress BAr below ")
     console.log(`${'#'.repeat(filled)}${'-'.repeat(empty)}  ${elapseduration.toFixed(1)}/${totalduration.toFixed(1)}`)
    process.stdout.write('\x1b[1;44H')}
    // console.log("Controls")

process.stdout.write('\x1b[1;44H')
console.log("---------------- CONTROLS ----------------")

process.stdout.write('\x1b[2;44H')
console.log("↑ ↓    Select Song")

process.stdout.write('\x1b[3;44H')
console.log("Enter  Play Song")

process.stdout.write('\x1b[4;44H')
console.log("P      Pause / Resume")

process.stdout.write('\x1b[5;44H')
console.log("N      Next Song")

process.stdout.write('\x1b[6;44H')
console.log("B      Previous Song")

process.stdout.write('\x1b[7;44H')
console.log("U      Volume Up")

process.stdout.write('\x1b[8;44H')
console.log("D      Volume Down")

process.stdout.write('\x1b[9;44H')
console.log("J      Seek Backward 10s")

process.stdout.write('\x1b[10;44H')
console.log("L      Seek Forward 10s")

process.stdout.write('\x1b[11;44H')
console.log("S      Shuffle")

process.stdout.write('\x1b[12;44H')
console.log("Q      Quit")

process.stdout.write('\x1b[14;44H')
console.log(`🔊 Volume: ${volume}%`)
process.stdout.write('\x1b[13;44H')
process.stdout.write(`r    Repeat: ${repeat ? 'ON' : 'OFF'}`)
}

process.stdin.setRawMode(true)

process.stdin.on('data', (data) => {
    if(data[0] === 0x1b){
        if ( data[1] === 0x5b){
            if (data[2] === 0x41){ // up arrow key
                userchoice = Math.max(userchoice - 1, 0)
            } else if (data[2] === 0x42){ // down arrow key
              
                userchoice = Math.min(userchoice + 1,songlist.length - 1) 
            }
        }
        listingSongs() // call the function to list the songs
}
    if (data[0] === 0x0d){ // find the enter key
        console.log('Enter key pressed, playing song...')
        if (playingmusic !== undefined){
            playingmusic.kill()
        }

        elapseduration = 0


        playingmusic = spawn("vlc", ["--intf","rc",songlist[userchoice]]) // spawn vlc with the song path
        ispausedmusic = false // set the paused state to false
        totalProgress(songlist[userchoice])

    } // pausing and resuming the song when p key is pressed
        if(data[0] === 0x70){

        playingmusic.stdin.write('pause\n')
        ispausedmusic = !ispausedmusic // toggle the paused state

        console.log("p key pressed, pausing/resuming song")

    }
    if (data[0] === 0x75) {       // u

        volumeup()
    }

    if (data[0] === 0x64) {       // d
 
        volumedown()
    }
    if (data[0] === 0x6E) { // n


        nextsong()
}
    if(data[0] === 0x62){ // b


    previoussong()

    
    }   
    if(data[0] === 0x6A){ // j
        seek_backward()

    }
    if(data[0] === 0x6C){ // l
        seek_forward()
    }
    if (data[0] === 0x51) {
    process.exit()
}
if(data[0] === 0x73) { // s
    shufflesong()
}

if (data[0] === 0x72 ) // r
    togglerepeat()
})

function totalProgress(songPath){

    const afInfoProcess = spawn(
        "afinfo",
        [songPath]
    )

    afInfoProcess.stdout.on("data", (data) => {

        const rawOutput = data.toString()
        // console.log(rawOutput)
        // fs.appendFileSync("debug.txt", rawOutput + "\n");p

        totalduration = Number(rawOutput.split("estimated duration:")[1].split(" sec")[0]);

    })

}
function volumedown(){
    if(playingmusic === undefined){
        return 
    }
    volume = volume-5
    if (volume < 0){
        volume = 0
    }
    let current_volume = Math.round(volume * 2.56) // vlc dosent have standart vlume it uses 256 and 100% so i have cretd my own volume 
    playingmusic.stdin.write(`volume ${current_volume}\n`)
    console.log(`🔊 Volume: ${volume}%`)
}
function volumeup(){
        if(playingmusic === undefined){
        return 
    }
    volume = volume+5
    if (volume > 100){
        volume = 100
    }
    let current_volume = Math.round(volume * 2.56) // vlc dosent have standart vlume it uses 256 and 100% so i have cretd my own volume 
    playingmusic.stdin.write(`volume ${current_volume}\n`) // command to turn vol up 
    console.log(`🔊 Volume: ${volume}%`)
}
function previoussong(){

    if(playingmusic === undefined) {
        return
    }

    if(userchoice === 0) {
        userchoice = songlist.length - 1
    } else {
        userchoice --
    }

    playingmusic.kill('SIGKILL')

    elapseduration = 0

    playingmusic = spawn(
        "vlc",["--intf", "rc", songlist[userchoice]]
    )

    ispausedmusic = false

    totalduration = 0

    totalProgress(songlist[userchoice])
}
function nextsong(){ // press n just increasinig userchoice 
    
    if(playingmusic === undefined) {
        return
    }

   if(userchoice === songlist.length - 1) {
        userchoice = 0
    } else {
        userchoice++
    }

    playingmusic.kill('SIGKILL')

    elapseduration = 0

    playingmusic = spawn("vlc",["--intf", "rc", songlist[userchoice]])

    ispausedmusic = false

    totalduration = 0

    totalProgress(songlist[userchoice])
}
function seek_forward(){
    if (playingmusic === undefined) { return}
    playingmusic.stdin.write('seek +10\n') // command to seek 
    elapseduration += 10
    if(elapseduration > totalduration) {
        elapseduration = totalduration
    }
}
function seek_backward(){ // seeking backward by pressinh j
    if (playingmusic === undefined) { return }
    playingmusic.stdin.write('seek -10\n') // command to seek 
    elapseduration -= 10 // have to decrease this also 
        if(elapseduration < 0) { 
        elapseduration = 0
    }
}

function shufflesong(){

    if(playingmusic !== undefined) {
        playingmusic.kill('SIGKILL')
    }

    userchoice = Math.floor(Math.random() * songlist.length)

    elapseduration = 0
    totalduration = 0

    playingmusic = spawn(
        "vlc",
        ["--intf", "rc", songlist[userchoice]]
    )

    ispausedmusic = false

    totalProgress(songlist[userchoice])
}
function playingrepeatedmusic(){
       playingmusic.kill('SIGKILL')

    elapseduration = 0
    totalduration = 0

    playingmusic = spawn("vlc",["--intf", "rc", songlist[userchoice]] )

    ispausedmusic = false

    totalProgress(songlist[userchoice])

}
function togglerepeat(){
    repeat = !repeat
    if (repeat){
        console.log("Repat:ON")
    }else{
        console.log("repeat : off")
    }
}
setInterval(() => {

    if(
        ispausedmusic === false &&playingmusic !== undefined &&totalduration > 0 // simpley checking 
    ){

        elapseduration += 0.05

    }
    if ( totalduration > 0 && elapseduration >= totalduration){// auto next function 

        
        if(repeat){ // toggle repeat 
            elapseduration = 0
            playingrepeatedmusic()
        }else{
            nextsong()
        }
    }

    listingSongs()

}, 50)



listingSongs() // call the function to list the songs