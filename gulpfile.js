var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
let uglify = require('gulp-uglify-es').default;

gulp.task('build', function() {
  return browserify('./out/index.js')
    .bundle()
    .pipe(source('linter.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});
