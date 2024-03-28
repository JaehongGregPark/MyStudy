# Redux의 State, Action, Reducers 그리고 Store

React에서 데이터가 한 방향으로만 prop으로 전달됨에 따라 발생하는 문제점들을 보완하고,   
global state를 사용하기 위해 Redux를 사용하게 되었습니다.   

<br>

Redux의 전반적인 flow를 알고, 어떻게 state를 관리하고 업데이트 하는지 알기 위해서 숙지해야 하는 개념이 actions 그리고 reducers 입니다.   

Todo Application을 만들어나가면서 Redux의 state, action, reducers 그리고 state를 저장하는 store 역시 살펴보도록 하겠습니다.   

Todo Application의 기능은 크게   

- todo item을 생성 및 삭제하는 기능
- All/Acive/Complete 세가지 옵션 중 하나를 선택하면 이 현재 옵션에 맞게 todo item을 필터링해서 보여주는 기능   

이러한 기능을 가지고 있다고 생각해봅시다.

<br>

## 1. State

React와 Redux에서는 state를 기반으로 UI가 그려지기 때문에 state의 값을 어떻게 설정하고, 어떤 구조로 만들어야할지가 중요합니다.   
Todo App 을 만들기 위해서 어떻게 state를 설계할지 고민해봅시다.   

화면에 바로 보이는 것은 Todo Items List, 그리고 filtering 기능인 All/Acive/Complete 옵션이 있을 것입니다.   

그리고 각각의 Todo Item은 그 안에 내용(text), 완수했는지의 여부, ID 값을 가지고 있을 것입니다.   

이 점을 염두에 두고 state를 설게해봅시다.   

여기서 반드시 기억해야할 것이 있습니다.   

##### Redux를 사용할 때 어플리케이션의 State 항상 Plain Javascript Object, 그리고 Array가 되어야한다는 것입니다.   
##### 즉 class Instances 를 써서도 안되고, JS 에 내장된 타입들(Map / Set Promise / Date, functions, or anything else) 역시 Plain JS data가 아니기 때문에 사용해서는 안됩니다. 

실제로 Redux State 를 보면 거의 모든 State가 다른 데이터가 중첩(nested) 되어있는 plain JS object 라고 합니다.   

```javascript
const todoAppState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Project', completed: false }
  ],
  filters: {
    status: 'Active'
  }
}
```
<br>

> * 어떤 값을 Redux State에 넣어야할까요? 그냥 React의 setState() hook을 사용하면 안될까요?   
> 여기에 답은 없습니다. 어떤 사람들은 자잘한 상태까지 Redux에서 관리하는 사람이 있는가 하면 그렇지 않은 사람도 있습니다.   
> Local Component State를 쓰는 것도 괜찮습니다. 
> 어떤 State를 Redux State에 넣을지 Local Component State에 넣을 지는 선택하기 나름이지만, Redux에 넣는게 바람직하다고 여겨지는 상황이 있습니다.   
> > * Do other parts of the application care about this data?
> > * Do you need to be able to create further derived data based on this original data?
> > * Is the same data being used to drive multiple components?
> > * Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
> > * Do you want to cache the data (ie, use what's in state if it's already there instead of re-requesting it)?
> > * Do you want to keep this data consistent while hot-reloading UI components (which may lose their internal state when swapped)?
> > 
>  (Reference: https://redux.js.org/faq/organizing-state)

<br>

## 2. Action

action은 type 속성을 가지고 있는 자바스크립트 객체입니다.   
action은 간단하게 이야기하잠면 `app에서 발생하는 작업`을 설명한다고 볼 수 있습니다.   

<br>

그렇다면 action을 작성하기 위해서 먼저 어플리케이션에 어떤 작업이 필요한지 생각해봅시다.   
- 사용자가 입력한 내용을 바탕으로 새로운 todo 만들어 추가하기
- Todo의 완료/미완료 상태 toggle하기
- Todo 삭제하기

<br>

이렇게 어플리케이션에서 이루어질만한 작업으로 action을 만들어주면 됩니다.   
그리고 type이외에 Extra data를 넣기 위해서는 action.payload 를 사용해서 넣어주면 됩니다.   

<br>

위의 내용들을 바탕으로 다음과같은 action이 만들어질 수 있습니다.

> redux actions example
> > * {type: 'todos/todoAdded', payload: todoText}
> > * {type: 'todos/todoToggled', payload: todoId}
> > * {type: 'todos/todoDeleted', payload: todoId}
> > * {type: 'filters/statusFilterChanged', payload: filterValue} 

<br>

## 3. Reducers

Reducers는 current state와 action을 인자로 받고, new state를 반환하는 함수입니다.   
간단하게 다음과 같이 표현할 수 있습니다.

<br>

```javascript
(state, action) => newState
```
<br>

### Root Reducer

redux를 사용할 때는 하나의  `root reducer function` 이 필요합니다.   
`root reducer function`은 나중에 createStore에 전달됩니다.   
이 함수는 dispatch 될 모든 action을 처리하고, 업데이트 될때마다 new state를 계산해줍니다.   

이렇게 보면 무슨 말인지 잘 와닿지 않을 수 있을 것 같아 예시를 보면서 설명해보겠습니다.   

<br>

일단 reducer 함수를 하나 만들어보겠습니다. 먼저 reducer.js file을 src 폴더 안에 만듭니다.   

모든 reducer는 initial state가 필요하므로 임시로 만든 초기값을 넣어주겠습니다.   

```javascript
// src/reducer.js

const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Project', completed: false }
  ],
  filters: {
    status: 'All'
  }
}

//반드시 초기값을 넣어주어야 합니다.

export default function appReducer(state = initialState, action) {

  // reducer는 어떤 action type이 들어오는지 주시합니다.
  switch (action.type) {
    // action값이 무엇이냐에 따라서 update가 이루어집니다.
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
```

<br>

일반적으로 reducer는 ES6의 default argument syntax를 사용해서 초기값을 써줍니다. (상태 = initialState, action)   
reducer에 들어온 action.type에는 특정한 action과 매치되는 문자열이 들어올 것입니다.   
그러고나면 action.type에 따라 새로운 state를 반환하게 될텐데 이때 업데이트 되지 않은, 즉 변화하지 않은 field 역시 포함해서 반환해주어야 합니다.   

위의 코드를 확장시켜보겠습니다.   

```javascript

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function appReducer(state = initialState, action) {

  switch (action.type) {

    case 'todos/todoAdded': {
      // We need to return a new state object
 
      return {
        // that has all the existing state data
        ...state,
       
        // but has a new array for the `todos` field
        todos: [
          // with all of the old todos
          ...state.todos,
          // and the new todo object
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false
          }
        ]
      }
    }
    default:
      return state;
  }
}
```

이렇게 하나의 todo item을 추가하는 것 뿐인데, 왠지 써놓고 보니 어렵고 지저분해보입니다.   
왜 이런식으로 업데이트해야 할까요?   

이렇게 해야만하는 이유가 reducer의 규칙에 설명되어있습니다.   

<br>

### Rules of Reducers

reducers를 만들 때 반드시 따라야하는 규칙이 있습니다.

- 오직 현재의 state와 action arguments 를 기반으로 new state를 계산해야 한다. (순수 함수여야 한다.)   
- state 자체를 변경해서는 안된다. 대신 state를 copy하고 그 복사한 값을 바꾸는 immutable update 를 해야한다.   
- 비동기 로직이나 side effects는 사용하면 안된다.   

<br>

> side effect
> "side effect" is any change to state or behavior that can be seen outside of returning a value from a function.
> Some common kinds of side effects are things like:
> 
> > * Logging a value to the console
> > * Saving a file
> > * Setting an async timer
> > * Making an AJAX HTTP request
> > * Modifying some state that exists outside of a function, or mutating arguments to a function
> > * Generating random numbers or unique random IDs (such as Math.random() or Date.now())

<br>

이러한 규칙을 지켜야하는 이유는 다음과 같습니다.

- Redux를 사용하는 목적 중 하나가 code를 Predictable하게 만드는 것이기 때문에, 순수함수를 사용해야 코드가 어떻게 작동하는지 더 예측하기가 쉬워진다.   
- 만약 함수가 외부 변수에 의존할 경우에는 결과가 어떻게 나올지 알 수 없게 된다.   
- 함수가 함수에 들어온 arguemts를 포함해서 다른 값을 수정하는 경우에는 어플리케이션이 예기치 않은 방향으로 시행될 수 있다.   
  그래서 state를 update했는데, UI는 업데이트 되지 않는 결과를 초래하는 경우가 있다.
- Redux DevTools 기능 중 reducers가 위의 규칙을 따르는지의 여부에 따라 성능에 영향을 준다.   

reducers 규칙에 하나만 더 추가하자면, 공식 문서에 나온 것 외의 규칙 중 reducer의 state값으로 undefined를 넘겨줄 수 없다고 합니다.   
그래서 최초의 state 값에 아무것도 주지 않으려면 undefined 대신 null을 사용해야 한다고 합니다.   

<br>

### Reducers and Immutable Updates

위에서나온 Immutable Updates에 대해 좀더 자세히 살펴보겠습니다. 

- mutation : modifying existing object/array values
- immutability: treating values as something that cannot be changed

<br>

```javascript
// mutation 

const state = { value : 1 };
state.value = 123;
```

redux에서 이렇게 변경하면 안되는 이유는 다음과 같습니다.   
- UI가 제대로 업데이트되지 않는 등의 버그   
- state가 왜, 그리고 어떻게 변경된건지 파악하기가 어려움   
- 추후에 Test를 작성하기 어려움   
- time-travel debugging 을 하기 어려워짐   
- redux의 의도된 목적과 사용 패턴에 어긋남   

<br>

따라서 앞서 이야기한 immutable update 방식으로 기존 값의 복사본을 반들고,   
그 복사본을 변경하는 방식으로 업데이트해야 합니다.   
가장 보편적이고 쉬운 방법은 spread operators를 사용하는 것입니다.

```javascript
// immutable update

return {
  ...state,
  value: 123
};
```
<br> 

하지만 데이터가 중첩되어 있을 수록 (nested) 이렇게 업데이트하기가 힘들어집니다.   
그래서 실제로 업무에서 사용할 때는 complex nested immutable updates를 위해서 Redux Toolkit을 사용한다고 합니다.    
(참고: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux )


### Splitting Reducers

Reducer 를 이어서 작성해봅시다.

```javascript

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false
          }
        ]
      }
    }
    case 'todos/todoToggled': {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload) {
            return todo
          }

          return {
            ...todo,
            completed: !todo.completed
          }
        })
      }
    }
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload
        }
      }
    }
    default:
      return state
  }
}
```

action이 3개밖에 없지만, 벌써 reducer함수가 많이 길어졌습니다.   
다른 action.type이 추가될 수록 가독성은 떨어질 것입니다.   
그래서 reducers를 쓸 때는 유지보수와 가독성을 위해서 여러개의 reducer함수들로 작게 나누어서 사용합니다.   

<br> 

이럴때에는 ‘기능’별로 나누어서 구성을 하면 됩니다.   
앞에서 우리는 todo app에 크게 2가지의 기능을 넣기로 했습니다.   

- todo item을 생성 및 삭제하는 기능 -> todosReducer
- All/Acive/Complete 세가지 옵션 중 하나를 선택하면 이 현재 옵션에 맞게 todo item을 필터링해서 보여주는 기능 -> filterReducer

그러면, 우리는 이 기능에 따라서 reducer를 2개로 분리할 수 있습니다.   
todosReducer, 그리고 filterReducer 이렇게 나눌 수 있겠죠?   

```javascript
//src/features/todos/todosSlice.js

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false
        }
      ];
    }
    case 'todos/todoToggled': {
      return state.map(todo => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed
        };
      })
    }
    default:
      return state;
  }
}
```

```javascript
//src/features/filters/filtersSlice.js

const initialState = {
  status: 'All'
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload
      };
    }
    default:
      return state;
  }
}
```
<br> 

### Combining Reducers

위에서 2개의 reducer로 나누어보았는데요, 아까 우리는 Redux store가 하나의 root reducer가 필요하다고 말했습니다.   

합치는 과정을 간단하게 하기 위해서 Redux library의 combineReducers 기능을 사용할 수 있습니다.   

```javascript
npm install redux
```
<br> 

Root redecer를 만들기 위해서 우선 각각의 slice reducer 를 import 해서 가져옵니다. 그리고 다음과 같이 적어주면 됩니다.   

```javascript
import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer
});

export default rootReducer
```

## 4. store

지금까지 state, actions, reducers에 관해서 알아보았는데요, store는 이들을 한데 모아주는 역할을 합니다.   
store이 하는 역할을 정리하자면 다음과 같습니다.   

* current application state 저장
* getState()를 통해 state에 접근 가능
* dispatch(action)를 통해 state를 업데이트
* subscribe(listener)를 통해 리스너를 등록

Redux에서는 오직 하나의 store만 있다는 것을 명심해야합니다.   
따라서 로직을 분리할 때는 여러 개의 store를 만들어서 분리하는 게 아니라 reducers를 분리해야합니다.   

<br> 

본격적으로 store를 만들어보겠습니다. redux library의 createStore API 를 사용해서 만들 수 있습니다.   

```javascript
//src/store.js

import { createStore } from 'redux';
import rootReducer from './reducer';

const store = createStore(rootReducer);

export default store;
```

먼저 src 폴더 안에 store.js 파일을 만들고, redux library에서 createStore 을 import해옵니다.   

아까 reducers 파트에서 우리는 combineRuducers 를 사용해서 여러 개의 reducers를 한데 모아 root reducer를 만들었습니다.   
root reducer역시 import 해옵니다.   

그리고 나서, createStore을 호출하는데 이때 root reducer를 인자로 넘겨줍니다.   

<br> 

### Loading Initial State

createStore()의 두번 째 인자로 preloadedState를 넘겨줄 수 있습니다.   
store가 생성되었을 때 initial data를 추가하기 위해 사용할 수 있습니다.   
예로 서버로부터 전송된 application의 상태와 일치하도록 클라이언트의 상태를 만들어줄 때 유용합니다.   
또는 사용자가 어떤 페이지를 다시 방문했을 때 localStorage에 저장되었던 값이 들어갈 수도 있습니다.   

```javascript
const store = createStore(todoApp, STATE_FROM_SERVER);
```
<br> 

### Dispatching Actions

이제 action을 dispatch해서 state를 업데이트할 수 있습니다.   

```javascript
import store from './store'

// Log the initial state
console.log('Initial state: ', store.getState()) //Log the initial state
// {todos: [....], filters: {status}}

const unsubscribe = store.subscribe(() => // 구독을 통해서 상태가 바뀔때마다 기록
  console.log(store.getState());
);
// Note that subscribe() returns a function for unregistering the listener


// dispatch(action)를 통해 state를 업데이트

store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' });
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' });
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' });
store.dispatch({ type: 'todos/todoToggled', payload: 0 });
store.dispatch({ type: 'todos/todoToggled', payload: 1 });
store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' });

unsubscribe(); // 구독 취소. 상태 변경을 더 이상 받아보지 않습니다.


// 구독 취소 이후 dispatch(action)을 한다면?
store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })
```
<br>

<img width="858" alt="스크린샷 2021-04-15 오후 3 47 25" src="https://user-images.githubusercontent.com/53216594/114826282-4504d580-9e02-11eb-9d06-37e2b3aaeafa.png">

<br>
이렇게 state가 업데이트 되는 것을 확인할 수 있습니다.   



reference: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers,   
https://redux.js.org/tutorials/fundamentals/part-4-store
