// Constants
var dist = 'dist/';

// Plugins
var gulp = require('gulp');
var concat = require('gulp-concat');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');

var jade = require('gulp-jade');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');

var mainBowerFiles = require('main-bower-files');
var gulpFilter = require('gulp-filter');

var clean = require('gulp-clean');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');
var rev = require('gulp-rev');
var inject = require('gulp-inject');

var Server = require('karma').Server;

// Cleaning project folder task
gulp.task('clean', function() {
  return gulp.src(dist + '/*').pipe(clean({force: true}));
});

gulp.task('clean_styles', function() {
  return gulp.src([dist + 'css/**/*.css', '!' + dist + 'css/bower_components*.css'])
          .pipe(clean({force: true}));
});

gulp.task('clean_scripts', function() {
  return gulp.src([dist + 'js/**/*.js', '!' + dist + 'js/bower_components*.js'])
          .pipe(clean({force: true}));
});

// Processing styles task
gulp.task('styles', function() {
  return gulp.src('app/css/*.scss')
          .pipe(sass())
          .pipe(gulp.dest(dist + 'css/'));
});

// Processing scripts task
gulp.task('scripts', function() {
  return gulp.src('app/js/**/*.coffee')
          .pipe(coffee())
          .pipe(jshint())
          .pipe(rev())
          .pipe(uglify())
          .pipe(gulp.dest(dist + 'js/')); 
});

// Processing images task
gulp.task('images', function() {
  return gulp.src('app/img/**').pipe(gulp.dest(dist + 'img/'));
});

// Processing templates task
gulp.task('templates', function() {
  return gulp.src(['app/**/*.jade', '!app/index.jade', '!app/**/_*.jade'])
          .pipe(jade())
          .pipe(minifyHTML())
          .pipe(gulp.dest(dist));
});

gulp.task('inject', function() {
  var sources = gulp.src([dist + '/js/**/*.js', dist + '/css/*.css'], {read: false});

  return gulp.src('app/index.jade')
          .pipe(inject(sources, {ignorePath: '/dist/'}))
          .pipe(jade())
          .pipe(minifyHTML())
          .pipe(gulp.dest(dist));
});

// Processing bower components(js, css, fonts) task
gulp.task('bower_components', function() {
  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

  return gulp.src(mainBowerFiles())
          .pipe(jsFilter)
          .pipe(rename({suffix: '.min'}))
          .pipe(concat('bower_components.js'))
          .pipe(rev())
          .pipe(uglify())
          .pipe(gulp.dest(dist  + "js/"))
          .pipe(jsFilter.restore())
          .pipe(cssFilter)
          .pipe(concat('bower_components.css'))
          .pipe(rev())
          .pipe(minifyCSS())
          .pipe(gulp.dest(dist  + 'css/'))
          .pipe(cssFilter.restore())
          .pipe(fontFilter)
          .pipe(gulp.dest(dist + 'fonts/'));
});

// Unit-testing
gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
  }, function() {
    done();
  }).start();
});

// Watching files for changes task
gulp.task('watch', function() {
  gulp.watch('app/css/**/*.scss', function() {
    runSequence('clean_styles', 'styles', 'inject');
  });
  gulp.watch('app/js/**/*.coffee', function() {
    runSequence('clean_scripts', 'scripts', 'inject');
  });
  gulp.watch('app/img/**/*', ['images']);
  gulp.watch('app/**/*.jade', ['templates']); 
});

// Server creating task
gulp.task('server', function() {
  connect.server({
    root: dist,
    port: 8888
  });
});

// Default task
gulp.task('default', function() {
  runSequence('clean', ['styles', 'scripts', 'images', 'templates', 'bower_components'], 'inject', 'server', 'watch');
})