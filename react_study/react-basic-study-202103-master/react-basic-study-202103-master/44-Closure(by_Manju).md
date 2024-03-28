# Closure in Javascript

## 🤔 What is `Closure`?

<br>

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
>
> 클로저는 주변 상태(렉시컬 환경)에 대한 참조와 함께 번들로 묶인 함수의 결합이다.

여기서 핵심 키워드는 **`주변상태, 즉 렉시컬 환경`** 입니다! 예시 코드로 살펴볼게요!

<br>

```jsx
const x = -1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();
```

outerFunc 내에서 innerFunk가 정의 되어서 outerFunc(외부 함수)는 innerFunc(중첩 함수)의 **상위 스코프**가 됩니다! 따라서 innerFunc는 outerFunc의 변수 `x` 접근할 수 있습니다.

<br>

```jsx
const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc();
}

function innerFunc() {
  console.log(x); // 1
}

outerFunc();
```

innerFunc가 outerFunc 내부에서 정의된 중첩 함수가 아니라면 위의 예시 처럼 outerFunc의 변수에 접근 할 수 없습니다!

<br>

이처럼 자바스크립트는 **`렉시컬 스코프`** 를 따르는 언어 입니다. 그럼 여기서 렉시컬 스코프는 어떤 걸 말하는 걸까요?

<br>

### 📝 What is `Lexical Environment`?

<br>

일단 실행 컨텍스트에 대해 간단하게 복습해보면 아래 코드에서 bar 함수 호출 직전을 다음과 같은 그림으로 표현할 수 있습니다.

```jsx
var x = 1;
const y = 2;

function foo(a) {
  var x = 3;
  const y = 4;

  function bar(b) {
    const z = 5;
    console.log(a + b + x + y + z);
  }
  bar(10);
}

foo(20);
```

![실행컨텍스트](https://user-images.githubusercontent.com/75834421/115483394-a6f28e80-a28b-11eb-9662-41651e254e04.jpg)

이렇게 함수 실행 컨텍스트가 생성되고(왼쪽 스택에 method call stack이 하나씩 쌓이고) 오른쪽의 **`함수 렉시컬 환경`** 이 생성되는데 그 내부에서는 함수 환경 레코드 생성 > this 바인딩 > **`외부 렉시컬 환경에 대한 참조 결정`** 이 이루어 집니다

<br>

여기서 우리가 주의해서 살펴볼 부분은 **함수의 상위 스코프를 결정한다 = 렉시컬 환경의 `외부 렉시컬 환경에 대한 참조`에 저장 할 참조값을 결정한다** 입니다.

<br>

따라서 렉시컬 스코프를 다시 정리 해보면, **`렉시컬 환경의 <외부 렉시컬 환경에 대한 참조>에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정됩니다. 이게 바로 렉시컬 스코프!!`**

<br>

하지만 위와 같은 `렉시컬 스코프`가 가능하려면 함수의 정의 위치가 중요한데, 코드마다 함수의 정의 시점과 함수를 호출하는 시점이 다른 경우가 많습니다. 이 문제는 어떻게 해결 될까요?

<br>

## 🤔 Internal slot of function object `[[Environment]]` & ⭐ Closure ⭐

<br>

위에서 언급한 그림 처럼 상위스코프를 <외부 렉시컬 환경에 대한 참조> 부분에 저장해 놓는데, 상위 스코프는 함수가 정의된 곳입니다. 그럼 '이곳이 해당 함수가 정의된 상위 스코프다'라는 정보는 어디서 가져오는 걸까요? `난 내가 정의된 장소의 정보를 같이 가지고 있을거야. 그러니까 그 장소가 사라져도 부를 수 있게끔 표시해놔야지`의 개념이 바로 **`함수 객체의 내부 슬롯 [[Environment]]에 상위 스코프의 참조를 저장하는 것`** 입니다!!

<br>

예시와 그림으로 차근 차근 다시 정리해 볼게요!

```jsx
const x = 1;

// #1
function outer() {
    const x = 10;
    const inner = function() {
        console.log(x); // #2
    };
    return inner;
}

const innerFunc * outer(); // #3
innerFunc(); //10 #4
```

#1

outer함수가 평가되어 함수객체를 생성

![outer함수상위스코프](https://user-images.githubusercontent.com/75834421/115488442-76175700-a295-11eb-9d7c-24ccd4cc2f34.jpg)

현재 실행중인 실행 컨텍스트의 렉시컬 환경, 즉 전역 렉시컬 환경을 **outer 함수 객체의 [[Environment]] 내부 슬롯에 상위 스코프로 저장합니다.**

<br>

#2

outer함수를 호출하면 outer 함수의 렉시컬 환경이 생성되고 앞서 outer 함수 객체의 [[Environment]] 내부 슬롯에 저장된 전역 렉시컬 환경을 outer 함수 렉시컬 환경의 <외부 렉시컬 환경에 대한 참조>에 할당합니다.

그리고 정확히 #2라인 코드에서 중첩함수 inner가 평가됩니다. outer함수가 평가 될 때와 똑같이 **`inner는 자신의 [[Environment]] 내부 슬롯에 현재 실행중인 실행 컨텍스트의 렉시컬 환경, 즉 outer함수의 렉시컬 환경을 상위스코프로 저장합니다!`**

![inner함수상위스코프](https://user-images.githubusercontent.com/75834421/115489340-03a77680-a297-11eb-82a8-86027abab3b6.jpg)

<br>

#3

여기서 outer 함수의 생명주기가 종료 됩니다!!😮 outer 함수의 실행컨텍스트가 스택에서 제거되는 거죠! 여기서 제일 중요한 포인트 ❗❗ **outer함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거 되지만 outer함수의 렉시컬 환경까지 소멸되는 건 아닙니다** ❗❗

inner 함수의 [[Environment]] 내부 슬롯에 outer 함수의 렉시컬 환경이 참조되고 있고, inner함수는 전역 변수 innerFunc에 의해 참조되고 있으므로(#4) 가비지 컬렉션의 대상이 되지 않기 때문입니다.

![outer렉시컬환경소멸안함](https://user-images.githubusercontent.com/75834421/115490848-d90aed00-a299-11eb-8b67-3956950a7736.jpg)

<br>

#4

outer함수가 반환한 inner함수를 호출하면 inner함수의 실행 컨텍스트가 생성되고 스택에 push됩니다. 그리고 렉시컬 환경의 <외부 렉시컬 환경에 대한 참조>에는 inner함수 객체의 [[Environment]] 내부 슬롯에 저장되어 있는 참조값에 할당됩니다!

![inner호출](https://user-images.githubusercontent.com/75834421/115490854-dad4b080-a299-11eb-8d73-20c2070f933c.jpg)

<br>

### ⭐ 외부 함수(outer) 보다 중첩 함수(inner)가 더 오래 유지되는 경우 중첩 함수는 이미 생명주기가 종료된 외부 함수의 변수를 참조 할수 있습니다. 이러한 중첩 함수를 바로 Closure라고 부릅니다!! ⭐

> Javascript의 모든 함수는 상위 스코를 기억하므로 사실 이론적으로는 모든 함수가 closure입니다. 하지만 모두를 그렇게 부르진 않고 위의 정의와 같이 **중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수 보다 더 오래 유지되는 경우에 한정하는 것**이 일반적입니다.

<br>

## 🤔 When and How to use Closure?

<br>

- Outer variables can keep their states between multiple calls.

  : inner 함수에서 outer 함수의 변수에 접근 할 때마다 새로운 복사본을 만드는 게 아닙니다. 같은 변수를 참조하고 있으므로 inner 함수에서 변수에 대한 값을 변경한다면 outer 함수에도 그대로 적용이 됩니다.

  ```jsx
  function Counter() {
    var counter = 0;

    function IncreaseCounter() {
      return (counter += 1);
    }

    return IncreaseCounter;
  }

  var counter = Counter();
  alert(counter()); // 1
  alert(counter()); // 2
  alert(counter()); // 3
  alert(counter()); // 4
  ```

<br>

- Closure is useful in hiding implementation detail in JavaScript.

  : closure는 상태를 안전하게 변경하고 유지하기 위해 사용됩니다 => 상태가 의도치 않게 변경되지 않도록 **상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용**하기 위해 사용됩니다.

  ```jsx
  var counter = (function () {
    var privateCounter = 0;
    function changeBy(val) {
      privateCounter += val;
    }
    return {
      increment: function () {
        changeBy(1);
      },
      decrement: function () {
        changeBy(-1);
      },
      value: function () {
        return privateCounter;
      },
    };
  })();

  alert(counter.value()); // 0
  counter.increment();
  counter.increment();
  alert(counter.value()); // 2
  counter.decrement();
  alert(counter.value()); // 1
  ```

  이 예시에서는 increment(), decrement(), value() 결과값으로 반환되는 객체에 포함되어 있으므로 어디서든 접근이 가능하지만(public), **changeBy() 함수의 경우 결과값으로 반환되지 않고 increment와 decrement함수 내부에서만 사용되고 있으므로 private function 이라고 할 수 있습니다!**

    <br>

  이런식으로 다른 사람이 변경하지 않길 원하는 건 changeBy() 같은 내부 함수 안에서 처리하게끔 분류 할 수 있어요!

    <br>

  😂 하지만 자바스크립트의 경우, 정보 은닉을 완전하게 지원하지는 않는 다고 합니다. (인스턴스 매서드로 private 흉내 => 프로토타입 메서드 사용 하면 불가능, Symbol 또는 WeakMap 사용으로 private흉내 => 근본적인 해결책X)

  😮 다행히도 2021년 1월에 TC39프로세스의 stage3(candidate)에는 클래스에 private필드를 정의할 수 있는 새로운 표준 사양이 제안되었다고 합니다...?
