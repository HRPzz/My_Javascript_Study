import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import gsass from "gulp-sass";
import nsass from "node-sass";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";

const sass = gsass(nsass); // const sass = require("gulp-sass")(require("node-sass"));

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build",
    },
    img: {
        src: "src/img/*",
        dest: "build/img",
    },
    scss: {
        watch: "src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "build/css",
    },
    js: {
        watch: "src/js/**/*.js",
        src: "src/js/main.js",
        dest: "build/js",
    },
    deploy: {
        src: "build/**/*",
        publish: ".publish",
    },
};

// 코드 흐름(src)을 파이프(pipe)에 연결해서 태스크(compile/minified) 수행하고 결과 내보내기(dest) - 파일 변형 작업
const pug = () =>
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

// 앞서 빌드된 폴더 삭제 - 빌드를 위한 준비 작업
const clean = () => del([routes.pug.dest, routes.deploy.publish]);

// task 생성 - 웹 서버
const websever = () =>
    gulp.src(routes.pug.dest).pipe(ws({ livereload: true, open: true }));

// 이미지 최적화
const img = () =>
    gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

// sass 컴파일
const styles = () =>
    gulp
        .src(routes.scss.src)
        .pipe(sass().on("error", sass.logError)) // sass error 출력
        .pipe(autoprefixer()) // css 호환성 설정
        .pipe(miniCSS()) // css minified
        .pipe(gulp.dest(routes.scss.dest));

// js 실행
const js = () =>
    gulp
        .src(routes.js.src)
        .pipe(
            // browserify
            bro({
                transform: [
                    // babelify - 리액트 작업이라면 react preset 추가하면 됨
                    babelify.configure({ presets: ["@babel/preset-env"] }),
                    ["uglifyify", { global: true }], // uglifyify
                ],
            })
        )
        .pipe(gulp.dest(routes.js.dest));

// github 배포
const gh = () => gulp.src(routes.deploy.src).pipe(ghPages());

// task 수행
const watch = () => {
    // 웹 서버 실시간 수정 사항 반영
    gulp.watch(routes.pug.watch, pug);

    // img 파일 변동 사항 있으면 최적화 진행
    // - 용량이 큰 이미지라면 최적화 시간이 오래 걸리므로 따로 실행하는 것 추천
    // - 지금은 용량이 작은 이미지만 있으므로 실시간 보기 진행
    gulp.watch(routes.img.src, img);

    // scss 변동 사항 있으면 컴파일 진행
    gulp.watch(routes.scss.watch, styles);

    // js 변동 사항 있으면 컴파일 진행
    gulp.watch(routes.js.watch, js);
};

// 시리즈 생성
const prepare = gulp.series([clean, img]);
const assets = gulp.series([pug, styles, js]);
const postDev = gulp.parallel([websever, watch]); // 병렬 실행

// package.json 에서 사용할 command 만 하면 됨
export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, postDev]);
export const deploy = gulp.series([build, gh, clean]);
