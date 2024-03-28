## React.memo 란?

- Hooks 중 하나의 함수
- 리랜더링이 필요한 상황에서만 리랜더링을 하도록 설정해준다.
- 컴포넌트의 props가 바뀐 경우에만 리랜더링

<br>
<br>

## 다음의 화면에서 리랜더링이 언제 어느부분에 일어나야 할까?

![react-memo.png](https://user-images.githubusercontent.com/37354708/112747369-04c6ea00-8ff0-11eb-9338-a4734344be73.png)

### 리랜더링이 일어나야하는 순간

- 사용자가 등록/수정/삭제 되었을때

### 리랜더링이 일어나면 안되는 순간

- input 에 수정사항이 생길때

<br>
<br>

## React.memo 사용법

### CreateUser.js

```jsx
import React from "react";

const CreateUser = ({ username, email, onChange, onCreate }) => {
  return <div>...</div>;
};

export default React.memo(CreateUser); //React.memo 로 감쌌다
```

### UserList.js

UserList 와 User 컴포넌트도 적용한 예시

```jsx
import React from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
  //React.memo 로 감쌌다
  return <div>...</div>;
});

function UserList({ users, onRemove, onToggle }) {
  return <div>...</div>;
}

export default React.memo(UserList); //React.memo 로 감쌌다
```

<br>
<br>
<br>

## UserMemo 적용 결과

input 을 수정할 때 리랜더링이 되지 않는다.

user 중 하나다로 수정한다면, 모든 User 들이 리랜더링 되고 CreateUser도 리랜더링이 된다 .

→ users 배열이 바뀔때마다 onCreate , onToggle, onRemove 도 새로 만들어진다. (비효율적)

→ deps 에서 참조하고 있는 값을 지우고, 함수형 업데이트를 사용한다.

```jsx
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));

  setInputs({
    username: "",
    email: "",
  });
  nextId.current += 1;
}, [users, username, email]); //deps 에 users 포함

const onRemove = useCallback(
  (id) => {
    setUsers(users.filter((user) => user.id !== id));
  },
  [users], //deps 에 users 포함
);
const onToggle = useCallback(
  (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  },
  [users], //deps 에 users 포함
);
```

<br>
<br>

## 함수형 업데이트를 사용하기

setUsers 에 등록하는 콜백함수의 파라미터에서 최신 users를 참고할 수있기 때문에 deps에 users를 넣지 않아도 된다.

- App.js - onCreate 함수

```jsx
const onToggle = useCallback((id) => {
  setUsers((users) =>
    users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user,
    ),
  );
}, []); //전
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));

  setInputs({
    username: "",
    email: "",
  });
  nextId.current += 1;
}, [users, username, email]); //deps 에 users 포함

//후
const onChange = useCallback((e) => {
  const { name, value } = e.target;
  setInputs((inputs) => ({
    ...inputs,
    [name]: value,
  }));
}, []);
```

- App.js - onRemove 함수

```jsx
const onRemove = useCallback(
  (id) => {
    setUsers(users.filter((user) => user.id !== id));
  },
  [users], //deps 에 users 포함
);

//후
const onRemove = useCallback((id) => {
  setUsers((users) => users.filter((user) => user.id !== id));
}, []);
```

- App.js - onToggle 함수

```jsx
// 전
const onToggle = useCallback(
  (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  },
  [users], //deps 에 users 포함
);

// 후
const onToggle = useCallback((id) => {
  setUsers((users) =>
    users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user,
    ),
  );
}, []);
```

<br>
<br>

## 공식문서

`React.memo`는 [고차 컴포넌트(Higher Order Component)](https://ko.reactjs.org/docs/higher-order-components.html)입니다.

> 고차 컴포넌트(HOC, Higher Order Component)는 컴포넌트 로직을 재사용하기 위한 React의 고급 기술입니다. 고차 컴포넌트(HOC)는 React API의 일부가 아니며, 리액트의 구성적 특성에서 나오는 패턴입니다.

당신의 컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, `React.memo`를 호출하고 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상을 누릴 수 있습니다. 즉, React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용합니다.

`React.memo`는 props 변화에만 영향을 줍니다. `React.memo`로 감싸진 함수 컴포넌트 구현에 `[useState](https://ko.reactjs.org/docs/hooks-state.html)`, `[useReducer](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)` 또는 `[useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)` 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링됩니다.

props가 갖는 복잡한 객체에 대하여 얕은 비교만을 수행하는 것이 기본 동작입니다. 다른 비교 동작을 원한다면, 두 번째 인자로 별도의 비교 함수를 제공하면 됩니다.

이 메서드는 오직 **`성능 최적화`**를 위하여 사용됩니다. **`렌더링을 “방지”하기 위하여 사용하지 마세요**.` 버그를 만들 수 있습니다.

<br>
<br>

출처

[https://ko.reactjs.org/docs/react-api.html#reactmemo](https://ko.reactjs.org/docs/react-api.html#reactmemo)
