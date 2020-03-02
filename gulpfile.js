const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const oug  =    function () {
  console.log('Hey')
}
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  styles: {
    src: './public/stylesheets/sass/main.scss',
    dest: './public/stylesheets',
  },
};

function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  style();
  gulp.watch('./public/stylesheets/sass/**/*.scss', style);
}
exports.style = style;
exports.watch = watch;
