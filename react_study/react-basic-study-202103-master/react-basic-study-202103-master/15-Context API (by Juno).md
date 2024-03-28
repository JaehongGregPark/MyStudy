# 15-Context API

## 🙏 Context API란?

<br/>

> 리액트 16.3부터 정식 릴리즈된 컴포넌트의 레벨과는 상관없이 props를 자유롭게 사용가능하게하는 Hooks이며 state management입니다.

<br/>

## 1. 😋 맛보기

<br/>

&nbsp; 아래와 같은 컴포넌트 구조를 가진 사이트가 있다고 가정하여봅시다.

<br/>

<p align="center"><img src="https://i.imgur.com/tmOeRAT.png"/></p>

<br/>

&nbsp; state의 value값을 보여주는 컴포넌트는 F와 J라고 가정하고 값을 변화시키는
이벤트는 G 컴포넌트에서 발생한다는 가정 할 경우 value는 F컴포넌트까지 해당 value를 사용하지도 않는 A,B라는 컴포넌트의 props를 거쳐야합니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FKq24c%2Fbtq1tCegRlf%2FkU8KWl6XOi2XgbycSL2VG0%2Fimg.png"/></p>

<br/>

&nbsp; handleSetValue()또한 A, B, E 컴포넌트동안 props를 전달받아야 최종 G컴포넌트에 전달이 됩니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnTZrJ%2Fbtq1yXVKTbG%2FColU6Mwd1JnL5jzQ2XFwQ0%2Fimg.png"/></p>

<br/>

&nbsp; 이러한 문제점을 해결 해주는 Hooks가 바로 Context API입니다.

<br/>

<p align="center"><img src="https://i.imgur.com/iyNKCIz.png"/></p>

<br/>

&nbsp; Context API는 사실 단순 `props drilling`을 해결하기 위한 솔루션이였으며 지금은 기존의 state management대체제로도 많이 활용 되고있습니다.

<br/>

[참고](https://tsh.io/state-of-frontend/#future-of-frontend)

<br/>

### 👀 코드로 알아보기

---

<br/>

&nbsp;전체의 파일 구조는 아래와 같습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FejGw65%2Fbtq1z3IaguX%2FhVLLgxlU0HYJaFVyR5vDHK%2Fimg.png"/></p>

<br/>

> **🔑 Key Point**  
> context API는 4가지의 용어가 나옵니다.
>
> 1. createContext(defalutValue) - context API를 사용하기 위한 선언입니다.
> 2. Context.Provider - 제공자 즉, 사용할 state를 제공해줍니다.
> 3. Context.Consumer - 사용자,소비자 즉, 데이터를 사용할 주체입니다. Provider의 상태를 바라보고있습니다.
> 4. useContext(Context) - 사용하고자 하는 Context의 value에 접근합니다.
>
> 이러한 용어들이 나올것이며 중점으로 보시면 됩니다.

<br/>

### 📂 src>App.js

---

<br/>

&nbsp;테스트를 위하여 App.js의 코드는 아래와 같습니다.

<br/>

```js
import React from "react";
import NumberProvider from "./provider/NumberProvider";
import ThemProvider from "./provider/ThemProvider";
import Page from "./routes/Page";

const App = () => {
  return (
    <ThemProvider>
      <NumberProvider>
        <Page />
      </NumberProvider>
    </ThemProvider>
  );
};
export default App;
```

<br/>

```js
import React from "react";
import Button from "../components/Button";
import Content from "../components/Content";
import Header from "../components/Header";

const Page = () => {
  return (
    <div>
      <Header />
      <Button />
      <Content />
    </div>
  );
};

export default Page;
```

<br/>

&nbsp; 해당 컴포넌트는 Route의 역할만 하고있으며 어떠한 props도 받지 않고있습니다.

<br/>

### 📂 src>context>NumberContext.js

---

<br/>

&nbsp; 먼저 number값을 변경하는 예시를 알아 보겠습니다. NumberContext의 코드는 아래와 같습니다.

<br/>

```js
import { createContext } from "react";

const NumberContext = createContext({
  number: 0,
  increase: () => {},
  decrease: () => {},
});

export default NumberContext;
```

<br/>

&nbsp; createContext()를 사용하였고 기본 value값들을 가지고있습니다.

<br/>

### 📂 src>provider>NumberProvider.js

---

<br/>

&nbsp; NumberProvider의 코드는 아래와 같습니다.

<br/>

```js
import React, { useState } from "react";
import NumberContext from "../context/NumberContext";

const NumberProvider = ({ children }) => {
  const increase = () => {
    setNumber((prevState) => {
      return {
        ...prevState,
        number: prevState.number + 1,
      };
    });
  };

  const decrease = () => {
    setNumber((prevState) => {
      return {
        ...prevState,
        number: prevState.number - 1,
      };
    });
  };

  const initialState = {
    number: 0,
    increase,
    decrease,
  };

  const [number, setNumber] = useState(initialState);

  return (
    <NumberContext.Provider value={number}>{children}</NumberContext.Provider>
  );
};

export default NumberProvider;
```

<br/>

&nbsp; createContext()를 사용하였기때문에 NumberContext.Provider를 사용 할 수 있게 되었고 value라는 props에 number를 담고있으며 number는 위에서 명시한 number, increase, decrease를 담고있습니다.

<br/>

### 📂 src>components>Header.jsx

---

<br/>

&nbsp; Header컴포넌트의 코드는 아래와 같습니다.

<br/>

```js
import React, { useContext } from "react";
import NumberContext from "../context/NumberContext";
import ThemBtn from "./ThemBtn";

const Header = () => {
  const value = useContext(NumberContext);

  return (
    <>
      <div>{value.number}</div>
      <ThemBtn />
    </>
  );
};

export default Header;
```

<br/>

&nbsp; 해당 컴포넌트에는 저희가 변경할 number의 값을 보여줄것이며 useContext(NumberContext)를 사용함으로써 value값을 접근 할 수 있게 됩니다.

<br/>

### 📂 src>components>Button.jsx

---

<br/>

&nbsp; Button컴포넌트의 코드는 아래와 같습니다.

<br/>

```js
import React, { useContext } from "react";
import NumberContext from "../context/NumberContext";

const Button = () => {
  const { increase, decrease } = useContext(NumberContext);
  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
};

export default Button;
```

<br/>

&nbsp; number를 변경할 버튼 두개를 가지고 있으며 useContext(NumberContext)를 사용함으로써 value값을 접근 할 수 있게 됩니다.

<br/>

<p align="center"><img src="https://blog.kakaocdn.net/dn/cBHIpu/btq1zsIh4G2/kLkILYkDrMIZv3e4Mwd9k1/img.gif"/></p>

<br/>

&nbsp; 여기서 Context API의 장점을 눈치 채셨나요? 분명 Header이나 Button컴포넌트는 아무 props를 전달 받지 않았는데도 state에 변화를 주고있습니다.

<br/>

### 📂 src>context>ThemContext.js

---

<br/>

&nbsp; 이번엔 them의 state를 변경해보도록 하겠습니다. ThemContext의 코드는 아래와 같습니다.

<br/>

```js
import { createContext } from "react";

const ThemContext = createContext({
  them: "light",
  onClick: () => {},
});

export default ThemContext;
```

<br/>

&nbsp; NumberContext의 구조와 마찬가지로 createContext()를 사용하고 기본 value값을 가지고잇습니다.

<br/>

### 📂 src>provider>ThemProvider.js

---

<br/>

&nbsp; ThemProvider 코드는 아래와 같습니다.

<br/>

```js
import React, { useState } from "react";
import ThemContext from "../context/ThemContext";

const ThemProvider = ({ children }) => {
  const onClick = () => {
    setThem((prevState) => {
      return {
        ...prevState,
        them: prevState.them === "light" ? "dark" : "light",
      };
    });
  };

  const init = {
    them: "light",
    onClick,
  };

  const [them, setThem] = useState(init);
  return <ThemContext.Provider value={them}>{children}</ThemContext.Provider>;
};

export default ThemProvider;
```

<br/>

&nbsp; ThemContext.Provider를 사용하여 value라는 props에 them을 담고있으며 them은 위에서 명시한 them, onClick를 가지고있습니다.

<br/>

### 📂 src>components>ThemBtn.jsx

---

<br/>

&nbsp; them의 state를 변경할 ThemBtn컴포넌트의 코드는 아래와 같습니다.

<br/>

```js
import React, { useContext } from "react";
import ThemContext from "../context/ThemContext";

const ThemBtn = () => {
  const { onClick } = useContext(ThemContext);

  return <button onClick={onClick}>them</button>;
};

export default ThemBtn;
```

<br/>

&nbsp; useContext(ThemContext)를 사용함으로써 value값을 접근 하여 onClick를 사용하고있습니다.

<br/>

### 📂 src>components>Content.jsx

---

<br/>

&nbsp; 이번엔 them의 state에 따라 색이 바뀔 Content입니다.

<br/>

```js
import React from "react";
import ThemContext from "../context/ThemContext";

const Content = () => {
  return (
    <ThemContext.Consumer>
      {(ThemContext) => {
        const themStyle = {
          backgroundColor: ThemContext.them === "light" ? "#fff" : "#000",
          color: ThemContext.them === "light" ? "#000" : "#fff",
        };
        return (
          <article style={themStyle}>
            <h1>가사</h1>
            <p>
              나리는 꽃가루에 눈이 따끔해 (아야) 눈물이 고여도 꾹 참을래 내 마음
              한켠 비밀스런 오르골에 넣어두고서 영원히 되감을 순간이니까 우리
              둘의 마지막 페이지를 잘 부탁해 어느 작별이 이보다 완벽할까 Love me
              only till this spring 오 라일락 꽃이 지는 날 goodbye 이런 결말이
              어울려 안녕 꽃잎 같은 안녕 하이얀 우리 봄날의 climax 아 얼마나
              기쁜 일이야 Ooh ooh Love me only till this spring 봄바람처럼 Ooh
              // ... 중략
            </p>
          </article>
        );
      }}
    </ThemContext.Consumer>
  );
};

export default Content;
```

<br/>

&nbsp; 이전의 Header 컴포넌트와 같이 변경된 state를 받을 컴포넌트지만 다른점을 눈치 채셨나요? Header컴포넌트는 useContext()를 이용하여 value의 값에 접근하였지만 Content 컴포넌트는 다릅니다. ThemContext.Consumer를 사용하여 Provider의 value값을 구독하고있으며 변경된 state를 자체적으로 받아서 배경과 폰트의 색에 변화를 줄것입니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeLHboy%2Fbtq1AEOXkq5%2FXcyaLeyCzBPS5M5zbabNCk%2Fimg.gif"/></p>

<br/>

&nbsp; Content 또한 상위 컴포넌트로 부터 어떠한 props를 전달 받지 않았음에도 state를 업데이트하고 변경 값에따른 변화를 보여주고있습니다.

<br/>

<p align="center"><img src="https://blog.kakaocdn.net/dn/LHexh/btq1xlDamk1/pusrpjMD6ffA1hFe3utLak/img.png"/></p>

<br/>

&nbsp; 현재 파일의 구조를 쉽게 보자면 위와 같이 되어있습니다. 만약 Context API를 사용하지 않는다면 App.js부터 Them.jsx까지 가기위해 Page, Header 컴포넌트에 props를 전달 해야하지만 Context API를 이용하여 그러한 불필요한 작업을 하지않았습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fz8C3c%2Fbtq1uwrBbrI%2FrezUlpoQkpKaQ6krDkaVE1%2Fimg.png"/></p>

<br/>

&nbsp; 위와 같은 형태로 불필요한 props를 전달하지 않고 전역상태 관리를 위해서는 Context API를 활용하여 어플리케이션을 설계할수 있습니다.

<br/>

[참고](https://reactjs.org/docs/context.html)

👋
