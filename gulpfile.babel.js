const { dest, src, task, watch, series, parallel } =  require('gulp');

const sass =require( 'gulp-sass');
const autoprefixer =require( 'gulp-autoprefixer');
const sourcemaps = require( 'gulp-sourcemaps');
const pug = require('gulp-pug');
const browsersync = require('browser-sync');
const server = browsersync.create();

const pugjs = ()=>{
  return src('./pug/*.{pug,html}')
    .pipe(pug({pretty: true}))
    .pipe(dest('./'))
    .pipe(server.stream());
}

const styles = () =>{
  return src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({'outputStyle': 'expanded'}).on('error',sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(dest('./css'))
}

const serve = done =>{
  server.init({
    server: {
      baseDir : './'
    }
  })
  done();
}
const obs = ()=>{
  watch('./scss/**/*.scss' , styles)
  watch('./pug/**/*.pug' , pugjs)
}

const dev = parallel(styles,pugjs,serve,obs);

task('default',dev);