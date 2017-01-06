var gulp = require('gulp');
var del = require('del');
var nodemon = require('gulp-nodemon');
var plugins = require('gulp-load-plugins')();

var src = './app/sources',
  dist = './public',
  paths = {
    src: {
      ejs: [
        '/views/**'
      ],
      scss: [
        src + '/scss/reset.css',
        src + '/scss/main.scss'
      ],
      js: [
        src + '/js/main.js'
      ]
    },
    dist: {
      css: dist + '/css',
      js: dist + '/js'
    }
  };

// localhost:8000
// gulp.task('server', function () {
//   return gulp.src(dist + '/')
//     .pipe(plugins.webserver());
// });

gulp.task('clean', function (cb) {
  return del([
    paths.dist.css + '/*.css',  // public/css/*.css
    paths.dist.js + '/*.js'  // public/js/*.js
  ], cb);
});

gulp.task('compile-sass', function () {
  return gulp.src(paths.src.scss)
    .pipe(plugins.concat('main.scss'))
    .pipe(plugins.sass())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('combine-js', function () {
  return gulp.src(paths.src.js)
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'ejs js scss'
  }).on('restart', function () {
    gulp.src('./app.js')
      .pipe(plugins.livereload());
  });
});

gulp.task('watch', function () {
  plugins.livereload.listen();
  gulp.watch(paths.src.scss, ['compile-sass']);
  gulp.watch(paths.src.js, ['combine-js']);
  gulp.watch(dist + '/**').on('change', plugins.livereload.changed);
});

// Default Task
gulp.task('default', [
  'clean',
  'compile-sass',
  'combine-js',
  'nodemon',
  'watch'
]);