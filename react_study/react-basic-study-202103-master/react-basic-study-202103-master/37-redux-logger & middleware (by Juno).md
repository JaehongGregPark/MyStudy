# 37-Redux-logger & Middleware

## 🤷‍♀️ Middleware 란?

<br/>

> Redux에서의 Middleware는 액션이 디스패치(실행)되어 리듀서에서 처리하기전에 지정된 작업들을 의미합니다.  
> 액션과 리듀서 사이의 중간자라고도 할 수 있으며, 액션을 콘솔에 기록하고 액션취소, 다른 종류의 액션을 추가적으로 디스패치할 수 있습니다.
>
> Redux의 Middleware는 Redux-Saga, Redux-thunk가 있으나 직접 만들어보며 동작에 대한 이해를 해봅시다.

<br/>

## 📚 구조 알아보기

<br/>

&nbsp; 먼저 Middleware는 아래와 같은 템플릿을 가집니다.

<br/>

```js
const middleware = (store) => (next) => (action) => {
  // something working...
};
```

<br/>

&nbsp; 위의 형태가 난해하다면 function의 형태로 바꿔보겠습니다.

<br/>

```js
function middleware(store) {
  return function (next) {
    return function (action) {
      // something working...
    };
  };
}
```

<br/>

> **💡 자세히 알아보기**
>
> - `store`는 리덕스 스토어 인스턴스입니다. `dispatch`, `getState`, `subscribe` 내장함수가 있습니다.
> - `next`는 액션을 다음 미들웨어에게 전달하는 함수이며, `next(action)`형태로 사용합니다. 다음 미들 웨어가 없다면 `reducer`에게 액션을 전달합니다.
> - `action`은 현재 처리하고 있는 액션 객체 입니다.

<br/>

&nbsp; 구조로 알아 보자면 아래와 같습니다.

<br/>

<p align="center"><img src="https://miro.medium.com/max/2400/1*94LKNs35Z3GOZPhQ_Sd5qw.png"/></p>

<br/>

&nbsp; Middleware는 여러 개를 등록할 수 있습니다. 액션이 디스패치(실행)되면 미들웨어가 호출되고, Middleware에서 `next(action)`를 호출하게 되면 다음 미들웨어나 액션을 전달하며 만약 미들웨어에서 `store.dispatch`를 사용하면 다른 액션을 추가적으로 발생시킵니다.

<br/>

## 👀 코드로 알아보기

<br/>

&nbsp; 먼저 Middleware 생성을 위해 예시 코드를 작성해보겠습니다.

<br/>

### 📂 src>middlewares>myLogger.js

---

<br/>

```js
const myLogger = (store) => (next) => (action) => {
  console.log(action); // 액션출력
  const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션전달
  console.log(store.getState());
  return result; //반환값은 dispatch(action)의 결과물
};

export default myLogger;
```

<br/>

&nbsp; 다음 Middleware 적용하기 위해 스토어에 적용합니다. 이때 `applyMiddleware` 함수를 사용합니다.

<br/>

```js
import { applyMiddleware, createStore } from "redux";
import myLogger from "./middlewares/myLogger";

const init = {
  number: 0,
  diff: 1,
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "INCREASE":
      return { ...state, number: state.number + state.diff };
    case "DECREASE":
      return { ...state, number: state.number - state.diff };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(myLogger));

export default store;
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2InOz%2Fbtq2MzUPegD%2F8WV6kMbkUciLMmK12431j1%2Fimg.gif"/></p>

<br/>

&nbsp; 위와 같이 로깅을 하는 작업을 위해서는 직접 만드는 것 보단 redux-logger를 사용합니다.

<br/>

## 💾 Redux-logger 셋팅 및 사용

<br/>

&nbsp; 먼저 Redux-logger를 설치합니다.

<br/>

```bash
yarn add redux-logger
```

<br/>

&nbsp; 이후 store에 직접 작성했던 myLogger는 지워주고 설치한 logger를 적용합니다.

<br/>

```js
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

const init = {
  number: 0,
  diff: 1,
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "INCREASE":
      return { ...state, number: state.number + state.diff };
    case "DECREASE":
      return { ...state, number: state.number - state.diff };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger));

export default store;
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcOu8il%2Fbtq2RjQwn1r%2FhzBmeab3rFo0nylDp6dYJ1%2Fimg.gif"/></p>

<br/>

&nbsp; 위와 같이 로깅을 위한 작업이라면 redux-logger를 통하여 간단하게 사용할 수 있습니다.

<br/>

[Redux DevTool 적용하기](https://react.vlpt.us/redux-middleware/03-logger-and-devtools.html)

👋
