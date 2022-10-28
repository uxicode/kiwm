# KIWOOM Admin( 공통컴포넌트만 업로드함 )  
- 기한 ( 2021.9.14 ~ 2022.3.31 )
------------------
## 프로젝트 구성 

### SPA( single page application ) 방식 채용 
> 서버로부터 완전한 새로운 페이지를 불러오지 않고 현재의 페이지를 동적으로 다시 렌더링하는 방식

### SPA 에 사용된 프레임워크 
>Vue.js (프론트엔트 프레임웍)  

### 공통 컴포넌트 라이브러리 
>Bootstrap 

### 사용된 언어
>Typescript( 자바스크립트 슈퍼셋 ) / HTML5 / SCSS ( CSS 전처리기 )


### 화면 기본 사항
>화면 전체 가로 사이즈 : min-width: 1680px / max-width: 1920px

>sidebar( 좌측 메뉴 가로 사이즈 ) 280px 고정

>contents( 가운데 컨텐츠 가로 사이즈 )<br/>
  min-width: 1400px / max-width: 1640px

![화면 이미지](./docs/screen1.jpg)

### 화면 공통 컴포넌트 구성<br>
( 버튼 / 라벨 / 테이블 / 카드뷰 /페이지네이션 / 네비 / 폼 등)
> [화면 구성 요소 바로가기](markup/form-layout.html)

[![화면 이미지](./docs/screen2.png)](markup/form-layout.html)

-------------

## 초기 세팅

###  - 프로젝트 셋업 
```
npm install
```

### - 컴파일 및 핫리로딩 ( 개발 버전 )
```
npm run serve
```

### - 컴파일 및 소스 압축/ 개발 모드 








```
npm run build
```

### - 컴파일 및 소스 압축/ 프로덕션( 배포 ) 모드 
```
npm run prod
```


-------------

## 문서 정의
| Document Type      | `<!DOCTYPE html>` ( html5 로 지정 ) |
| :---------------------| :-------------------                          |
| Incoding               | `<meta charset="utf-8" />`            |
| Cross Browsing      |Chrome  | 

> note :
> - html5로 작업
> - css class 이름은 알파벳(대소문자)로 시작하되 숫자/특수문자로 시작하여선 안된다.
> - css id 는 Camel case 방식으로 이름을 명기한다.

----------

##  Directory

### - 전체 구조
| Directory            |  Description |
|:--------------------|:------------- |
| dist/   | 배포 버전 파일 모음   |
| markup/   |  웹퍼블리싱 파일 모음   |
| public/   |  정적 페이지 / 리소스 모음   |
| src   |  vuejs 원본 소스 ( 개발 버전 로컬 파일 )   |
| vue.config.js   | vue 설정 파일  |
| babel.config.js   | babel 설정 파일  |
| tsconfig.json   | typescript 설정 파일  |
| package.json   | 프로젝트 패키지 버전 및 설치 설정 안내 파일  |



### - 웹퍼블리싱 파일 구조
| Directory            |  Description |
|:--------------------|:------------- |
| markup/   | 웹퍼블리싱 파일 모음( .html 확장자를 가진 파일  )    |
| markup/assets/css   |   css 파일   |
| markup/assets/fonts   |   폰트 파일   |
| markup/assets/images   |   이미지 리소스    |
| markup/assets/scss   |   scss 모음( css 로 컴파일 되기 전 상태 )   |

### - SCSS( CSS 전처리기 ) 구조
>note :
> - font는 **Noto Sans KR**
> - 폰트 정의는 **font.scss** 상단에 정의 되어 있다.

| Directory                                     | File Name                                          | Description               |
| :--------------------------------------- | :-------------------------------------------- | :----------------------- |
| markup/assets/scss/bootstrap-extended  | 부트스트랩 확장 파일들(다수의 파일명 생략)	     |  부트스트랩 확장형 scss |
| markup/assets/scss/components            | 부트스트랩 확장 파일들(다수의 파일명 생략)	     | 부트스트랩 컴포넌트 확장형 scss |
| markup/assets/scss/common                 | _badge.scss                                       | 뱃지 scss  | 
| markup/assets/scss/common                 | _breadcrumb.scss                               | 브래드크럼 scss  |
| markup/assets/scss/common                 | _button.scss                                       | 버튼 scss | 
| markup/assets/scss/common                 | _dropdown.scss                                  | 드롭다운 scss  | 
| markup/assets/scss/common                 | _form.scss                                         | 폼 scss | 
| markup/assets/scss/common                 | _header.scss                                      | 헤더 scss  | 
| markup/assets/scss/common                 | _layout.scss                                       | 레이아웃 scss  | 
| markup/assets/scss/common                 | _mixin.scss                                        | 믹스인 scss  | 
| markup/assets/scss/common                 | _navigation.scss                                  | 메뉴 scss  | 
| markup/assets/scss/common                 | _picker.scss                                        | date / time picker scss   | 
| markup/assets/scss/common                 | _popup.scss                                        | 레이어팝업 scss  | 
| markup/assets/scss/common                 | _reset.scss                                          |  초기화 scss  | 
| markup/assets/scss/common                 | _sidebar.scss                                       |  사이드 메뉴 scss  | 
| markup/assets/scss/common                 | _table.scss                                          |  테이블 scss  | 
| markup/assets/scss/common                 | _tooltip.scss                                        |  툴팁 scss | 
| markup/assets/scss/common                 | _transition.scss                                    |  모션 scss  | 
| markup/assets/scss/                             | _bootstrap-extended.scss                      |  부트스트랩확장파일 모음 scss  | 
| markup/assets/scss/                             | _common.scss                                     |  컴포넌트 모음 scss  | 
| markup/assets/scss/                             | _customizeBootstrap.scss                       | 부트스트랩 커스텀 scss  | 
| markup/assets/scss/                             | _dashboard.scss                                   |  대시보드 관리 scss  | 
| markup/assets/scss/                             | _banner.scss                                       |  배너 관리 scss  | 
| markup/assets/scss/                             | _event.scss                                          | 이벤트 관리 scss  | 
| markup/assets/scss/                             | _login.scss                                           |  로그인 관리 scss  | 
| markup/assets/scss/                             | _font.scss                                            |  폰트 관리 scss  | 
| markup/assets/scss/                             | all.scss                                               |  모든 scss 파일 취합   | 

#### 웹 퍼블리싱 실행 
- 아래 명령어를 터미널에 치고 나면 scss 가 컴파일 된다. 그리고 나서 markup 폴더안에 있는 html 파일을 클릭 실행.

```
gulp dev
```

----------------

### - Vue 배포용( production ) 폴더 구성 
| Directory              | Description             |
| :---------------------|:-----------------------|
| dist/fonts/             | 폰트 리소스 경로          |
| dist/img                | 이미지 리소스 경로        |
| dist/js                   | 자바스크립트 리소스 경로  |
| dist/favicon.ico       | 파비콘  |
| dist/index.html       | entry 페이지  |



### - Vue 프론트엔드 전체 파일 구조 ( 원본 local/development 모드 기준 )
| Directory            |  Description |
|:--------------------|:------------- |
|public/                | 정적 페이지, 리소스 등을 포함하는 경로 |
|public/index.html  | 초기 진입 실행 파일( 실제 모든 화면이 표시될 페이지 )  |
|public/favicon.ico | 브라우저 탭에 표시될 파비콘  |
| src/assets/fonts/   |   폰트 리소스 경로  |
| src/assets/images/common/   |   공통 이미지 리소스 경로  |
| src/assets/images/pages/   |   페이지별 이미지 리소스 경로  |
| src/assets/images/scss/   |   scss 파일 경로  |
| src/components/   |  vue 공통 컴포넌트 경로  |
| src/core/          | 프로젝트 인증/인가/필터/권한 Data 관련  |
| src/filters/        | 프로젝트 필터  |
| src/mixin/        | 범용성 컴포넌트 정의  |
| src/model/        | api 데이터 타입 구성을 위한 인터페이스  |
| src/pages/        | 화면 entry point  |
| src/restApi/      | ajax 통신의 위한 service 클래스 모음  |
| src/router/      |  화면 라우터   |
| src/service/      | 전역 서비스 클래스  |
| src/store/      | vue store ( 상태관리저장소 )  |
| src/types/      | vue 초기 실행시 type 추가 항목 정의  |
| src/utils/        | 유틸 static 클래스 모음  |
| src/views/      | 각 화면을 이루고 있는 컴포넌트 클래스  |
| src/shims-html.d.ts    |  *.html 로 ts 파일에 로드 할 수 있게 초기 설정   |
| src/shims-vue.d.ts     |  ts 내부에 Vue 를 인식시켜주는 역활  |


----------------

### - 프로젝트에 사용된 라이브러리 ( package.json 참조 )
| npm 으로 설치된 라이브러리 이름           |  버전      |     Description                |
| :---------------------------------------|:---------|:---------------------------- |
| vue                                           | 2.6.11 | 화면 전체를 구성하는 spa( single page application ) 프레임워크 |
| vue-router                                  | 3.2.0  | vue 화면 경로 구성 라이브러리 |
| vuex                                          | 3.4.0  | vue 에서 데이터 상태 관리 라이브러리 |
| vuex-class                                  |  0.3.2 | vuex 상태 모듈 네이밍 바이딩  |
| vuex-module-decorators               |  1.0.1 | vue 의 내부의  typescript 와 html 분리 해주는 모듈 |
| vue-class-component                    | 7.2.3 | vue component 기본 클래스  |
| vue-property-decorator                 | 9.1.2| vue component 와 typescript 간에 원활한 연결 도움 모듈 |
| vee-validate                                | 3.4.5  | vue form validate 체크 라이브러리  |
| bootstrap                                    | 5.1.3 | 부트스트랩 ( 컴포넌트 스타일 프레임워크 ) |
| popperjs                                     | 2.11.0 | 부트스트랩 의존성 파일  |
| dayjs                                         | 1.10.7  | 날짜 포맷 라이브러리     |
| flatpickr                                     | 4.6.9  | 달력 picker 라이브러리     |
| axios                                         | 0.21.1 | api 통신 ajax 라이브러리  |
| babel-polyfill                               | 6.26.0  | 바벨 트랜스파일링 폴리필   |
| es6-promise                                | 4.2.8  | es6 promise 폴리필  |
| tinymce-vue                                | 3.2.8  | vue rich text editor   |

> note : 위 라이브러리는 모두 MIT 

---------
## 설정 파일 

###  tsconfig.json( typescript 설정 파일) 설정 파일 속성

**files**
-컴파일할 파일들을 지정하는 옵션
```
{
"files": ["app.ts", "./practice/test.ts"]
}
```

**include**

- files와 달리 컴파일할 파일을 지정하는 것이 아닌 디렉토리를 지정
- 타입스크립트는 기본적으로 node_modules를 제외하지만 써드 파티 라이브러리의 타입을 정의해놓는 @types 디렉토리는 컴파일에 포함함
- 와일드 카드 패턴
* 		*: 해당 디렉토리의 모든 파일을 검색
* 		**: 하위 디렉토리를 재귀적으로 접근
* 		?: 해당 디렉토리안에 파일의 이름 중 키워드를 포함하는 파일 검색

```
{
"include": ["src/**/*"]
}
```

**exclude**

- include와 반대로 컴파일 제외할 디렉토리를 지정

```
{
"exclude": ["node_modules"]
}
```

**extends**

- 특정 타입스크립트 설정 파일에서 다른 타입스크립트 설정을 가져와 추가할 수 있는 옵션
- 오버라이드 가능

```
// config/bash.json
{
"compilerOptions": {
 "noImplicitAny": true
}
}

// tsconfig.json
{
"extends": "./config/base.json"
}
```

**target**

- 타입스크립트 파일을 컴파일 했을 때 빌드 디렉토리에 생성되는 자바스크립트의 버전 명시
```
{
"target": "esnext"
}
```

**lib**

- 타입스크립트 파일을 자바스크립트 파일로 컴파일 할 때 포함될 라이브러리 목록
- 대표적으로 Promise객체, dom관련 속성을 인식할 수 있는 esnext, dom, dom.iterable 사용
```
{
"lib": ["es2015", "dom", "dom.iterable"]
}
```
**allowJs**
- 타입스크립트 컴파일 작업을 진행할 때 자바스크립트 파일의 포함 여부를 설정하는 옵션

-----------



### - HTML5 History Mode 에서 Nginx 설정법
- https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations

**nginx**
```
location / {
try_files $uri $uri/ /index.html;
}
```


### .vue 파일에서 html과 ts 분리하는 법 ( 위에서 npm install 로 한번에 설정 가능- 아래는 추가 이해를 위한 설명 )
#### 1. vue-template-loader 설치

`npm install --save-dev vue-template-loader`

#### 2. vue.config.js 에 아래 코드 추가 ( configureWebpack 의 내용 추가 )

```
//vue.config.js
module.exports={
    configureWebpack:{
         module:{
         rules:[
                {
                    test:/.html$/,
                    loader:"vue-template-loader",
                    exclude:/index.html/
                },
             ]
         }
    }
}
```

#### 3. src 폴더에 `shims-html.d.ts` 파일 추가 그리고 아래 코드 입력

```
declare module '*.html'{
import Vue,{ ComponentOptions, FunctionalComponentOptions} from 'vue';
interface WithRender{
 <V extends Vue, U extends ComponentOptions<V> | FunctionalComponentOptions>(options: U, ): U;
 <V extends typeof Vue>(component: V): V;
}
const withRender: WithRender;
export default withRender;
}
```

#### 실행 예시

```
import WithRender from './App.html';
@WithRender
@Component
export default class App extends Vue { }
```
-----------

