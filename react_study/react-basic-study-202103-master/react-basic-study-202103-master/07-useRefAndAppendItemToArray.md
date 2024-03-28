

# 1.9 useRef로 컴포넌트 안의 변수 만들기 

앞서 공부한 useRef의 용도로는 컴포넌트에서 특정 DOM을 선택하는 것 말고도 <u>**다른 용도**</u>가 있습니다.

바로 <u>컴포넌트안에서 조회 및 수정할 수 있는 **변수**를 관리하는 것</u>입니다. 

> (state 혹은 상태라고 표현하지 않고 변수라고 표현한 이유는 조금 아래서 다뤄보겠습니다!)



<br>
<br>

![image](https://user-images.githubusercontent.com/75282888/112091516-e8364680-8bd8-11eb-8f08-95256bbdcb23.png)

### 1. 그냥 변수를 쓰면 안 돼?🤔

   컴포넌트 안에서 const나 let 등으로 생성되는 '일반적인' 변수는 <u>리액트가 렌더링 될 때마다 **초기값으로** 돌아갑니다.</u> 변수값을 변경하더라도 그 값을 UI상으로 표현하기 위해 랜더링하면 그 순간 변수값은 초기화되어 버리는 것입니다. useRef로 생성한 변수는 컴포넌트가 리렌더링 되어도 그 값이 초기화되지 않습니다.

   


<br>

### 2. 그럼 그냥 useState를 써도 되는 거 아니야?🤔

  앞서 useState를 통해 생성한 값은 상태 혹은 State라고 하는 반면 왜 useRef로 생성한 값은 변수라고 하는 걸까요? 이 둘의 차이는 바로 컴포넌트의 렌더링 여부입니다. useState의 경우, setState를 통해 해당 State값을 갱신하면, 컴포넌트 전체가 다시 렌더링 됩니다. 반면 <u>useRef는 해당 변수값을 바꿔도 **컴포넌트가 리렌더링되지 않습니다**.</u>  




<br>
<br>
<br>


# 1.10. 배열에 항목 추가하기

![img](https://i.imgur.com/vF7iAbP.png)

> 이번에는 배열에 항목을 추가하는 기능을 구현해보겠습니다 😊
>
> App컴퍼넌트에 onCreate함수를 구현하고, Props를 통해 CreateUser컴퍼넌트에
>
> 해당함수를 전달하고자 합니다:D
>
> 또한 앞서 공부한 useRef()를 통해 컴퍼넌트 안에서 관리되는 id변수를 만들어보고자 합니다:)

<br>
<br>
<br>
<br>

>  ### 📂/src/App.js

```jsx
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4);
    //🎈여기가 중요한 부분! useRef를 통해서 컴퍼넌트 안에서 변수를 생성하고 있음...
    //🎈useRef에 인자로 전달된 4는 nextId.current의 기본값이 됨.
    //🎈nextId.current를 변수처럼 사용하면 됨.
    //🎈nextId.current의 값을 변경해도 컴퍼넌트의 리렌더링은 일어나지 않음. (state와의 차이점)
    //🎈다른 이유에 의해 리렌더링이 일어나도 nextId.current의 값은 일반변수(const, let)처럼 초기화되지도 않음.
    
  const onCreate = () => { //🎈 onCreate함수를 통해 배열에 항목을 추가할 것임.
    const user = {//🎈 user변수는 users배열에 새로 추가할 객체
      id: nextId.current, //🎈 user.id는 next.current가 전달됨.
      username,
      email
    };
    setUsers(users.concat(user)); 
      //🎈 concat메서드는 통해 기존 users에 앞서 선언된 user객체가 더해진 '새로운 객체'를 반환함. 
      //🎈 push메서드와의 차이인데 아주 중요함!
      //🎈 concat메서드가 익숙하지 않다면 [...users, user]를 전달할 수도 있음! (spread연산자)

    setInputs({
      username: '',
      email: ''
    }); //🎈 배열에 새로운 항목을 추가가 완료되었으니 입력창을 비워줘야 함!
    nextId.current += 1; 🎈그리고 nextId.current값에는 1을 더해줌!
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate} //🎈onCreate함수는 props로서 CreateUser컴퍼넌트로 전달됨!
      />
      <UserList users={users} />
    </>
  );
}

export default App;
```


>  ### 📂/src/CreateUser.js
```jsx
import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button> {/*🎈App 컴퍼넌트로부터 onCreate가 전달됨*/}
    </div>
  );
}

export default CreateUser;

```


>  ### 📂/src/UserList.js
```jsx

import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} /> {/*🎈배열을 렌더링 할 땐 배열안의 컴퍼넌트에 key라는 props를 넣어줘야함*/}
      ))}
    </div>
  );
}

export default UserList;
```
<br>
<br>
<br>
<br>

# 1.11. 배열에 항목 제거하기

> 배열에 항목을 제거하는 기능을 만들어 보겠습니다!
>
> App컴퍼넌트에 onRemove함수를 구현하고, Props를 통해 User컴퍼넌트로 전달하겠습니다!

![img](https://i.imgur.com/FmnSHXf.png)

>  ### 📂src/UserList.js
```jsx
import React from 'react';

function User({ user, onRemove }) { //🎈onRemove가 App컴퍼넌트로부터 전달됨...
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button> 
          {/*🎈onRomove함수가 담긴 삭제버튼을 만들었습니다*/}
    </div>
  );
}

function UserList({ users, onRemove }) {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} onRemove={onRemove} /> {/* onRemove함수를 User로 전달 */}
      ))}
    </div>
  );
}

export default UserList;
```

>  ### 📂src/App.js
```jsx

import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
//😘onRemove() 함수를 통해 배열의 항목을 제거합니다!
  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} />
    </>
  );
}

export default App;
```

<br>
<br>
<br>
<br>


# 1.12. 배열 항목 수정하기

>  이번에는 username을 눌렀을 때 색이 바뀌는 toggle기능을 구현해보겠습니다!

![img](https://i.imgur.com/jbBMq3J.png)

> 😘먼저 App컴퍼넌트에 onToggle함수를 구현하고, Props를 통해 User컴퍼넌트에 해당 함수를 전달하겠습니다!



>  ### 📂src/App.js
```jsx
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  };
    
    //😘아래와 같이 onToggle함수를 추가하고, UserList컴포넌트를통해 User컴퍼넌트로 전달합니다.
  const onToggle = id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;
```


>  ### 📂src/UserList.js
```jsx

import React from 'react';

function User({ user, onRemove, onToggle }) {
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
}

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

export default UserList;

```







