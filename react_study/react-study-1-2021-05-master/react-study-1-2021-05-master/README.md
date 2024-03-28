# 리액트 스터디 (2021-05)

## [스터디 노션 페이지 링크][dashboard]!

> 리액트의 모든 개념을 5주 (10회) 동안 깊게 다뤄보고, 배운 내용을 활용하여 토이 프로젝트도 만들어요 ~

## 토이 프로젝트 깃 허브 리포

| A la galerie (갤러리에서)
    나쁜 코로나 때문에 가고싶던 갤러리 산책 대신.. 리액트 갤러리 산책 😭!
    1시간 마다 바뀌는 3장의 명화들을 감상해봅시다~

-   윤상: [링크][toy-project-ys]
-   율리: [링크][toy-project-yl]
-   가린: [링크][toy-project-gr]
-   민국: [링크][toy-project-mk]
-   재홍: [링크][toy-project-jh]
-   보경: 링크

## 스터디 목차

-   1회차 (05.12 수 19:00)

    -   [리액트 소개][ch1-1], [create-react-app][ch1-2] (율리)
    -   [내 첫 컴포넌트][ch2] (보경)
    -   [JSX][ch3] (민국)
    -   [props][ch4] (가린)
    -   [conditional render][ch5] (재홍)
    -   [state 컨셉 & useState][ch6] (윤상) <br/><br />

-   2회차 (05.16 일 14:00)

    -   form & input 관리 [(민국)][ch7-1] [(보경)][ch7-2]
    -   [hooks 소개][ch8] (윤상)
    -   [list 다루기, key][ch9-1] (가린) [array 렌더][ch9-2] (재홍)
    -   [useEffect 의 3가지 사용법][ch10] (윤상)
    -   [useRef (dom, 변수 관리)][ch11] (율리) <br /><br />

-   3회차 (05.20 목 19:00)

    -   [useMemo (연산한 값 재사용)][ch12] (가린)(율리)
    -   [useCallback (함수 재사용)][ch13] (민국)
    -   [React.memo (컴포넌트 리렌더링 방지)][ch14] (보경)
    -   [useReducer (상태 업데이트 로직 분리)][ch15] (재홍)
    -   [custom hooks (로직 분리) (윤상)][ch16] <br/><br />

-   4회차 (05.23 일 14:00)
    -   토이 프로젝트 시작 <br/><br />

-   5회차 (05.27 목 19:00)
    -   context API [(가린)][ch17-1][(율리)][ch17-2]
    -   [immer.js (불변성)][ch18] (민국)
    -   [class component][ch19] (재홍)
    -   component lifecycle [(보경)][ch20-1][(윤상)][ch20-2] <br/><br />

-   6회차 (05.30 일 14:00)
    -   componentDidCatch() 로 Error Handling 하기 / Sentry 연동 (velopert) [(율리)][ch21-1][(재홍)][ch21-2]
    -   합성 vs 상속 (official doc) / styled-component [(윤상)][ch22-1][(보경)][ch22-2]
    -   [SASS][ch23] (민국)
    -   [CSS-Module][ch24] (가린) <br/><br />

-   7회차 (06.04 목 19:00)
    -   비동기 프로그래밍 in JS (callback, promise, async/await) + script(async/defer) + unblocking/blocking code (윤상)
    -   API 연동의 기본 + useReducer 로 요청 상태 관리하기, [axios의 interceptor][axios-interceptor] (민국)(율리)
    -   useAsync() custom hooks 만들기 + react-async로 요청 상태 관리하기 (윤상)(재홍)
    -   context API 사용하기 + [웹 역사에 대해서 조사하기 (SPA, Single Page Appliacation 중심으로)][web-history] (가린)(보경) <br/><br />

-   8회차 (06.06 일 14:00)
    - 리액터 라우터 기본 + 파라미터 & 쿼리 + 서브 라우트 (보경)(가린)
    - 리액터 라우터 부가기능 + React.Redirect + useHistory() hook (율리)(민국)
    - code splitting with React.lazy, React.Suspense (윤상)(재홍)
    - normalize hierarchy with React.Portal (윤상)<br/><br />

[dashboard]: https://www.notion.so/2021-05-ae9cee780fc249479e93d591b57c08ae

[toy-project-ys]: https://github.com/olcw78/a-la-galerie/
[toy-project-yl]: https://github.com/yuliepie/a-la-galerie
[toy-project-gr]: https://github.com/gareen9342/reactstudy-a-la-galerie
[toy-project-mk]: https://github.com/MinGookK/a-la-galerie
[toy-project-jh]: https://github.com/JaehongGregPark/a-la-galerie-master
<!-- [toy-project-bk]: https:// -->

[ch1-1]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/01-1.%20React%20Intro.md
[ch1-2]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/01-2.%20create-react-app.md
[ch2]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/02.%20react%20component.md
[ch3]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/03.JSX.md
[ch4]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/04.Props.md
[ch5]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/05.rendering_conditional.md
[ch6]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/06.%20state%20%26%20useState.md
[ch7-1]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/07.Form%20%26%20inputState.md
[ch7-2]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/07.Form%26input.md
[ch8]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/08.%20hooks%3F.md
[ch9-1]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/09-1.list%20%26%20key.md
[ch9-2]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/09-2.ArrayRendering.md
[ch10]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/10.%20useEffect.md
[ch11]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/11.%20useRef.md
[ch12]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/12.%20useMemo.md
[ch13]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/13.useCallback.md
[ch14]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/14.React.memo.md
[ch15]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/15.useReducer.md
[ch16]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/16.%20custom%20hooks.md
[ch17-1]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/17-1.%20contextAPI.md
[ch17-2]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/17-2.%20Context%20API.md
[ch18]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/18.%20Using%20Immer.md
[ch19]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/19.%20class_type_component.md
[ch20-1]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/20-1.%20life%20cycle.md
[ch20-2]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/20-2.%20component%20lifecycle.md

[ch21-1]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/21-1.%20Error%20Handling.md
<!-- [ch21-2]: -->
[ch22-1]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/22-1.Composition%20%26%20styled-components.md
[ch22-2]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/22-2.%20composition%20vs%20inheritance%20%26%20styled-components.md
[ch23]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/23.%20Sass.md
[ch24]: https://github.com/Quickeely/react-study-1-2021-05/blob/master/24.CSS%20Module.md

[axios-interceptor]: https://flyingsquirrel.medium.com/api-fetch-retry%EB%A1%9C%EC%A7%81-%EC%9E%91%EC%84%B1%ED%95%B4%EB%B3%B4%EA%B8%B0-with-axios-5cb81e6345ad
[web-history]: https://www.youtube.com/watch?v=iZ9csAfU5Os&t=3s
