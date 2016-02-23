import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'dest'
    },
    browser: 'google chrome canary',
    notify: false
  });
});

gulp.task('html', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dest'))
    .pipe(reload({stream: true}));
});

gulp.task('javascript', () => {
  return gulp.src('src/scripts/app.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dest/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['html', 'javascript', 'browserSync'], () => {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/scripts/app.js', ['javascript']);
});
