const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const concat = require('gulp-concat');
const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require('gulp-uglifyjs');

// NodemonStart
// Таск для старта Nodemon - автоматическая перезагрузка сервера
function nodemonStart(cb) {
    let callbackCalled = false;
    return nodemon({script: './index.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
}

// BrowserSync
// Таск для автоматической перезагрузки бразуера при изменениях
function browserSync(done) {
    browsersync.init({
        logPrefix: 'pizza',
        proxy: 'http://localhost:8080',
        notify: false
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// CSS task
function css() {
    return gulp
        .src("./styles/src/**/*.sass")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("./styles/dist/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./styles/dist/"))
        .pipe(browsersync.stream());
}

function js() {
    return gulp
        .src(['./js/src/**/*.js',])
        .pipe(concat('index.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(plumber())
        .pipe(gulp.dest('./js/dist'))
}


function jsLibs() {
    return gulp
        .src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/uikit/dist/js/uikit.min.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest('./js/dist'))
}

function cssLibs() {
    return gulp
        .src([
            './node_modules/uikit/dist/css/uikit.min.css',
        ])
        .pipe(concat('libs.css'))
        .pipe(plumber())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('./styles/dist'))
}

// Watch files
function watchFiles() {
    gulp.watch("./styles/src/**/*", css);
    gulp.watch("./js/src/**/*", js);
    gulp.watch("./js/dist/*", browserSyncReload);
    gulp.watch("./styles/dist/*", browserSyncReload);
    gulp.watch("./index.js", browserSyncReload)
}

// define complex tasks
const build = gulp.parallel(cssLibs, jsLibs, js, css);
const watch = gulp.parallel(cssLibs, jsLibs, js, css, watchFiles, nodemonStart, browserSync);

// export tasks
exports.css = css;
exports.cssLibs = cssLibs;
exports.jsLibs = jsLibs;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;
