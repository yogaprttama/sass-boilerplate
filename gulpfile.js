const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rimraf = require('rimraf');

gulp.task('clean', () => {

  return rimraf('./dist/css/*.css');

});

gulp.task('sass', () => {

  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());

});

gulp.task('serve', () => {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./sass/*.scss', gulp.series(['clean', 'sass']));
  gulp.watch('*.html').on('change', browserSync.reload);

});

gulp.task('default', gulp.series(['clean','sass','serve']));
