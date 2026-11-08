# Grow With Me

<p align="center">
  <i>"Little things, given time, become something beautiful."</i>
</p>

<p align="center">
  A gentle pixel-art night garden where you plant flowers, water them, uncover hidden messages, and watch something small grow into something beautiful.
</p>

---

## About the Project

**Grow With Me** is a small, cozy gardening game built around the idea of nurturing and growth. It starts with a patch of soil, a watering can, a single seed, and a moonlit sky.

Players plant flowers, water them, and watch them move through four growth stages. Along the way they discover hidden messages, unlock new flowers, and eventually find a secret garden.

There are no timers, no penalties for missing a day, and nothing to buy. Plants never wilt away. They simply wait for you.

The project was built as a personal game development experiment exploring interactive web design, JavaScript game mechanics, and gift-style experiences. All sprites and scenes are drawn in code with HTML canvas.

## Play the Game

**Play online:** [Grow With Me]((https://voltivy.github.io/grow-with-me/))

It runs directly in your browser. No installation is required.

## Features

- **Interactive gardening:** Plant seeds in 8 garden plots, water them, and dig them up to start over.
- **12 flowers:** Daisy, Tulip, Sunflower, Lavender, Forget-me-not, Rose, Poppy, Cosmos, Bluebell, Marigold, Iris, and one hidden flower.
- **Gentle progression:** Blooming a flower unlocks the next seed.
- **Memory Garden:** Every flower can hold a personal message, memory, or inside joke.
- **Secret interactions:** The moon, the butterfly, and the garden sign all have something to say.
- **Garden Journal:** Tracks flowers planted, flowers bloomed, messages found, milestones, and personal notes.
- **Secret Garden:** A hidden area that opens once every kind of flower has bloomed.
- **The Everlasting Flower:** Blooms after every hidden message is found, and opens a personal letter.
- **Atmosphere:** Fireflies, drifting clouds, a twinkling sky, soft generated music, and sound effects.
- **Automatic saving:** Progress is saved in the browser. Updates keep older saves working.
- **Personalise:** Edit names, messages, and the final letter in the game or in one config file.

## Flower Growth System

Each flower progresses through four stages:

| Stage | Description |
|---|---|
| Seed | A newly planted flower |
| Sprout | The first signs of growth |
| Bud | The flower begins developing |
| Bloom | The flower reaches full bloom and shows its memory |

Each stage needs about two waterings. A flower that has been watered recently also grows a little on its own over time, and the garden catches up gently while you're away.

Soil dries out slowly, and a dry plant just waits. Nothing is ever lost.

## How to Play

1. Open the game and enter the garden.
2. Choose a seed and click a patch of soil to plant it.
3. Pick the watering can and water your plant.
4. Keep caring for it until it blooms.
5. Click blooming flowers to read what they hold.
6. Explore: look at the sky, the sign, and anything that drifts by.
7. Use the Seeds, Memories, Journal, and Secret Garden screens to follow your progress.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Game structure and interface |
| CSS3 | Styling, layout, and visual atmosphere |
| JavaScript | Game mechanics and interactions |
| Canvas API | Pixel-art scenes, sprites, and particles |
| Web Audio API | Generated music and sound effects |
| Local Storage | Saving garden progress |
| Electron *(optional)* | Packaging as a Windows desktop app |

## Project Structure

```text
grow-with-me/
│
├── index.html        # Game interface and screens
│
├── css/
│   └── style.css     # Visual design and layout
│
├── js/
│   ├── config.js     # Names, messages, and the final letter
│   ├── core.js       # Flower data, saving, and sound
│   ├── sprites.js    # Pixel-art drawing and garden scenes
│   └── game.js       # Gameplay, screens, and main loop
│
├── main.js           # Electron entry point (optional)
├── package.json      # Electron configuration (optional)
│
├── LICENSE
└── README.md
```

### File Descriptions

- **index.html:** The page structure, tabs, and overlays.
- **css/style.css:** The look of the interface.
- **js/config.js:** The only file you need to edit to personalise the game.
- **js/core.js:** Flower definitions, save and load logic, and sound.
- **js/sprites.js:** Every flower sprite, the garden, and the Secret Garden scene.
- **js/game.js:** Planting, watering, growth, discoveries, screens, and the main loop.
- **main.js / package.json:** Wrap the game as a desktop app.

## Running Locally

### Requirements

- A modern web browser.
- [Visual Studio Code](https://code.visualstudio.com/) with the Live Server extension (recommended).

### Steps

1. Clone or download this repository.
2. Open the folder in Visual Studio Code.
3. Right-click `index.html` and choose **Open with Live Server**.

Or run a local Python server:

```bash
py -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Desktop app (optional)

Requires [Node.js](https://nodejs.org/).

```bash
npm install
npm start          # run the desktop app
npm run build      # build a Windows installer into /dist
```

## Personalising the Game

Open `js/config.js` and change:

- the names used on the sign and in the letter
- the message inside each flower
- the moon's and the butterfly's secrets
- the final letter in the Everlasting Flower

The in-game **Personalise** button edits the same things, but those changes are saved only in the browser that made them.

## Saving Progress

Grow With Me uses the browser's `localStorage`. Planted flowers, unlocked seeds, found messages, journal entries, and notes are all saved there.

**Note:** Saves are specific to one browser and one web address. They don't sync across devices, and clearing site data or moving the game to a new address starts a fresh garden.

## Design Direction

The look is inspired by cozy pixel-art games and atmospheric indie experiences: a soft night palette of deep violet, lavender, blossom pink, and sage, with fireflies and a crescent moon.

All sprites and scenes are original and drawn in code. No third-party artwork is used.

## Future Development

- [x] Original custom pixel-art flower sprites
- [x] More flower varieties and growth animations
- [x] Desktop application support (Electron setup included)
- [ ] Seasonal garden environments
- [ ] Weather and day/night cycles
- [ ] More interactive garden activities
- [ ] Export and import of saved gardens
- [ ] Full offline support

## Changelog

- **1.1.1:** Players who had bloomed all six original flowers get the five new seeds unlocked right away.
- **1.1:** Five new flowers, 8 garden plots, bonus memories, and save migration.
- **1.0:** First release.

## License & Copyright

© 2026 **voltivy**. All Rights Reserved.

Grow With Me is an original interactive game project developed by voltivy.

The source code is publicly available for personal educational and learning purposes. Visitors are welcome to explore and study how the project works.

However, permission to view the source code does not grant permission to copy, reuse, modify, redistribute, or commercially use the project or its original assets.

All original code, artwork, designs, and creative materials remain the property of their respective copyright holders.

For additional details, please refer to the [LICENSE](LICENSE) file.

## Developer

**Created by voltivy**

An independent game development project exploring interactive experiences, creative programming, and web-based game design.

---

<p align="center">
  <b>Thank you for visiting Grow With Me.</b>
  <br>
  <i>Take your time. Everything blooms eventually.</i>
</p>
