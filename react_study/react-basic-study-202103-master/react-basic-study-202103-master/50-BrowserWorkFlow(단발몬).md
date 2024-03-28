참고한 컨텐츠들

https://velopert.com/3236

https://www.youtube.com/watch?v=wKwMRH0PkMg

https://www.youtube.com/watch?v=muc2ZF0QIO4&t=0s

https://davidhwang.netlify.app/Developments/browser-rendering-process/

https://jess2.xyz/web/browser-rendering/

https://www.youtube.com/watch?v=iZ9csAfU5Os

https://www.youtube.com/watch?v=tJieVCgGzhs

https://ko.javascript.info/script-async-defer

완벽하게 이해한 내용들이 아니어서

관련된 콘텐츠들을 다소 병렬적으로 이어 보았습니다.

혹시 알고 있는 내용이 있으시다면 지식을 더해주시면 감사하겠읍니다...





# 1. Browser의 Work Flow 💙

### 1.1. 브라우저의 렌더링 과정

![renderingengine](https://davidhwang.netlify.app/static/58dd63a5db0e6951536d1f080d54a9a0/b9e4f/renderingengine.png)

1. DOM tree 구축을 위한 **HTML parsing, CSS, Javascript parsing**  
	HTML 문서를 파싱한 후, content tree 내부에서 tag(a, div)를 DOM node 로 변환한다. 그 다음 CSS 파일과 함꼐 모든 스타일 요소를 파싱한다. 스타일 요소와 HTML 표시 규칙, Javascript 의 파싱 결과물은 render tree 를 생성한다

![browser4](https://jess2.xyz/static/0c389301ba794f3ca7b491572d73971d/13e20/browser4.png)

2. **render tree 구축**
HTML 과 CSS 를 파싱해서 만들어진 render tree 는 색상 또는 면적 등 시각적 속성을 갖는 사각형을 포함한다. 정해진 순서대로 렌더링한다

3. render tree 배치  (**layout**)  

   render tree 가 생성이 끝나면, 배치가 시작된다. 뷰포트(Viewport) 안에서 각 node들의 정확한 위치와 크기가 계산된다. %, vh, vw와 같이 상대적인 위치, 크기 속성은 pixel 단위로 변환된다.

4. render tree 그리기 (**paint**)
	3번(Layout) 단계에서 수행했던 계산에 기반하여 엘리먼트들을 실제 화면에 그린다. 처리해야 할 스타일이 복잡할수록 Paint단계에 소요되는 시간은 늘어난다. 예를 들면 단색보다 그라데이션이나 그림자 효과가 Paint 소요시간을 많이 요구한다.
	
	
	
	
	
### 1.2. 그리고 +α
	
5. **Reflow** (Layout 재수행)

   위의 언급된 과정(1~4번 과정)이 모두 수행되었다고 렌더링이 끝난 것은 아니다. 브라우저 안에는 수많은 action과 event가 발생하기 때문이다. 어떠한 action 혹은 event가 html 엘리먼트의 크기나 위치 등 레이아웃 수치를 수정하면 그에 영향을 받는 자식 노드 혹은 부모 노드들을 포함하여 Layout과정을 다시 수행한다.

6. **Repaint** (Paint 재수행)

   Layout(혹은 Reflow)는 엘리먼트의 위치와 크기를 계산하는 과정이다. 화면에 반영되기 위해서는 paint가 다시 수행되어야 한다.

   물론 layout에 영향을 주지 않는 스타일 속성의 변경(예를 들어 color, background-color, visibility 등)은 Reflow 없이 Repaint만 수행된다.



# 2. virtual DOM 💛

 ###  2.1. virtual DOM을 통한 DOM조작의 그루핑

기존 Browser Work Flow의 문제, 특히 SPA에서 많이 발생하는 문제는 

각각의 DOM 조작이 각각의 레이아웃 변화, 트리변화, 렌더링을 발생시킨다는 것이다.

<u>30개의 엘리먼트를 하나 하나 수정하면, 30번의 레이아웃 재계산과 30번의 리렌더링이 발생한다는 것이다.</u>

virtual DOM은 DOM의 변화를 먼저 가상 DOM트리에 먼저 적용시킨다. 가상 DOM은 렌더링이 되지 않아 연산비용이 적다. 연산이 끝나면 최종적인 변화만 실제 DOM에 던져주는 것이다. **딱 한 번만, 모든 변화를 하나로 묶는 것**이다.

30개의 사소한 DOM조작으로 30개의 리플로우, 리페인팅을 만드는 것이 아니라 virtual DOM에 먼저 DOM 변화를 적용하고, 최종적인 형태만을 실제로 DOM에 전달해 리플로우와 리렌더링은 한 번으로 줄이는 것이다.



> 사실 이러한 과정은 virtual DOM이 없어도 이루어질 수 있다. 
>
> *document.createDocumentFragment() 같은 DOM 조작과 관련된 메서드만으로도 충분히 구현할 수 있다고 한다.*





### 2.2. virtual DOM에 대한 오해(혹은 리액트에 대한 오해)

![img](https://velopert.com/wp-content/uploads/2017/03/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA-2017-03-25-%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB-12.45.56.png)

Dan Abramov의 코멘트를 가져왔다. 부족한 영어로 대충 이해한 바로는 virtual DOM기반의 리액트는 (제대로 최적화 작업이 수행된, 일반 DOM 기반의) 바닐라 JS에 비해 더 빠른 것은 아니라는 이야기 같다.

그저 불편하지 않을 정도로 빠를 뿐이다. 리액트는 개발과 유지보수가 편해서 쓰는 것이지 바닐라JS보다 빨라서 쓰는 것이 아니라는 이야기를 하고 싶은 것 같다.



# 3. CSR, SSR 🧡



### 3.1. Client Side Rendering

![ 유](https://user-images.githubusercontent.com/75282888/116494586-0da32800-a8dc-11eb-989e-8af19c9c9aec.png)

*출처: 드림코딩 엘리 유툽*



1. HTML의 바디가 텅 비어있다.
2. 서버로 부터 전달 받는 JS파일(app.js)을 통해 웹에 필요한 엘리먼트를 렌더링함 
3. SEO(Serach Engine Optimization)이 나쁘다는 단점이 있다.



### 3.2. Server Side Rendering

![image](https://user-images.githubusercontent.com/75282888/116495744-81463480-a8de-11eb-8953-cb42a5379da3.png)

1. 기본적으로 Static 사이트에 영감을 받음,

2. 서버에서 렌더링이 완료된, 즉 **완성된 페이지**를 전달받는 것에 가까움. SEO가 좋음
3. 다만 static페이지와의 차이점이 있다면, 어느 정도 페이지를 동적으로 조정할 수 있는 Js로직을 함께 전달받음.
4. 페이지 간의 이동에 따른(index.html에서 profile.html으로 이동한다거나 하는) Blinking Issue가 발생하고, 이로 인해 이러한 페이지 간의 이동은 상대적으로 CSR에 비해 인터랙티브함이 떨어짐 못함.



### 3.3. TTV(Time To View) TTI(Time To Interact)

 ![image](https://user-images.githubusercontent.com/75282888/116496080-2cef8480-a8df-11eb-9038-f90cdc9a188f.png)

CSR에서는 app.js파일이 브라우저로 전달되었을 때가 바로 TTV이자 TTI이다.

결국 페이지의 View를 담당하는 것도, Interact를 담당하는 것도 app.js 파일이기 때문이다.

![image](https://user-images.githubusercontent.com/75282888/116496222-85bf1d00-a8df-11eb-8463-61169ed6790b.png)

SSR에서는 index.html파일에 이미 완성된 페이지가 담겨져 있다.

index.html이 브라우저로 전달되었을 때가 TTV가 되고,

동적인 로직이 담긴 app.js가 전달되었을 떄 TTI가 된다.





# 4. Async / Defer 속성 💔 

### 4.1. \<head>에 \<script>를 넣을 경우 발생하는 문제점

![image](https://user-images.githubusercontent.com/75282888/116502887-b27b3080-a8ef-11eb-97ae-7f39162f8322.png)

\<head> 혹은 \<body> 상단부에 외부 JS파일을 불러오면

**JS파일을 fetching하는 시간 동안 HTML파싱이 중단된다.**

특히 DOM 조작을 수행하는 JS파일의 경우,

DOM아 완성되지도 않았는데 JS파일이 로딩되어 오류를 발생시킬 수 있다.

따라서 head나 body 상단부에 script태그를 넣는 것은 피하는 것이 좋다.





### 4.2. \<body>태그 최하단부에 \<script>를 넣는다면?

![image](https://user-images.githubusercontent.com/75282888/116502910-c0c94c80-a8ef-11eb-99df-6bbe2d1d9017.png)

물론 \<script>를 \<body> 최하단에 넣는 것을 생각해볼 수도 있다.

DOM이 다 완성된 후에 js가 executing 되는 것이니 에러는 피할 수 있다.





### 4.3. defer속성을 활용하자

![image](https://user-images.githubusercontent.com/75282888/116503171-61b80780-a8f0-11eb-8d2e-c0056f4a3270.png)

더 좋은 방법은 \<script>에 **defer=true** 속성을 넣어주는 것이다.

defer속성이 들어가면 HTML 파싱과 별개로 **백그라운드(Web API)에서 js파일이 fetch**된다.

**즉 fetch 도중에 HTML 파싱이 중단되지 않는다.**

그리고 HTML파싱이 종료된 후에  \<script>태그가 선언된 순서대로 js파일이 실행된다.



### 4.4. async 속성을 활용한다면

![image](https://user-images.githubusercontent.com/75282888/116503128-48af5680-a8f0-11eb-8f17-2f1d067c239d.png)

**async**를 사용할 경우, 백그라운드에서 fetching이 진행되는 것까지는 동일하다.

단, script가 선언된 순서와 무관하게 **먼저 fetching이 완료된 순서대로 js파일이 실행**되며, 

js파일이 실행되는 동안에는 **HTML의 parsing이 중단된다.**

