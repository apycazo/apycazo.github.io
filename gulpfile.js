var gulp     = require('gulp'),
  concat     = require('gulp-concat'),
  uglify     = require('gulp-uglify'),
  browserify = require("browserify")
  source     = require('vinyl-source-stream'),
  buffer     = require('vinyl-buffer');
  babelify   = require('babelify')
  sourcemaps = require('gulp-sourcemaps'),
  rename     = require("gulp-rename"),
  less       = require('gulp-less');


  gulp.task('copy-deps', function () {

      var target = './dist/libs';
      var cssTarget = './dist/css';

      gulp.src('./node_modules/angular/angular.min.js').pipe(gulp.dest(target));
      gulp.src('./node_modules/angular-route/angular-route.min.js').pipe(gulp.dest(target));
      gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest(target));
      gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(gulp.dest(target));
      gulp.src('./node_modules/highlightjs/highlight.pack.min.js').pipe(gulp.dest(target));
      gulp.src('./node_modules/angular-highlightjs/build/angular-highlightjs.min.js').pipe(gulp.dest(target));

      gulp.src('./node_modules/highlightjs/styles/zenburn.css').pipe(gulp.dest(cssTarget));
  });
