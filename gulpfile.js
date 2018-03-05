const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const revFormat = require('gulp-rev-format');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const pump = require('pump');
const revCollector = require("gulp-rev-collector");
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');


const statics = ['app/public/src/img/**'];

const publicDist = 'app/public/dist';
const cssDist = 'app/public/dist/css/custom';
const jsDist = 'app/public/dist/js/custom';
const tplDist = 'app/view/dist';
const buildDir = 'build/rev';

const formatOptions = {
    prefix: '.',
    suffix: '.min',
    lastExt: false
};

gulp.task('clean', function(cb) {
    del.sync([publicDist, tplDist, buildDir], { force: true });
    cb();
});

gulp.task('mvStatics', ['clean'], function(cb) {
    pump([
        gulp.src(statics, { base: 'app/public/src' }),
        gulp.dest(publicDist)
        ], cb);
});

gulp.task('devCss', ['mvStatics'], function(cb) {
	pump([
        gulp.src('app/public/src/css/custom/*.css'),
        cleanCSS({compatibility: 'ie8'}),
        rev(),
        revFormat(formatOptions),
        gulp.dest(cssDist),
        rev.manifest({ path: 'rev-css-manifest.json' }),
        gulp.dest(buildDir)
        ], cb);
});

gulp.task('devJs', ['devCss'], function(cb) {
    pump([
        gulp.src('app/public/src/js/custom/*.js'),
        uglify(),
        rev(),
        revFormat(formatOptions),
        gulp.dest(jsDist),
        rev.manifest({ path: 'rev-js-manifest.json' }),
        gulp.dest(buildDir)
        ], cb);
});

gulp.task('devTpl', ['devJs'], function(cb) {
    pump([
        gulp.src(['build/rev/*.json', 'app/view/src/**/*.tpl']),
        revCollector({ revSuffix: '.[0-9a-f]{8,10}.min?' }),
        gulp.dest(tplDist)
        ], cb);
});

gulp.task('default', ['clean', 'mvStatics', 'devCss', 'devJs', 'devTpl'], () => {
    gulp.src([
        './app/**', 
        '!./app/public/{src,src/**}', 
        '!./app/view/{src,src/**}', 
        './config/**',
        './package.json',
        './package-lock.json'
        ], { base: './' })
        .pipe(tar('archive.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('.'))
});

