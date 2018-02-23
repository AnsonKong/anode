const gulp = require('gulp');
const rev = require('gulp-rev');
const revCollector = require("gulp-rev-collector");
 
gulp.task('default', () => {
		gulp.src(['app/view/css/*.css'])
        .pipe(rev())
        .pipe(gulp.dest('app/public/css/custom'))
        .pipe(rev.manifest({
        	path: 'rev-css-manifest.json'
        }))
        .pipe(gulp.dest('build/rev'));

    gulp.src(['app/view/js/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('app/public/js/custom'))
        .pipe(rev.manifest({
        	path: 'rev-js-manifest.json'
        }))
        .pipe(gulp.dest('build/rev'));
		
		gulp.src(['build/rev/*.json', 'app/view/**/*.tpl'])
			.pipe(revCollector({
				replaceReved: true
			}))
			.pipe(gulp.dest('app/view'));
	}
);