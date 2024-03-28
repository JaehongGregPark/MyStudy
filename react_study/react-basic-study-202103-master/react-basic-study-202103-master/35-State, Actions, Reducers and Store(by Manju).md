# Action, Reducer and Store

## 🤔 What is Redux?

- **`State Management Tool`** 상태를 관리 할 수 있는 도구로서 React와 같이 많이 쓰이지만 다른 javascript framwork나 library에서도 사용가능 합니다!!

- 여기서 State Management란 여러 state를 각각의 component에서 관리하지 않고 한 곳에서 관리하는 개념입니다.

 <br>

## 🤔 How Redux work

![image](https://user-images.githubusercontent.com/75834421/114713667-513e5380-9d6c-11eb-866a-6d50a8168e45.png)

- **action** : the only way you can send data from your app to your Redux `store` -> store밖에서 store에게 뭔가를 직접적으로 할 수 있는 유일한 수단이 바로 action입니다. 하지만 이 action도 store 내부의 state가 직접 수행하는 게 아니라 dispatch와 reducer로 수행됩니다.

- **reducer** : current state -> peform action -> new state 이러한 과정으로 reducer가 dispatch로 부터 확인된 action을 수행합니다.

  1. Action creator function 에서 Action의 type과 그 Action을 수행할 때 필요한 payload를 객체형태의 결과값으로 정의합니다.

     ```jsx
     export const increment = (num) => {
       return {
         type: "INCREMENT",
         payload: num,
       };
     };

     export const decrement = () => {
       return {
         type: "DECREMENT",
       };
     };
     ```

     <br>

  2. 원하는 Action을 정의하는 Action Creator Function을 dispatch로 호출합니다.

     ```jsx
     <button onClick={() => dispatch(increment(5))}>+</button>
     <button onClick={() => dispatch(decrement())}>-</button>
     ```

     <br>

  3. reducer는 dispatch가 호출한 Action Creator Fuction이 정의하는 Action type을 찾고, 해당하는 Action을 수행 => 기존의 state를 새로운 state로 update!

     ```jsx
     const counterReducer = (state = 0, action) => {
       switch (action.type) {
         case "INCREMENT":
           return state + action.payload;
         case "DECREMENT":
           return state - 1;
         default:
           return state;
       }
     };

     export default counterReducer;
     ```

     <br>

- **store** : 전체 App에서 딱 하나!만 만듭니다. 위의 그림처럼 App에서 사용되는 모든 state와 그 state를 바꿔 줄 수 있는 reducer를 포함합니다.

  ```jsx
  const store = createStore(allReducers);
  ```

<br>

## 😮 Example

<br>

- 먼저 current state와 action을 가지고 있는 `reducer`를 정의해 보아요!! counter를 담당하는 reducer와 login 상태를 담당하는 reducer 입니다.

  ![image](https://user-images.githubusercontent.com/75834421/114719120-b34d8780-9d71-11eb-997b-99f5e741883f.png)

  ```jsx
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + action.payload;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  };

  export default counterReducer;
  ```

  ```jsx
  const loggedReducer = (state = false, action) => {
    switch (action.type) {
      case "SIGN_IN":
        return !state;
      default:
        return state;
    }
  };

  export default loggedReducer;
  ```

  ⭐ store에는 하나의 reducer만 넣을 수 있어요! index.js파일에서 `combineReducers`를 이용해서 제가 정의한 두 reducer를 하나의 변수에 할당에 줍니다!

  ```jsx
  import counterReducer from "./counter";
  import loggedReducer from "./isLogged";
  import { combineReducers } from "redux";

  const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
  });

  export default allReducers;
  ```

    <br>

- 이번엔 dispatch를 통해 Action을 호출하면 reducer에서 찾을 수 있게 끔 `Action Creator Fuction`을 정의해 보아요!

  ```jsx
  export const increment = (num) => {
    return {
      type: "INCREMENT",
      payload: num,
    };
  };

  export const decrement = () => {
    return {
      type: "DECREMENT",
    };
  };

  export const logIn = () => {
    return {
      type: "SIGN_IN",
    };
  };
  ```

<br>

- 그리고 정의한 Action을 reducer로 수행할 `store`를 만듭니다! (같이 추가된 부분은 Redux-devtools를 쓰기위한 코드 입니다!)

  ```jsx
  const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  ```

- App이하의 component에서 모두 state에 접근할 수 있도록 **Provider compenent로 App component를 감싸주고 props로 생성한 store를 넣어줍니다!!**

  ```jsx
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  ```

<br>

- 마지막으로 App.js파일에서 실질적으로 store에 있는 state를 사용하고 dispatch로 action creator function을 호출해 볼게요!

  ```jsx
  import { useSelector, useDispatch } from "react-redux";
  import { increment, decrement, logIn } from "./actions";

  function App() {
    const counter = useSelector((state) => state.counter);
    const isLogged = useSelector((state) => state.isLogged);
    const dispatch = useDispatch();
    return (
      <div className="App">
        <h1>Counter {counter}</h1>
        <button onClick={() => dispatch(increment(5))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <h2>Toggle button for status...</h2>
        <button onClick={() => dispatch(logIn())}>Click Here!</button>
        {isLogged ? (
          <h3>Status: Logged In😆</h3>
        ) : (
          <h3>Status: Logged Out😥</h3>
        )}
      </div>
    );
  }

  export default App;
  ```

  => Redux-devTools로 직접 확인해보기!!

<br>

맨처음 보여드렸던 Redux의 작동 원리 그림에 저의 예를 집어넣어 봤어요!

![image](https://user-images.githubusercontent.com/75834421/114725747-b9466700-9d77-11eb-9975-aa1940a14fce.png)

<br>

## 🤔 Why Use Redux

- Redux makes the state **Predictable**

  : 같은 state와 action이 reducer를 통해 실행된다면 늘 같은 state로 update 됩니다. 이 말은 **reducer는 pure-function이라는 뜻입니다!** 따라서 우리는 어떤 state와 action을 안다면 다음 state를 예측할 수 있습니다!

- Redux is **Maintainable**

  : redux의 작동원리만 이해한다면 redux구조로 이루어진 App은 쉽게 파악이 가능합니다. => app의 구성을 잘 파악할 수록 더 잘 유지 할 수 있겠죠!? (app이 커질 수록 predictable하고 maintainable은 중요해집니다!!)

- **Debugging is easy** in Redux

  : devTool을 사용하면 bug가 어디서 나타나는지 더 쉽게 파악 가능합니다!

- **Performance** Benefit

  : state관리가 전부 중앙에서 이루어진다면, 어떤 state가 변했을 때, 그 state와 관련이 있는 component만 re-rendering해주면 됩니다!

- Ease of **Testing**

  : reducer는 pure-function이므로(= state를 완전히 바꿔 버리는 게 아님) test에 용이

- **State Persistence**

  : App의 일부 상태를 localstorage 에 저장 -> App 새로 고침 -> 전 상태 복원 가능!!

- Server-Side Rendering

  : 앱의 상태를 서버로 전송 -> 서버 요청에 대한 응답으로 초기 렌더링 처리 -> 필요한 구성요소는 HTML로 렌더링 -> client로 전송!(❔❔)

<br>

⭐⭐ 이렇게 많은 장점을 가지고 있지만, 위의 예제에서 볼 수 있는 것 처럼 간단한 app에서 Redux를 사용하게 되면 bolierplate가 늘어나면서 overwhelming 됩니다. 그러니 꼭 필요할 때 **(state가 너무 많아서 what happend/ how things change를 나눠서 생각하는 게 더 효율적일 때)** 사용하자! ⭐⭐

<br>

참고: <https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/#why>
