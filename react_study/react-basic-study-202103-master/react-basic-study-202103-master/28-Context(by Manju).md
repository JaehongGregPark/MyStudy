# Context in React

## 🤔 Why we use Context?

<br>

![image](https://user-images.githubusercontent.com/75834421/113876415-b2a57600-97f2-11eb-9ad2-c58671115b0a.png)

React는 원래부터 component로 잘게 쪼개서 하나의 큰 어플리케이션을 을 만들 수 있는 Library(혹은 Framwork..?) 입니다. 위의 그림 처럼, 각각의 component에 공통적인 state가 필요할 때 모든 components를 포함하는 아주 큰! super big component으로 싸서 관리하면 됩니다!

<br>

![image](https://user-images.githubusercontent.com/75834421/113877433-aa9a0600-97f3-11eb-895d-3aea71fb588c.png)

그럼 이렇게 깊게 component가 구성되어 있을 땐 어떻게 해야 할까요?보통 부모 component에서 정의한 state를 자식 component에서도 사용하기 위해선 props로 전달해 주어야합니다. big component(파란색) 에서 정의한 상태를 주황색 동그라미에서 쓰려면 너무나 많은, props 전달 만을 위한 component들이 필요해집니다!! 여기서 필요한게 바로 **Context**입니다.

<br>

![image](https://user-images.githubusercontent.com/75834421/113878246-652a0880-97f4-11eb-952f-b90aa413528a.png)

각 component에 필요한 state(data) 들을 한 곳에 모아두고, 필요할 때마다 불러오고, 사용하는 component안에서 새로운 상태로 대체할 수 있습니다. 이렇게 React에서 **state managemen를 가능하게 해주는 것이
`Context`**라고 할수 있습니다.

<br>

<br>

## 🤔 How to use Context

<br>

> **Context와 자주 같이 쓰이는 useReducer!**
>
> 가장 많이 쓰이고 유명한 useState대신에 useReducer을 쓴다는 건 그만큼 관리해야하고 사용하는 state가 많다는 의미입니다. 즉, 많은 state를 한 곳에서 편하게 관리 할 수 있는 Context와 같이 쓰면 매우 편리합니다!!
>
> - `reducer` function : reducer function에서 반환되는 object가 새로운 state로서의 object로 **대채**됩니다.
>
> - `dispatch` : reducer function이 state와 action을 가지고 다시(새롭게) 실행하게 끔 만들어 줍니다! (=> 이로 인해 실행되는 reducer함수의 return 값이 state로 대채되는 것!!)
>
> <br>

<br>

<br>

### 👀 Example(To do List)

<br>

- Context를 생성하는 component

  ```jsx
  import React, { createContext, useReducer, useContext } from "react";
  import reducer, { initialState } from "./reducer";

  // todolist를 만들기 위한 data box = context 만들기
  const ToDosContext = createContext();

  const ToDosProvider = ({ children }) => {
    // dispatch와 reducer로 state를 관리할 useReducer
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <ToDosContext.Provider value={{ state, dispatch }}>
        {children}
      </ToDosContext.Provider>
    );
  };

  // useDispatch와 useState를 사용해서 다른 component에서
  // TodoContext에 있는 state나 dispatch를 사용하기
  export const useDispatch = () => {
    const { dispatch } = useContext(ToDosContext);
    return dispatch;
  };

  export const useState = () => {
    const { state } = useContext(ToDosContext);
    return state;
  };

  export default ToDosProvider;
  ```

<br>

- 새로운 상태를 반환해줄 reducer function

  ```jsx
  import uuid from "uuid/v4";
  import { ADD, COMPLETE, DEL, UNCOMPLETE } from "./actions";

  export const initialState = {
    toDos: [],
    completed: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ADD:
        return {
          ...state,
          toDos: [...state.toDos, { text: action.payload, id: uuid() }],
        };
      case DEL:
        return {
          ...state,
          toDos: state.toDos.filter((toDo) => toDo.id !== action.payload),
        };
      case COMPLETE:
        const target = state.toDos.find((toDo) => toDo.id === action.payload);
        return {
          ...state,
          toDos: state.toDos.filter((toDo) => toDo.id !== action.payload),
          completed: [...state.completed, { ...target }],
        };
      case UNCOMPLETE:
        const aTarget = state.completed.find(
          (toDo) => toDo.id === action.payload
        );
        return {
          ...state,
          completed: state.completed.filter(
            (toDo) => toDo.id !== action.payload
          ),
          toDos: [...state.toDos, { ...aTarget }],
        };

      default:
        return;
    }
  };
  ```

<br>

- Context에서 state를 가져다 쓰는 App.js

  ```jsx
  import React from "react";
  import { useState } from "../context";
  import Add from "./Add";
  import List from "./List";
  import ToDo from "./ToDo";

  //useState로 toDos와 completed를 정의함으로서
  //context(data box)안에 정의되어 있는 state = { toDos, completed} 를 사용할 수 있음!
  function App() {
    const { toDos, completed } = useState();
    return (
      <>
        <Add />
        <List name={"To Do"}>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} id={toDo.id} text={toDo.text} />
          ))}
        </List>

        <List name={completed.length !== 0 ? "Completed" : ""}>
          {completed.map((toDo) => (
            <ToDo
              key={toDo.id}
              id={toDo.id}
              text={toDo.text}
              isCompleted={true}
            />
          ))}
        </List>
      </>
    );
  }

  export default App;
  ```

    <br>

- Context에서 dispatch를 가져다 쓰는 ToDo.js

  ```jsx
  import { COMPLETE, DEL, UNCOMPLETE } from "../actions";
  import { useDispatch } from "../context";

  const ToDo = ({ text, id, isCompleted }) => {
    const dispatch = useDispatch();
    return (
      <li>
        <span>{text}</span>
        <span
          role="img"
          aria-label=""
          onClick={() => dispatch({ type: DEL, payload: id })}
        >
          ❌
        </span>
        <span
          role="img"
          aria-label=""
          onClick={() =>
            dispatch({ type: isCompleted ? UNCOMPLETE : COMPLETE, payload: id })
          }
        >
          {isCompleted ? " 🙅🏼‍♂️" : "✅"}
        </span>
      </li>
    );
  };

  export default ToDo;
  ```

<br>

- Provider로 App component 감싸주기! (`이 App component에서 내가 정의한 TodoContext라는 data box를 사용할 수 있다`의 의미)

  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import App from "./components/App";
  import ToDosProvider from "./context";

  ReactDOM.render(
    <ToDosProvider>
      <App />
    </ToDosProvider>,
    document.getElementById("root")
  );
  ```

  <br>

## 🤔 How to use Context with API

<br>

1. Context를 사용하기 위한 준비!(Context만들기)

   ![image](https://user-images.githubusercontent.com/75834421/113894839-59920e00-9803-11eb-9540-7ee8bef0ff73.png)

   ```jsx
   // State 용 Context 와 Dispatch 용 Context 따로 만들어주기
   const UsersStateContext = createContext(null);
   const UsersDispatchContext = createContext(null);

   // 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
   export function UsersProvider({ children }) {
     const [state, dispatch] = useReducer(usersReducer, initialState);
     return (
       <UsersStateContext.Provider value={state}>
         <UsersDispatchContext.Provider value={dispatch}>
           {children}
         </UsersDispatchContext.Provider>
       </UsersStateContext.Provider>
     );
   }

   // State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
   export function useUsersState() {
     const state = useContext(UsersStateContext);
     if (!state) {
       throw new Error("Cannot find UsersProvider");
     }
     return state;
   }

   // Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
   export function useUsersDispatch() {
     const dispatch = useContext(UsersDispatchContext);
     if (!dispatch) {
       throw new Error("Cannot find UsersProvider");
     }
     return dispatch;
   }
   ```

<br>

2.  API 처리 함수 만들기

    ```jsx
    import React, { createContext, useReducer, useContext } from "react";
    import axios from "axios";

    export async function getUsers(dispatch) {
      dispatch({ type: "GET_USERS" });
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        dispatch({ type: "GET_USERS_SUCCESS", data: response.data });
      } catch (e) {
        dispatch({ type: "GET_USERS_ERROR", error: e });
      }
    }

    export async function getUser(dispatch, id) {
      dispatch({ type: "GET_USER" });
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        dispatch({ type: "GET_USER_SUCCESS", data: response.data });
      } catch (e) {
        dispatch({ type: "GET_USER_ERROR", error: e });
      }
    }
    ```

     <br>

3.  Context 사용하기!

    ```jsx
    import React from "react";
    import Users from "./Users";
    import { UsersProvider } from "./UsersContext";

    function App() {
      return (
        <UsersProvider>
          <Users />
        </UsersProvider>
      );
    }

    export default App;
    ```

    <br>

4.  User와 Users component

    ![image](https://user-images.githubusercontent.com/75834421/113897269-aaa30180-9805-11eb-874a-94d49c948ffb.png)

    참고: <https://react.vlpt.us/integrate-api/05-using-with-context.html>

<br>

⭐ 이렇게 Context는 React의 간단한 앱 또는 API로 data를 가져와서 사용할 때 유용합니다. 여기서 state 더 많아지고, 그 state를 자주 바꿔서 대체해줘야 된다면 **Redux** 사용을 추천!
