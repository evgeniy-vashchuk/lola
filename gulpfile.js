/*
	ТАСКИ GULP:
	gulp				Запуск дефолтного gulp таска (sass, js, watch, browserSync) для разработки;
	gulp build			Сборка проекта в папку prod (очистка, сжатие картинок, удаление всего лишнего);
	gulp clearcache		Очистка кеша gulp. Полезно для очистки кеш картинок и закешированных путей.
*/

var gulp           = require('gulp'),
	gutil          = require('gulp-util' ),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	del            = require('del'),
	sourcemaps     = require('gulp-sourcemaps'),
	cache          = require('gulp-cache'),
	autoprefixer   = require('gulp-autoprefixer'),
	notify         = require("gulp-notify");
	tinypng        = require('gulp-tinypng-compress');
	svgmin         = require('gulp-svgmin');
	zip            = require('gulp-zip'),

// РАБОТА С JAVASCRIPT ФАЙЛАМИ

gulp.task('js', function(){
	gulp.src('dev/js/**/*.js',)
	gulp.src('dev/libs/**/*.js',)
	.pipe(browserSync.reload({stream:true}));
});

// РАБОТА С SASS ФАЙЛАМИ

gulp.task('sass', function() {
	return gulp.src('dev/scss/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('dev/css'))
	.pipe(browserSync.reload({stream: true}));
});

// icomoon
gulp.task('icomoon', function() {
	return gulp.src('dev/libs/icomoon/style.scss')
	.pipe(sass().on("error", notify.onError()))
	.pipe(gulp.dest('dev/libs/icomoon'))
	.pipe(browserSync.reload({stream: true}));
});

// LIVERELOAD
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dev'
		},
		notify: true,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

// СЛЕЖЕНИЕ ЗА ФАЙЛАМИ
gulp.task('watch', ['sass', 'icomoon', 'js', 'browser-sync'], function() {
	// SCSS
	gulp.watch('dev/scss/**/*.scss', ['sass']), browserSync.reload;
	gulp.watch('dev/libs/icomoon/*.scss', ['icomoon']), browserSync.reload;
	// JS
	gulp.watch('dev/js/common.js', ['js']);
	gulp.watch('dev/libs/**/*.js', ['js']);
	// HTML
	gulp.watch('dev/*.html', browserSync.reload);
});

// РАБОТА С КАРТИНКАМИ
gulp.task('imagemin', function() {
	return gulp.src('dev/img/**/*{png,jpg,jpeg}')
	.pipe(tinypng({
		key: 'KCruazFUl_3QZbgQ7u3WC-aeZ0yz_CVL',
		log: true,
		summarise: true,
		parallel: true
	}))
	.pipe(gulp.dest('prod/img'));
});

// РАБОТА С SVG
gulp.task('imagemin-svg', function() {
	return gulp.src('dev/img/**/*.svg')
	.pipe(svgmin())
	.pipe(gulp.dest('prod/img'));
});

// ZIP-АРХИВАЦИЯ ПРОЕКТА
gulp.task('zip', function() {
	gulp.src('prod/**')
		.pipe(zip('prod.zip'))
		.pipe(gulp.dest(''));
})

// СБОРКА ПРОЕКТА
gulp.task('build', ['removeprod', 'imagemin', 'imagemin-svg', 'sass', 'js'], function() {


	var buildFiles = gulp.src([
		'dev/*.html',
		]).pipe(gulp.dest('prod'));

	var buildMainCss = gulp.src([
		'dev/css/main.css',
		]).pipe(gulp.dest('prod/css'));

	var buildMainJs = gulp.src([
		'dev/js/common.js',
		]).pipe(gulp.dest('prod/js'));

	var buildLibs = gulp.src([
		'dev/libs/**/*',
		]).pipe(gulp.dest('prod/libs'));

	var buildFonts = gulp.src([
		'dev/fonts/**/*',
		]).pipe(gulp.dest('prod/fonts'));

	var buildFavicon = gulp.src([
		'dev/img/favicon/favicon.ico']
		).pipe(gulp.dest('prod/img/favicon'));

});

gulp.task('removeprod', function() { return del.sync('prod'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);