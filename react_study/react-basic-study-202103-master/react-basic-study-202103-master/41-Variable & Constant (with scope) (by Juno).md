# 41-Variable & Constant (with scope)

> 어플리케이션을 실행하면 쓸 수 있는 메모리가 할당됩니다. 메모리는 비어있는 박스와 같고 어플리케이션에 제한적으로 할당되어 있습니다. 때문에 변수를 선언하는 작업은 신중히해야합니다.

<br/>

## **1. 변수(Variable)**

<br/>

&nbsp; 변수란 변경될 수 있는 값을 말합니다. (mutable)

<br/>

### **1-1. let**

---

<br/>

&nbsp; `let`은 ES6부터 생겼습니다.

<br/>

[참고](https://caniuse.com/?search=es6)

<br/>

```js
let food = "sushi";
```

<br/>

&nbsp; 위와같이 `let`을 이용하여 선언하게되면 아래와 같이 됩니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb7y8Zh%2Fbtq3dak7KFc%2FZ30xScyKP9uDeZu7j7ACH1%2Fimg.png"/></p>

<br/>

&nbsp; `let food`라는 변수를 정의하면 메모리에 값("sushi")이 저장이 되고 그 값을 가르키는 포인터가 생깁니다.

<br/>

```js
let food = "sushi";

food = "curry";
```

<br/>

&nbsp; 이때 값을 다시 변경해 준다면 본래의 값은 삭제가 되고 새로운 값을 저장합니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkBRLc%2Fbtq3bvwOTjo%2FQa8Hh29kQOz3dIUyUKbcn1%2Fimg.png"/></p>

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQ9ZZh%2Fbtq3cbdBcVL%2FsV3kZrhKgFfpeqNAEiS0fK%2Fimg.png"/></p>

<br/>

&nbsp; `let`의 특징 중 하나는 scope에 영향을 받는다는것 입니다.

<br/>

```js
{
  let todayLunch = "sushi";

  console.log(`오늘 점심은 ${todayLunch}`);
}

console.log(`오늘 점심은 ${todayLunch}`);
```

<br/>

&nbsp; 위와같이 중괄호를 기준으로 안쪽에서는 오늘의 점심을 알 수 있지만 밖에서는 알지 못 합니다. 😥

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbguRBA%2Fbtq27URD0yy%2Fa2EO6TNIKwncCQPlzOInK1%2Fimg.png"/></p>

<br/>

&nbsp; 하지만 아래와 같이 작성한다면 결과는 달라집니다.

<br/>

```js
let todayLunch = "sushi";

{
  console.log(`오늘 점심은 ${todayLunch}`);
}

console.log(`오늘 점심은 ${todayLunch}`);
```

<br/>

&nbsp; 중괄호 외각에 변수를 선언하게 되면 중괄호 안과 밖에서 해당 변수 사용이 가능하며 모두 점심 메뉴를 알게됩니다. 😋

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb3UHNh%2Fbtq3bVhIpbh%2Fo9MKbWROBPeYGz87XQckf1%2Fimg.png"/></p>

<br/>

&nbsp; 위와같은 형태로 선언하여 사용하는 변수를 전역 변수(Global Variable)라고 하며 어디서나 접근이가능합니다. 하지만 어플리케이션이 시작하고 끝까지 메모리에 탑재되어 있기때문에 최소한으로 쓰는게 좋습니다.

<br/>

### **1-2. var**

---

<br/>

&nbsp; `var`는 `let`이 생기기전에 사용되던 변수입니다.

<br/>

```js
var food = "sushi";
```

<br/>

&nbsp; 사용하는 형태는 똑같으나 특징이 있습니다. 대부분의 프로그래밍 언어에서는 변수를 선언하고 나서 값을 할당해야 하지만 `var`는 다릅니다.

<br/>

```js
console.log(food);

food = "sushi";

console.log(food);

var food;
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbvK5hl%2Fbtq3avjAoAD%2FCICAEEw6lRfaqzOOqjhhW0%2Fimg.png"/></p>

<br/>

&nbsp; 또 `var`는 scope를 무시한채 사용이 가능합니다.

<br/>

```js
{
  var todayLunch = "sushi";

  console.log(`오늘 점심은 ${todayLunch}`);
}

console.log(`오늘 점심은 ${todayLunch}`);
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FObTyh%2Fbtq3c97DyDJ%2FWwhkBgQkk4xhA5xrkzpliK%2Fimg.png"/></p>

<br/>

&nbsp; `var`는 `var hoisting`이 있기때문에 어디서든 접근이 가능합니다. 초창기에는 이러한 유연성으로 사용하기 좋았지만 규모가 커지면 예상치못한 값이 나오는 에러가 발생하는 일이 발생하게되었습니다. 때문에 이러한 위험부담을 줄이기 위해 `let`이 추가되었던겁니다.

<br/>

> **💡 hoisting**  
> hoisting이란 사전적으로는 '끌어올리다'라는 의미를 가지고있습니다.  
> `var`는 선언의 위치와는 상관이 없이 상단으로 끌어올리게 됩니다.

<br/>

## **2. 상수(Constant)**

<br/>

&nbsp; 상수란 변경될 수 없는 값이 바뀌지않는것을 말합니다. (immutable)

<br/>

### **const**

---

<br/>

&nbsp; `let`과 같이 저장되는건 같지만 다른점이 있습니다.

<br/>

```js
const food = "sushi";
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fqp4Mf%2Fbtq27Vwgrvw%2FLQUi2hQpRx1aPdnmtv42gK%2Fimg.png"/></p>

<br/>

&nbsp; `let`은 포인터를 이용하여 값을 바꿀 수 있었지만 `const`는 값을 선언한 뒤로 잠겨있기때문에 변경이 불가능합니다.

<br/>

```js
const food = "sushi";

food = "curry";

console.log(food);
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmudzQ%2Fbtq27ikZ1AM%2FRNFnkrKNE0jH5c0Wnq7Wn1%2Fimg.png"/></p>

<br/>

&nbsp; const와 같은 데이터를 사용해야하는 좋은 이유가 있습니다.

<br/>

> **🙏 3가지 장점**
>
> - security (보안) : `const`는 값을 변경할 수 없는 특징 때문에 해커들이 중간에 코드를 변경하지 못하는점이 있습니다.
>
> - thread safety : 프로세스안에 쓰레드들이 동시에 값에 접근하여 변경을 할 수 있기때문에 가능하면 값이 변하지 않는것이 좋고 이러한 부분을 방지할 수 있습니다.
>
> - reduce human mistakes : 개발자 본인이 코드를 변경하거나 다른 개발자가 변경하더라도 실수를 방지할 수 있습니다.

<br/>

[드림코딩 엘리](https://www.youtube.com/watch?v=OCCpGh4ujb8&t=542s)

[ko.javascript](https://ko.javascript.info/variables)

<br/>

👋
