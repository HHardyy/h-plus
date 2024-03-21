import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import path from 'path';

import { series, src, dest } from 'gulp'

const _compiler = () => {
  const _sass = gulpSass(dartSass);
  return src(path.resolve(__dirname, './src/*.scss'))
    .pipe(_sass.sync())
    .pipe(autoprefixer())
  .pipe(cleanCss())
  .pipe(dest('./dist/css'))
}

const _copyfont = () => {
  return src(path.resolve(__dirname, './src/fonts/**'))
    .pipe(cleanCss())
    .pipe(dest('./dist/fonts'))
}

const _copyFullStyle = () => {
  return src(path.resolve(__dirname, './dist/**'))
    .pipe(
      dest(path.resolve(__dirname, '../../dist/theme-chalk'))
    )
}


export default series(_compiler, _copyfont, _copyFullStyle)