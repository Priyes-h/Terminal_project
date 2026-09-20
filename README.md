# 🎵 Terminal Music Player

A simple **terminal-based music player built with Node.js and VLC**.

This project lets you play and control local music directly from the terminal using keyboard shortcuts. It uses the **VLC RC (Remote Control) interface** to control playback.

## ✨ Features

* ▶️ Play songs
* ⏸️ Pause / Resume
* ⬆️⬇️ Navigate through songs
* ⏭️ Next song
* ⏮️ Previous song
* 🔀 Shuffle songs
* 🔁 Repeat current song
* 🔊 Increase / decrease volume
* ⏩ Seek forward by 10 seconds
* ⏪ Seek backward by 10 seconds
* 📊 Display playback progress
* 🔊 Display current volume
* 🎵 Highlight currently selected song
* 🔄 Automatically play the next song when a song finishes
* 🖥️ Simple terminal UI

## 🎮 Controls

| Key       | Action             |
| --------- | ------------------ |
| `↑` / `↓` | Select song        |
| `Enter`   | Play selected song |
| `p`       | Pause / Resume     |
| `n`       | Next song          |
| `b`       | Previous song      |
| `u`       | Volume Up          |
| `d`       | Volume Down        |
| `j`       | Seek Backward 10s  |
| `l`       | Seek Forward 10s   |
| `s`       | Shuffle            |
| `r`       | Toggle Repeat      |
| `Q`       | Quit               |

## 🛠️ Technologies Used

* **Node.js**
* **JavaScript**
* **VLC Media Player**
* **VLC RC Interface**
* **ANSI Escape Codes**
* **macOS `afinfo`** for detecting song duration

## 📋 Requirements

Before running the project, make sure you have:

* Node.js
* VLC Media Player
* A terminal that supports ANSI escape codes

Check Node.js:

```bash
node --version
```

Check VLC:

```bash
vlc --version
```

## 📁 Project Structure

```text
Terminal_project/
│
├── music_playr.js
├── songs/
│   ├── BEN_10.mp3
│   ├── POKEMON.mp3
│   ├── SPIDER_MAN.mp3
│   └── ULTIMATE_SPIDER_MAN.mp3
│
└── README.md
```

## 🚀 How to Run

Clone the repository:

```bash
git clone <your-repository-url>
```

Go into the project:

```bash
cd Terminal_project
```

Make sure your songs are inside the `songs` folder.

Then run:

```bash
node music_playr.js
```

The music player will start directly in the terminal.

## 🔊 Volume

The player uses a custom **0–100% volume system**.

Internally, VLC uses a volume scale up to approximately `256`, so the program converts the percentage before sending the command to VLC.

For example:

```text
100% → 256
50%  → 128
25%  → 64
```

## ⏩ Seeking

The player uses VLC's RC commands to seek through the current song.

```text
j → seek backward 10 seconds
l → seek forward 10 seconds
```

## 🔁 Repeat Mode

Press `r` to toggle repeat mode.

```text
Repeat: OFF
```

Press `r` again:

```text
Repeat: ON
```

When repeat is enabled, the current song starts again after finishing instead of moving to the next song.

## 🔀 Shuffle

Press `s` to randomly select a song from the playlist.

## 📊 Terminal UI

The player displays:

```text
Available songs:

> 1. songs/BEN_10.mp3
  2. songs/POKEMON.mp3
  3. songs/SPIDER_MAN.mp3
  4. songs/ULTIMATE_SPIDER_MAN.mp3

---------------- CONTROLS ----------------
↑ ↓    Select Song
Enter  Play Song
p      Pause / Resume
n      Next Song
b      Previous Song
u      Volume Up
d      Volume Down
j      Seek Backward 10s
l      Seek Forward 10s
s      Shuffle
Q      Quit

🔊 Volume: 100%
r      Repeat: OFF
```

## 👨‍💻 Author

**Priyesh Choubey**

Built as a learning project while exploring **Node.js, CLI applications, and process management**.

---

⭐ If you find this project interesting, feel free to star the repository!
