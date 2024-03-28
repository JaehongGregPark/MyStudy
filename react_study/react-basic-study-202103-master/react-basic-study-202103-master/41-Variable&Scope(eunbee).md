# javascript variables & scope

<br>

## 변수

---

### let

변수는 데이터를 저장할 때 쓰이는 '이름이 붙은 저장소'이다.

자바 스크립트에선 `let` 키워드를 사용해 변수를 생성한다.

예시)

```jsx
let message = "Hello";
```

문자열이 변수와 연결된 메모리 영역에 저장되었다.

<br>

### var

`var`과 `let`은 거의 동일하게 동작한다. `var` 도 `let` 처럼 변수를 선언하는데 사용된다. 다만 `var`은 오래된 방식이다.

var 의 특징

- `var`은 블록 스코프가 없다.

  `var`로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프이다. 블록기존으로 스코프가 생기지 않기 때문에 **블록 밖에서 접근이 가능하다**.

- 한 스코프에서 `let`은 2번 이상 선언할 수 없다. `var`은 여러번 선언할 수 있다.
- **`var` 선언**은 함수가 시작될 때 처리된다. 변수가 끌어올려 지는 현상을 호이스팅이라고 부른다.

  ```jsx
  function sayHi() {
    phrase = "Hello";

    alert(phrase);

    var phrase;
  }
  sayHi();
  ```

<br>
<br>

### const

변화하지 않는 변수를 선언할 때는 const 를 사용한다.

```jsx
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";
```

<br>
<br>

## Scope

Scope 는 '유효 범위'라는 뜻. 변수의 접근할 수 있는 범위라고 할 수 있다.

- global (전역) : 어느 돗에서든지 해당 변수에 접근할 수 있다.
- local (지역) : 해당 지역에서만 접근할 수 있고, 지역을 벗어나면 접근이 불가하다.

자바스크립트에서 함수를 선언할 때마다 새로운 스코프를 생성하게 된다. 함수 몸체에 선언한 변수는 함수 몸체에서만 접근 가능. 이를 함수 스코프(function-scoped)라고 부른다

![scope.png](https://user-images.githubusercontent.com/37354708/115562360-5d3c8f00-a2f1-11eb-8424-4c04ff416141.png)

<br>
<br>

참조문헌

[https://ko.javascript.info/variables](https://ko.javascript.info/variables)

[https://ko.javascript.info/var](https://ko.javascript.info/var)

[https://medium.com/@yeon22/javascript-스코프-scope-란-bc761cba1023](https://medium.com/@yeon22/javascript-%EC%8A%A4%EC%BD%94%ED%94%84-scope-%EB%9E%80-bc761cba1023)
