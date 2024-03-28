# useReducer란?

useMemo는 React Hook의 한 종류이며, useState와 더불어 state의 상태를 업데이트해주는 기능을 합니다.

숫자를 하나씩 증가시키거나 감소시키고, 리셋할 수 있는 컴포넌트를 만든다고 가정해봅시다. useState를 사용한 경우 이렇게 코드를 짤 수 있습니다.

```javascript
import React, { useState } from 'react';

const UpdateNumber = () => {
  const [number, setNumber] = useState(0);

  const changeNumber = number => {
    setNumber(prevCount => prevCount + number);
  };

  const resetCount = () => {
    setCount(0);
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={() => changeCount(1)}>+</button>
      <button onClick={() => changeCount(-1)}>-</button>
      <button onClick={() => resetCount()}>Reset</button>
    </>
  );
};
```
   
이것을 한 단계씩 useReducer로 변경해보겠습니다.   
먼저 useReducer함수를 정의합니다. useState와 유사하게 useReducer는 initialValue를 인자값(두번째 인자값)으로 받습니다.   
   
```javascript
const UpdateNumber = () => {
  const [number, dispatch] = useReducer(reducer, 0);
  // state를 업데이트하기 위한 모든 로직을 담은 'reducer'함수, 그리고 initialValue를 인자값으로 넣어줍니다.
  // 그리고 dispatch 라는 함수를 반환합니다. 이는 reducer function을 호출하기위한 함수입니다.
  
  return (
    <>
      <span>{number}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </>
  );
};
```
useState와 유사하게 useReducer는 initialValue값을 인자값(두번째 인자값)으로 받습니다.   

반면 눈에 보이는 가장 큰 차이점은 'reducer'라는 함수를 인자로 넘겨주고 있다는 것입니다.   
그리고 useState에서 썼던 setNumber 대신에 'dispatch' 라는 함수를 반환합니다.   
dispatch 함수는 useReducer에다가 넘겨준 reducer function을 호출하기위한 함수입니다.   

reducer 함수에는 state를 업데이트하기 위한 모든 로직을 담게 됩니다.   
   
reducer 함수를 살펴보면 다음과 같습니다.

```javascript
const reducer = (number, action) => {
  // action은 dispatch에 넘겨주었던 인자. ex) dispatch({ type: 'increment' })
  // action 은 { type: 'increment' }

  switch (action.type) {
    case 'increment':
      return number + 1;
    case 'decrement':
      return number - 1;
    case 'reset':
      return 0
    default:
      return number;
  }
};
```

reducer 함수는 두개의 인자를 받습니다. 첫번째 인자는 현재 상태의 값, 즉 예제에서의 number 입니다.   
두번째 인자는 action인데 이것은 우리가 dispatch로 넘겨주는 인자가 될 것입니다.   
예를들어 dispatch에다가 { type: 'increment' }를 넘겨준다면 action은 { type: 'increment' }이 될 것이고, switch문에서 case 'increment'에서 걸려 상태를 +1 로 업데이트할 것입니다.   
이렇게 reducer함수는 상태를 업데이트할 수 있는 여러가지의 액션을 담고 있습니다.   


그렇다면 dispatch 함수는, 우리가 버튼을 클릭했을 때 호출하도록 만들면 되겠죠?   

아래에 완성된 코드입니다.

```javascript
import React, { useState, useReducer } from 'react';

const reducer = (number, action) => {
  switch (action.type) {
    case 'increment':
      return number + 1;
    case 'decrement':
      return number - 1;
    case 'reset':
      return 0
    default:
      return number;
  }
};

const UpdateNumber = () => {
  const [number, dispatch] = useReducer(reducer, 0);
  
  return (
    <>
      <span>{number}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </>
  );
};
```
이 과정을 한번 더 간단하게 정리하자면 이렇습니다.   
1. reducer함수를 선언하고 useReducer의 인자로 넘겨줍니다.   
2. initial value와 reducer함수를 인자로 받은 useReducer함수는 dispatch 함수를 반환합니다.   
3. dispatch 함수를 실행시키면 reducer함수를 호출합니다. 이때 dispatch의 인자로 { type: '조건' } 을 넘겨줍니다.  
4. { type: '조건' } 객체는 reducer함수의 action 값이 되고. type값에 따라서 업데이트를 시켜줍니다.   

그렇다면 useState와 useReducer 두개 다 똑같이 상태를 업데이트를 할 수 있는데 왜 분리해서 사용하는 것일까요?   

## useState와 useReducer 비교

사실 이 두개의 훅의 기능은 거의 똑같습니다. 따라서 무엇을 사용할지는 자신이 선택하면 됩니다.   
다만 각각의 hook을 사용하기 바람직하다고 여겨지는 상황이 존재합니다.  

<img width="786" alt="스크린샷 2021-03-31 오후 4 18 56" src="https://user-images.githubusercontent.com/53216594/113134050-53c48780-925b-11eb-8d52-7ad6fbb96f1b.png">
   
#### 1. complex state with hooks

복잡한 object state가 없을 때, 즉 관리하는 state 값이 원시값일 경우(i.e. a string, integer, or boolean) 는 useState hook을 사용하는 것이 낫다고 합니다.   
위의 예제에서 관리하는 상태값도 복잡하지 않은 숫자이기 때문에 useState를 사용하는 게 나을 수 있습니다. 

#### 2. multiple state transitions operate on one state object

```javascript
import React, { useState, useReducer } from 'react';
import Todo from './Todo';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
};

const reducer = (todos, action) => {
  console.log(action);

  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.title)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if(todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo =>  todo.id !== action.payload.id);
    default:
      return todos;
  }
};

const newTodo = (title) => {
  return { id: Date.now(), title, complete: false };
};

const todoApp = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState('');

  const handleSubmit  = e => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { title } });
    setTitle('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
      {todos.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      )}
    </>
  );
};

export default todoApp;
```
위의 코드는에서는 todo list를 ADD, TOGGLE 또는 REMOVE 할 수 있습니다.   
이렇게 하나의 state object 안에서 다양한 transition이 있을 수 있습니다.   
useReducer로 묶어서 하나로 관리하지 않고 useState를 사용하는 경우 가독성이 떨어지고 유지 보수가 어렵기 때문에 이러한 경우에는 useReducer를 사용하는 게 좋다고 합니다.   

#### 3. related state transitions

```javascript
const [state, dispatch] = useReducer(dataFetchReducer, {
  isLoading: false,
  isError: false,
  data: initialData,
});
```

```javascript
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
```
isLoading과 isError를 useState를 사용해서 state를 별도로 관리해야겠다고 생각할 수 있습니다.   
하지만 이 값들은 서로 조건부로 의존적이기 때문에 하나의 상태 객체에서 합쳐서 관리하는 게 좋다고 합니다.   

reference: https://blog.webdevsimplified.com/2020-06/use-reducer/,   
           https://www.youtube.com/watch?v=kK_Wqx3RnHk,   
           https://www.youtube.com/watch?v=3VClygDRSsU,   
           https://www.robinwieruch.de/react-usereducer-vs-usestate#when-to-use-usestate-or-usereducer   
