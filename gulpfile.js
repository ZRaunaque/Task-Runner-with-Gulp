var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  jshint = require("gulp-jshint"),
  header = require("gulp-header"),
  rename = require("gulp-rename"),
  cssnano = require("gulp-cssnano"),
  concatjs = require('gulp-concat'),
  sourcemaps = require("gulp-sourcemaps"),
  plumber = require("gulp-plumber"),
  package = require("./package.json");


gulp.task("customCss", function() {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 4 version"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/css"))
    .pipe(cssnano())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("vendorCss", function() {
  return gulp
    .src("src/scss/vendor.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer("last 4 version"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/css"))
    .pipe(cssnano())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("customJs", function() {
  gulp
    .src("src/js/scripts.js")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task("vendorJs", function() {
  gulp
    .src(["src/components/jquery/jquery.js", "src/components/slick/slick.min.js"])
    .pipe(sourcemaps.init())
    .pipe(concatjs('vendor.js'))
    .pipe(plumber())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task("images", function() {
  gulp
    .src("src/img/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("assets/img"));
});

gulp.task("fonts", function() {
  gulp
    .src("src/fonts/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("assets/fonts"));
});

gulp.task("components", function() {
  gulp
    .src("src/components/**/*.*")
    .pipe(plumber())
    .pipe(gulp.dest("assets/components"));
});

gulp.task("browser-sync", function() {
  browserSync.init(null, {
    proxy: "localhost/task-runner-with-gulp"
  });
});

gulp.task("bs-reload", function() {
  browserSync.reload();
});

gulp.task(
  "default",
  ["customCss", "vendorCss", "customJs", "vendorJs", "images", "fonts", "components", "browser-sync"],
  function() {
    gulp.watch("src/scss/**/*", ["customCss"]);
    gulp.watch("src/scss/vendor.scss", ["vendorCss"]);
    gulp.watch("src/js/scripts.js", ["customJs"]);
    gulp.watch("src/js/**/*", ["vendorJs"]);
    gulp.watch("src/img/**", ["images"]);
    gulp.watch("src/fonts/**/*.*", ["fonts"]);
    gulp.watch("src/components/**/*.*", ["components"]);
    gulp.watch("**/*.php", ["bs-reload"]);
  }
);

// If permission error
// var fs = require('fs');
// if (1) fs.chmod = function (a, b, cb) {
//     cb(0);
// }