# Prototype in JavaScript

<br>

## 프로토 타입의 사전적 의미란?

원래의 형태 또는 전형적인 예, 기초 또는 표준이다. 프로토타입이라는 **원초적 형태**라는 뜻의 그리스어 낱말에서 왔다.

<br>
<br>

## javascript 에서의 프로토타입

javaScript는 클래스라는 개념이 없다. 그래서 기존의 객체를 복사하여 새로운 객체를 생성하는 프로토 타입 기반의 언어이다. 이렇게 생성된 객체 역시 또 다른 객체의 원형이 될 수 있다.

프로토 타입은 객체를 확장하고 객체 지향적인 프로그래밍을 할수 있게 해준다.

클래스가 없으니 상속기능이 없지만 프로토 타입을 기반으로 상속을 흉내내도록 구현해 사용한다.

<br>
<br>

## 프로토타입을 언제 사용할까?

함수(functioon)와 new 를 통해 클래스를 비슷하게 흉내낼 수 있다. 다음의 예시코드를 함께보자

```jsx
function Person() {
  this.eyes = 2;
  this.nose = 1;
}
var kim = new Person();
var park = new Person();
console.log(kim.eyes); // => 2
console.log(kim.nose); // => 1
console.log(park.eyes); // => 2
console.log(park.nose); // => 1
```

kim 과 park 는 eyes 와 nose를 공통적으로 가지고 있는데, 메모리에서 eyes 2개, nose 2개 총 4개를 할당하게 된다. 객체 100개가 생성되었다고 가정했을 때, 200개의 변수가 메모리에 할당될 것이다. 이런 문제를 프로토타입으로 해결 가능하다.

```jsx
function Person() {}
Person.prototype.eyes = 2;
Person.prototype.nose = 1;
var kim  = new Person();
var park = new Person():
console.log(kim.eyes); // => 2
...
```

Person.prototype에 값을 먼저 생성하고 new를 통해 객체를 생성할 때, 공통적으로 사용이 가능하다.

<br>
<br>

## Prototype의 구성

- Prototype Object
- Prototype Link

이 2가지를 통틀어 prototype 이라고한다.

<br>
<br>

## Prototype Object

객체는 언제나 함수로 생성된다. 아래와 같은 예시 코드는 함수와 상관없어보인다.

```jsx
const obj = {};
```

하지만 아래와 코드와 같다. Object는 자바스크립에서 기본적으로 제공하는 함수이다.

```jsx
const obj = new Object();
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7de0308e-c24b-4a5c-bbaf-009c353f076f/1_PZe_YnLftVZwT1dNs1Iu0A.png](https://user-images.githubusercontent.com/37354708/115987357-ab060f80-a5ef-11eb-8072-54fb5b66ce0d.png)

함수가 정의될때 2가지가 동시에 이루어진다.

<br>

### 1. 해당 함수에 생성자(Constructor) 자격 부여

Constructor 자격이 부여되면 new를 통해 객체를 만들어 낼 수 있게 된다. 함수만이 new 키워드를 사용할 수 있는 이유이다.

<br>

### 2. 해당 함수의 Prototype Object 생성 및 연결

함수를 정의하면 함수만 생성되는 것이 아니라 Prototype Object도 같이 생성된다. pototype의 속성을 통해 함수에서 prototype Object로 접근할 수 있다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/39473e4f-47ae-4458-80a7-9dfeed37a1fc/1_AJIDIoBFrGtUb8Nv-IonQg.png](https://user-images.githubusercontent.com/37354708/115987320-87db6000-a5ef-11eb-9de9-34e51f5456c0.png)

prototype Object는 일반적인 객체와 같으며, `constuctor` 와 `__proto__` \*\*\*\*를 가지고 있다.

- constructor: 함수를 가리킨다.
- **proto** : Prototype Link

위의 Person 코드를 다시 보자

```jsx
function Person() {}
Person.prototype.eyes = 2;
Person.prototype.nose = 1;
var kim  = new Person();
var park = new Person():
console.log(kim.eyes); // => 2
...
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18e6daa0-94a2-4ef6-b9af-0ad6dbd46cff/1_PLRkoBdVZv9vZW1Z4FlLJw.png](https://user-images.githubusercontent.com/37354708/115987399-dc7edb00-a5ef-11eb-9f1b-1f08c92a4752.png)

Person.prototype내부에 `constructor` 과 `__proto__`가 들어있는 것을 확인할 수 있고, `constructor`에 `{eyes:2, nose:1}`이 들어있는 것을 확인할 수 있다.

<br>
<br>

## Prototype Link

`prototype link`는 **객체가 생성될 때 조상이었던 함수**의 `Prototype Object`를 가리킨다.

kim 의 `__proto__`는 `Peron Prototype Object`를 가리키다.

![1_jMTxqTYDZGhykJQoimmb0A](https://user-images.githubusercontent.com/37354708/115987405-eb658d80-a5ef-11eb-9d60-37230c8cf91c.png)

kim 객체가 직접 eyes라는 속성을 가지고 있지 않기 때문에, 상위 프로토타입을 탐색한다. 최상위의 Object 의 Prototype Object 까지 도달했는데도 속성을 찾지 못했을 경우 undefined 를 반환한다.

<br>
<br>

## 프로토타입 체인

이렇게 프로토타입 링크를 통해 상위 프로토 타입과 연결되어있는 형태를 **프로토타입 체인**이라고 한다.

이런 프로토타입 체인 구조 때문에 모든 객체는 `Object`의 자식이라고 불리고 `Object prototype Object`에 속해있는 모든 속성을 사용할 수 있다. (toString 같은 함수)

<br>
<br>

출처

[https://medium.com/@bluesh55/javascript-prototype-이해하기-f8e67c286b67](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
