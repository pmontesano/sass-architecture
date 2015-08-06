/**
 * Dependencies
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();


// Compila los sass del proyecto y agrega vendor prefixes
gulp.task('styles', function() {
    return gulp.src(['styles/*.scss'])
        .pipe($.sass({
            outputStyle: 'expanded',
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.postcss([
            require('autoprefixer-core')({
                browsers: ['last 5 versions', 'android >= 2.1', '> 1%']
            })
        ]))
        .pipe($.size({
            title: 'CSS size:'
        }))
        .pipe(gulp.dest('build'));
});

// Runs only in ie legacy stylesheets. Adds polyfill for opacity, filters, overflow ellipsis, clearfix
gulp.task('stylesIE', function() {
    return gulp.src('build/main.css')
        .pipe($.postcss([
            require('cssgrace')()
        ]))
        .pipe($.size({
            title: 'IE styles size:'
        }))
        .pipe(gulp.dest('build/main-ie.css'));
});

// Minification Task for dist
gulp.task('stylesDist', function() {
    return gulp.src('build/*.css')
        .pipe($.postcss([
            require('cssnano')()
        ]))
        .pipe($.size({
            title: 'CSS minified size:'
        }))
        .pipe(gulp.dest('dist'));
});

// Linting and Stats
gulp.task('stylesLint', ['styles'], function() {
    return gulp.src('build/*.css')
        .pipe($.postcss([
            require('doiuse')({
                browsers: ['last 5 versions', 'android >= 2.1', '> 1%']
            }),
            require('cssstats')()
        ]))
});
