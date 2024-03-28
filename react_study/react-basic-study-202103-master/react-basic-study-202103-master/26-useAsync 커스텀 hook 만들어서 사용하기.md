### Axios이해하기



> npm i axios





```javascript
import axios from 'axios';

axios({
  url: '/user/12345',
  method: 'put',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

axios.put('/user/12345', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})

//위 둘은 근본적으로 같은 내용

```

1. Axios는 서버 요청을 위한 라이브러리.
2. url, method 등을 객체에 담아 axios함수의 인자로 전달.

```javascript
import axios from 'axios';

axios({
  url: '/user/12345',
  method: 'get',
}) //💕axios()는 프로미스를 반환하는 비동기함수 .then이나 async, await 등으로 이어 갈 수 있음
  .then((response) => {
    consol.log(response.data);
}) //💕요청에 대한 응답의 내용은 .data 프로퍼티에 담김.
```



![image](https://user-images.githubusercontent.com/75282888/114001115-98bd6f00-9896-11eb-8fcc-a2cd6352f0ba.png)


```javascript
import axios from 'axios';
axios({
  method: "get",
  url : "http://opentutorials.org:3000/main?id=HTML&page=12",
});
//💕위와 아래는 근본적으로 같은 모양
axios({
    method: 'get',
    url:"http://opentutorials.org:3000/main",
    params : {
        id: 'HTML',
        page: 12,
    },
});


```



상당히 잘 정리된 곳이 있어 남겨보겠음!

https://xn--xy1bk56a.run/axios/guide/api.html#http-%EB%A9%94%EC%84%9C%EB%93%9C-%EB%B3%84%EC%B9%AD

https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/GET



### 커스텀 훅 useAsync만들기

> 📂/useAsync.js

```jsx
import { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
} //😂 LOADING/ SUCCESS / ERROR라는 3단계로 액션을 구분하고 그 상황에 따라 State를 변경함.
// 

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false, //로딩 여부,
    data: null, // API를 통해 우리가 받을 데이터 // API는 보통 JSON형태로 정보를 주고 받음!,
    error: false // 에러 여부,
  }); // useReducer 호출

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();// 콜백으로 전달되는 함수가 반환하는 값을 data에 담고
      dispatch({ type: 'SUCCESS', data });//SUCCESS타입의 액션을 발생시킴 
        //(data를 객체에 동봉) 
    } catch (error) {
      dispatch({ type: 'ERROR', error: error });//
    } // 에러가 날 경우 error객체를 함께 전달 
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData]; //state{loading, data, error}와 fetchData함수를 반환
}

export default useAsync;

```



### useAsync를 활용해서 API 요청하기

>  📂/Users.js

```jsx
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
} // axios를 통해 get 요청을 보내는 함수...

function Users() {
  const [state, refetch] = useAsync(getUsers, [], true);

  const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users;
```



예제코드) https://codesandbox.io/s/agitated-resonance-fuh8p

