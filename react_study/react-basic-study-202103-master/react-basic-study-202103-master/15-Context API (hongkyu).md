###  😘Context API란 무엇인가?



> 1. 프로젝트 안에서 상태, 값, 함수 등을 전역적으로 사용할 수 있게 해준다.
> 2. 조부모 컴포넌트로 부터 값을 전달 받고자 할 경우, Props를 사용하면 부모컴포넌트를 경유해서 값을 전달받아야 한다. 하지만 Context API를 사용하면 (부모 컴포넌트를 경유하지 않고)조부모로 부터 직접 전달받을 수 있다.



![image](https://user-images.githubusercontent.com/75282888/113104241-439cb000-923b-11eb-98db-adceb36202a3.png)




🎉 코드샌드박스 참조하기 : https://codesandbox.io/s/stoic-glitter-v6xqj?file=/src/App.js




> 📁/src/App.js


```jsx

import React, { useState } from "react";
import Baby from "./Baby";
import "./styles.css";

export const UserContext = React.createContext(null);
//😁 React.createContext를 호출하고
//😁 반환한 값을 export 해줍니다.
//😁 이렇게 하면 UserContext.Provider라는 컴포넌트를 생성할 수 있습니다.

export default function App() {
  const [hearts, setHearts] = useState([]);
  const addHearts = (event) => {
    event.preventDefault();
    setHearts([...hearts, "💖"]);
  };
  return (
    <UserContext.Provider value={{ hearts, addHearts }}>
      {/* 😁 UserContext.Provider 컴포넌트를 만들고 */}
      {/* 😁 value 속성값으로 전역적으로 관리하고 싶은 값을 넣습니다.*/}
      {/* 😁 값, 변수, 상태, 함수 다 좋습니다. */}
      {/* 😁 UserContext.Provider의 자손(자식, 조손, 증조손, 고조손 모두!) 컴포넌트들은  */}
      {/* 모두 value속성에 전달된 값에 접근할 수 있습니다. */}
      <div>
        <p> - App - </p>
        <Baby />
      </div>
    </UserContext.Provider>
  );
}

```




> 📁/src/Baby.js

```jsx

import React from "react";
import BabyOfBaby from "./BabyOfBaby";
import "./styles.css";

export default React.memo(function Baby() {
  console.log("Baby렌더콜");
  return (
    <div>
      <p>- Baby -</p>
      <BabyOfBaby />
    </div>
  );
});

```


> 📁/src/BabyOfBaby.js



```jsx


import React, { useContext } from "react";
import "./styles.css";
import { UserContext } from "./App";
// 😁 App 컴포넌트에서 선언했던 UserContext를 Import합니다.

export default function BabyOfBaby() {
  const context = useContext(UserContext);
  // 😁 useContext함수를 호출하고 앞서 Import한 UserContetxt를 인자로 전달합니다.
  // 😁 이렇게하면 useContext함수는
  // 😁 App.js의 <UserContext.Provider>컴포넌트의 value속성값을 리턴합니다.
  // 😁 저희는 {hearts, addHearts} 객체를 value값으로 넣어줬지요?
  //
  console.log("BabyOfBaby 렌더콜");
  return (
    <div>
      <p>- BabyOfBaby -</p>
      <p>{context.hearts}</p>
      {/* 😁 App.js에서 생성한 상태 함수 등을 사용할 수 있습니다. */}
      <button onClick={context.addHearts}>하트 추가</button>
    </div>
  );
}

```

