## 리덕스의 비동기 처리

<br>
<br>
리덕스에서 비동기 처리를 위해 가장 보편적인 방법은 Redux Thunk 미들웨어를 사용하는 것이다. 이 미들웨어를 사용함으로써, 액션 생산자는 액션 객체 대신 함수를 반환할 수 있다.

Thunk 미들웨어만이 비동기 액션을 통제하는 방법은 아니다. 그 외의 방법 예시는 아래와 같다

- [redux-promise](https://github.com/redux-utilities/redux-promise) 나 [redux-promise-middleware](https://github.com/acdlite/redux-rx)
- [redux-rx](https://github.com/acdlite/redux-rx)를 통해 옵서버에 보낼 수 있다.

<br>

아래의 사진은 npm에서의 미들웨어 다운로드 추이를 알 수 있는 표이며, thunk 가 압도적으로 많다.

![redux-middleware.png](https://user-images.githubusercontent.com/37354708/115146655-5fed7900-a092-11eb-88e7-989d70f2135e.png)

<br>
<br>

## 비동기 흐름

---

미들웨어가 없다면, redux는 동기 데이터 흐름만 지원한다. createStore()의 기본값이다.

applyMiddleware()를 사용하서 createStore() 를 비동기 액션으로 편리하게 표현할 수 있다.

비동기 미들웨어 저장소의 dispatch()를 감싸서 액션이 아니라 함수를 보낼 수 있게 해준다. 이들웨어는 무엇이든 받가서 해석한 다음 테인의 다음 미들웨어로 액션을 넘긴다.

<br>
<br>

## 리덕스 Thunk

---

## 리덕스 Thunk 란?

리덕스에서 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어이다. 이를 사용하면 액션 객체가 아닌 **함수를 디스패치** 할 수 있다.

### 설치법 & 셋업하기

<br>

```bash
yarn add redux-thunk
```

<br>

설치가 완료 되면 `applyMiddleware(thunk)` 를 사용하여 비동기 식으로 액션을 디스패치할 수 있다.

```jsx
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const store = createStore(rootReducer, applyMiddleware(thunk));
```

<br>
<br>

## Redux Thunk 사용하기

숫자가 증가하고 감소하는 카운터 기능을 만들어보자

thunk 함수를 만들고, setTimeout 를 사용하여 액션이 디스패치 되는 것을 1초씩 딜레이 시켜보자

<br>

### counter.js

`increaseAsync` 와 `decreaseAsync` 라는 Thunk 함수를 만든다.

```jsx
// 액션 타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//Thunk 함수
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 1000);
};

//Thunk 함수
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(decrease()), 1000);
};

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
```

<br>

### CounterContainer.js

```jsx
import React from "react";
import Counter from "../components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { increaseAsync, decreaseAsync } from "../modules/counter";

function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}

export default CounterContainer;
```

전체코드 예시)

[https://codesandbox.io/s/1df47?file=/src/modules/counter.js:318-322](https://codesandbox.io/s/1df47?file=/src/modules/counter.js:318-322)
