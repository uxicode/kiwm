const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const target = 'http://localhost:3000'; // 사용자 컴의 로컬주소
module.exports={
    publicPath: '/',
    // publicPath: process.env.NODE_ENV === 'production' ? ' ' : './', //간단히 js, css 와 같은 외부 참조 파일의 경로를 변경할 때 쓰인다. 예를 들어 root 경로가 ‘/’가 아닌 하위 ‘user’ 폴더를 publicPath 로 사용한다고 하면, 모든 js 와 css 파일 앋에 ‘/user/’ 가 붙어야 할 것이
    //assetsDir: 'assets',  //생 성 된 정적 자원(js,css,img,fonts)의 디 렉 터 리 를 배치
    //outputDir: 'dist',  //vue-cli-service build 를 실행 할 때 생 성 된 생산 환경 구축 파일 의 디 렉 터 리
    devServer:{
        port:8080, // 툴( webstorm 등) 에서 가상으로 붙이는 개발 포트
        proxy:{
            '/api':{   //백엔드 api path가 /api로 시작한다는 의미
                target,  //웹팩 개발 서버에다가 도메인, 포트, 프로토콜을 서버가 허용한 주소랑 맞춰달라고 하는 것 /즉 로컬 개발 서버에서 요청을 할 때 http://localhost:8080/api/~로 하게 된다.
                changeOrigin:true // 사용자 컴외에 툴의 개발 주소로 변경해서 사용을 허용. 출처를 target URI 로 바꾼다는 말이다. CORS 에러를 막기 위한 옵션
                /* 개발하는 과정에서 브라우저는  (내 아이피)http://localhost:8080/api/getInfo 의 url 로 요청을 하지만
                  proxy 를 거쳐 target ( http://test.com/api/getInfo ) 으로 가게 됨
                 같은 도메인 , 포트번호를 사용하는 것처럼 보이게 만든다.
                 실제로 axios 로 날릴때 target url 을 빼고 그 뒤에 /api/getInfo 를 날려주면 됨
                 중요한 것은 url + /api/getInfo 를 날리면 안되고
                 /api/getInfo 이렇게 날려야 한다.*/
            }
            //백엔드 api path가 각각 다르다면 다음과 같이 따로 작성해 주면 된다.
            /*
            '/token': {
             target: 'http://test.com',
             changeOrigin: true,
             },
             */
        },
        /*SPA 는 index.html 만 갖고 다른 url 로 접근하는 라우터만 존재. 따라서 '/' 외에 루트의 하위 url 로 접근하려고 하면 404 에러가 발생..
         historyApiFallback 가 true 가 되면, 404 에러에 한하여 에러를 띄우지 않고 index.html 을 렌더링하는 역할. 그리고 하위 url 쿼리에 따라 적절한 라우터를 찾아서 해당 js를 띄운다..
         그외에 백엔드 측에서도 처리를 해줘야 한다.  HTML5 History Mode 에서 Nginx 설정법
         - https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations */
        historyApiFallback: true,
    },
    runtimeCompiler: true, //true 를 하지 않으면 동적으로 페이지 렌더링 할 수 없습니다.
    pages: {
        default: {
            entry: 'src/pages/main/main.ts', //진입점 js 경로를 지정
            template: 'public/index.html', //템플릿 경로를 지정
            filename: 'index.html', //빌드 후 생성될 파일명을 지정
            title:'KIWOOM ADMIN',
        }/*,
        privacy: {
            entry: 'src/pages/privacy/main.ts',
            template: 'public/index.html',
            filename: 'terms_2022_03_15.html',
            title:'KIWOOM PRIVACY',
        }*/
    },
    productionSourceMap: false, //dist/js/ 하위에는 .map 확장자의 sourcemap 파일이 생성. 이 파일은 디버깅 시 추적을 하기 위해 생성하는 파일이다. 파일 크기가 커서 production 배포 시 제거해주면 좋다. 적용 시 빌드시간이 줄어든다.
    chainWebpack: (config) => {
        config.plugin('fork-ts-checker').tap((args) => {
            args[0].memoryLimit = 512;
            return args;
        });
    },
    configureWebpack:{
        module:{
            rules:[
                {
                    test:/.html$/,
                    loader:"vue-template-loader",
                    exclude:/index.html/,
                    options: {
                        transformAssetUrls: {
                            // The key should be an element name
                            // The value should be an attribute name or an array of attribute names
                            img: 'src'
                        }
                    }
                },
                /*{
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                esModule: false,
                                name: '[name].[ext]?[hash]',
                                publicPath: './dist/',
                                limit: 4096,
                            },
                        },
                    ],
                }*//*,
                */
            ]
        },
        // plugins: [new BundleAnalyzerPlugin()]
    },
    css:{
        sourceMap: true, //scss sourceMap 안보일때
        loaderOptions: {
            postcss: {
                ident: 'postcss',
                plugins: [ require('autoprefixer')]
            }
        }
    },
    /* ,
    css: {
        loaderOptions: {
            scss: {
                prependData:`
                @import "@/assets/scss/common.scss";
                @import "@/assets/scss/pages.scss";
                `
            }
        }
    }
    //위 코드는 어떤 컴포넌트에서 로컬에서 사용되는 css class 가 있다면 해당 부분만 로드시킨다.
   //위의 코드는 모든 컴포넌트의 스타일 태그에 지정한 SCSS의 코드를 넣는 처리가 수행되므로 참조하는 컴포넌트가
   // 여러개인 경우 (router-view등을 사용하여 수많은 자식 컴포넌트를 임포트하는 경우 등) 에는
    //자식 컴포넌트의 개수만큼 같은 스타일이 중복되어 적용.
    */
}
