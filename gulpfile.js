// Konfigurasi
// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const gulp = require('gulp');
// Importing all the Gulp-related packages we want to use
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss');
const browserSync =  require('browser-sync').create();

// Task compile scss ke css
function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function purge() {
  return gulp
    .src('css/*.css')
    .pipe( 
      purgecss({
        content: ['*.html', 'js/*.js']
      })
    )
    .pipe(gulp.dest('build/'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change',  browserSync.reload);
}

exports.style = style;
exports.purge = purge;
exports.watch = watch; 