/// <binding ProjectOpened='default' />
'use strict';

/*=============================
=            Paths            =
=============================*/
var basePaths = {
    src: './UI/Src/',
    dest: './UI/Dist/'
};
var paths = {
    images: {
        src: basePaths.src + 'Images/',
        dest: basePaths.dest + 'Images/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/'
    }

};

/*====================================
=            Gulp Plugins            =
====================================*/
var Promise = require('es6-promise').polyfill(),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),

    //CSS Plugins
    autoprefixer = require('gulp-autoprefixer'),
    //bless = require('gulp-bless'),
    cssnano = require('gulp-cssnano'),
    hologram = require('gulp-hologram'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),

    //JS Plugins
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserify = require("gulp-browserify"),
    glob = require("glob");


/*=================================
 =            CSS Tasks            =
 =================================*/
gulp.task('sass', function() {
    return gulp.src(paths.styles.src + '**/*.scss')
    .pipe(sourcemaps.init())

    // Compile Sass files to Default.css
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['> 1%', 'IE 6'], cascade: true }))
    .pipe(gulp.dest(paths.styles.dest))

    // Minify and save as Default.min.css
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))

    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('rte-stylesheet', function () {
    return gulp.src(paths.styles.dest + 'default.min.css')
    .pipe(gulp.dest('./css/'));
});

/*========================================
=            JavaScript Tasks            =
========================================*/

// Browserify
gulp.task('browserifyJs', function () {
    var path = paths.scripts.src + 'Modules/',
    modules = glob.sync(paths.scripts.src + 'Modules/*.js');

    gulp.src([paths.scripts.src + 'Modules/*.js'])
        .pipe(
            browserify({
                entries: modules,
                basedir: './',
                debug: false,
                paths: [path]
            }))
        .pipe(rename('bundle.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});


// Concat and Minify Vendor Scripts
gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src + "Vendor/Header/*.js")
    .pipe(uglify({debug: true}, function(file) {
        console.log(file.name + ': ' + file.stats.originalSize);
        console.log(file.name + ': ' + file.stats.minifiedSize);
    }))
    .pipe(gulp.dest(paths.scripts.dest));
});



/*========================================
=            Styleguide Tasks            =
========================================*/
 gulp.task('hologram', function() {
     gulp.src('./UI/hologram_config.yml')
     .pipe(hologram());
 });



/*==========================================
=            Image Optimisation            =
==========================================*/
 gulp.task('imageOptim', function() {
     return gulp.src(paths.src.images + '*')
     .pipe(imagemin({
         progressive: true,
         svgoPlugins: [{ removeViewBox: false }],
         use: [pngquant()]
     }))
     .pipe(gulp.dest(paths.dist.images));
 });


// Run the default tasks on launch and then watch.
 gulp.task('default', ['sass', 'scripts', 'browserifyJs', 'watch']);

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.styles.src + '**/*.scss', ['sass']);
    gulp.watch(paths.scripts.src + '**/*.js', ['scripts', 'browserifyJs']);
});
