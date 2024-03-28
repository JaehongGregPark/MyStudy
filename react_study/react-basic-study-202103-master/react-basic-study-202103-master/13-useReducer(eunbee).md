# useReducer

- useReducer를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트와 분리시킬 수 있다.
  <br>
  <br>
  상태를 업데이트 하는 방법 중 하나는 `useState`를 사용해 컴포넌트 내부에서 상태 관리를 하는 것이었다. <br>
  하지만 `useReducer`를 사용하면 컴포넌트 외부에서도 상태 관리를 할 수 있다.

<br>

## reducer 란?

현재 상태(state)와 액션 객체(action)를 파라미터로 받아와서 새로운 상태(state)를 반환해주는 함수를 말한다.

```jsx
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  switch (action.type) {
    case "INCREMENT":
      return state + 1; //컴포넌트가 지닐 새로운 상태
    case "CHANGE_INPUT":
      return state; //컴포넌트가 지닐 새로운 상태
    default:
      return state; //컴포넌트가 지닐 새로운 상태
  }
}
```

`function reducer(state, action)`에서 `action`은 업데이트를 위한 정보를 가지고 있다. <br>
액션에 대한 예시는 아래와 같다.

<br>
<br>

## action의 예시(type을 지닌 객체 형태)

```jsx
// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// 카운터에 1을 빼는 액션
{
  type: 'DECREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```

<br>
<br>

## useReducer의 사용방법

<br>

![sample](https://user-images.githubusercontent.com/37354708/113119714-b7df4f80-924b-11eb-9fca-c31359727ef7.png)

### 기존코드 counter.js

```jsx
import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0); //컴포넌트 내부에서 state 값을 관리

  const onIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const onDecrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

<br>
<br>

### reducer 적용 코드 Counter.js

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- state : 컴포넌트에서 사용할 수 있는 상태
- dispatch :액션을 발생시키는 함수
- useReducer의 첫번째 파라미터 : reducer 함수
- useReducer의 두번째 파라미터 : 초기상태

<br>

```jsx
import React, { useReducer } from "react";

//컴포넌트 외부에 reducer 함수 작성
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: "INCREMENT" });
  };

  const onDecrease = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

<br>
<br>

## useReducer vs useState - 어떤 걸 써야할까?

- 컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자,문자 boolean 일경우

  →useState 추천

- 컴포넌트에서 관리하는 값이 여러개, 복잡한 경우

  → useReducer 추천

<br>
<br>
