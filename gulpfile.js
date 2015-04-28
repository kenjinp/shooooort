'use strict';

var gulp = require('gulp'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload,
    p = {
      jsx: './scripts/app.jsx',
      scss: 'styles/*.scss',
      html: './*.html',
      fonts: 'styles/fonts/*.ttf',
      bundle: 'app.js',
      distJs: 'dist/js',
      distCss: 'dist/css',
      distHtml: './',
      distFonts: 'dist/css/fonts/',
    };

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(p.jsx, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(babelify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', function() {
  browserify(p.jsx)
    .transform(babelify)
    .bundle()
    .pipe(source(p.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(p.distJs));
});

gulp.task('styles', function() {
  gulp.src(p.scss)
    .pipe(changed(p.distCss))
    .pipe(sass({errLogToConsole: true}))
    .on('error', notify.onError())
    .pipe(autoprefixer('last 1 version'))
    .pipe(csso())
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

gulp.task('htmlpage', function() {
  gulp.src(p.html)
    .pipe(changed(p.html))
    .pipe(gulp.dest(p.distHtml))
    .pipe(reload({stream: true}));
});

//assets
gulp.task('fonts', function() {
  return gulp.src(p.fonts)
    .pipe(gulp.dest(p.distFonts));
})

gulp.task('watchTask', function() {
    //jsx watch taken care of by watchify
    //wacth for scss changes
  gulp.watch(p.scss, ['styles']);
    //watch for html changes
  gulp.watch(p.html, ['htmlpage']);
});

gulp.task('watch', ['clean'], function() {
  gulp.start(['browserSync', 'watchify', 'watchTask', 'styles', 'fonts']);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'production';
  gulp.start(['browserify', 'styles', 'fonts']);
});

gulp.task('default', function() {
  console.log('Run "gulp watch or gulp build"');
});
