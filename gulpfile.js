'use strict';

const browserSync  = require('browser-sync');
const gulp         = require('gulp');
const notify       = require('gulp-notify');
const plumber      = require('gulp-plumber');
const sourcemaps   = require('gulp-sourcemaps');
const ts           = require('gulp-typescript');



// > Dev tasks
// >> Concatenate JS files with sourcemaps
gulp.task('scripts', function(done){
  gulp.src('./js/*.ts')
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(ts({
      noImplicitAny: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./js/'))
    .pipe(browserSync.reload({ stream:true }));
  done();
});



// > Watchers + BrowserSync server
gulp.task('default', gulp.series(['scripts'], function(done) {
  browserSync.init({
    server : {
      baseDir: './'
    }
  });
  gulp.watch('./js/*.ts', gulp.series(['scripts']));
  done();
}));



// > Recarga las ventanas del navegador
gulp.task('bs-reload', function (done) {
  browserSync.reload();
  done();
});
