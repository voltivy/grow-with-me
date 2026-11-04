#   𑣲. Grow With Me

<p align="center">
  <i>"Some things just need a little time, patience, and love to bloom."</i>
</p>

<p align="center">
  A little virtual garden where you plant flowers, nurture their growth, and create something beautiful.
</p>

---

# About the Project

**Grow With Me** is a small interactive gardening game built around the idea of nurturing and growth.

Players can plant different flowers, water them, and watch them progress through several stages of development, from tiny seeds to fully bloomed flowers.

Designed with a dreamy pixel-inspired aesthetic, the project aims to create a relaxing and personal experience through simple interactions and a cozy atmosphere.

This project was developed as a personal game development experiment to explore interactive web design, JavaScript mechanics, and game-inspired user interfaces.

## Play the Game

**Play online:** [Grow With Me](YOUR-GAME-LINK-HERE)

The game runs directly in your browser. No installation is required.

##  Features

-  **Interactive Gardening:** Plant flowers in available garden spaces.
-  **Watering Mechanic:** Water your flowers to help them grow.
-  **Multiple Flower Types:** Choose between daisies, tulips, lavender, and roses.
-  **Growth Stages:** Watch flowers develop from seeds into fully bloomed flowers.
-  **Personal Notes:** Leave little notes and messages through the garden's visit feature.
-  **Automatic Saving:** Your garden progress is saved locally in your browser.
-  **Atmospheric Design:** A dreamy garden environment with a soft, pixel-inspired visual direction.

##  Flower Growth System

Each flower progresses through four stages:

| Stage | Description |
|---|---|
|  Seed | A newly planted flower |
|  Sprout | The first signs of growth |
|  Bud | The flower begins developing |
|  Bloom | The flower reaches its final growth stage |

Each watering action increases the flower's watering progress by 25%.

Once the progress reaches 100%, the flower advances to its next growth stage.

##  How to Play

1. Open the game in your browser.
2. Select an available garden space.
3. Choose a flower to plant.
4. Water your flower to increase its growth progress.
5. Continue caring for it until it blooms.
6. Use the visit feature to leave personal notes.
7. Return to your garden and continue growing!

Your progress is automatically stored using browser local storage.

##  Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Game structure and interface |
| CSS3 | Styling, layout, and visual atmosphere |
| JavaScript | Game mechanics and interactions |
| Local Storage | Saving garden progress |
| JSON | Application configuration and metadata |

##  Project Structure

```text
grow-with-me/
│
├── index.html       # Main game interface
├── styles.css      # Visual design and styling
├── app.js           # Game logic and interactions
│
├── manifest.json    # Web application metadata
├── sw.js            # Service worker file
│
└── README.md        # Project documentation
```

### File Descriptions

- **index.html:** Contains the main structure of the game.
- **styles.css:** Controls the garden's appearance, layout, colours, and animations.
- **app.js:** Handles flower planting, watering, growth stages, notes, and saving progress.
- **manifest.json:** Contains metadata for potential progressive web app support.
- **sw.js:** Contains the service worker code for future offline functionality.
- **README.md:** Provides project information and documentation.

##  Running Locally

You can run the project locally using Visual Studio Code.

### Requirements

- A modern web browser.
- [Visual Studio Code](https://code.visualstudio.com/).
- Live Server extension (recommended).

### Steps

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

Alternatively, run a local Python server:

```bash
py -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## 💾 Saving Progress

Grow With Me uses the browser's `localStorage` to preserve garden progress.

Your planted flowers, growth progress, and personal notes are saved locally in the browser.

**Note:** Your saved garden is browser-specific and is not automatically synchronised across different devices.

## 🎨 Design Direction

The visual direction of Grow With Me is inspired by cozy pixel-art games and atmospheric indie experiences.

The goal is to create a small world that feels peaceful, personal, and alive through simple interactions.

Temporary visual assets are currently used during development, with plans to introduce more original pixel artwork as the project evolves.

## 🔮 Future Development

Planned improvements include:

- [ ] Original custom pixel-art flower sprites.
- [ ] More flower varieties and growth animations.
- [ ] Seasonal garden environments.
- [ ] Weather and day/night cycles.
- [ ] More interactive garden activities.
- [ ] Additional personalisation options.
- [ ] Improved offline functionality.
- [ ] Desktop application support.

##  License & Copyright

© 2026 **voltivy**. All Rights Reserved.

Grow With Me is an original interactive game project developed by voltivy.

The source code is publicly available for personal educational and learning purposes. Visitors are welcome to explore and study how the project works.

However, permission to view the source code does not grant permission to copy, reuse, modify, redistribute, or commercially use the project or its original assets.

All original code, artwork, designs, and creative materials remain the property of their respective copyright holders.

For additional details, please refer to the [LICENSE](LICENSE) file.

##  Developer

**Created by voltivy**

An independent game development project exploring interactive experiences, creative programming, and web-based game design.

---

<p align="center">
  🌱 <b>Thank you for visiting Grow With Me.</b> 🌱
  <br>
  <i>Take your time. Everything blooms eventually.</i>
</p>
