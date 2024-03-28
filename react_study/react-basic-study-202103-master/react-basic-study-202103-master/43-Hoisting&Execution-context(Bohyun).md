# 호이스팅 & 실행 컨텍스트

## 1. 호이스팅(Hoisting)

### 1.1 호이스팅이란?

자바스크립트 및 액션스크립트 코드를 인터프리터가 로드할 때, 변수의 정의가 그 범위에 따라 선언과 할당으로 분리되어 변수의 선언을 항상 컨텍스트 내의 최상위로 끌어올리는 것을 의미한다. 이는 오로지 변수에만 해당되는 것은 아니고 함수도 가능하며, 자바스크립트에서 함수의 호출을 첫 줄에서 하고 마지막 줄에 함수를 정의해도 문제없이 작동되도록 하는 유용한 특성이다. 한마디로, 호이스팅이란 변수가 끌어올려지는 현상을 말한다.

### 1.2 호이스팅의 대상

- `var` 변수 선언과 함수선언문에서만 호이스팅이 발생한다.
  - `var` 변수와 함수의 선언만 호이스팅되며, 할당은 끌어 올려지지 않는다.
  - `let`, `const` 변수 선언과 함수 표현식에서는 호이스팅이 발생하지 않는다.

### 1.3 호이스팅의 범위

1. 전역 범위(global scope)
   - 전역 범위에서는 스크립트의 단위에서 최상단으로 끌어 올려진다.
2. 함수 범위(function scope)
   - 함수 범위에서는 해당 함수의 최상단으로 끌어 올려진다.

### 1.4 변수 호이스팅(var, let, const)

아래 두 예제를 살펴보자.

```jsx
function sayHi() {
  phrase = 'Hello';

  alert(phrase);

  var phrase;
}
sayHi();
```

```jsx
function sayHi() {
  var phrase;

  phrase = 'Hello';

  alert(phrase);
}
sayHi();
```

위의 두 예제는 동일하게 동작한다. `var phrase;`가 다른 행에 위치해 있어도, 호이스팅으로 인해 둘은 동일하게 동작한다. **하지만 선언은 호이스팅되지만 할당은 호이스팅 되지 않는다.**

```jsx
function sayHi() {
  alert(phrase);

  var phrase = 'Hello';
}

sayHi();
```

`var phrase = "Hello";` 행에서는 두 가지 일이 일어난다.

1. 변수 선언(`var`)
2. 변수에 값을 할당(`=`)

변수 선언은 함수 실행이 시작될 때 처리되지만(호이스팅), 할당은 호이스팅 되지 않기 때문에 할당 관련 코드에서 처리된다. 따라서 위의 코드는 아래 코드처럼 동작하게 된다.

```jsx
function sayHi() {
  var phrase; // 선언은 함수 시작 시 처리됩니다.

  alert(phrase); // undefined

  phrase = 'Hello'; // 할당은 실행 흐름이 해당 코드에 도달했을 때 처리됩니다.
}

sayHi();
```

이와 같이 모든 `var` 선언은 함수 시작 시에 처리가 되므로, `var`로 선언한 변수는 어디서든 참조할 수 있다. 하지만 변수에 무언가를 할당하기 전까지는 값이 `undefined`이다.

하지만 `let`과 `const`에서는 호이스팅이 일어나지 않는다. 정확하게는 호이스팅되지 않는 것이 아니라 스코프에 진입할 때 변수가 만들어지고 TDZ(Temporal Dead Zone)가 생성되지만, 코드 실행이 변수가 실제 있는 위치에 도달할 때까지 액세스를 할 수 없는 것이다.

💡 **TDZ(Temporal Dead Zone)란?**
변수 선언 이전에 변수를 참조하는 영역을 말한다. 해당 영역에서 선언 이전에 참조한 변수는 참조 에러(ReferenceError)가 발생한다. 즉, TDZ에 영향을 받는 변수는 선언 이전에 참조하는 것을 금지하고 있다.

자세하게 알기 위해서는 **변수의 3단계 생성과정**에 대해서 생각을 해봐야 한다.

1. **선언 단계** : 변수를 실행 컨텍스트의 변수 객체에 등록한다.
2. **초기화 단계** : 실행 컨텍스트에 등록된 변수 객체에 대한 메모리를 할당한다. 이 단계에서 변수는 undefined로 초기화된다.
3. **할당 단계** : `undefined`로 초기화된 변수에 값을 할당한다.

이 생성과정에서 `var` 키워드로 변수를 만들 경우, 선언 단계와 초기화 단계가 동시에 이뤄진다. 하지만 `let`, `const` 키워드는 선언 단계와 초기화 단계가 분리되어 진행된다.

- [테스트 코드](http://pythontutor.com/visualize.html#mode=edit)

### 1.5 함수 호이스팅(함수 선언문, 함수 표현식)

#### 1.5.1 함수 선언문과 함수 표현식의 차이

함수 선언문(Function Declaration)은 아래와 같이 일반 프로그래밍 언어에서의 함수 선언과 비슷한 형식으로 생겼다.

```jsx
function 함수명() {
  구현 로직;
}
```

반면에 함수 표현식(Function Expression)은 아래와 같이 변수값에 함수 표현을 담아 놓은 형식으로 생겼다.

```jsx
var test1 = function () {
  // (익명) 함수표현식
  return '익명 함수표현식';
};

var test2 = function test2() {
  // 기명 함수표현식
  return '기명 함수표현식';
};

// 익명 함수 표현식과 기명 함수 표현식의 차이는 함수에 식별자가 있느냐 없느냐이다.
```

#### 1.5.2 함수 선언문에서의 호이스팅

함수 선언문은 코드를 구현한 위치와 관계없이 자바스크립트의 특징인 호이스팅에 따라 브라우저가 자바스크립트를 해석할 때 맨 위로 끌어올려진다.

함수 표현식은 함수 선언문과 달리 선언과 호출 순서에 따라서 정상적으로 함수가 실행되지 않을 수 있다.

- [테스트 코드](http://pythontutor.com/visualize.html#mode=edit)

## 2. 실행 컨텍스트(Execution context)

### 2.1 함수 실행 시 생성되는 실행 컨텍스트란?

실행 컨텍스트(Execution Context)는 함수 실행에 대한 세부 정보를 담고 있는 내부 데이터 구조이다. 제어 흐름의 현재 위치, 변수의 현재 값, `this`의 값 등 실행 중인 함수의 실행 절차에 대한 정보가 실행 컨텍스트에 저장된다.

`scope`, `hoisting`, `this`, `function`, `closure` 등의 동작원리를 담고 있는 자바스크립트의 핵심원리로, 실행 컨텍스트는 '실행 가능한 코드가 실행되기 위해 필요한 환경'이라고 말할 수 있다. 일반적으로 실행 가능한 코드는 전역 코드와 함수 내 코드이다.

자바스크립트 엔진은 코드를 실행하기 위하여 실행에 필요한 여러가지 정보를 알고 있어야 한다. 실행에 필요한 여러가지 정보란 아래와 같은 것들이 있다.

- 변수 : 전역변수, 지역변수, 매개변수, 객체의 프로퍼티
- 함수 선언
- 변수의 유효범위(Scope)
- this

이와 같이 실행에 필요한 정보를 형상화하고 구분하기 위해 자바스크립트 엔진은 실행 컨텍스트를 물리적 객체의 형태로 관리한다.

```jsx
var x = 'xxx';

function foo() {
  var y = 'yyy';

  function bar() {
    var z = 'zzz';
    console.log(x + y + z);
  }
  bar();
}
foo();
```

위 코드를 실행하면, 아래와 같이 실행 컨텍스트 스택(Stack)이 생성하고 소멸한다. 현재 실행 중인 컨텍스트에서 이 컨텍스트와 관련없는 코드(예를 들어 다른 함수)가 실행되면 새로운 컨텍스트가 생성된다. 이 컨텍스트는 스택에 쌓이게 되고 컨트롤(제어권)이 이동한다.

💡 **여기서 스택(Stack)이란?**
자료의 입출력이 한 방향에서만 이루어지는 자료구조를 말하는데, 다음과 같은 성질이 있다.

1. 데이터를 집어넣을 수 있는 선형(linear) 자료형이다.
2. 나중에 집어넣은 데이터가 먼저 나온다. 이 특징을 줄여서 LIFO(Last In First Out, 후입 선출)라고 부른다.
3. 데이터를 집어넣는 `push`, 데이터를 추출하는 `pop`, 맨 나중에 집어넣은 데이터를 확인하는 `peek` 등의 작업을 할 수 있다.

<img src="https://user-images.githubusercontent.com/65386533/109933462-c9960b80-7d0e-11eb-8c86-33105a395f3a.png" alt="논리적 스택 구조를 가지는 실행 컨텍스트 스택" width="700">

▲ 논리적 스택 구조를 가지는 실행 컨텍스트 스택

1. 컨트롤이 실행 가능한 코드로 이동하면 논리적 스택 구조를 가지는 새로운 실행 컨텍스트 스택이 생성된다.
2. 전역 코드(Global code)로 컨트롤이 진입하면 전역 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 쌓인다. 전역 실행 컨텍스트는 애플리케이션이 종료될 때(웹 페이지에서 나가거나 브라우저를 닫을 때)까지 유지된다.
3. 함수를 호출하면 해당 함수의 실행 컨텍스트가 생성되며 직전에 실행된 코드 블록의 실행 컨텍스트 위에 쌓인다.
4. 함수 실행이 끝나면 해당 함수의 실행 컨텍스트를 파기하고 직전의 실행 컨텍스트에 컨트롤을 반환한다.

### 2.2 실행 컨텍스트의 3가지 객체

<img src="https://user-images.githubusercontent.com/65386533/109933469-ca2ea200-7d0e-11eb-9163-2c8ca830f961.png" alt="실행 컨텍스트의 구조">

▲ 실행 컨텍스트의 구조

실행 컨텍스트는 실행 가능한 코드를 형상화하고 구분하는 추상적인 개념이지만 물리적으로는 객체의 형태를 가지며 3가지 프로퍼티를 가진다.

#### 2.2.1 Variable Object (VO / 변수객체)

실행 컨텍스트가 생성되면 자바스크립트 엔진은 실행에 필요한 여러 정보들을 담을 객체를 생성한다. 이를 Variable Object(VO / 변수 객체)라고 한다. Variable Object는 코드가 실행될 때 엔진에 의해 참조되며 코드에서는 접근할 수 없다.

Variable Object는 아래의 정보를 담는 객체이다.

- 변수
- 매개변수(parameter)와 인수 정보(arguments)
- 함수 선언(함수 표현식은 제외)

Variable Object는 실행 컨텍스트의 프로퍼티이기 때문에 값을 갖는데 이 값은 다른 객체를 가리킨다. 그런데 전역 코드 실행시 생성되는 전역 컨텍스트의 경우와 함수를 실행할 때 생성되는 함수 컨텍스트의 경우, 가리키는 객체가 다르다. 이는 전역 코드와 함수의 내용이 다르기 때문이다. 예를 들어 전역 코드에는 매개변수가 없지만 함수에는 매개변수가 있다.

_Variable Object가 가리키는 객체는 아래와 같다._

**전역 컨텍스트의 경우**
Variable Object는 유일하며 최상위에 위치하고 모든 전역 변수, 전역 함수 등을 포함하는 전역 객체(Global Object / GO)를 가리킨다. 전역 객체는 전역에 선언된 전역 변수와 전역 함수를 프로퍼티로 소유한다.

<img src="https://user-images.githubusercontent.com/65386533/109933470-cac73880-7d0e-11eb-83e6-0fe1cf915d6c.png" alt="전역 컨텍스트의 경우, Variable Object가 가리키는 전역 객체" width="700">

▲ 전역 컨텍스트의 경우, Variable Object가 가리키는 전역 객체

**함수 컨텍스트의 경우**
Variable Object는 Activation Object(AO / 활성 객체)를 가리키며 매개변수와 인수들의 정보를 배열의 형태로 담고 있는 객체인 arguments object가 추가된다.

<img src="https://user-images.githubusercontent.com/65386533/109933471-cac73880-7d0e-11eb-81e4-ee8a0d901890.png" alt="함수 컨텍스트의 경우, Variable Object가 가리키는 Activation Object" width="700">

▲ 함수 컨텍스트의 경우, Variable Object가 가리키는 Activation Object

#### 2.2.2 Scope Chain (SC)

스코프 체인(Scope Chain)은 일종의 리스트로서 전역 객체와 중첩된 함수의 스코프의 레퍼런스를 차례로 저장하고 있다. 다시 말해, 스코프 체인은 해당 전역 또는 함수가 참조할 수 있는 변수, 함수 선언 등의 정보를 담고 있는 전역 객체(GO) 또는 활성 객체(AO)의 리스트를 가리킨다.

현재 실행 컨텍스트의 활성 객체(AO)를 선두로 하여 순차적으로 상위 컨텍스트의 활성 객체(AO)를 가리키며 마지막 리스트는 전역 객체(GO)를 가리킨다.

<img src="https://user-images.githubusercontent.com/65386533/109933474-cb5fcf00-7d0e-11eb-90c9-425b5822512d.png" alt="스코프 체인" width="700">

▲ 스코프 체인

**스코프 체인은 식별자 중에서 객체(전역 객체 제외)의 프로퍼티가 아닌 식별자, 즉 변수를 검색하는 메커니즘이다.**
식별자 중에서 변수가 아닌 객체의 프로퍼티(물론 메소드도 포함된다)를 검색하는 메커니즘은 프로토타입 체인(Prototype Chain)이다.

엔진은 스코프 체인을 통해 렉시컬 스코프를 파악한다. 함수가 중첩 상태일 때 하위함수 내에서 상위함수의 스코프와 전역 스코프까지 참조할 수 있는데 이것는 스코프 체인을 검색을 통해 가능하다. 함수가 중첩되어 있으면 중첩될 때마다 부모 함수의 Scope가 자식 함수의 스코프 체인에 포함된다. 함수 실행중에 변수를 만나면 그 변수를 우선 현재 Scope, 즉 Activation Object에서 검색해보고, 만약 검색에 실패하면 스코프 체인에 담겨진 순서대로 그 검색을 이어가게 되는 것이다. 이것이 스코프 체인이라고 불리는 이유이다.

예를 들어 함수 내의 코드에서 변수를 참조하면 엔진은 스코프 체인의 첫번째 리스트가 가리키는 AO에 접근하여 변수를 검색한다. 만일 검색에 실패하면 다음 리스트가 가리키는 Activation Object(또는 전역 객체)를 검색한다. 이와 같이 순차적으로 스코프 체인에서 변수를 검색하는데 결국 검색에 실패하면 정의되지 않은 변수에 접근하는 것으로 판단하여 Reference 에러를 발생시킨다. 스코프 체인은 함수의 감추인 프로퍼티인 `[[Scope]]`로 참조할 수 있다.

#### 2.2.3 this value

`this` 프로퍼티에는 `this` 값이 할당된다. this에 할당되는 값은 함수 호출 패턴에 의해 결정된다.

---

## 번외) '컨텍스트'란?

> context(명사) : 1. (어떤 일의) 맥락, 전후 사정 2. (글의) 맥락, 문맥

컨텍스트(context)란 프로그래밍을 하다보면 자주 접하게 되는데, 일반적인 의미로서 컨텍스트는 어떤 일,글 따위에 대한 전체적인 내용을 포괄적으로 말하는 것이다. 즉, 어떤 것의 모든 것을 '컨텍스트'라고 볼 수 있다.

프로그래밍에서의 컨텍스트 또한 역시 비슷한 의미이다. 다른 것이 있다면, 주어가 항상 프로그램 그 자체로 고정되어 있다는 것이다. 프로그래밍에서 컨텍스트를 일반화해서 말하면 '프로그램 그 자체'라고 볼 수 있는데, 조금 더 세세하게 표현하자면 '프로그램 전체를 아우르며 접근 및 제어(컨트롤) 할 수 있는 코어'라고 볼 수 있다.

---

- 참고

  [https://ko.javascript.info/var](https://ko.javascript.info/var)

  [https://namu.wiki/w/호이스팅](https://namu.wiki/w/%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85)

  [https://gmlwjd9405.github.io/2019/04/22/javascript-hoisting.html](https://gmlwjd9405.github.io/2019/04/22/javascript-hoisting.html)

  [https://velog.io/@stampid/Hoisting호이스팅이란](https://velog.io/@stampid/Hoisting%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85%EC%9D%B4%EB%9E%80)

  [https://medium.com/korbit-engineering/let과-const는-호이스팅-될까-72fcf2fac365](https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365)

  [https://coffeeandcakeandnewjeong.tistory.com/25](https://coffeeandcakeandnewjeong.tistory.com/25)

  [https://ko.javascript.info/recursion](https://ko.javascript.info/recursion)

  [https://poiemaweb.com/js-execution-context](https://poiemaweb.com/js-execution-context)

  [https://www.hanumoka.net/2017/10/11/android-20171011-android-context/](https://www.hanumoka.net/2017/10/11/android-20171011-android-context/)
