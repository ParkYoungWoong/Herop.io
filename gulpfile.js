var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var src = 'app/sources',
  dist = 'public',  // Distribution Directory
  paths = {
    scss: [
      src + '/scss/reset.css',
      src + '/scss/main.scss'
    ],
    js: [
      src + '/js/main.js'
    ]
  };

// localhost:8000
gulp.task('server', function () {
  return gulp.src(dist + '/')
    .pipe(plugins.webserver());
});

gulp.task('compile-sass', function () {
  return gulp.src(paths.scss)
    .pipe(plugins.concat('main.scss'))
    .pipe(plugins.sass())
    .pipe(gulp.dest(dist + '/css'));
});

gulp.task('combine-js', function () {
  return gulp.src(paths.js)
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(dist + '/js'));
});

gulp.task('watch', function () {
  plugins.livereload.listen();
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.js, ['combine-js']);
  gulp.watch(dist + '/**').on('change', plugins.livereload.changed);
});

// Default Task
gulp.task('default', [
  'server',
  'compile-sass',
  'combine-js',
  'watch'
]);