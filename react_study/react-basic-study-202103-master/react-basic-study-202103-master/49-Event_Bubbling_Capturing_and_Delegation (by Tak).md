# Event Bubbling, Caputuring, and Delegation

## Event Flow 
> Event flow is the order in which event is received on the web page.

웹페이지에서 이벤트가 순차적으로 오가는 순서 혹은 절차를 이벤트 흐름이라 명칭한다.

## Event Phases

#### 이벤트는 각 3개의 Phase를 가진 life cycle이 있습니다.
1. **capture** : window(document)로 부터 해당 event target으로 까지 탐색 (ex. 조부모 -> 부모 -> 자식) 
2. **target** : capture에서 도달 한 순간 그리고 bubble의 시작 포인트
3. **bubble** : target phase에서 이벤트 해당하는 동작이 끝나면 caputre와 반대로 window로 까지 상승 (이름이 bubbling인 이유 거품이 쌓인다는듯 하여 bubbling으로 표현)

#### 시각 자료
![image](https://user-images.githubusercontent.com/77006427/116421654-00555180-a87a-11eb-99fc-579bee85b2f0.png)


※ 모던 브라우저에서는 capturing이 따로 JS에서 설정하지 않는 이상 default 값이 false 입니다. 원한다면...

```bash
parent.addEventListener('click', function(){
    console.log("Parent clicked");
},true);
```

위와 같이 listener 함수의 3번 째 인자에, true를 설정해야됩니다.

기본적으로 Bubbling은 default가 true 이기 떄문에, 이벤트가 발생이 된다면, 이벤트는 window에게 이벤트가 발생 됐다고 등반하기 시작합니다.

그래서 아래와 같은 코드에서

```bash
<body>
  <div id="parent">
    <button id="child">Child</button>
  </div>
  
  <script>
    var parent = document.querySelector('#parent');
    var child = document.querySelector('#child');

    parent.addEventListener('click', function(){
      console.log("Parent clicked");
    },true);


    child.addEventListener('click', function(){
      console.log("Child clicked");
    });
  </script>
</body>
```

`child`라는 id를 가진 버튼을 클릭하면, 이벤트가 발생 됐다는 신호가 터지고 위로 올라가기에,

Child Cliked
Parent Cliked

두개의 log가 출력이 됩니다.

위와 같이 특정 이벤트를 막는 방법도 있습니다.

```bash
<button id="child" onclick="event.stopPropagation()">Child</button>
```

child에 stopPropagation()이라는 event 함수를 주입 할 시,
위로 버블링 안되게 설정 해주어,  

Parent Clickced 라는 로그 더 이상 찍히지 않게 됩니다.

※ 그렇지만 사용을 꼭 필요한 경우가 아니라면 자제를 해야됩니다. Propagation 즉 증식을 특별히 멈춰야 되는 경우가 아니라면 지양해야 된다는 의견이 있습니다.


### Event Delegation

이벤트를 위임한다. 즉 caputring에 속합니다.

계산기를 예로들면, 어떤 숫자를 클릭하면 동작이 같습니다.

숫자를 받는다. 
```bash
<div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>0</div>
</div>
```

각 숫자의 div마다 일일히 listener를 붙이기보다는,
해당 숫자 div들의 상단인 부모에만 listener를 붙여 해결 할 수있습니다.

이와 같은 방식을 자식에게 이벤트를 준다 하여, 이벤트 위임이라 명칭합니다.


해당 케이스는, 
아래의 Element들이 같은 로직으로 동작한다 혹은 위의 로직을 받아도, 기획한 의도에 맞는다는 가정하에 사용하기에 유용합니다.

이벤트 위임이 정말로 어떻게 동작되는가에 대한 예시는   
프로젝트 데모 영상으로 진행해보겠습니다.


See Also :
- https://javascript.info/bubbling-and-capturing
- https://gist.github.com/domfarolino/fdde99c1ad3fa1668a1849c33f87f437
- http://www.tutorialspark.com/javascript/JavaScript_Event_Flow.php
- https://vsvaibhav2016.medium.com/event-bubbling-and-event-capturing-in-javascript-6ff38bec30e