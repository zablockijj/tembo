var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

// below from recipe at https://github.com/gulpjs/gulp/blob/master/docs/recipes/mocha-test-runner-with-gulp.md
gulp.task('test', function() {
  gulp
    .src(['test/*.js'], { read: false })
    .pipe(mocha( { reporter: 'nyan' }))
    .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['*/*.js', './*.js'], ['test']);
});
