# 49-Capturing & Bubbling (feat.Event Delegation)

<br/>

&nbsp; 아래와 같은 구조를 가진 상태라고 가정하여봅시다.

<br/>

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Capturing & Bubbling</title>
    <link rel="stylesheet" href="style.css" />
    <script src="main.js" defer></script>
  </head>
  <body>
    <div class="red">
      <div class="blue">
        <div class="black"></div>
      </div>
    </div>
  </body>
</html>
```

<br/>

```js
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const black = document.querySelector(".black");

red.addEventListener("click", (e) => {
  console.log("red");
});

blue.addEventListener("click", (e) => {
  console.log("blue");
});

black.addEventListener("click", (e) => {
  console.log("black");
});
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvOxV1%2Fbtq3zM6LIGG%2FYt8EwIWqbyEYilc2DXUEK0%2Fimg.png"/></p>

<br/>

&nbsp; 중첩된 `element`들은 각각 `Event Handler`를 가지고 있습니다. 이러한 상황에서 제일 하위 `element`인 black의 `event`를 발생시키면 어떻게 될까요?

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdQgkQs%2Fbtq3EJHJtRz%2FKcGmecq1opE0kuq4lFGqf1%2Fimg.png"/></p>

<br/>

&nbsp; 직접 클릭을 한 black의 `event`가 먼저 발생이 되고 그다음 순차적으로 한단계씩 부모 `element`의 `event`가 발생 된것을 볼 수 있습니다. 그럼 만약 blue를 누르면 어떻게 될까요?

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbVJ297%2Fbtq3AraeTrF%2FlKgMKD749HCxhQaHPKI8kK%2Fimg.png"/></p>

<br/>

&nbsp; 이번에는 직접 클릭을 한 blue의 `event`가 먼저 발생이 되고 그다음 부모 `element`인 red의 `event`가 발생 된것을 볼 수 있습니다.

<br/>

## **🤷‍♀️🤷‍♂️ WHY ?**

<br/>

&nbsp; 먼저 이러한 현상을 설명하기 위해 도형으로 나타내어 보겠습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FchoFuK%2Fbtq3zOKi2Zo%2Fsc3CJYew9YZzNM15Ff9II1%2Fimg.png"/></p>

<br/>

&nbsp; 위와 같은 도형에서 첫번째 가정이였던 black을 클릭해봅시다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmfNTi%2Fbtq3DJOLBzi%2FkoEOtE1IJXeMSogbo4AjkK%2Fimg.png"/></p>

<br/>

&nbsp; 이 때의 black은 모든 이벤트의 **시발점** `event.target` 즉, 실제 `event`가 실행된 `target`이 되며

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTZ2ZI%2Fbtq3DJutBEU%2Fl3Ktp3MWXEexuX6pdI8Rk1%2Fimg.png"/></p>

<br/>

&nbsp; 그 다음 blue와 red또한 `Event Handler`를 가지고 있기때문에 **이벤트 탑승**을 하게 되며 각각의 `event`의 `event.currentTarget`이 됩니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRKs1A%2Fbtq3zoFcTvi%2FD4v27XILv6GYh4K1b8Hbl1%2Fimg.png"/></p>

<br/>

&nbsp; 실제 각각의 `event`의 내에서 확인해보면

<br/>

```js
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const black = document.querySelector(".black");

red.addEventListener("click", (e) => {
  console.log("----------------------------");
  console.log("red");
  console.log("red event.target", e.target.className);
  console.log("red event.currentTarget", e.currentTarget.className);
});

blue.addEventListener("click", (e) => {
  console.log("----------------------------");
  console.log("blue");
  console.log("blue event.target", e.target.className);
  console.log("blue event.currentTarget", e.currentTarget.className);
});

black.addEventListener("click", (e) => {
  console.log("black");
  console.log("black event.target", e.target.className);
  console.log("black event.currentTarget", e.currentTarget.className);
});
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FreyY5%2Fbtq3CALyB1v%2FcUgKXQfxmH6TArkkvi6ibk%2Fimg.png"/></p>

<br/>

&nbsp; 위와같은 결과가 나오게됩니다.

<br/>

## **🎢 flow ?**

<br/>

&nbsp; 이러한 flow는 3가지의 과정이 있습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F9pCx9%2Fbtq3z4M8FSh%2FNiF4q8otI77JRgre5Hi2h1%2Fimg.png"/></p>

<br/>

> 1. 먼저 black를 누르게 되면 상위의 red -> blue를 먼저 거치게 됩니다. 이 과정을 **capture phase**라고 하며 **propagate up** 이라고합니다.
> 2. 다음 직접적으로 클릭한 black의 `event`가 실행이 되는 `target phase`가 일어납니다.
> 3. 다시 blue -> red로 가는 **bubble phase**, **propagate down**이라고 합니다.

<br/>

&nbsp; 이러한 과정은 너무나 비효율적인 과정이기 때문에 `event`를 탑승한 `element`가 **capturing**에서 실행될지 **bubbling**에서 실행될지의 제약을 줍니다.

<br/>

> **💡 propagate**  
> 여기서 **propagate**는 사전적인 의미로는 전파하다, 번식하다의 의미를 가지고 있습니다.

<br/>

## **🔧 제어하기**

<br/>

&nbsp; 기본적으로는 **bubbling**에서 실행이 되나 상황에따라 **capturing**에서 실행이 되길 원한다면 `event`의 세번째 인자로 `true`값을 넣어줍니다.

<br/>

```js
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const black = document.querySelector(".black");

red.addEventListener("click", (e) => {
  console.log("----------------------------");
  console.log("red");
  console.log("red event.target", e.target.className);
  console.log("red event.currentTarget", e.currentTarget.className);
});

blue.addEventListener(
  "click",
  (e) => {
    console.log("----------------------------");
    console.log("blue");
    console.log("blue event.target", e.target.className);
    console.log("blue event.currentTarget", e.currentTarget.className);
  },
  //  아래와 같이 사용이 가능하나 생략을하여 true값만 넣어도 됩니다.
  // { capture: true }
  true
);

black.addEventListener("click", (e) => {
  console.log("black");
  console.log("black event.target", e.target.className);
  console.log("black event.currentTarget", e.currentTarget.className);
});
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbgTW8B%2Fbtq3GCCyZi0%2FEUaJNteoCBvurZjDkkvjPK%2Fimg.png"/></p>

<br/>

> 하지만 **capturing**단계에서 작업을 하는일은 거의 없습니다.

<br/>

## **🤔 해결 방안 ?**

<br/>

&nbsp; 이러한 **bubbling**을 방지하는 방법은 `event.stopPropagation();` 이나 `event.stopImmediatePropagation();`를 사용하는 방법이 있습니다.

<br/>

```js
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const black = document.querySelector(".black");

red.addEventListener("click", (e) => {
  console.log("----------------------------");
  console.log("red");
  console.log("red event.target", e.target.className);
  console.log("red event.currentTarget", e.currentTarget.className);
});

blue.addEventListener("click", (e) => {
  console.log("----------------------------");
  console.log("blue");
  console.log("blue event.target", e.target.className);
  console.log("blue event.currentTarget", e.currentTarget.className);
  e.stopPropagation();
});

black.addEventListener("click", (e) => {
  console.log("black");
  console.log("black event.target", e.target.className);
  console.log("black event.currentTarget", e.currentTarget.className);
});
```

<br/>

&nbsp; `event.stopPropagation();`를 사용한다면 **bubbling**시 해당 `event` 까지만 실행이 됩니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FXJYx1%2Fbtq3Kysb3Uz%2FEj3uvrR7OckC14x6O6HvBK%2Fimg.png"/></p>

<br/>

&nbsp; 다른 방법으로 `event.stopImmediatePropagation();`를 사용한다면 상위 뿐만아니라 같은 단계에서의 다른 `event`또한 실행이 되지않습니다.

<br/>

```js
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const black = document.querySelector(".black");

red.addEventListener("click", (e) => {
  console.log("----------------------------");
  console.log("red");
});

blue.addEventListener("click", (e) => {
  console.log("----------------------------");
  console.log("blue");
});

black.addEventListener("click", (e) => {
  console.log("black1");
  e.stopImmediatePropagation();
});

black.addEventListener("click", (e) => {
  console.log("black2");
});
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F6lSOX%2Fbtq3JeufubZ%2FpLgwxadCRgbDwBV8oZNId0%2Fimg.png"/></p>

<br/>

&nbsp; 하지만 이러한 방법으로 해결하는것은 옳지 못합니다. 임의로 브라우저의 작동을 막는것은 예상치못한 오류의 원인이 될 수 있기때문입니다. 때문에 아래와 같은 방식으로도 해결이 가능합니다.

<br/>

```js
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const black = document.querySelector(".black");

red.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  console.log("----------------------------");
  console.log("red");
});

blue.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  console.log("----------------------------");
  console.log("blue");
});

black.addEventListener("click", (e) => {
  console.log("black1");
});
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F6lSOX%2Fbtq3JeufubZ%2FpLgwxadCRgbDwBV8oZNId0%2Fimg.png"/></p>

<br/>

## **Event Delegation(이벤트 위임)**

<br/>

&nbsp; 사실 위의 `Capturing`과 `Bubbling`은 **Event Delegation(이벤트 위임)** 을 이해하고 사용하기 위한 **초석**입니다. 만약 아래와 같은 구조가 있다고 가정하여 봅시다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8EmZM%2Fbtq3FlOOQQ1%2FbBJWymrcwEspcYTbSLy2kK%2Fimg.png"/></p>

<br/>

&nbsp; Tab과 DropDown에 `event`를 구현 하기위해서 대부분 아래와 같이 각각의 `element`에 `event`를 부여할것 입니다.

<br/>

```js
const items = document.querySelectorAll(".header__nav--item");
const gnb = document.querySelector(".gnb");
const gnbItems = document.querySelector(".gnb-items");

items.forEach((item) => {
  item.addEventListener("click", () => {
    alert("hi");
  });
});

gnb.addEventListener("click", () => {
  gnbItems.classList.toggle("toggle");
});
```

<br/>

&nbsp; 하지만 이러한 방법은 `event`를 부여할 일이 생길때마다 변수 선언등 추가해줘야 합니다. 때문에 **이벤트 위임**을 사용하는것이 좋습니다.

<br/>

```js
const header = document.querySelector(".header");

const alertHandler = () => {
  alert("hi");
};

const onToggle = () => {
  const items = document.querySelector(".gnb-items");
  items.classList.toggle("toggle");
};

header.addEventListener("click", (e) => {
  const { className } = e.target;
  if (className === "header__nav--item") {
    alertHandler();
  } else if (className === "gnb") {
    onToggle();
  }
});
```

<br/>

&nbsp; 처음의 방법은 `element` 하나하나를 찾아가서 `event`를 부여하기 때문에 이러한 방법보다는 **이벤트 위임**을 사용한다면 성능의 개선등의 이점을 가져올 수 있습니다.

<br/>

[김버그](https://www.youtube.com/watch?v=7gKtNC3b_S8)

<br/>

고생하셨습니다 ~ ! 👋
