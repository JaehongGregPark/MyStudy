
# Redux Saga에 들어가기에 앞서

Redux를 배울 때 reducer는 pure function이어야만 하며, reducer안에 api를 패치하거나 timer를 세팅하는 등의 비동기 작업을 행해서는 안된다고 했습니다.

<br>

Redux-saga는 redux의 middleware로써 위에서 언급한 side effects를 효율적으로 실행하고 관리할 수 있도록 해주며 테스트까지 용이하게 해줍니다.   
side effects를 시작, 중지 및 취소를 가능하게 하고 redux application state에 접근할 수 있으며 redux action을 dispatch 할 수도 있습니다.

<br>

Redux-saga는 ES6문법인  Generators를 사용해서 비동기 흐름을 관리하는데요, 이 흐름은 async/await 와 비슷하게 보이면서도 더 많은 기능을 가지고 있습니다.    
또한 redux-thunk와는 달리 calllback지옥에 빠지지 않습니다.

<br>

# Redux Saga 사용하기

redux-saga를 사용하기 위해서는 redux-saga 라이브러리를 설치해야합니다.   

```
npm i redux-saga
```
<br>

# Redux Saga 흐름

![1_zuYB7frl0mE7sMPVa6lGdQ](https://user-images.githubusercontent.com/53216594/115147246-18b4b780-a095-11eb-8bac-6d7600bae7b5.png)
(이미지 출처: https://levelup.gitconnected.com/react-native-redux-implementing-redux-saga-for-an-asynchronous-flow-90a0e9d7d8e8)

위의 이미지는 redux-saga의 흐름을 보여줍니다.   
Redux만을 사용할 때는, 우리가 action을 dispatch에 넘겨주면 reducer가 action을 받아서 바로 state를 업데이트해 주었습니다.

<br>

하지만 redux-saga를 사용하게 되면 Flow가 다음과 같아집니다.   

Redux action이 dispatch되면 ‘Watcher Saga’가 해당 action을 캐치하게 됩니다.   
그리고 Watcher Saga는 Worker Saga를 시행하는데, Worker Saga에 api call 등의 side-effect 관련 로직을 넣게 됩니다.   
api call 등의 request의 결과가 반환이 되면 그 결과를 우리는 action에 넘겨주고 dispatch하여 store을 업데이트 할 수 있습니다.   

<br>

예시 코드를 보면서 Redux Saga의 흐름을 살펴보겠습니다.    

### 예제 코드

이미 Redux 가 세팅된 환경에서 Redux-saga를 추가해보겠습니다.   
먼저 redux-saga와 redux store을 연결하겠습니다.   

redux-saga 라이브러리에서 createSagaMiddleware 를 불러옵니다.   

```javascript
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../reducer/user';

const reducer = combineReducers({
  users: userReducer
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]; // 배열에 넣어서 여러개의 middleware를 만들 수 있다.

const store = createStore(reducer, applyMiddleware(...middleware));
export default store;
```
createSagaMiddleware를 호출해서 sagaMiddleware라는 변수에 넣어주었습니다.   
그리고 sagaMiddleware를 배열에다가 넣어서 middleware를 선언해주었습니다.   

이때 middleware는 원하는 만큼 만들어서 넣을 수 있습니다.   
지금은 sagaMiddleware 하나뿐이지만 만약 middleware를 여러개 넣고 싶다면 배열 안에 더 넣어주면 됩니다.   

<img width="686" alt="스크린샷 2021-04-18 오후 10 51 32" src="https://user-images.githubusercontent.com/53216594/115148016-ab0a8a80-a098-11eb-9e2d-e1a3f3856f2a.png">

그 다음 redux에서 applyMiddleware를 불러옵니다.   
그리고 cresteStore의 인자로 applyMiddleware의 인자로 spread middlewares를 전해주었습니다.   

이렇게 store를 만들면서 reducer와 더불어 middleware를 추가할 수 있습니다.   

<br>

다음으로 우리는 Redux app의 background에 깔려서 action이 dispatch되는 것을 계속 주시해야하는 존재가 필요합니다.   
그것을 watcherSaga라고 부르는데, 이 watcherSaga를 만들어보겠습니다.   


```javascript
// src/redux/saga/rootSaga.js

import { takeLatest } from 'redux-saga/effects';
import { GET_USER } from '../action';

export function* watcherSaga() {
  yield takeLatest(GET_USER,  *Working Saga );
}
```

##### watcherSaga는 generator문법으로 작성해야합니다.   
watcherSaga는 Redux app의 background에 깔려서 action이 dispatch되는 것을 계속 주시한다고 말했습니다.   

위의 코드를 보면 takeLatest의 첫번째 인자로 GET_USER이 들어왔습니다.   
이것은 watcherSaga가 action이 dispatch되는 것을 계속 주시하다가,   
GET_USER라는 action이 dispatch 되면 그 action을 받고 Working Saga를 시행할 것이라는 걸 의미합니다.   

watcherSaga를 완성하기 위해서 Working Saga를 만들어보겠습니다.   

```javascript
// src/redux/saga/handlers/users.js

import { call, put } from 'redux-saga/effects';
import { setUser } from '../../action';
import { requestGetUser } from '../requests/user';

export function* handleGetUser(action) {
	try {
		const response = yield call(requestGetUser);
		const { data } = response;
		console.log('data', data)
		yield put(setUser(data));
	} catch(e) {
		console.log(e);
	}
}
```
##### worker saga 역시 generator문법으로 작성해야합니다.  

call은 redux-saga/effects의 api입니다.   
이 부분은 await과 비슷하게 작동을 하는데요, 바로 call에 들어간 요청(requestGetUser)이 끝날 때까지 기다립니다.

<br>

요청해서 받아온 데이터를 가지고 store를 업데이트 시켜야겠죠?   
여기서 우리는 put api를 사용하면 됩니다.   
yield put은 redux-saga가 redux에서 action을 dispatch하도록 해주는 방법입니다.   

yield put에 들어간 setUser(data)는 action creator(액션 생성자)로 action 파일에서 import해왔습니다.   
action 파일은 다음과 같이 생겼습니다.   

```javascript
// action/index.js

export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';

export const getUser = () => ({
  type: GET_USER
});

export const setUser = users => ({
  type: SET_USER,
  payload: users
});
```

action을 dispatch 했기 때문에 이제 action은 redux의 reducer로 넘어가서 store를 업데이트시킬 것입니다.   

```javascript
// reducer/user.js

import { SET_USER } from '../action';

const initialState = {
  users: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      const users = action.payload;
      return {
        ...state,
        users: [...initialState.users, ...users]
      };
    default:
      return state;
  }
}
```
<br>

이렇게 workerSaga를 완성해서 watcherSaga로 돌아와 import해주면 다음과 같이 됩니다.

```javascript
// src/redux/saga/rootSaga.js

import { takeLatest } from 'redux-saga/effects';
import { handleGetUser } from './handlers/user';
import { GET_USER } from '../action';

export function* watcherSaga() {
  yield takeLatest(GET_USER, handleGetUser);
}
```

이제 watcherSaga 가 완성이 되었습니다.   

이제 마지막으로 watcherSaga가 redux app의 background에 자리잡아 action이 dispatch되는 것을 계속 주시하도록 만들어야합니다.    
이를 위해 store 파일에 watcherSaga를 import해오도록 하겠습니다.   

(참고 takeLatest: https://github.com/redux-saga/redux-saga)

```javascript
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../reducer/user';
import { watcherSaga } from '../saga/rootSaga';

const reducer = combineReducers({
  users: userReducer
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]; // 배열에 넣어서 여러개의 middleware를 만들 수 있다.

const store = createStore(reducer, applyMiddleware(...middleware));
sagaMiddleware.run(watcherSaga); // run method를 사용해서 watcherSaga가 action dispatch를 주시하도록 만듭니다.   

export default store;
```
sagaMiddleware.run(watcherSaga)는 listener를 등록하는 것과 같다고 생각하시면 됩니다.   
앞으로  watcherSaga는 Redux app의 background에 깔려있는 것이고   
redux store에 action이 dispatch되는 것을 계속 주시하고 있을 것입니다.   

이제 위의 코드들을 시행해보겠습니다.   

```javascript
import './App.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './redux/action';

function App() {
  const users = useSelector(state => state.users);
  console.log('user state', users.users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className="App">
      {users.users.length > 0 ? (
        <div>
          {users.users.map(user => (
            <div key={user.id.toString()}>
              <h5>name: {user.name}</h5>
              <h5>username: {user.username}</h5>
              <h5>email: {user.email}</h5>
              <div>---------------------------</div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>No users</h3>
        </div>
      )}
    </div>
  );
}

export default App;
```
App 컴포넌트가 마운트되면 useEffect가 시행되면서 getUser() 액션생성자를 넘겨받은 dispatch가 시행됩니다.   
background에서 이를 주시하고 있던 watcherSaga는 action을 확인할 것입니다.   
action이 GET_USER라면 그 action을 받고 이어 Working Saga를 시행하여 api를 호출할 것입니다.    
Working Saga안에서 반환된 데이터는 put api를 통해 dispatch 되어 redecer를 거쳐 store를 업데이트하게 됩니다.   

결과 화면 입니다.   

<img width="1440" alt="스크린샷 2021-04-18 오후 11 57 27" src="https://user-images.githubusercontent.com/53216594/115150096-dc3b8880-a0a1-11eb-9a5b-1fff35dbe5ef.png">


(reference: https://github.com/redux-saga/redux-saga)
