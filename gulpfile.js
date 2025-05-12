const gulp = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpUglify = require('gulp-uglify');
const gulpPug = require('gulp-pug');
const gulpImageMin = require('gulp-imagemin');
const gulpData = require('gulp-data');
const gulpStylus = require('gulp-stylus');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpif = require('gulp-if');
const gulpCleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const del = require('delete');
const svgSprite = require('gulp-svg-sprite');
const fs = require('fs');

const outputDir = 'static';
const outputImagesDir = 'static/images';

const isProduction = process.env.NODE_ENV === 'production';

const hasPug = fs.existsSync('src/index.pug');
const hasHtml = fs.existsSync('src/index.html');

const srcStylus = ['src/styles/**/*.css', 'src/styles/**/*.styl'];
const srcSass = ['src/styles/**/*.{scss,sass}'];
const srcPug = hasPug ? ['src/*.pug'] : [];
const srcHtml = hasHtml ? ['src/*.html'] : [];
const srcJS = ['src/scripts/**/*.js'];
const srcSVG = ['src/assets/*.svg'];
const srcImages = ['src/images/**/*.{svg,jpg,gif,png}'];
const srcFonts = ['src/fonts/**/*.{woff,woff2,ttf,otf,eot}'];

function server(done) {
  gulpConnect.server({
    host: '0.0.0.0',
    port: 8080,
    root: 'static/',
    livereload: true
  });
  if (!isProduction) {
    require('child_process').exec('start http://localhost:8080', (err) => {
      if (err) console.error('Ошибка открытия браузера:', err);
    });
  }
  done();
}

function clean(cb) {
  del([outputDir], cb);
  del([outputImagesDir], cb);
}

function stylus() {
  return gulp
    .src(srcStylus, { allowEmpty: true })
    .pipe(plumber())
    .pipe(
      gulpStylus({
        'include css': true
      })
    )
    .pipe(gulpCleanCSS())
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function sass() {
  return gulp
    .src(srcSass, { allowEmpty: true })
    .pipe(plumber())
    .pipe(
      gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError)
    )
    .pipe(gulpCleanCSS())
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function svg() {
  return gulp
    .src(srcSVG, { allowEmpty: true, cwd: '' })
    .pipe(plumber())
    .pipe(
      svgSprite({
        mode: {
          css: {
            render: {
              css: true
            }
          }
        }
      })
    )
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(gulp.dest(outputImagesDir));
}

function pug() {
  if (!hasPug) return Promise.resolve();
  return gulp
    .src(srcPug, { allowEmpty: true })
    .pipe(plumber())
    .pipe(
      gulpData(() => {
        return {
          __dirname: __dirname,
          require: require
        };
      })
    )
    .pipe(gulpPug())
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function html() {
  if (!hasHtml) return Promise.resolve();
  return gulp
    .src(srcHtml, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function images() {
  return gulp
    .src(srcImages, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulpif(isProduction, gulpImageMin()))
    .pipe(gulp.dest(outputImagesDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function js() {
  return gulp
    .src(srcJS, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulpif(isProduction, gulpUglify()))
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function fonts() {
  return gulp
    .src(srcFonts, { allowEmpty: true })
    .pipe(plumber())
    .pipe(gulp.dest(`${outputDir}/fonts`))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function watch() {
  gulp.watch(srcJS, gulp.series(js));
  gulp.watch(srcSVG, gulp.series(svg));
  gulp.watch(srcStylus, gulp.series(stylus));
  gulp.watch(srcSass, gulp.series(sass));
  gulp.watch(srcImages, gulp.series(images));
  gulp.watch(srcFonts, gulp.series(fonts));
  if (hasPug) gulp.watch(['src/*.pug', 'src/pugs/**/*.pug'], gulp.series(pug));
  if (hasHtml) gulp.watch(srcHtml, gulp.series(html));
}

exports.default = gulp.parallel(
  watch,
  gulp.series(clean, js, svg, pug, html, stylus, sass, images, fonts, server)
);
exports.server = server;
exports.clean = clean;
exports.build = gulp.series(
  clean,
  js,
  svg,
  pug,
  html,
  images,
  fonts,
  stylus,
  sass
);
exports.dev = gulp.parallel(
  watch,
  gulp.series(clean, js, pug, html, svg, stylus, sass, images, fonts, server)
);
