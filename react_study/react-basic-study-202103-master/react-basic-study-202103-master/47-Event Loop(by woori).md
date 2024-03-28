# Event Loop

Event Loop에 대해 설명하기에 앞서 우리는 자바스크립트가 어떻게 동작하는지 살펴볼 필요가 있습니다.   

## 자바스크립트 엔진
자바스크립트는 구글의 V8 엔진으로 돌아갑니다. 자바스크립트 엔진은 크게 두 가지의 구성 요소로 이루어져 있습니다.   

<img width="312" alt="99747F465C3214AF30" src="https://user-images.githubusercontent.com/53216594/115993409-9df81900-a60d-11eb-92ba-aadfd848ea2a.png">

- Memory Heap: 메모리를 관리한다. 변수와 객체의 메모리 할당이 이루어진다.
- Call Stack: 코드 실행을 관리한다. 코드가 실행될 때 호출 스택이 쌓인다. 

자바스크립트의 call stack 에 대해서는 많이들 들어보셨을 거라고 생각합니다.   
자바스크립트의 코드를 시행할 때 Execution Context를 만들게 되고 이것이 call stack에 쌓이는 형식으로 자바스크립트의 코드가 시행됩니다.   
call stack의 맨 위에 쌓인 코드가 먼저 시행되는, 후입선출의 구조를 가졌습니다.

<br>

call stack의 안에서 코드를 한번에 한줄씩만 시행하게 될 것이고, execution context가 생성되면서 어떻게 시행될지 순서가 정해지게 됩니다.   
이러한 특징 때문에 자바스크립트는 synchronous, single-threaded language 라고 표현됩니다.

<br>

그렇다면 우리가 서버에서 한 요청의 결과를 기다리거나, 타이머를 설정해야할 때는 call stack에서 어떻게 동작하는 걸까요?   

분명히 위에서 call stack은 동기적으로, 한번에 한줄씩 코드를 시행한다고 했습니다. call stack 및 자바스크립트 엔진에는 타이머 기능이 없습니다.   
그런데 우리는 setTimeout을 이용해서 타이머를 사용할 수 있습니다.   
마치 자바스크립트가 코드를 시행하면서 다른 한쪽에서 타이머까지 관리하는, 동시에 여러가지 일을 수행할 수 있는 multi-threaded 처럼 보이기도 합니다.   
하지만 앞서 말했듯이 자바스크립트는 single-threaded language입니다. 어떻게 이러한 기능을 자바스크립트에서 사용할 수 있는 것일까요?

<br>

JS engine에 있는 call stack에는 이러한 기능이 없으므로, JS engine 외부로 눈을 돌려봅시다.   
JS engine은 어디에 존재하고 있는 것일까요?

<img width="755" alt="스크린샷 2021-04-26 오후 4 28 26" src="https://user-images.githubusercontent.com/53216594/116044949-7d32d080-a6ac-11eb-8f32-9aed24baeb1b.png">

위의 그림에서 보이듯이, JS Engine은 바로 브라우저 안에 있습니다.   

그리고 이 브라우저는 JS Engine을 돌리는 것 뿐만이 아니라 훨씬 더 많은 기능을 가지고 있습니다.   
LocalStorage를 사용하는 것, 타이머를 사용하는 것, http://www.... 같은 도메인 주소로 서버에다가 요청을 하는 것 등등...  
이 모든 기능은 바로 브라우저의 기능입니다.

<br>

우리가 자바스크립트에서 setTimeout 같은 타이머 기능을 쓸 수 있는 것은, 자바스크립트의 기능을 쓰는 게 아니라   
브라우저의 기능들을 가져와서 쓰게 되는 것입니다. 그렇다면 자바스크립트에서 어떻게 브라우저의 기능에 접근할 수 있는 것일까요?     

<br>

### Web Api

The window object는 브라우저에서 열린 하나의 윈도우(창)라고 볼 수 있습니다.   
윈도우 객체는 브라우저의 요소들과 자바스크립트 엔진 등을 담고 있는 자바스크립트의 최상위 객체입니다.   

윈도우 객체는 BOM(Browser Object Model), Javascript 표준 내장 객체 정보를 담고 있습니다.   
BOM은 objects는 navigator, history, screen, location 그리고 document 등으로 구성되어 있습니다.   
이러한 속성들을 이용해서 브라우저의 정보에 접근할 수 있고 메소드를 사용해서 다양한 기능을 이용할 수도 있습니다.   

이 중 document node가 바로 페이지의 content 정보를 가지고 있는 DOM (Document Object Model)입니다.   
DOM 객체들로부터 제공되는 getElementById()나 querySelector()를 DOM API라고 합니다.   
우리는 DOM API를 사용함으로써 자바스크립트로 페이지 요소들을 조작할 수 있습니다.   

Web Api는 웹 브라우저가 제공하는 기능을 의미하므로 위에서 언급한 BOM을 Web Api라고 말하기도 합니다.   
우리는 바로 Web Api를 사용해서 브라우저의 기능을 사용할 수 있는 것입니다. 

(참고: https://www.w3schools.com/js/js_timing.asp)

```javascript
setTimeout   
fetch   
localStorage   
console   
location   
...
```
<br>

우리들이 정말 많이 사용하는 console.log, setTimeout, fetch…  이들은 웹 브라우저가 기능을 지원해주는 web api 라는 것을 알게되었습니다.   
우리는 이것을 window 객체(인터페이스)를 사용함으로서 해당 기능에 접근해서 사용할 수 있었던 것입니다.   

```javascript
window.setTimeout   
window.localStorage   
window.console
```
우리가 이것을 window. 을 붙이지 않고 사용할 수 있었던 이유는 window가 최상위에 있는 전역 객체(global object)이기 때문입니다.   
scope chain을 타고 올라가 전역 객체의 setTimeout을 찾게 되어 사용할 수 있게 된 것입니다.   

실제로 ECMAScript에서도 JavaScript에서 Web API까지 정의하고 있지 않다고 합니다.   
즉 Web API는 웹 브라우저가 제공하는 기능일 뿐, Vanilla JavaScript에는 포함되지 않습니다.   

<br>

## Event Loop

앞서 자바스크립트 엔진을 비롯한 브라우저와 web api에 대해서 알아봤으니 좀더 수월하게 event loop에 대해 알아갈 수 있을거라고 생각합니다.   

```javscript
console.log('start');

setTimeout(function callback() {
  console.log('callback');
}, 5000);

console.log('end');
```
위의 코드가 어떻게 call stack에 담기고 실행되는지 살펴보겠습니다.   

먼저 stack에 global Execution Context가 쌓입니다.   
그리고 나서 첫번째 줄을 지나면서 'start'를 콘솔창에 찍게됩니다.   

그 다음 setTimeout을 만나게 됩니다.   
setTimeout은 브라우저의 timing 기능을 시행하게 됩니다. setTimeout에 있는 timer는 web api에서 시행됩니다.   

timer는 web api에 있는 채로 call stack에서는 다음 코드를 시행하게 됩니다.   
이어 콘솔창에 'End'를 찍게 됩니다.   

Web Api에 있던 timer는 5초가 지나면 callback queue에 callback function을 전달합니다.   

앞서 모든 자바스크립트의 코드는 call stack에서 시행된다고 했습니다.   
그렇다면 현재 callback queue에 있는 callback function을 stack으로 전달해주어야 하겠죠?

여기서 Event Loop가 필요한 것입니다.   
Event Loop는 계속해서 call stack 과 callback queue를 주시하고 있습니다.   
그러다가 언젠가 스크립트에 있는 모든 코드가 시행이 되고 call stack은 비게 될 것입니다.   

Event loop는 call stack이 비워진 순간에 바로 callback queue에서 대기 중이던 callback 함수를 stack에다가 전달합니다.   
그렇게 call stack에 들어간 함수는 시행이 되고 나면 또 call stack이 비게 될 것입니다.   
callback queue에 다음에 또 대기 중인 함수가 있었다면 차례로 그 함수를 call stack에 전달할 것입니다.   

setTimeout이 어떻게 동작하는지 알았으니 하나만 더 짚고 넘어가겠습니다.   
setTimeout에 넘겨주는 miliseconds인자는 실제로 delay되는 시간이 아니라, `최소대기시간`이라는 것입니다.   
5초 뒤에 callback함수를 시행하라고 코드를 작성했는데, 만약 5초가 지났는데도 call stack이 비어있지 않다면 어떻게될까요?   
5초가 지났어도 call stack이 빌 때까지 callback함수는 queue에서 대기할 수 밖에 없습니다.   
따라서 setTimeout에 우리가 넘겨준 miliseconds 이후에 함수가 실행될 것이라는 보장은 없으며, 이 숫자는 최소대기시간이 됩니다.

<br>

![ek7ji4zrimozpp2yzk0a](https://user-images.githubusercontent.com/53216594/115998355-d0137600-a621-11eb-8b5d-a5df89ee3a18.png)
(이미지 출처: https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

참고: http://latentflip.com/loupe/

## Task Queue vs Microtask Queue vs Animation Frames

지금까지 혹시 왜 callback queue가 필요한 것일까 생각해본적이 있으신가요?   
왜 web api에서 바로 callbakc function을 call stack으로 넣으면 안되는 것일까요?

<br>

지금까지 우리가 살펴본 예제는 굉장히 단순하지만 실제 웹 어플리케이션은 다양한 버튼 이벤트, 타이머 등의 엄청나게 많은 비동기 작업이 시행될 수 있습니다.   
웹페이지에서 우리가 click 버튼을 빠른 속도로 연속으로 여러번 눌렀다고 생각해봅시다.   
그러면 queue에 callbcak function이 click버튼을 누른 수 만큼 쌓일 것입니다.    
이때 queue에 있는 callbcak function이 시행되기도 전에 서버에서 fetch를 하는 등의 또다른 비동기 작업이 일어날 수 있습니다.   
이 많은 비동기 작업들에 우선 순위를 매겨서 순서대로 잘 처리해내기 위해서 queue가 필요한 것입니다.   

<br>

#### Microtask Queue

먼저 ES6문법이 생기면서 도입된 Microtask Queue부터 알아보겠습니다.   

 ```javascript
 console.log("start");

setTimeout(function () {
  console.log("timer");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("end");
```

위의 코드를 시행한다면 어떤 결과가 나오게 될까요?   

지금까지 살펴봤던 내용을 토대로 생각한다면, 먼저 start, end가 콘솔창에 찍히고   
그 다음으로 비동기 작업인 timer, promise1, promise2가 차례대로 찍힐 것입니다.   

하지만 실제로는 promise1, promise2가 timer보다 먼저 찍힙니다.   
이유는 promise에 들어온 callback function이 microtask queue에 들어가기 때문입니다.   

*microtask queue는 일반 task보다 높은 우선순위를 가지고 있습니다.*
따라서 event loop가 queue를 보면서 어떤 task를 시행할지 결정하는데 비록 setTimeout이 먼저 queue에 들어갔을지라도
microtask queue에도 대기중인 callback이 있다면 이를 먼저 시행하게 되는 것입니다.   

microtask queue에는 다음과 같은 것들이 들어가게 됩니다.   
- Promise callback
- mutation observer(DOM 변경 감시를 할 수 있는 기능)

#### Animation Frames

Microtask queue외에도 requestAnimationFrame에 의해 등록되는 Animation Frames이 있습니다.   

화면에 몇 초마다 무언가 움직이게 하고 싶다면 setInterval을 사용할 수도 있지만, 앞서 setTimeout 설명에서 이야기 했듯이   
우리가 넘겨주는 숫자는 최소대기시간이 됩니다. 그래서 사실 여기에 완전히 의지할 수 없습니다.   

이러한 상황을 해결하기 위해서 나온 것이 requestAnimationFrame이라고 합니다.   
requestAnimationFrame에 넘겨준 callback 함수는 브라우저를 repaint(렌더링)하기 전에 시행된다고 합니다.   

```javascript
window.requestAnimationFrame(callback);
```

브라우저는 60fps(초당 60회)로 화면을 렌더링합니다. 즉 16ms안에 1번 화면을 그리게 되는 것인데 
이 렌더링을 최적화하기 위해 requestAnimationFrame API를 사용할 수 있습니다.   

requestAnimationFrame에 넘겨주는 callback 함수는 Animation Frames에 들어가게 됩니다.   

<img width="930" alt="스크린샷 2021-04-26 오후 6 34 05" src="https://user-images.githubusercontent.com/53216594/116061628-0dc5dc80-a6be-11eb-8fe5-0cf5d384eff5.png">

```javascript
console.log("start");

setTimeout(function () {
  console.log("timer");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

requestAnimationFrame(function() {
    console.log("requestAnimationFrame");
})

console.log("end");
```
requestAnimationFrame을 추가해주었습니다. 코드를 시행하면 먼저 start, end가 콘솔창에 찍히고   
그 다음으로 promise1, promise2, requestAnimationFrame, setTimeout가 차례대로 찍히게 됩니다(크롬 기준).   

