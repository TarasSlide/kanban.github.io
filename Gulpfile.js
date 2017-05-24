"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('styles', function() {
    gulp.src('./app/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./app/dist/css'))
});

var scriptArray = [
    './app/classes/*.js',
    './app/filters/*.js',
    './app/app.module.js',
    './app/app.config.js',
    './app/buttons/remove-button/remove-button.module.js',
    './app/buttons/remove-button/remove-button.component.js',
    './app/add-item/add-item.module.js',
    './app/add-item/add-item.component.js',
    './app/board-list/board-list.module.js',
    './app/board-list/board-list.component.js',
    './app/board-detail/board-detail.module.js',
    './app/board-detail/board-detail.component.js'
];

gulp.task('scripts', function() {
    return gulp.src(scriptArray)
        .pipe(concat('main.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('watch',function() {
    gulp.watch(['./app/sass/*.scss', scriptArray], ['styles', 'scripts']);
});

gulp.task('default', ['styles', 'scripts']);
