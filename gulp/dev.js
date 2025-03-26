const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const sourceMaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
// const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const typograf = require("gulp-typograf");
const webpHTML = require("gulp-webp-retina-html");
const replace = require("gulp-replace");

gulp.task("clean:dev", function (done) {
  if (fs.existsSync("./build/")) {
    return gulp.src("./build/", { read: false }).pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSetting = {
  prefix: "@@",
  basepath: "@file",
};

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

gulp.task("html:dev", function () {
  return gulp
    .src([
      "./src/html/**/*.html",
      "!./**/blocks/**/*.*",
      "!./src/html/docs/**/*.*",
    ])
    .pipe(changed("./build/", { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify("HTML")))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(
      replace(
        /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        "$1./$4$5$7$1"
      )
    )
    .pipe(
      typograf({
        locale: ["ru", "en-US"],
        htmlEntity: { type: "digit" },
        safeTags: [
          ["<\\?php", "\\?>"],
          ["<no-typography>", "</no-typography>"],
        ],
      })
    )
    .pipe(
      webpHTML({
        extensions: ["jpg", "jpeg", "png", "gif", "webp"],
        retina: {
          1: "",
          2: "@2x",
        },
      })
    )
    .pipe(gulp.dest("./build/"));
});

gulp.task("fonts:dev", function () {
  return gulp
    .src("src/fonts/**/*")
    .pipe(changed("./build/fonts/"))
    .pipe(gulp.dest("./build/fonts/"));
});

const plumberSassConfig = {
  errorHandler: notify.onError({
    title: "Styles",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};

gulp.task("sass:dev", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(plumber(plumberSassConfig))
    .pipe(changed("./build/css/"))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./build/css/"));
});

gulp.task("images:dev", function () {
  return gulp
    .src("./src/img/**/*")
    .pipe(changed("./build/img/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./build/img/"));
});

const plumberJsConfig = {
  errorHandler: notify.onError({
    title: "JS",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};

gulp.task("js:dev", function () {
  return (
    gulp
      .src("./src/js/*.js")
      .pipe(plumber(plumberJsConfig))
      .pipe(changed("./build/js/"))
      // .pipe(babel())
      .pipe(webpack(require("./../webpack.config.js")))
      .pipe(gulp.dest("./build/js"))
  );
});

gulp.task("server:dev", function () {
  return gulp.src("./build/").pipe(
    server({
      livereload: true,
      open: true,
    })
  );
});

gulp.task("watch:dev", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass:dev"));
  gulp.watch("./src/**/*.html", gulp.parallel("html:dev"));
  gulp.watch("./src/img/**/*", gulp.parallel("images:dev"));
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts:dev"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev"));
});
