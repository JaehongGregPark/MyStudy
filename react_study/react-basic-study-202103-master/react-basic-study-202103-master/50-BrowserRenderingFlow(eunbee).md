# 웹 브라우저 랜더링 순서

## 브라우저의 기본 구조

1. 사용자 인터페이스 - 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분이다.
2. 브라우저 엔진 - 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어.
3. 렌더링 엔진 - 요청한 콘텐츠를 표시. 예를 들어 HTML을 요청하면 HTML과 CSS를 파싱하여 화면에 표시함.
4. 통신 - HTTP 요청과 같은 네트워크 호출에 사용됨. 이것은 플랫폼 독립적인 인터페이스이고 각 플랫폼 하부에서 실행됨.
5. UI 백엔드 - 콤보 박스와 창 같은 기본적인 장치를 그림. 플랫폼에서 명시하지 않은 일반적인 인터페이스로서, OS 사용자 인터페이스 체계를 사용.
6. 자바스크립트 해석기 - 자바스크립트 코드를 해석하고 실행.
7. 자료 저장소 - 이 부분은 자료를 저장하는 계층이다. 쿠키를 저장하는 것과 같이 모든 종류의 자원을 하드 디스크에 저장할 필요가 있다. HTML5 명세에는 브라우저가 지원하는 '[웹 데이터 베이스](http://www.html5rocks.com/en/features/storage)'가 정의되어 있다.

<br>

![helloworld-59361-1](https://user-images.githubusercontent.com/37354708/116414159-32af8080-a873-11eb-95a7-363182d8bf72.png)

<br>
<br>

## 브라우저의 흐름

1. 사용자 인터페이스에서 유저가 URI를 입력하여 브라우저 엔진에 전달한다.
2. 브라우저 엔진에서 URI에 대해 쿠키로 저장한 자료가 있으면 자료 저장소에서 가져온다.
3. 렌더링 엔진은 브라우저 엔진에서 가져온 쿠키 값과 URI 데이터를 통신, 자바스크립트 해석기, UI 백엔드 로 전파한다.
4. 통신 레이어에 URI에 대해 데이터를 요청하고 응답할 때까지 기다린다.
5. 요청받은 데이터에서 JavaScript는 JavaScript 해석기에서 분석하여 렌더링 엔진에서 HTML CSS와 함께 분석한다.
6. 브라우저 렌더링 화면에 띄워준다.

<br>
<br>

## 렌더링 엔진

렌더링 엔진의 역할은 요청 받은 내용을 브라우저 화면에 표시하는 일이다.

렌더링 엔진은 HTML 및 XML 문서와 이미지를 표시할 수 있다. 물론 플러그인이나 브라우저 확장 기능을 이용해 PDF와 같은 다른 유형도 표시할 수 있다. 그러나 이 장에서는 HTML과 이미지를 CSS로 표시하는 주된 사용 패턴에 초점을 맞출 것이다.

## 브라우저에서 url 을 입력하게 되면?

![image (2)](https://user-images.githubusercontent.com/37354708/116414276-4955d780-a873-11eb-9af3-f78ae27cc498.png)

1.  request:
    브라우저가 html 파일을 request
2.  loading :
    로더(loader)가 서버로부터 html파일을 받아서 리소스 스트림을 읽는 과정. 읽으면서 어떤 파일인지, 파일을 다운로드 할 것인지 등을 결정한다.
3.  scripting/ parsing :
    html을 한줄한줄씩 scripting하여 DOM/CSSOM요소로 변환, 웹 엔진이 가지고 있는 HTML/XML 파서가 문서를 파싱해서 DOM TREE 를 만든다.
4.  rendering :
    브라우저 window에 표기하기 위해 준비

        DOM Tree는 내용을 저장하는 트리로 자바스크립트에서 접근하는 DOM객체를 쓸 때 이용하는 것이고 별도로 그리기 위한 트리가 만들어져야 하는데 그것이 렌더링 트리다. (그릴 때 필요없는 head, title, body태그등이 없음 + display:none 처럼 DOM에는 있지만 화면에서는 걸러내야할 것들을 걸러냄)

5.  layout :
    rendering tree(DOM, CSSDOM)를 만들어 각각의 요소들이 어떤 위치에 얼마나 크게 표기될건지 계산, window 위에서 요소별로 배치, 크기 조정 등 레리아웃을 구상한다.
6.  painting:
    렌더링 트리를 탐색하면서 그리기. layout에서 계산한 요소들을 바로 브라우저에 그리는 것이 아니다. - 해당 요소를 어떻게 배치했느냐에 따라 각각 부분을 조금 조금씩 잘게 나누어서 이미지를 준비해 놓음 - 각각의 요소들은 컴퓨터가 이해할 수 있는 이미지인 비트맵 데이터 형태로 변환하게 됨 - 요소별로 따로따로 나누어 계산이 됨

<br>
<br>

## 이 과정을 파트로 나눠보면

![image (1)](https://user-images.githubusercontent.com/37354708/116414375-6094c500-a873-11eb-993b-9a663eaea080.png)

- contruction: html을 브라우저가 알아들을 수 있도록 브라우저만의 언어로 바꿈
- operation: 만들어진 브라우저가 이해할 수 있는 rendering tree를 이용해 구조 작성, 어디다 배치 등을 계산한 다음 실제 브라우저 window에 그림을 그림

<br>
<br>

출처)

[https://d2.naver.com/helloworld/59361](https://d2.naver.com/helloworld/59361)

[https://velog.io/@diddnjs02/JS브라우저101성능-보장-렌더링-순서](https://velog.io/@diddnjs02/JS%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80101%EC%84%B1%EB%8A%A5-%EB%B3%B4%EC%9E%A5-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%88%9C%EC%84%9C)

[https://jeong-pro.tistory.com/90](https://jeong-pro.tistory.com/90)
