var gulp = require('gulp');
var mocha = require('gulp-mocha');
var lint = require('gulp-eslint');
 
gulp.task('test', function () {
    return gulp.src(['./test/**/*.js'], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', () => {
            process.exit(1);
        });
});

gulp.task('lint',function() {

    return gulp.src(["server/**/*.js"])
        .pipe(lint({config : '.eslintrc.json'}))
        .pipe(lint.format())
        .pipe(lint.failAfterError());
});

