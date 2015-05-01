var gulp   = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('styles', ['styles:dev']);

gulp.task('styles:dev', function () {
    return gulp
        .src('./src/styles/tsung.styl')
        .pipe(stylus({
            'include css': true
        }))
        .pipe(gulp.dest('./dist'))
    ;
});