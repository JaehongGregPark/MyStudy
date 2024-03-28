# Browser Randering Process

<br>

- **👀 브라우저의 렌더링 과정 한눈에 보기!**

  ![렌더링과정](https://user-images.githubusercontent.com/75834421/116364538-3fb27c80-a83f-11eb-8b7e-fe1f66f22d67.jpg)

1. 렌더링에 필요한 리소스(HTML, CSS)를 `요청`하고 서버로부터 `응답`을 받습니다.

2. 브라우저의 렌더링 엔진은 서버가 응답으로 보내준 HTML, CSS를 파싱하여 **`DOM과 CSSOM`** 생성하고 이들을 결합하여 **`렌더 트리`** 를 생성합니다.

3. 브라우저의 자바스크립트 엔진은 서버가 응답으로 보내준 자바스크립트를 파싱하여 `AST(Abstract Syntax Tree)`를 생성하고 바이트 코드로 변환하여 실행합니다.

4. 렌더 트리를 기반으로 HTML요소의 **`레이아웃(위치와 크기)`** 을 계산하고 브라우저 화면에 HTML요소를 페인팅합니다.

<br>

## 🤔 Request and Response

<br>

- 브라우저의 핵심 기능은 HTML, CSS, 자바스크립트, 이미지, 폰트 같은 정적 파일이나 서버가 동적으로 생성하는 데이터같은 리소스를 요청하고 그에 대한 응답을 서버로 부터 받아서 화면에 그려주는 것(렌더링) 입니다!!

- 서버에 요청을 전송하는 방법은 브라우저가 제공해주는 주소창에 URL을 입력하면 됩니다!

  ![URL](https://user-images.githubusercontent.com/75834421/116366409-3c1ff500-a841-11eb-8d86-d76576af1da5.jpg)

  > 우리가 만든 사이트를 정식으로 배포할 때 Domain을 사서 그 사이트에 대한 리소스가 있는 서버의 IP주소를 구입한 Domain과 연결해 줍니다. 그러면 주소창에 호스트이름만 입력해도 DNS(Domain Name System)을 통해서 우리의 사이트를 화면에 띄워줍니다!!

  예를 들어, 주소창에 그림과 같이 말고 https://poiemaweb.com 만 입력하면 루트 요청(스킴과 호스트 만으로 구성된 URI)이 poiemaweb.com 서버로 전송됩니다. 일반적으로 서버는 루트 요청에 대해 암묵적으로 index.html을 응답하도록 기본 설정이 되어 있습니다!

<br>

## 🤔 HTML 파싱과 DOM 생성

<br>

HTML 문서는 문자열로 이루어진 순수한 텍스트 입니다. 이 문서를 브라우저에서 시각적인 픽셀로 렌더링 하려면 HTML문서를 브라우저가 이해할 수 있는 자료구조(Objecrt-객체)로 변환하여 메모리에 저장해야 합니다.

<br>

서버에서 응답으로 보내준 HTML이 다음과 같다고 가정해 보겠습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Vanila Js</title>
    <link rel="stylesheet" href="index.css" />
  <body>
    <ul>
      <li id='apple'>Apple</li>
      <li id='banana'>Banana</li>
      <li id='orange'>Orange</li>
    </ul>
    <script src+"app.js"></script>
  </body>
</html>
```

<br>

브라우저의 **`렌더링 엔진`** 은 그림과 같은 과정을 통해 응답받은 HTML문서를 파싱하여 브라우저가 이해 할 수 있는 자료구조인 DOM(Domcument Object Model)을 생성합니다.

> 😮 여기서 **파싱(Parsing)** 이란?
>
> 구문 분석이라고도 하는 데, 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 텍스트 문서의 문자를 토큰(문법적인 의미를 가지고, 문법적으로 더는 나눌 수 없는 코드의 기본 요소)으로 분해(어휘 분석)하고 토큰의 문법적인 의미와 구조를 반영하여 트리 구조의 자료구조인 파스트리(parse tree/syntax tree)를 생성하는 일련의 과정을 말합니다

![HTML파싱](https://user-images.githubusercontent.com/75834421/116369748-adad7280-a844-11eb-9106-726d2c9a840a.jpg)

1. 서버는 브라우저가 요청한 HTML파일을 읽어서 메모리에 저장한 다음 **`메모리에 저장된 바이트(2진수)`** 를 인터넷에 경유하여 응답합니다.

2. 브라우저는 서버가 바이트 형태로 보내준 HTML을 받습니다. 그리고 그 HTML문서는 meta 태그의 charset어트리뷰트에 의해 지정된 인코딩 방식(ex:UTF-8)을 기준으로 문자열로 변환됩니다.

3. 문자열로 변환된 HTML문서를 읽어 들어 문법적 의미를 갖는 최소 단위인 **`토큰(token)`** 들로 분해합니다.

4. 각 토큰을 객체로 변환하여 **`노드(node)`**들을 생성합니다. 이 노드들은 이후에 DOM을 구성하는 기본요소가 됩니다!

5. HTML 요소들은 중첩관계를 갖습니다! => 태그 사이에 또 다른 태그가 들어갈 수 있는 것 처럼 부자 관계가 형성됩니다. 이를 반영 하여 모든 노드들을 **`트리 자료구조`** 로 구성합니다. 이를 **`DOM`** 이라 합니다!

=> 즉, **DOM은 HTML 문서를 파싱한 결과물** 이라고 할 수 있습니다!

<br>

## 🤔 CSS 파싱과 CSSOM 생성

<br>

렌더링 엔진은 위에서 설명한 것 처럼 처음부터 한 줄씩 순차적(직렬적)으로 파싱해서 DOM을 생성해 나갑니다. 이 과정에서 **CSS를 로드하는 `<link />`태그나 `<style>`태그 내의 CSS를 DOM을 생성할 때와 동일한 과정으로 CSSOM(CSS Object Model)을 생성합니다.** 이후 파싱을 완료하면 중단된 시점부터 다시 HTML을 파싱하기 시작하여 DOM생성을 재개합니다.

<br>

다음과 같은 CSS 파일을 서버가 응답으로 보내주었을 때

```css
body {
  font-size: 18px;
}

ul {
  list-style-type: none;
}
```

아래의 그림과 같이 CSSOM이 생성됩니다.

![CSSOM](https://user-images.githubusercontent.com/75834421/116373186-15b18800-a848-11eb-9085-ec9f95ff6124.jpg)

body요소에 적용한 font-size프로퍼티와 ul 요소에 적용한 list-style-type 프로퍼티는 모든 li 요소에 상속됩니다. CSSOM은 이처럼 CSS상속을 반영하여 생성됩니다.

<br>

## 🤔 Render Tree

생성된 DOM과 CSSOM은 렌더링을 위해 **`렌더 트리`** 로 결합됩니다!

- 렌더 트리는 브라우저 화면에 렌더링 되지 않는 노드(meta 태그)와 CSS에 의해 비표시(dispaly: none) 되는 노드들은 포함되지 않습니다. 즉, 진짜로 브라우저 화면에 보일 노드들만으로 구성됩니다!!

  ![rendertree](https://user-images.githubusercontent.com/75834421/116374348-2adae680-a849-11eb-8b2a-a32a4a938cc6.jpg)

<br>

- 이렇게 완성된 렌더 트리는 각 HTML요소의 레이아웃(위치, 크기)을 계산하는 데 사용되며, 브라우저 화면에 픽셀을 렌더링 하는 페인팅 처리에 입력됩니다.

  ![layoutandpainting](https://user-images.githubusercontent.com/75834421/116374731-886f3300-a849-11eb-9a65-b3b26899ddd3.jpg)

<br>

- `자바스크립트에 의한 노드 추가 또는 삭제`, `브라우저 창의 리사이징에 의한 뷰포트 변경`, `레이아웃에 변경을 발생시키는 스타일 변경(ex: width/height, margin, padding 등등)` 같은 경우 반복해서 레이 아웃 계산과 페인팅이 재사 실행됩니다. => ❗❗ 레이아웃 계산과 페인팅을 다시 실행하는 리렌더링은 성능에 그렇게 좋지 않음므로 주의해야 합니다!!

<br>

## 🤔 Javascript파싱과 실행

<br>

DOM은 HTML 문서의 구조와 정보 뿐만 아니라 요소와 스타일을 변경할 수 있는 프로그래밍 인터페이스로서 **DOM API**를 제공합니다!! 자바스크립트 코드에서 이를 이용하면 이미 생성된 DOM을 **동적**으로 조작할 수 있습니다!!

<br>

⭐ 렌더링 엔진은 HTML을 한 줄씩 순차적으로 파싱하면서 DOM을 생성해 나가다가 **`자바스크립트 파일을 로드하는 script태그나 자바스크립트 코드를 콘텐츠로 담은 script태그를 만나면 DOM생성을 일시 중단합니다!!`** ⭐

<br>

그 후 내부의 자바스크립트 코드를 파싱하기 위해 `자바스크립트 엔진에 제어권을 넘깁니다`. 이후 자바스크립트의 파싱과 실행이 종료되면 렌더링 엔진으로 다시 제어권을 넘겨서 `HTML파싱이 중단된 부분부터 다시 시작하여 DOM생성을 재개` 합니다 .

- 자바스크립트 엔진은 자바스크립트를 해석하여 **AST(Abstract Syntax Tree-추상적 구문 트리)를 생성**합니다. 그리고 이를 기반으로 인터프리터가 실행 할 수 있는 중간 코드인 바이트 코드를 생성하여 실행합니다.

  ![자바스크립트엔진](https://user-images.githubusercontent.com/75834421/116377425-219f4900-a84c-11eb-9c84-1e114d0d3704.jpg)

<br>

## 🤔 Reflow and Repaint

<br>

자바스크립트 코드에 DOM이나 CSSOM을 변경하는 DOM API를 사용하는 경우 DOM이나 CSSOM이 변경될 수 있습니다! 이때 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저의 화면에 `다시 렌더링` 합니다.

 <br>

![reflowrepaint](https://user-images.githubusercontent.com/75834421/116404522-ac427100-a869-11eb-948d-0cf1bf7543ca.jpg)

- 리플로우(reflow) : 레이아웃 계산을 다시 하는 것 => 레이아웃에 영향을 주는 변경이 발생한 경우에 한하여 실행됩니다(ex: 노드추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징)

- 리페인트(repaint) : 재결합된 렌더 트리를 기반으로 다시 페인트 하는 것을 말합니다.

=> 이 두가지가 반드시 순차적으로 진행되진 않아요. **레이아웃에 영향이 없는 변경은 리플로우 없이 리페인트만 실행될수 있습니다!**

<br>

## 🤔 자바스크립트 파싱에 의한 HTML 파싱 중단

 <br>

![parsingstop](https://user-images.githubusercontent.com/75834421/116405475-a8631e80-a86a-11eb-8632-ec1cabe384bb.jpg)

위의 그림과 같이 브라우저는 동기적(직렬적)으로 세가지를 파싱하고 실행합니다. 이것은 script 태그의 위치에 따라 **`HTML 파싱이 블로킹(중지)되어 DOM생성이 지연될 수 있다는 걸 의미합니다!!`**

 <br>

또한 DOM 생성이 다 되지 않고 그 내용을 변경하는 DOM API를 사용할 경우 문제가 생길 수 있습니다!!

```html
<!DOCTYPE html>
<html>
 <head>
   <meta charset="utf-8">
   <title>Vanila Js</title>
   <link rel="stylesheet" href="index.css" />
   <script>
     const $apple = document.getElementById('apple');
     $apple.style.color = "red";
   </script>
 <body>
   <ul>
     <li id='apple'>Apple</li>
     <li id='banana'>Banana</li>
     <li id='orange'>Orange</li>
   </ul>
 </body>
</html>
```

![image](https://user-images.githubusercontent.com/75834421/116406569-c4b38b00-a86b-11eb-8457-fc97736fbcc0.png)

예시 처럼 `document.getElementById('apple');`을 실행하는 시점에는 아직 id가 'apple'인 HTML 요소를 파싱하지 않았기 때문에 DOM에는 id가 'apple'인 요소가 포함되어 있지 않은 상태이므로 이와 같은 오류가 발생합니다😂😂

<br>

이러한 문제를 피하기 위해 **`body요소의 가장 아래에 자바스크립트를 위치시키는 것`** 은 좋은 방법이라고 합니다! 이유는

- 위의 예시 처럼, DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하면 에러가 발생할 수 있어요!

- 자바스크립트의 로딩/파싱/실행 으로 인해 HTML 요소들의 렌더링에 지장받는 일이 발생하지 않아 **페이지로딩 시간이 단축**됩니다!

<br>

### 😮 script 태그의 async/defer 어트리뷰트

<br>

자바스크립트 파싱에 의한 DOM생성 중단을 근본적으로 해결하기 위해 HTML5부터 script 태그에 async와 defer어트리뷰트가 추가되었습니다!!

<br>

이 두가지의 어트리뷰트는 src 어트리뷰트를 통해 외부 자바스크립트 파일을 로드하는 경우에만 사용할 수 있습니다.

```html
<script async src="extern.js"></script>
<script defer src="extern.js"></script>
```

두가지 모두, HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행됩니다!!

<br>

- **async** 어트리뷰트

  : 아래의 그림과 같이 로드는 동시에 진행되지만, `자바스크립트의 파싱과 실행은 자바스크립트 파일의 로드가 완료된 직후 진행되며`, 이때는 똑같이 **HTML파싱이 중단**됩니다!

  ![async](https://user-images.githubusercontent.com/75834421/116408926-502e1b80-a86e-11eb-9ca8-64bce38c6f34.jpg)

<br>

- **defer** 어트리뷰트

  : async와 비슷하게 로드는 동시에 진행되지만, `파싱과 실행은 HTML파싱이 완료된 직후(DOM생성이 완료된 직후) 진행이 됩니다!!` 그래서 DOM생성이 완료된 이후에 실행되어야 할 자바스크립트에 유용합니다. (\* IE10이상에서 지원 됨. IE6 ~ 9에서도 지원은 되지만 정상적으로 작동하지 않을 수도 있음..)

  ![defer](https://user-images.githubusercontent.com/75834421/116408937-53290c00-a86e-11eb-9891-8667324dec85.jpg)
