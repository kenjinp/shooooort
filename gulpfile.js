'use strict';

var gulp = require('gulp'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    jshint = require('gulp-jshint'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    karma = require('gulp-karma'),

    reload = browserSync.reload,
    sources = {
      test: './tests/*.js',
      js: './scripts/app.js',
      scss: 'styles/*.scss',
      html: './*.html',
      fonts: 'styles/fonts/*.ttf',
      bundle: 'app.js',
      distJs: 'dist/js',
      distCss: 'dist/css',
      distHTML: './',
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
  var bundler = watchify(browserify(sources.js, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(sources.bundle))
      .pipe(gulp.dest(sources.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(reactify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', function() {
  browserify(sources.js)
    .transform(reactify)
    .bundle()
    .pipe(source(sources.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(sources.distJs));
});

gulp.task('styles', function() {
  gulp.src(sources.scss)
    .pipe(changed(sources.distCss))
    .pipe(sass({errLogToConsole: true}))
    .on('error', notify.onError())
    .pipe(autoprefixer('last 1 version'))
    .pipe(csso())
    .pipe(gulp.dest(sources.distCss))
    .pipe(reload({stream: true}));
});

gulp.task('htmlpage', function() {
  gulp.src(sources.html)
    .pipe(changed(sources.html))
    .pipe(gulp.dest(sources.distHTML))
    .pipe(reload({stream: true}));
});

//all assets?
gulp.task('fonts', function() {
  return gulp.src(sources.fonts)
    .pipe(gulp.dest(sources.distFonts));
});

gulp.task('scss-lint', function() {
  gulp.src(sources.scss)
    .pipe(scsslint())
    .pipe(scsslint.failReporter('E'))
    .on('error', notify.onError());
});

gulp.task('jshint', function() {
  gulp.src(sources.js)
    .pipe(jshint({linter: require('jshint-jsx').JSXHINT}))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .on('error', notify.onError());
});

gulp.task('test', function() {
  gulp.src(sources.test)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', notify.onError());
});

gulp.task('watchTask', function() {
    //watch js for linting
  gulp.watch(sources.js, ['jshint']);
    //wacth for scss changes
  gulp.watch(sources.scss, ['styles', 'scss-lint']);
    //watch for html changes
  gulp.watch(sources.html, ['htmlpage']);
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
