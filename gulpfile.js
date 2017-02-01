var
gulp     = require('gulp'),
concat     = require('gulp-concat'),
uglify     = require('gulp-uglify'),
browserify = require("browserify")
source     = require('vinyl-source-stream'),
buffer     = require('vinyl-buffer');
babelify   = require('babelify')
sourcemaps = require('gulp-sourcemaps'),
rename     = require("gulp-rename"),
less       = require('gulp-less');

gulp.task('make-deps', function () {

    jsFiles = [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/highlightjs/highlight.pack.min.js',
        './node_modules/angular/angular.min.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-highlightjs/build/angular-highlightjs.min.js'
    ];

    gulp.src(jsFiles)
        .pipe(concat('deps.all.js'))
        .pipe(gulp.dest('./dist'));

    cssFiles = [
        './node_modules/highlightjs/styles/zenburn.css',
        './styles/cyborg.bootstrap.min.css'
    ];

    gulp.src(cssFiles)
        .pipe(concat('deps.all.css'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('make-sources', function () {

    jsFiles = [
        './js/app.js',
        './js/routes.js',
        './pages/home/*.js'
    ];

    gulp.src(jsFiles)
        .pipe(concat('src.all.js'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('copy-resources', function () {

    gulp.src('./resources/*').pipe(gulp.dest('./dist/res'));

});

gulp.task('build', [
    'make-deps',
    'make-sources',
    'copy-resources'
]);
