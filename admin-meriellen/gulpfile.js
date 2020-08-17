var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");

/*
 * Variables
 */
// Sass Source
var scssFile = "./assets/css/scss/main.scss";
var scssFiles = "./assets/css/scss";

// CSS destination
var cssDest = "./assets/css";

// Options for development
var sassDevOptions = {
  outputStyle: "expanded",
};

// Options for production
var sassProdOptions = {
  outputStyle: "compressed",
};

// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task("sassdev", function () {
  return gulp
    .src(scssFile)
    .pipe(sass(sassDevOptions).on("error", sass.logError))
    .pipe(gulp.dest(cssDest));
});

// Task 'sassprod' - Run with command 'gulp sassprod'
gulp.task("sassprod", function () {
  return gulp
    .src(scssFile)
    .pipe(sass(sassProdOptions).on("error", sass.logError))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest(cssDest));
});

// Task 'watch' - Run with command 'gulp watch'
gulp.task("watch", function () {
  gulp.watch(scssFiles, gulp.series("sassdev", "sassprod"));
  gulp.watch(scssFile, gulp.series("sassprod"));
});

// Default task - Run with command 'gulp'
gulp.task("default", gulp.parallel("sassdev", "sassprod", "watch"));
