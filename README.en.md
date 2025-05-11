# Gulp Template

A lightweight Gulp-based frontend development template for building static websites. Supports Pug or HTML (based on the presence of `index.pug` or `index.html`), SCSS/SASS, Stylus, JavaScript, SVG sprites, and image optimization with a live-reloading development server.

## Features
- **Pug or HTML**: Compile all Pug files in `src/` (e.g., `index.pug`, `contacts.pug`, `about.pug`) into corresponding HTML files or copy `src/index.html`. Templates in `src/pugs/` are used as included modules and not compiled separately.
- **SCSS/SASS & Stylus**: Process and minify styles in `src/styles/`.
- **JavaScript**: Minify JS in `src/scripts/` in production mode.
- **SVG Sprites**: Generate SVG sprites from `src/assets/` with CSS support.
- **Image Optimization**: Compress images in `src/images/` in production mode.
- **Live Reload**: Automatically reloads the browser on file changes.
- **Automatic Browser Opening**: Opens the browser on server start (development mode).

## Prerequisites
- [Node.js](https://nodejs.org/) (v10 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Installation
1. Clone the repository:
   ```bash
   git@github.com:AndrewRemarkov/gulp-template.git
   cd gulp-template
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
Place your source files in the `src/` directory according to the structure. Choose the template type by creating Pug files (`index.pug`, `contacts.pug`, etc.) in `src/` or `src/index.html`. Run the commands:

### Development
Start the development server with live reloading and browser opening:
```bash
npm run dev
```
This runs the `gulp dev` task, which:
- Cleans the `static/` directory.
- Processes assets (Pug or HTML, SCSS/SASS, Stylus, JS, SVG, images).
- Starts a server at `http://localhost:8080`.
- Watches for file changes and reloads the browser.

### Production Build
Build optimized assets:
```bash
npm run build
```
This runs the `gulp build` task with `NODE_ENV=production`, which:
- Cleans the `static/` directory.
- Minifies CSS, JS, and images.
- Outputs files to `static/`.

### Other Commands
- Start the server:
  ```bash
  npm run server
  ```
- Clean the `static/` directory:
  ```bash
  npm run clean
  ```

## Project Structure
```
├── src/                    # Source files
│   ├── assets/             # SVG files for sprites (*.svg)
│   ├── images/             # Images (**/*.jpg, **/*.png, **/*.gif, **/*.svg)
│   ├── pugs/               # Included Pug templates (**/*.pug, optional, not compiled separately)
│   ├── scripts/            # JavaScript files (**/*.js)
│   ├── styles/             # Styles (**/*.scss, **/*.sass, **/*.styl, **/*.css)
│   ├── index.pug           # Main Pug template (if using Pug)
│   ├── contacts.pug        # Additional Pug template (example)
│   ├── about.pug           # Additional Pug template (example)
│   ├── index.html          # Main HTML file (if using HTML)
├── static/                 # Output directory (generated)
├── gulpfile.js             # Gulp configuration
├── package.json            # Dependencies and scripts
└── README.md               # Documentation
```

## Scripts
- `npm run dev`: Runs `gulp dev` for development.
- `npm run build`: Runs `gulp build` with optimizations.
- `npm run clean`: Removes the `static/` directory.
- `npm run server`: Starts the development server.

## Dependencies
- `gulp`: Task runner.
- `gulp-connect`: Development server with live reloading.
- `gulp-pug`, `pug`: Pug template compilation.
- `gulp-sass`, `sass`: SCSS/SASS processing.
- `gulp-stylus`: Stylus processing.
- `gulp-uglify`: JavaScript minification.
- `gulp-imagemin`: Image optimization.
- `gulp-clean-css`: CSS minification.
- `gulp-svg-sprite`: SVG sprite generation.
- `gulp-plumber`: Error handling.
- `gulp-if`: Conditional task execution.
- `gulp-data`: Data injection for Pug.
- `gulp-htmlmin`: HTML minification (not used in tasks).
- `gulp-concat`: File concatenation (not used in tasks).
- `delete`: Directory cleaning.

## Notes
- The server runs on `http://localhost:8080`.
- In production mode (`NODE_ENV=production`), assets are minified, and the browser does not open.
- Create Pug files (`index.pug`, `contacts.pug`, `about.pug`, etc.) in `src/` to compile into corresponding HTML or `src/index.html` to use HTML.
- Files in `src/pugs/` are used as included modules for Pug templates (via `include` or `extend`) and are not compiled into separate HTML files.
- The template is configured for Node.js v10+ and npm v6+.

## Troubleshooting
- **Browser not opening?** Check `http://localhost:8080` and the console. Ensure the `start` command is supported (Windows) or adjust for macOS/Linux.
- **Dependency errors?** Run `npm install` or `npm update`.
- **Files not processed?** Ensure `index.pug` or `index.html` exists in `src/` and verify paths in `gulpfile.js`.

For issues, open a ticket in the [repository](git@github.com:AndrewRemarkov/QWERy.git).

## Author
Andrey Rebeka

## License
ISC License