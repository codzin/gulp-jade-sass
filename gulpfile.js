var gulp = require('gulp');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var imagemin = require("gulp-imagemin");
var prefix = require('gulp-autoprefixer');
 
 
 
 gulp.task('templates', function() {
  gulp.src('*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(livereload());
});
 
 
 
 //Scripts
 
 //Uglify
gulp.task('scripts', function() {
  gulp.src('js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('build/js'));
});


// Styles

//
gulp.task('styles', function() {
  gulp.src('scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass({
    outputStyle: 'compressed'
    }))
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(gulp.dest('build/css'))
  .pipe(livereload());
});


/**
*
* Images
* - Compress them!
*
**/
gulp.task('images', function () {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'));
});



//Watch Task
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('js/*.js', ['scripts'])
  gulp.watch('scss/**/*.scss', ['styles'])
  gulp.watch('*.jade', ['templates']);
});


gulp.task('default', ['scripts', 'styles', 'images', 'templates', 'watch']);