#### React.Memo는 **Props가 변경된 경우를 제외**하고는 모든 리렌더링을 막아준다.

> 1. (리액트는 기본적으로) <u>부모 컴포넌트가 리렌더링 되면 **자식 컴포넌트도 함께 리렌더링**</u> 되는데
> 2. 굳이 자식 컴포넌트까지 리렌더링 시킬 필요가 없다면
> 3. React.Memo를 통해 이를 막아줄 수 있다.
> 4. 즉, React.Memo를 사용할 경우, 부모 컴포넌트가 리렌더링 되더라도 자식 컴포넌트에 전달되는 Props에 변화가 없다면, 자식 컴포넌트는 리렌더링되지 않는다.







#### 예시로 React.memo 활용법 익히기

```jsx
import React from 'react';
const User = React.memo(function User({ user, onRemove, onToggle }) {
    // 👀컴포넌트 전체를 React.memo() 메서드의 인자로 전달하는 식으로 활용할 수 있다.
    // 👀이렇게 되면 User컴포넌트는 Props({user, onRemove, onToggle}) 값이 변경되지 않는 한
    // 👀리렌더링이 발생하지 않는다!
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
    // 👀아니면 선언한 컴포넌트를 React.memo의 인자로 전달해서 export하는 것도 한 방법입니다.

```









## 1. 언제 자식 컴포넌트의 리렌더링을 막아야 할까?

  가장 쉽게 생각할 수 있는 건 자식 컴포넌트가 정적인 컴포넌트인 경우이다. state나 life cycle에 따른 어떠한 변화 없이 고정된 뷰를 제공하는 정적인 컴포넌트는 굳이 리렌더링을 해줄 필요가 없기 때문이다.

>  😜정적인 컴포넌트의 예시

```jsx
import React from "react";
import "./styles.css";

const Header = () => {
  console.log("Header 렌더콜!");
  return (
    <div>
      <h1>헤더 컴포넌트에오~</h1>
      <h4>*^^*</h4>
    </div>
  );
};
// 글자만 몇개 보여주는 아주 정적인 컴포넌트이다.
// 이런 컴포넌트는 부모가 리렌더링되더라도 굳이 함께 리렌더링 될 이유가 없다.

export default React.memo(Header);

```






##  2.useCallback과 React.memo

1. useCallback은 컴포넌트가 리렌더링 될 때 <u>**함수가 다시 선언되지 않게**</u> 해주는 Hook이다.
2. 불필요한 함수의 재선언은 그 자체로도 리소스의 낭비지만,
3. 해당 함수를 props로 받는 **<u>자식 컴포넌트들의 불필요한 리렌더링</u>**을 발생시킨다.
4. 왜냐하면 React.memo를 사용한 컴포넌트도 props의 변화에는 리렌더링이 발생하기 때문이다.
5. 그래서 useCallback으로 불필요한 함수의 재선언을 방지해주는 것이 중요하다 할 수 있다.


## 3. useState의 함수형 업데이트를 쓰는 이유


```javascript
const [hearts, setHearts] = useState(["💕"]);

const addHeart = useCallback((event) => {
  event.preventDefault();
  setHearts([...hearts, "💕"]);
}, [hearts]);

// 위 예시는 hearts라는 State에 새로운 하트를 추가하는 함수이다.
// hearts는 state이기 때문에 최신의 hearts를 함수에 반영하기 위해
// hearts 값에 변화가 있을 때마다 addHeart함수를 재선언해야 한다.
// 이로 인해 의존성배열(deps)에 hearts가 들어가게 된다. 

```




```javascript
const [hearts, setHearts] = useState(["💕"]);

const addHeart = useCallback((event) => {
  event.preventDefault();
  setHearts((hearts) => {
    return [...hearts, "💕"];
  });
}, []);
 // 하지만 setState의 함수형 업데이트를 사용하면 이야기가 달라진다.
 //'setHearts' 에 전달되는 콜백함수의 파라미터에서 최신 `hearts` 를 참조 할 수 있기 때문에 
 //`의존성배열` 에 `hearts` 를 넣지 않아도 된다. 
//즉 함수의 재선언이 필요 없어지고, 해당 함수를 props로 전달받는 컴포넌트들의 리렌더링도 방지할 수 있다.

```



https://codesandbox.io/s/12-reactmemo-fr79h?file=/src/App.js

위의 예시를 참고해보세요!
