# 3-조건부 렌더링

## 🙏 조건부 렌더링이란?

<br/>

> 특정 조건에 따라 다른 결과물을 렌더링 하는 것을 의미합니다

<br/>

## 3-1 조건부 렌더링

<br/>

&nbsp;조건부 렌더링을 사용하여 원하는 문구를 보여줄 수 있습니다.

<br/>

### 👀 코드로 알아보기

---

<br/>

&nbsp;파일 구조는 아래와 같습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRdUob%2Fbtq0AHNNMBF%2FsUDfmXjwYnZ3NKAoMuMo3k%2Fimg.png"/></p>

### 📂 src>App.js

---

<br/>

&nbsp;테스트를 위하여 App.js에서 Hello 컴포넌트로 name, isLoggedIn이라는 props를 넘겨줍니다.

<br/>

```js
import "./App.css";
import Hello from "./components/Hello";

function App() {
  return <Hello name="Juno" isLoggedIn={true} />;
}

export default App;
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoyGzQ%2Fbtq0zZ9fVKI%2F8WUTGr5YMT3aIKcy7b6f71%2Fimg.png"/></p>

<br/>

### 📂 src>components>Hello.jsx

---

<br/>

&nbsp;간단하게 props를 destructuring 하여 name을 사용한다면 아래와 같이 사용이 가능합니다.

<br/>

```js
import React from "react";

const Hello = ({ name, isLoggedIn }) => {
  return <div>안녕하세요 {name}</div>;
};

export default Hello;
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FK4FxZ%2Fbtq0HagUtCH%2F2yp8ckdQ877smoaHom6gU0%2Fimg.png"/></p>

<br/>

&nbsp;하지만 여기서 조건을 추가해보도록 하겠습니다.

<br/>

&nbsp;먼저 `{isLoggedIn=true}`일 경우 즉, 로그인이 되었을 경우 앞에 "로그인 완료" 라는 문구를 추가적으로 보여주고  
false의 경우엔 null이 되어 아무런 문구도 추가적으로 띄우지 않겠습니다.

- 참고로 JSX문법에서는 null, false, undefined를 렌더링 하게되면 아무것도 나타나지 않습니다.

<br/>

```js
import React from "react";

const Hello = ({ name, isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? "로그인완료" : null}안녕하세요{name}
    </div>
  );
};

export default Hello;
```

<br/>

> 💡 여기서 `{isLoggedIn ? "로그인완료" : null}`는 삼항 조건 연산자로써
>
> if ~ else 조건문의 경우
>
> ```js
> if (조건) {
>   조건이 true일 경우 결과
> } else {
>   조건이 false일 경우 결과
> }
> ```
>
> 이렇게 사용되나 삼항연산자는
>
> ```js
> {
>   isLoggedIn ? "로그인완료" : null;
> }
> // {조건 ? 조건이 true일 경우 결과 : 조건이 false일 경우 결과}
> ```
>
> 위와같이 사용하며 리액트에서는 조건부 렌더링을 할 경우 간단하게 삼항연산자를 사용합니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fzb0vx%2Fbtq0AqFwP8f%2FqGKcCdC7r4DsZFVIKWyfO0%2Fimg.png"/></p>

<br/>

&nbsp; 현재는 `{isLoggedIn=true}`이기 때문에 문구가 추가된것을 확인할 수 있습니다.

&nbsp; 하지만 위와같이 내용이 달라지는게 아니라 보여주거나, 안보여주거나 하는 상황에서는 && 연산자를 사용하는것이 더 간편합니다.

<br/>

```js
import React from "react";

const Hello = ({ name, isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn && "로그인완료"}안녕하세요{name}
    </div>
  );
};

export default Hello;
```

<br/>

&nbsp; 추가적으로 name에 대해 조건을 추가하고

<br/>

```js
import React from "react";

const Hello = ({ name, isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn && "로그인완료"}안녕하세요{isLoggedIn ? name : "guest"}
    </div>
  );
};

export default Hello;
```

&nbsp; `{isLoggedIn=false}`로 변경 후 값을 확인하면

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcAJJR5%2Fbtq0BDRINJr%2FTMTZzxWTd9lFQ92XMHDY5k%2Fimg.png"/></p>

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcHPmtI%2Fbtq0AHf0wme%2F04ni8tf9oYkApoZSXwoiQ0%2Fimg.png"/></p>

<br/>

&nbsp; 위와같이 `{isLoggedIn=false}`이기 때문에 앞의 문구는 추가되지않고 name대신 "guest"라는 문구가 뜨게됩니다.

<br/>

## 3-2 조건부 렌더링(ver 컴포넌트)

<br/>

&nbsp;삼항 연산자를 이용하여 컴포넌트 또한 조건부 렌더링이 가능합니다.

&nbsp;위의 예시를 두가지의 컴포넌트로 분리하여 보겠습니다.

<br/>

### 👀 코드로 알아보기

---

<br/>

&nbsp;파일 구조는 아래와 같습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbUJTpa%2Fbtq0AG2s8A0%2FfOlKmvecnZzaojz6Hujd41%2Fimg.png"/></p>

<br/>

### 📂 src>components>Hello.jsx

---

<br/>

&nbsp;로그인이 되었을 경우 UserGreeting 컴포넌트를 보여주고 비로그인일 경우 GuestGreeting 컴포넌트를 보여줍니다.  
<br/>

- 추가적으로 name이라는 props를 UserGreeting 컴포넌트에 전달합니다.

<br/>

```js
import React from "react";
import GuestGreeting from "./GuestGreeting";
import UserGreeting from "./UserGreeting";

const Hello = ({ name, isLoggedIn }) => {
  return (
    <div>{isLoggedIn ? <UserGreeting name={name} /> : <GuestGreeting />}</div>
  );
};

export default Hello;
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdjulww%2Fbtq0HbGVDYh%2FakiPRB448kJ9kFi6hT5zQk%2Fimg.png"/></p>

<br/>

### 📂 src>components>UserGreeting.jsx

---

<br/>

&nbsp;로그인일 경우 컴포넌트

<br/>

```js
import React from "react";

const UserGreeting = ({ name }) => {
  return <div>로그인완료 안녕하세요 {name}</div>;
};

export default UserGreeting;
```

<br/>

### 📂 src>components>GuestGreeting.jsx

---

<br/>

&nbsp;비로그인일 경우 컴포넌트

<br/>

```js
import React from "react";

const GuestGreeting = () => {
  return <div>안녕하세요 guset</div>;
};

export default GuestGreeting;
```

<br/>

### 🎉 결과

---

<br/>

&nbsp;로그인이 되었을경우

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEeMYX%2Fbtq0zuVUzrH%2FmhoLUHy55U0vWZlqlBKfzK%2Fimg.png"/></p>

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbsBS93%2Fbtq0EEbx1ub%2FQGBMwLy95tzHlivbSdkoLk%2Fimg.png"/></p>

<br/>

&nbsp;비로그인일 경우

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FRtJoi%2Fbtq0HaBejoV%2F1LnQGw3apArLK5auULCfnK%2Fimg.png"/></p>

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrfPll%2Fbtq0HanJO3J%2FgBUIHveP2QnH96kfsWwqL0%2Fimg.png"/></p>

<br/>

### ✨ 추가적으로 props의 값 설정을 생략하면 true가 됩니다.

---

<br/>

```js
import "./App.css";
import Hello from "./components/Hello";

function App() {
  return <Hello name="Juno" isLoggedIn />;
  // return <Hello name="Juno" isLoggedIn={true} />;
}

export default App;
```

<br/>

👋
