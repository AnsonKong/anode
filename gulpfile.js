const gulp = require('gulp');
const del = require('del');
const rev = require('gulp-rev');
const revCollector = require("gulp-rev-collector");

const cssDist = 'app/public/css/custom';
const jsDist = 'app/public/js/custom';
const tplDist = 'app/view/dist';
const buildDir = 'build';

gulp.task('clean', function(cb) {
    del.sync([cssDist, jsDist, tplDist, buildDir], { force: true });
    cb();
});

gulp.task('devCss', function() {
	var stream = gulp.src(['app/view/src/css/*.css'])
        .pipe(rev())
        .pipe(gulp.dest(cssDist))
        .pipe(rev.manifest({
        	path: 'rev-css-manifest.json'
        }))
        .pipe(gulp.dest('build/rev'));
    return stream;
});

gulp.task('devJs', function() {
    var stream = gulp.src(['app/view/src/js/*.js'])
        .pipe(rev())
        .pipe(gulp.dest(jsDist))
        .pipe(rev.manifest({
            path: 'rev-js-manifest.json'
        }))
        .pipe(gulp.dest('build/rev'));
    return stream;
});

gulp.task('default', ['clean', 'devCss', 'devJs'], () => {
    gulp.src(['build/rev/*.json', 'app/view/src/**/*.tpl'])
            .pipe(revCollector())
            .pipe(gulp.dest(tplDist));
});