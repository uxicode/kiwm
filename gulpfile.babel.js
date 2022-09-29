import del from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import cleanCss from 'gulp-clean-css';
import markdown from 'gulp-markdown';
import cheerio from 'gulp-cheerio';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import injector from 'gulp-inject';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import autoPrefixer from 'gulp-autoprefixer';
import sourceMaps from 'gulp-sourcemaps';
import _ from 'lodash';
import streamSeries from 'stream-series';
import Fiber from 'fibers';
import BrowserSync from 'browser-sync';
//
const sassCompile = gulpSass(sass);
const browserSync = BrowserSync.create();
const clientPath = 'src';
const autoPreFixerBrowsers = ["last 4 version", "not IE 8"];
const paths = {
  client: {
    root: 'markup',
    css: 'markup/assets/css',
    scss:'markup/assets/scss/**/*'
  },
  dist: {
    root: 'markup/dist',
    css: 'markup/dist/assets/css',
    images: 'markup/dist/assets/images',
    js: 'markup/dist/assets/js',
    pages: 'markup/dist/pages',
    vendors: 'markup/dist/assets/vendors',
    fonts: 'markup/dist/assets/fonts'
  }
};
//readme.md 파일 docs.html 로 변환시킴.
const TITLE_TXT = 'Kiwoom admin';
const LOAD_JQUERY = 'docs/jquery-1.10.2.min.js';

const HEAD_STYLE = `<style>
    h1{font-size:60px;margin:1em 0;}
    body{font-size:14px;}
    blockquote>p{font-size:16px;}
    .lnb-container{overflow-y:auto;overflow-x:hidden;position:fixed;left:0;top:0;width: 300px;height: 100vh;color: #fff;background: linear-gradient(0deg,#5768f3,#1c45ef);}
    .btn-shortcut{display:block;padding:15px 12px 15px 20px;text-indent:0;line-height:1;font-size:14px;color:#fff;background-color:transparent;border-bottom: 1px solid rgba(255, 255, 255, 0.1);transition:all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);}
    .btn-shortcut:hover, .btn-shortcut.active{padding:20px 12px 18px 20px;text-indent:3px;text-decoration: none;color:#333;background-color:#fff;box-shadow:inset 0 -3px 10px 0 rgba(0, 0, 0, 0.12);border-bottom: 0;}
    .btn-top{z-index: 20;position:fixed;bottom:46px;right:50%;margin-right:-45%;}
    .btn-top>a{display:block;width:66px; height:66px; border-radius: 50%; border: 1px solid #dedede;} 
    .btn-top>a:hover{text-decoration: none;}
    .btn-top>a:before{content:'↑';padding:0 18px;font-size:50px;color:#337ab7;}
    .aver-table{width: 100%;margin-top:100px;text-align:center;border-top:2px solid #dedede;}
    .aver-table th{text-align:center;}
    .blind{  visibility: hidden; position: absolute; font-size: 0; width: 0; height: 0; line-height: 0;}
    .container{margin:0 0 180px 350px;}
    tr.del-status{background-color:#666;}
</style>`;

const HEADER_TEMP = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${TITLE_TXT}</title>
<link rel="stylesheet" href="docs/base.css">${HEAD_STYLE}
<script src=${LOAD_JQUERY}></script>
</head>`;

const BODY_TEMP = `<script>
  let percentItems=[];
  let completeItems=[];
  let deleteItems=[];
  let totalValue=0;
  let doc = document;
  
    function getDocHeight() {
        return Math.max(
            doc.body.scrollHeight, doc.documentElement.scrollHeight,
            doc.body.offsetHeight, doc.documentElement.offsetHeight,
            doc.body.clientHeight, doc.documentElement.clientHeight
        );
     }
    function getWindowHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
  let timer = setTimeout(function () {
        clearTimeout(timer);
        $('table a').attr('target', '_blank');
        let i=0;
        let titleMenus=$('h2');
        let len=titleMenus.length;
        let result='<div style="position:fixed;left:0;top:0;width: 300px;height: 100vh;color: #fff;background: linear-gradient(0deg,#5768f3,#1c45ef);"><p style="margin-top:177px;padding: 0 20px;font-size:30px;">바로가기 메뉴</p>';
        for(i=0;i<len;i++){
           result+= '<a class="btn-shortcut" href="#'+titleMenus.eq(i).attr('id')+'" data-index="'+i+'" >'+titleMenus.eq(i).text()+'</a>';
        }
        result+='</div>';
        titleMenus.eq(0).before(result);
        $('.btn-top').on('click', function(e) {
          $('html,body').stop().animate({scrollTop:0}, 700 );
        });
        let taskTable=$('#task-list').next();
        let percentEle=taskTable.find('td:last-child');
        let perTxt=percentEle.text();
        let oldScrollNum=-1;
        let scrollSpyBtnItems=$('.btn-shortcut');
        
        taskTable.find('del').closest('tr').each(function(i, item){
            $(this).addClass('del-status')
        });
        scrollSpyBtnItems.on('click', function(e){
            // e.preventDefault();
             let scrollIdx = $(this).attr('href');
             let offsetY=$(scrollIdx).offset().top;
             $('html, body').stop().animate({scrollTop:offsetY}, 350 );
             
            activeMenus( parseInt( $(this).attr('data-index')) );
        });
         scrollSpyBtnItems.on('mouseenter', function(e){
            $(window).off('scroll.body-scroll');
        });
        scrollSpyBtnItems.on('mouseleave', function(e){
            $(window).on('scroll.body-scroll', updateScrollSpy );
        });
        function activeMenus(idx){
            if( oldScrollNum===idx ){ return; }
            scrollSpyBtnItems.eq(idx).addClass('active').siblings().removeClass('active');
            oldScrollNum=idx;
        }
      
        let maxScroll= getDocHeight() - getWindowHeight();
        
        function updateScrollSpy(){
            let scrollTop=$(this).scrollTop();
            
            scrollSpyBtnItems.each(function(i, item){
                let scrollIdx = $(this).attr('href');
                let offsetY=$(scrollIdx).offset().top;
                let th=$(scrollIdx).outerHeight(true);
                //
                if(scrollTop>=offsetY && scrollTop<offsetY+th ){
                     activeMenus( i );
                }else{
                    if( maxScroll <= scrollTop ){
                        activeMenus( scrollSpyBtnItems.length-1 );
                    }
                }
            });
        }
        $(window).on('scroll.body-scroll', updateScrollSpy);
        activeMenus( 0 );
        
        
        percentEle.each(function(i, item){
            let value=parseFloat( ( $(item).text() ).split('%').join('') );
            
            if( !isNaN( value ) ){
                if( value === 100 ){
                    completeItems.push( value );
                }
                percentItems.push( value );
            }else{
                deleteItems.push( value );
            }
            // console.log('isNaN', isNaN( value ), value )
            // console.log(value, '::cell n=', i)
        });
        for(i=0;i<percentItems.length;i++){
            totalValue+=parseInt( percentItems[i] );
        }
        let average=( Number( totalValue/percentItems.length) ).toFixed(3);
        // console.log( average, totalValue, percentItems.length )
        taskTable.after('<table class="aver-table"><thead><tr><th>총페이지수</th><th>작업된 페이지수</th><th>삭제 및 중단 페이지</th><th>진행률(%)</th></tr></thead><tbody><tr><td>'+percentItems.length+'</td><td>'+completeItems.length+'</td><td>'+deleteItems.length+'</td><td>'+average+'(%) </td></tr></tbody></table>');

        }, 450 );//end setTimeout
</script>`;

const templateAll = `${HEADER_TEMP}
<body>
<header id="topMove"></header>
<div class="container"></div>
<div class="btn-top"><a href="#topMove"><span class="blind">위로가기</span></a></div>
${BODY_TEMP}
</body>
</html>`;

const markdownToHTML=( path, outputName, decode=true) =>{
    return gulp.src(path)
        .pipe(markdown({
            sanitize: false,
            smartypants: true,
            smartLists: true,
            xhtml: true
        }))
        .pipe(cheerio({
            run: ($, file) => {
                $.root().empty();
                $.root().append(templateAll);
                $('.container').html(file.contents.toString());
            },
            parserOptions: {
                decodeEntities: decode  // true = 엔티티 코드화
            }
        }))
        .pipe(rename(`${outputName}.html`))
        .pipe(gulp.dest('./'));
};
const docsName1 = 'docs';
const docsName2 = 'caseStudy';

//readme.md 파일 docs.html 로 변환시킴.
const clientReadMeToHTML = () => {
  return markdownToHTML('./README.md', docsName1);
};
const localeReadMeToHTML = () => {
    //'./README.local.md'
    return markdownToHTML('./README.local.md', docsName2);
};

//=============================== start : inject =============================================================
// 소스를 inject 할 범위 지정
let injectURLItems = {
  to: [`${paths.client.pages}/*.html`],
  from: paths.client.pages
};
const {to, from} = injectURLItems;
let toURL = to || `${paths.client.root}/*.html`;
let fromURL = from || paths.client.pages;

//css inject
function injectCss() {
  return gulp.src(toURL)
    .pipe(injector(
      streamSeries(
        gulp.src(`${paths.client.vendors}/**/*.css`, {read: false}),
        gulp.src(`${paths.client.css}/*.css`, {read: false})), // 순차 실행
      {relative: true}))
    .pipe(gulp.dest(fromURL))
}

//dependency js inject - 의존성 js 기재 - jquery 처럼 모든 소스에 의존성이 있는 파일
function injectDependencyJs() {
  return gulp.src(toURL)
    .pipe(injector(
      gulp.src([
        `${paths.client.vendors}/jquery/jquery-3.5.1.min.js`,
      ], {read: false}),
      {relative: true, starttag: '<!-- inject:dependency:{{ext}} -->'}))
    .pipe(gulp.dest(fromURL))
}

//공통 js inject - head 에 선언되어야 하는 기본 js
// function injectHeadJs() {
//     return gulp.src(toURL)
//         .pipe(injector(
//             gulp.src(
//                 _.union(
//                     [`${paths.client.js}/apps.js`],
//                     [`!${paths.client.vendors}/jquery/jquery-3.5.1.min.js`]  // ! 붙여서 제외할 파일
//                 ),
//                 {read: false}),
//             {relative: true, starttag: '<!-- inject:head:{{ext}} -->'}))
//         .pipe(gulp.dest(fromURL))
// }

// html 태그 내에서 맨 하단에 불러올 js
function injectJs() {
  let first = gulp.src(`${paths.client.js}/common.js`, {read: false});
  return gulp.src(toURL)
    .pipe(injector(
      streamSeries(first), //gulp.src() 메서드로 호출한 스트림을 순차적으로 적용시킴. 즉 저정한 대로 파일이 순차적으로 로드 된다.
      {relative: true}))
    .pipe(gulp.dest(fromURL))
}

//=================================== end : inject ============================================================

/**
 * sass 컴파일링.
 * @returns {*}
 */
function compileSass(type = 'local') {
  // expanded - 표준 css / compact -  한줄로 나타내는 스타일의 css 파일 / compressed - 빈공간이 없는 압축된 스타일의 css 파일
  let outputType = (type === 'local') ? 'expanded' : 'compressed';
  return gulp.src(`${paths.client.scss}.scss`)
    .pipe(sourceMaps.init())
    // .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(sassCompile({
      outputStyle: outputType,
      fiber: Fiber
    }).on("error", sassCompile.logError))
    .pipe(autoPrefixer(autoPreFixerBrowsers))
    .pipe(sourceMaps.write(`.`))
}

function localSassToCss() {
  return compileSass('local')
    .pipe(gulp.dest(paths.client.css))
    .pipe(browserSync.stream());
}

function distSassToCss() {
  return compileSass('dist')
    .pipe(gulp.dest(paths.dist.css))
}

/*Gulp 4.0부터는 Task 함수를 사용하기보다 일반 기명함수로 Task 를 만들고, CommonJS 모듈 형식으로 내보내기를 권장한다.*/
function distHTML() {
  return gulp.src(_.union([`${paths.client.pages}/*.html`]))
    .pipe(gulp.dest(paths.dist.pages));
}

function distJS() {
  return gulp.src(`${paths.client.js}/*.js`)
    .pipe(sourceMaps.init())
    .pipe(babel())
    // .pipe( uglify() )
    .pipe(sourceMaps.write(`.`))
    .pipe(gulp.dest(paths.dist.js))
}


function distVendors() {
  return gulp.src(`${paths.client.vendors}/**/*`)
    .pipe(gulp.dest(paths.dist.vendors))
}

function distFonts() {
  return gulp.src(`${paths.client.fonts}/**/*`, {dot: true})
    .pipe(gulp.dest(paths.dist.fonts));
}

//optimizationLevel
//- default 는 3 // 값은 0 ~ 7 까지
// 값 1 - 1 trial
// 값 2 - 8 trials
// 값 3 - 16 trials
// 값 4 - 24 trials
// 값 5 - 48 trials
// 값 6 - 120 trials
// 값 7 - 240 trials
//- 즉 수치가 높을수록 압축시도가 높아진다.
function minifyImg() {
  return gulp.src(`${paths.client.images}`)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}), //점진적인 렌더링
      imagemin.jpegtran({progressive: true}), //무손실로 점진적으로 렌더링
      imagemin.optipng({optimizationLevel: 1})
    ]))
    .pipe(gulp.dest(paths.dist.images));
}

//start: dist 경로 내에 파일 지우기.
const cleanDos = () => del([`${docsName1}.html`], {force: true});
const cleanDos2 = () => del([`${docsName2}.html`], {force: true});
// const cleanCodeReview = () => del(['codeReview.html'], {force: true});
const cleanDist = () => del([`${paths.dist.root}/**/*`], {force: true});
const cleanClientCss = () => del([`${paths.client.css}/*`], {force: true});
const cleanDistCss = () => del([`${paths.dist.css}/*`], {force: true});
const cleanDistHtml = () => del([`${paths.dist.pages}/*`], {force: true});
//end: dist 경로 내에 파일 지우기.

//리로드
const reload = browserSync.reload;

const localWatch = () => {
  browserSync.init({
      server: './'
  });

  watch(`${paths.client.scss}`, localSassToCss);
  /*watch(`${paths.client.js}/!*.js`, (e) => {
    console.log(`${e.event}: ${e.path.split("/").pop()}`);
  });*/
  watch(`${paths.client.root}/*.html`, reload);
  // watch(`${paths.client.pages}/*.html`).on('change', reload)
  /*watch(`${clientPath}/!**!/!*`, (e) => {
    console.log(`${e.event}: ${e.path.split("/").pop()}`);
  });*/
};

//readme.md 파일 변환 하여 docs.html 로 배포시킴.
// const codeR = gulp.series(cleanCodeReview, codeReviewMdToHtml);
const docs = gulp.series(cleanDos, clientReadMeToHTML);
const docs2 = gulp.series(cleanDos2, localeReadMeToHTML);

//html 에 라이브러리 inject- injectURLItems 배열에 경로 지정이 있으니 반드시 확인 및 수정 후 inject 해야 한다.
const inject = gulp.series(injectCss, injectDependencyJs, injectJs);

//local
const local = gulp.series(cleanClientCss, localSassToCss, inject);
const dev = gulp.series(cleanClientCss, localSassToCss, localWatch);
//html 복사 이동, sass 변환
const dist = gulp.series(cleanDist, gulp.parallel(distSassToCss, minifyImg, distJS, distVendors, distFonts), distHTML);

//최종 출판
const prod = gulp.series(dist, docs);
export {docs, inject, dist, dev, local, prod, docs2};

/*
gulp.task 형식으로 쓰려면 아래와 같이 사용.
gulp.task('sass', done =>{
    //실행 코드
    //series 함수는 Task 를 순차적으로 실행한다. 각 Task 는 종료 시점을 알기 위해 Promise, Stream 또는 아래와 같이 명시적으로 완료 콜백 함수를 호출해야 한다.
    gulp.series(cleanDist, compileSass)();

    //series 에 인수로 넣은 함수 중 완료 콜백이 존재하지 않는다면 위의 task 에 전달인자를 한개 선언하여 이 지점에서 콜백 호출하듯 하면 된다.
    done();
});
 */


