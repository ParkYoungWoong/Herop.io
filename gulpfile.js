var gulp = require('gulp'),
  del = require('del'),
  concat = require('gulp-concat'),
  liveReload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  nodemon = require('gulp-nodemon');

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
        src + '/js/lib/jquery-1.10.1.min.js',
        src + '/js/main.js'
      ]
    },
    dist: {
      css: dist + '/css',
      js: dist + '/js'
    }
  };

gulp.task('clean', function (cb) {
  return del([
    paths.dist.css + '/*.css',  // public/css/*.css
    paths.dist.js + '/*.js'  // public/js/*.js
  ], cb);
});

gulp.task('compile-sass', function () {
  return gulp.src(paths.src.scss)
    .pipe(concat('main.scss'))
    .pipe(sass())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('combine-js', function () {
  return gulp.src(paths.src.js)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    ext: 'ejs js scss'
  }).on('restart', function () {
    gulp.src('./app.js')
      .pipe(liveReload());
  });
});

gulp.task('watch', function () {
  liveReload.listen();
  gulp.watch(paths.src.scss, ['compile-sass']);
  gulp.watch(paths.src.js, ['combine-js']);
  gulp.watch(dist + '/**').on('change', liveReload.changed);
});

// Default Task
gulp.task('default', [
  'clean',
  'compile-sass',
  'combine-js',
  'nodemon',
  'watch'
]);