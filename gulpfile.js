var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    hash = require("gulp-hash"),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    del = require("del");



// Compile SCSS files to CSS
gulp.task("scss", function() {
    del(["static/css/**/*"])
    return gulp.src(["src/scss/**/*.scss", "themes/mi-cologne-styleguide/layouts/partials/**/*.scss"])
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoprefixer({ browsers: ["last 20 versions"] }))
        .pipe(concat('main.css'))
        .pipe(hash())
        .pipe(gulp.dest("static/css"))
        //Create a hash map
        .pipe(hash.manifest("hash.json"))
        //Put the map in the data directory
        .pipe(gulp.dest("data/css"))
});

// Hash images
gulp.task("images", function() {
    del(["static/images/**/*"])
    gulp.src("src/images/**/*")
        .pipe(hash())
        .pipe(gulp.dest("static/images"))
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/images"))
});

// Hash javascript
gulp.task("js", function() {
    del(["static/js/**/*"])
    gulp.src(["src/js/**/*.js", "themes/mi-cologne-styleguide/layouts/partials/atoms/**/*.js"])
        .pipe(concat('main.js'))
        .pipe(hash())
        .pipe(gulp.dest("static/js"))
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/js"))
})

// Watch asset folder for changes
gulp.task("watch", ["scss", "images", "js"], function() {
    gulp.watch(["src/scss/**/*", "themes/mi-cologne-styleguide/layouts/partials/atoms/**/*"], ["scss"])
    gulp.watch("src/images/**/*", ["images"])
    gulp.watch(["src/js/**/*", "themes/mi-cologne-styleguide/layouts/partials/atoms/**/*"], ["js"])
});

// Set watch as default task
gulp.task("default", ["watch"])