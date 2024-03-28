# 37. redux-logger & 미들웨어

## 1. 미들웨어란?

리덕스 미들웨어는 리덕스가 지니고 있는 핵심 기능이다. Context API 또는 MobX를 사용하는 것과 차별화되는 부분인데, 미들웨어는 액션이 디스패치되어서 리듀서에서 이를 처리하기 전에 사전에 지정된 작업들을 설정한다. 즉, 액션과 리듀서의 사이의 중간자라고 생각하면 된다.

![middleware](https://user-images.githubusercontent.com/65386533/115142986-940b6e80-a07f-11eb-8fee-363a0b6b6a30.png)

- 특정 조건에 따라 액션이 무시되게 만들 수 있다.
- 액션을 콘솔에 출력하거나, 서버쪽에 로깅을 할 수 있다.
- 액션이 디스패치 됐을 때, 이를 수정해서 리듀서에서 전달되도록 할 수 있다.
- 특정 액션이 발생했을 때 이에 기반해서 다른 액션이 발생되도록 할 수 있다.
- 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있다.

보통 리덕스에서 미들웨어를 사용하는 주된 목적은 비동기 작업을 처리할 때 이다. 예를 들어 리액트 앱에서 우리가 만약 백엔드 API를 연동해야 된다면, 리덕스 미들웨어를 사용하여 처리하곤 한다. 비동기 작업에 관련된 미들웨어 라이브러리로는 `redux-thunk`, `redux-saga`, `redux-observable`, `redux-promise-middleware` 등이 있다.

`redux-saga`, `redux-observable`의 경우엔 특정 액션을 모니터링 할 수도 있으므로, 특정 액션이 디스패치됐을 때 원하는 함수를 호출하거나, 또는 라우터를 통해 다른 주소로 이동하는 것이 가능한다.

## 2. 미들웨어 사용법

작동방식을 이해하기 위해 미들웨어를 만들어 보자. 미들웨어 선언은 아래와 같이 한다.

**📂 src > lib > loggerMiddleware.js**

```jsx
const loggerMiddleware = (store) => (next) => (action) => {
  /* 미들웨어 내용 */
};
```

여기서 `next`는 `store.dispatch`와 비슷한 역할을 하는데, 차이점은 `next(action)`을 했을 때에는 바로 리듀서로 넘기거나, 혹은 미들웨어가 있다면 다음 미들웨어 처리가 되도록 진행한다. 하지만 `store.dispatch`의 경우에는 처음부터 다시 액션이 디스패치되는 것이기 때문에 현재 미들웨어를 다시 한번 처리하게 된다.

![middleware2](https://user-images.githubusercontent.com/65386533/115142988-953c9b80-a07f-11eb-9140-7b4570d855c6.png)

```jsx
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('현재 상태', store.getState()); // 현재 스토어 상태값 기록
  console.log('액션', action); // 액션 기록

  const result = next(action); // 액션을 다음 미들웨어, 혹은 리듀서로 넘김
  console.log('다음 상태', store.getState()); // 액션 처리 후의 스토어 상태 기록
  console.log('\n'); // 기록 구분을 위한 비어있는 줄 프린트

  return result; // 여기서 반환하는 값은 store.dispatch(ACTION_TYPE) 했을때의 결과로 설정됩니다
};

export default loggerMiddleware; // 불러와서 사용 할 수 있도록 내보내줍니다.
```

미들웨어는 store를 생성할 때 설정하는데, redux 모듈 안에 들어있는 `applyMiddleware`를 사용하여 설정할 수 있다.

**📂 src > store.js**

```jsx
import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import loggerMiddleware from './lib/loggerMiddleware';

// 미들웨어가 여러개인경우에는 파라미터로 여러개를 전달해주면 됩니다. 예: applyMiddleware(a,b,c)
// 미들웨어의 순서는 여기서 전달한 파라미터의 순서대로 지정됩니다.
const store = createStore(modules, applyMiddleware(loggerMiddleware));

export default store;
```

**📂 src > modules > index.js**

```jsx
import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({
  counter,
});
```

**📂 src > modules > counter.js**

```jsx
import { handleActions, createAction } from 'redux-actions';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

export default handleActions(
  {
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1,
  },
  0
);
```

![loggerMiddleware-preview](https://user-images.githubusercontent.com/65386533/115142989-953c9b80-a07f-11eb-88c3-e030ba535e5b.gif)

## 3. redux-logger

실제 프로젝트를 작업할 때는 미들웨어를 직접 만들어서 사용하는 경우는 그렇게 많지 않고, 대부분의 경우에는 다른 프로그래머들이 이미 만들어 놓은 미들웨어를 사용한다. 방금 만들었던 미들웨어의 경우에는 redux-logger를 활용할 수 있다.

> 만약 Redux DevTool을 사용한다면 redux-logger는 사실 쓸모가 없는데, Redux DevTool이 이미 그 기능을 갖추고 있으면서 훨씬 강력하기 때문이다. 하지만 Redux-DevTool을 사용하지 못하는 환경이라면 redux-logger는 매우 유용한 미들웨어이다.

### 3.1 사용법

```jsx
yarn add redux-logger
```

우선 미들웨어를 먼저 설치를 한다.

**📂 src > store.js**

```jsx
import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import { createLogger } from 'redux-logger';

/* 로그 미들웨어를 생성 할 때 설정을 커스터마이징 할 수 있다.
   https://github.com/evgenyrodionov/redux-logger#options
*/
const logger = createLogger();

const store = createStore(modules, applyMiddleware(logger));

export default store;
```

![redux-logger-preview](https://user-images.githubusercontent.com/65386533/115142990-95d53200-a07f-11eb-96f6-36bb9cbe4317.gif)

---

- 참고

  [https://react.vlpt.us/redux-middleware/](https://react.vlpt.us/redux-middleware/)

  [https://redux-advanced.vlpt.us/1/01.html](https://redux-advanced.vlpt.us/1/01.html)

  [https://redux-advanced.vlpt.us/1/02.html](https://redux-advanced.vlpt.us/1/03.html)

  [https://redux-advanced.vlpt.us/1/03.html](https://redux-advanced.vlpt.us/1/03.html)
