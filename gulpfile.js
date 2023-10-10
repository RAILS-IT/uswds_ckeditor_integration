const {series, src} = require("gulp");
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');

function scssLint() {
  return src('./scss/**/*.scss')
      .pipe(sassLint())
      .pipe(sassLint.format())
}

function jsLint() {
  return src('./js/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
}

exports.lint = series(scssLint, jsLint);
exports.default = this.lint;
