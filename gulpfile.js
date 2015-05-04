// Dependencies
var gulp      = require('gulp');
var $         = require('gulp-load-plugins')();
var rimraf    = require('rimraf');
var argv      = require('yargs').argv;

// Internals used throughout build process
var internals = {
  port        : 3000,
  dest        : './build',
  stylesheets : ['./src/stylesheets/*.styl'],
  javascript  : ['./src/javascript/**/*.js'],
  html        : ['./src/**/*.html']
};

// List tasks
$.taskList(gulp);

// Default task
gulp.task('default', ['build']);

// Build task
gulp.task('build', ['build-css', 'build-js', 'inject']);

// Watch task
gulp.task('watch', ['build'], function() {
  return gulp.watch('./src/**/*', ['build']);
});

// Run local webserver
gulp.task('server', ['watch'], function() {
  $.connect.server({
    root: ['build', './'],
    port: internals.port
  });
});


// Inject files into html
gulp.task('inject', ['build-js', 'build-css'], function() {
  var target = gulp.src(internals.html);
  var sources = gulp.src(internals.dest + '/**/*.{js,css}', { read: false });
  return target
      .pipe($.inject(sources))
      .pipe(gulp.dest(internals.dest));
});

// Compile stylesheets
gulp.task('build-css', ['clean'], function() {
  var nib = require('nib');
  return gulp.src(internals.stylesheets)
      .pipe($.stylus({
        use: [nib()]
      }))
      .pipe($.concatCss('app.css'))
      .pipe(gulp.dest(internals.dest + '/stylesheets'));
});

// Compile javascript
gulp.task('build-js', ['clean'], function() {
  return gulp.src(internals.javascript)
      .pipe($.concat('app.js'))
      .pipe(gulp.dest(internals.dest + '/javascript'))
      .pipe($.uglify())
      .pipe($.rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(internals.dest + '/javascript'));
});

// Clean up build directory
gulp.task('clean', function (done) {
  return rimraf(internals.dest, done);
});
