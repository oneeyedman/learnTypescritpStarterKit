'use strict';

const { src, dest, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const notify       = require('gulp-notify');
const plumber      = require('gulp-plumber');
const ts           = require('gulp-typescript');



// > Dev tasks
// >> Concatenate JS files with sourcemaps
const scripts = () => {
  return src('./js/*.ts')
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(ts({
      noImplicitAny: true,
      out: 'main.js'
    }))
    .pipe(dest('js/'));
};



// > Recarga las ventanas del navegador
const bsReload = cb => {
  browserSync.reload();
  cb();
};

const defaultTasks = series(scripts);


const go = series(defaultTasks, cb => {
  console.log('yay');
  browserSync.init({
    files: 'index.html',
    server : {
      baseDir: './'
    },
    online: false,
    watchOptions : {
      ignored : 'node_modules/*',
      ignoreInitial : true
    }
  });
  watch('js/**/*.ts', series(scripts, bsReload));

  cb();
});



module.exports = {
  scripts,
  go
}

module.exports.default = defaultTasks;
