const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const revFormat = require('gulp-rev-format');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const pump = require('pump');
const revCollector = require("gulp-rev-collector");

const cssDist = 'app/public/css/custom';
const jsDist = 'app/public/js/custom';
const tplDist = 'app/view/dist';
const buildDir = 'build';

gulp.task('clean', function(cb) {
    del.sync([cssDist, jsDist, tplDist, buildDir], { force: true });
    cb();
});

gulp.task('devCss', function(cb) {
	pump([
        gulp.src('app/view/src/css/*.css'),
        cleanCSS({compatibility: 'ie8'}),
        rev(),
        revFormat({
            prefix: '.',
            suffix: '.min',
            lastExt: false
        }),
        gulp.dest(cssDist),
        rev.manifest({ path: 'rev-css-manifest.json' }),
        gulp.dest('build/rev')
        ], cb);
});

gulp.task('devJs', ['devCss'], function(cb) {
    pump([
        gulp.src('app/view/src/js/*.js'),
        uglify(),
        rev(),
        revFormat({
            prefix: '.',
            suffix: '.min',
            lastExt: false
        }),
        gulp.dest(jsDist),
        rev.manifest({ path: 'rev-js-manifest.json' }),
        gulp.dest('build/rev')
        ], cb);
});

gulp.task('default', ['clean', 'devCss', 'devJs'], () => {
    gulp.src(['build/rev/*.json', 'app/view/src/**/*.tpl'])
            .pipe(revCollector({
                revSuffix: '.[0-9a-f]{8,10}.min?'
            }))
            .pipe(gulp.dest(tplDist));
});