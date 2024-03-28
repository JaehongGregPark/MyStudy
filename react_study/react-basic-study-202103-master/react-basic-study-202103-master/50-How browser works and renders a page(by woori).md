# Critical Rendering Path

Critical Rendering Path란 브라우저가 HTML, CSS 그리고 Javascript를 스크린에 pixel로 변환하는 시퀀스입니다.   
전체적인 Flow를 먼저 설명한 다음, 각각의 단게에 대해 자세히 살펴보도록 하겠습니다.   

먼저 Critical Rendering Path의 전체적인 과정을 다음과 같이 표현할 수 있습니다.   

<img width="561" alt="스크린샷 2021-04-28 오후 8 53 06" src="https://user-images.githubusercontent.com/53216594/116399367-d133e580-a863-11eb-888a-6bc3d46773cf.png">

1. 먼저 서버애서 요청해서 받아온 HTML로 DOM을 만들기 시작합니다.   
2. CSS Object Model을 만듭니다.
3. DOM 과 CSSOM 을 합쳐서 Render Tree를 만듭니다.   
4. 각 요소들이 페이지의 어디로 가야하는지 파악합니다.
5. 스크린에 렌더링합니다.  

<br>

### 1. Converting HTML to the DOM (Building DOM)

우리가 주소창에다가 URL을 치고 Enter를 클릭하면 브라우저는 서버에 요청을 보냅니다.   
브라우저가 서버로부터 응답을 받으면 HTML데이터를 받게 될 것이고, 이 Markup을 Screen에 보이는 것들로 변환하는 작업이 필요합니다.   

따라서 브라우저가 HTML을 처리해서 DOM을 구축하게 됩니다.   
HTML specification은  데이터를 어떻게 처리해야하는지에 대한 몇 가지 규칙을 가지고 있습니다.

예로, <> 같은 tag를 만날 때마다 브라우저는 token을 발행합니다.   
<html>이 있다면 브라우저가 이것을 html token으로 만드는 것입니다.   

```javascript
<html><head><meta name=“viewport” content=“width=device-width”></head></html>
```

이렇게 시작하는 html이 있다고 가정해봅시다.   
브라우저는 <html>을 만나면 StartTag HTML token을 발행할 것입니다.   
다음으로 startTag head token을 발행하고, 그 다음으로는 Tag meta token을 발행할 것입니다.   
또 그 다음으로는 EndTag head token을, 마지막으로는 EndTad html token이 발행되겠죠?   
  
이렇게 Tokenizer를 통해서 위의 과정이 이루어집니다.   
Tokenizer가 위의 일을 하는 동안 다른 프로세스가 이루어지는데요, 바로 이 token을 가져다가 node object로 변환하는 것입니다.   
그리고 node들이 모여서 node간의 계층 관계가 담긴 DOM tree가 만들어집니다.   

<img width="917" alt="스크린샷 2021-04-28 오후 9 51 26" src="https://user-images.githubusercontent.com/53216594/116406743-f0cf0c00-a86b-11eb-83d2-0ca71513d384.png">
(이미지 출처: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model#document-object-model-dom)

만들어진 DOM은 그들의 properties 정보를 전부 가지고 있습니다.   
예를 들어 `<img src="......jpg">` 란 tag는 source attribute를 가지고 있습니다.   
이 tag가 image node로 변환됐을 때 해당 노드는 source property를 가지게 될 것입니다.   

따라서 DOM은 HTML markup의 모든 정보를 가지고 있다고 할 수 있습니다.   

DOM은 증분 빌드 방식으로 구축됩니다(DOM construction is incremental).

> 증분 빌드란? 
> 큰 프로젝트를 빌드할 경우 최신 상태에 있는 이전에 빌드된 구성 요소를 다시 빌드하지 않는 것이 중요합니다.   
> 매번 모든 대상이 빌드되면 각 빌드를 완료하는 데 시간이 오래 걸릴 수 있기 때문입니다. 
> 따라서 `이전에 빌드되지 않은 대상만 또는 오래된 대상이 다시 빌드되는 빌드인 증분 빌드`를 사용하는 것이 바람직합니다.
> 실제로 구글에서는 서버에서 응답으로 html 파일이 완전히 오기도 전에 header등 어느 페이지나 존재하는 요소들을 미리 parsing하여 성능을 높인다고 합니다.   

### 2. Converting CSS to the CSSOM

DOM은 페이지의 content정보를 가지고 구성됩니다.   
DOM의 content를 어떻게 display가 되는지 알기 위해서는 CSSOM에 대해 살펴보아야 합니다.   

```html
 <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
  </body>
</html> 
```

브라우저가 페이지의 DOM을 생성하는 동안 문서의 head에서 외부 CSS 스타일시트인 style.css를 참조하는 link tag에 도달하게 됩니다.   
브라우저는 페이지를 렌더링하는 데 이 리소스가 필요할 것이라고 판단하고, 브라우저는 이 리소스에 대한 요청을 즉시 발송합니다.   
그리고나면 요청의 결과로 다음과 같은 콘텐츠가 반환됩니다.   

```css
body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right } 
```
HTML과 마찬가지로, CSS 규칙을 브라우저가 이해하고 처리할 수 있는 형식으로 변환해야 합니다.   
따라서 아까 HTML 프로세스에서 봤던 것과 비슷하게 CSS에서도 해당 프로세스를 반복합니다.

CSS 바이트가 문자로 변환된 후 차례로 토큰과 노드로 변환되고 마지막으로 'CSS Object Model'(CSSOM)이라는 트리 구조가 만들어집니다.   

<img width="877" alt="스크린샷 2021-04-28 오후 10 33 43" src="https://user-images.githubusercontent.com/53216594/116412626-d7c95980-a871-11eb-8ec4-e302d9293c6c.png">

<img width="724" alt="스크린샷 2021-04-28 오후 10 31 47" src="https://user-images.githubusercontent.com/53216594/116412460-ae103280-a871-11eb-9fa8-4bdb7b7390c4.png">

***** CSSOM과 DOM이 만들어지는 프로세스는 비슷하지만, 중요한 차별점이 있습니다. 바로 CSSOM에서는 부모 - 자식 노드간 속성이 상속된다는 것입니다.   

이러한 특징과 더불어서 CSS에서는 하나의 태그에 여러가지 효과가 중첩되었을 때 우선순위가 있다는 점 때문에 CSS가 `Cascading Style Sheet`라고 불리는 것입니다.   

> "Cascading" means that because more than one stylesheet declaration could apply to a particular piece of HTML,   
> there has to be a known way of determining which specific stylesheet rule applies to which piece of HTML.   
> The rule used is chosen by `cascading down` from the more general declarations to the specific rule required.   
> The most specific declaration is chosen.   
> (reference: https://stackoverflow.com/questions/1043001/what-is-the-meaning-of-cascading-in-css)

##### 조금 전에 DOM construction은 incremental하다고 설명했습니다. 하지만 CSSOM은 그렇지 않습니다.   
CSS는 render blocking 특성을 가집니다.   
> render blocking: the browser blocks page rendering until it receives and processes all of the CSS.
> CSS is render blocking because rules can be overwritten, so the content can't be rendered until the CSSOM is complete.


##### Tip: Types of render blocking resources
As a rule of thumb, the browser treats everything it finds in the <head> section of an HTML page as render blocking. This includes:

- CSS stylesheets
- JavaScript files added in the <head> section
- Fonts added from either CDN or a local server
- HTML imports (even though HTML imports are now obsolete, you might still encounter them on legacy pages)

Images, media files, and <script> tags placed at the bottom of the <body> section are treated as non-render blocking resources.

(reference: https://blog.logrocket.com/5-tricks-to-eliminate-render-blocking-resources)

<br>

### 3. Render Tree(DOM + CSSOM)

다음 스텝으로는 DOM과 CSSOM을 결합해서 render tree를 만듭니다.   
브라우저는 DOM 트리의 root부터 시작해서 노드를 순회합니다.   

render tree의 가장 중요한 특징 중 하나는 오직 visible content만을 가지고 있다는 것입니다.  
즉, script tag나 meta tag같이 페이지에 렌더링 되지 않는 노드들은 생략됩니다.   

또한 일부 노드는 CSS를 통해서 생략되기도 합니다. 예를 들어  'display: none' 속성을 준 노드는   
render tree에서 제외됩니다.   

> tip: { visibility: hidden } VS { display: none }
> { visibility: hidden }은 요소를 보이지 않을 뿐이지 공간을 차지하고 있습니다.   
> 반면 { display: none }은 레이아웃 자체에 포함되지 않아 rendering tree에서 아예 누락됩니다.   

<img width="877" alt="스크린샷 2021-04-28 오후 11 28 34" src="https://user-images.githubusercontent.com/53216594/116421096-81f8af80-a879-11eb-8ff8-07048e03efbf.png">

### 4. Layout - calculating positions and dimensions

Render tree가 완성되면, 렌더링 될 요소들이 페이지 어디에 위치해야하는지 파악해야 합니다.   
페이지에서 각 요소의 정확한 크기와 위치를 파악하기 위해 브라우저는 rendering tree의 루트에서 시작하여 순회합니다.   

우리가 스마트폰을 옆으로 뉘었을 때 페이지의 버튼이나 박스 크기가 변하지만 비율은 변하지 않은 상태를 본 적이 있을 거라고 생각합니다.   ㅇ

CSS에서 body { width: 100% } 이런식으로 표기한 것도 본적이 있으실 겁니다.   
여기서 100%는 무엇의 100%를 의미하는 것일까요?   

바로 layout viewport size의 100% 라는 의미입니다.   

```html
<meta name="viewport" content="width=device-width">
```
head의 meta tag입니다. 아마 본 적은 있지만 이게 무슨 의미인지는 잘 모르셨을 수도 있습니다.   
이것은 브라우저에게 "layout viewport의 width는 device의 width와 같아야해!"라고 말하고 있는 것입니다.   
그래서 device의 넓이가 320픽셀이라면 브라우저는 layout viewport를 320픽셀로 설정할 것입니다.   

만약 위의 meta tag가 없다면 브라우저는 default viewport width를 설정하는데 이 값은 보통 980픽셀 정도라고 합니다.    

### 5. Paint - putting pixels on the page

마지막으로 렌더링 트리의 각 노드를 화면의 실제 픽셀로 변환하는 단계입니다.   

렌더링 트리 생성, 레이아웃 및 페인트 작업을 수행하는 데 필요한 시간은 문서의 크기, 적용된 스타일 및 실행 중인 기기에 따라 달라집니다.   
즉, 문서가 클수록 브라우저가 수행해야 하는 작업도 더 많아지고 스타일이 복잡할수록 페인팅에 걸리는 시간도 늘어납니다.   
예를 들어 단색은 페인트하는 데 시간과 작업이 적게 필요한 반면 그림자 효과는 계산하고 렌더링하는 데 시간과 작업이 더 필요합니다.   

<br>

##### 본 내용은 udacity의 Website Performance Optimization 강의 내용을 바탕으로 작성되었습니다.   

reference: https://classroom.udacity.com/courses/ud884,   
           https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction
