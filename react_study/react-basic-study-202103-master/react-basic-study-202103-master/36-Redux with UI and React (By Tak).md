# Redux With UI and React

Redux는 별개의 JS library입니다.

흔히들 redux와 react를 일심동체라고 생각 하실 수도 있지만, 

**Nope!**

둘은 천상의 짝짝궁이라 생각하시면 됩니다.

![image](https://user-images.githubusercontent.com/77006427/114722526-d4fc3e00-9d74-11eb-88f8-7f6b6cee8853.png)

Redux는 Redux입니다.  

단지 UI library나 framework에 잘 맞는 좋은 친구라 생각하셔요!!  

그럼 Redux랑 친구가 되는 과정을 살펴봐야됩니다. (React -> 본인)

친구가 되기 위해서는 일단 말이 통해야겠죠?

```bash
npm install react-redux
```

소통을 도와주는 도구를 설치해줍니다.  

우리 redux 친구는 참 착한 친구입니다.  

제가 어떤 메모를 적든 변경하든 다 기억을 해주는 찐친이거든요.  

단지 이 친구를 잘 구슬려서 사용하는 방법을 알아야됩니다.  

우리 redux 친구는 저랑 공유하는 비밀 노트(store)가 있습니다.

제가 비밀노트에 메모를 작성하면, 이 친구가 들고 있는 비밀 노트에 적혀져있는거에요.


우리의 비밀노트에 뭐가 적혀있는지 우선 알아야 되겠죠?

이 때 `react-redux` 에서 제공해주는 custom hook인 `useSelector`를 사용합니다.

> src/features/todos/TodoList.js
```bash
import React from 'react'

import { useSelector } from 'react-redux'

import TodoListItem from './TodoListItem'

const selectTodos = state => state.todos

const TodoList = () => {
  const todos = useSelector(selectTodos)

  // todos는 배열입니다. 반복문 X가능.
  const renderedListItems = todos.map(todo => {
    return <TodoListItem key={todo.id} todo={todo} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
```

노트에 적혀져있는 `todos`를 가져와서 todos라는 variable에 선언할거에요!

이제 todos가 무엇인지 알았으니, 제 그림판에 최근 작성한 `todos`를 그대로 그려줄 수 있는거에요.

헉!

그럼 우리 비밀노트에 todo를 추가할려면 어떻게 해야될까요?

이때 바로 또 다른 custom hook인 `useDispatch`를 사용해줄거에요.
> dispatch 뜻: (특히 특별한 목적을 위해) 보내다[파견하다] 혹은 발송하다 


내가 다 적었으니, 이 문구를 우리 redux친구에게 비밀노트에 넣어달라고 해주는거에요.

야 redux!  
나 이 문구(`action payload`) 보내줄건데(`dispatch`),  
이건 `todoAdded`라는 `action type`을 가지고 있으니, 
비밀노트(`store`)의 `todo`에 넣어놔야돼!  
알겠지 너만 믿는다!

> src/features/header/Header.js
```bash
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [text, setText] = useState('')
  
  const dispatch = useDispatch()

  const handleChange = event => setText(event.target.value)

  const handleKeyDown = event => {
    const trimmedText = event.target.value.trim()
    
    // 엔터를 친다면!
    if (event.key === 'Enter' && trimmedText) {
      //todos/todoAdded라는 타입과 trim된 text를 payload를 발송
      dispatch({ type: 'todos/todoAdded', payload: trimmedText })
      
      // Text는 지웁니다.
      setText('')
    }
  }

  return (
    <input
      type="text"
      placeholder="무엇을 적어볼까유?"
      autoFocus={true}
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Header
```

> reducer.js
```bash
import { combineReducers } from 'redux'

import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
})

export default rootReducer

```
> todosReducer.js
```bash
const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false,
        },
      ]
    }
    ...
    default:
      return state
  }
}
```

자 이러면 redux라는 친구와 왠만하게 제가 원하는 메세지가 전달해서 착착 알려줄거같죠?

**Nope!**

마지막으로 우리는 react-redux가 제공해주는 `Provider`를 사용해서,  
우리의 찐친 redux와 공유하는 비밀노트(store)가 무엇인지 설정해줘야되요.

> index.js
```bash
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import App from './App'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

>store.js
```bash
import { createStore } from 'redux';

import rootReducer from './reducer';

const store = createStore(rootReducer);

export default store;
```



자 이렇게 최상단 `index.js` Provider를 넣어주면,   
우리가 어는 그림판을 가든, 비밀노트를 관리 할수 있습니다. ^^7  

#### 헐 그럼 비밀노트에 모든 것을 적어야 되나요?  

![image](https://user-images.githubusercontent.com/77006427/114728456-12af9580-9d7a-11eb-955e-a04e7d73ba87.png)

아닙니다!

아래와 같은 상황일때 redux라는 친구를 사용하면 좋아요.

- 어플리케이션의 다른 파트에서도 이 데이터를 활용을 하는지?
- store에 있는 데이터로 파생 데이터를 만드는지?
- 동일한 데이터가 복수의 컴포넌트들에 구동을 하는지?

이 외에도 어떤 상황일 떄 사용하는지에 대해 궁금하다면 [공식문서 tip](https://redux.js.org/tutorials/fundamentals/part-5-ui-react#global-state-component-state-and-forms)를 참고해주세요!

간단하게 생각하면 로그인된 유저의 정보가 한편의 예시가 되겠죠?

모든 state를 redux에서 관리하는게 아닙니다!

local에서만 필요한 경우, useState를 쓰셔도 무방 합니다!

위의 todos에 관한 코드를 보고싶다면,  
공식문서에 제공하는 [샌드박스 예시](https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-4-initialHooks/?from-embed=&file=/src/features/todos/TodoList.js)를 참고해주세요!

See Also:
- [Redux | UI and REACT](https://redux.js.org/tutorials/fundamentals/part-5-ui-react)




