# Components and Props

​

## What is Components?

Components let you `split the UI` into `independent`, `reusable pieces`, and think about `each piece in isolation`.
​
컴포넌트는 UI를 독립적이고 재사용 할 수 있는 조각으로 쪼개놓은 것이라고 할 수 있습니다. 우리는 그런 조각을 개별적으로 살펴볼 수 있습니다!(components = 구성요소, props = properties 줄임말. 속성)
​

## Fuction & Class Components

​
Function Component
​

```jsx
function WelcomeFunc(props) {
    return <h1>Hello, {props.name}</h1>;
}
​
export default WelcomeFunc;
```

​
Class Component
​

```jsx
import React from "react";
​
class WelcomeClass extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
​
export default WelcomeClass;
```

App.js
​

```jsx
import WelcomeFunc from "./Components/WelcomeFunc.js"
import WelcomeClass from "./Components/WelcomeClass.js"
​
​
function App() {
  return (
    <div>
      <WelcomeFunc name = "Sara" />
      <WelcomeClass name = "Sara" />
    </div>
  );
}
​
export default App;
```

![샘플사진](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1400d3ae-a0e6-4e75-8ed4-df32531d63c3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210321T142708Z&X-Amz-Expires=86400&X-Amz-Signature=0489cb6d1440443e2bba4592a294c51c77bb2201e9ce097e339528f3226557a1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
\*\*첫번째 줄이 function component, 두번째줄이 class component -> 두 결과가 같다는 걸 알 수 있습니다.
<br>
<br>

> **주의할 점!**
>
> React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Welcome />` represents a component and requires Welcome to be in scope.
>
> `<div />` 처럼 소문자로 된 것은 html tag 이고 `<Welcome />` component를 표현하므로 범위 안에 Welcome이 있어야합니다.

```jsx
function App() {
  return (
    <div>
      <WelcomeFunc name = "Sara" />
      <welcomeClass name = "Sara" />
    </div>
  );
}
​
export default App;
```

​
![샘플사진](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0784aa23-bf96-4531-8fe3-eac7d421648d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210321T143936Z&X-Amz-Expires=86400&X-Amz-Signature=b06246decb9670e3dc62ec73555bdae7249345436d556749b95750cefc5894f4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

> Component naming 할 때, 소문자로 하면 화면에는 component내용이 뜨지 않고 사진과 같이 console 창에 error가 뜹니다!! 

>**첫 글자는 꼭 대문자로!**

 <br>
 <br> ​

- **우리가 정의한 component를 변수에 할당할 수 있습니다!**
  ​

```jsx
function Welcome(`props`) {
  return <h1>Hello, {props.name}</h1>;
} // user-defined function component.
​
const element = <Welcome name="Sara" />;
// props = { name : "Sara"}
​
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

​
--> 여기서 드디어 `props` 등장!
<br>
​

## What is Props?

it passes JSX attributes and children to this component as a single object. We call this object “props”.
​
attributes(특성) 와 children(자식)을 해당 component에 `단일 객체`로 전달 하는데 여기서 `단일 객체`가 바로 `props`입니다!
<br>
<br>

- **components 안에 component를 결과값으로 반환할 수 있고 (App component가 Button components 반환), 동일한 틀에 세부요소만 바꾼 components를 사용할 수 있습니다**
  ​
- **Destructuring assignment, defaultProps**
  ​
  비구조화 할당과 defualtProps로 props가 할당되지 않았을 때, 기본값으로 사용값을 정의하기!
  <br>
  App.js
  ​

```jsx
import Button from "./Components/Button";
import "./App.css";
​
​
function App() {
  return (
    <div>
      <Button />
      <Button btn="Hello" color="red" />
      <Button btn="My" color="orange" />
      <Button btn="Name Is" color="green" />
      <Button btn="Minju😁" color="blue" />
    </div>
  );
}
​
export default App;
```

​
<br>
​
Button.js
​
비구조화 할당을 하지 않고 props.btn, props.color로 하는 경우
​

```jsx
function Button(props) {
    return <button style={{color: props.color}}>
                { props.btn }
           </button>;
}
​
Button.defaultProps = {
    btn : "Button!"
}
​
export default Button;
```

​
<br>
​
비구조화 할당을 하는 경우!
​

```jsx
function Button({ color, btn }) {
    return <button style={ { color } }>
                { btn }
           </button>;
}
​
Button.defaultProps = {
    btn : "Button!"
}
​
export default Button;
```

​
<br>
​
이렇게 **비구조화 할당** 문법을 사용하면 **좀 더 간결하게** 코드를 작성할 수 있습니다!!
​
![샘플사진](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/31de8970-7675-4d71-a8ec-f071ac44f78e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210321T152738Z&X-Amz-Expires=86400&X-Amz-Signature=3fc5477f8971f03930869d855c3b8c61315579658564146f08829775b499f6a8&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
​
<br>
​

> 이미 만들어 놓은 app에 부분적으로 react component를 추가할수도 있습니다.
>
> https://rajdeep-das.medium.com/how-to-add-react-to-an-existing-website-or-web-project-11b598f989d3
>
​

- **props.children**
  ​

  컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, props.children 을 조회하면 됩니다.
  ​ 

  BtmWrapper.js
  ​

```jsx
function BtnWrapper({ children }) {
    return (
        <div className="wrapper">
            { children }
        </div>
    )
}
​
export default BtnWrapper;
```

​
App.js
​

```jsx
import Button from "./Components/Button";
import BtnWrapper from "./Components/BtnWrapper";
import "./App.css";
​
​
function App() {
  return (
    <BtnWrapper>
      <Button />
      <Button btn="Hello" color="red" />
      <Button btn="My" color="orange" />
      <Button btn="Name Is" color="green" />
      <Button btn="Minju😁" color="blue" />
    </BtnWrapper>
  );
}
​
export default App;
```

​
![샘플사진](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dd14412e-27fb-4d10-a6e6-813e7ddda033/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210321T153404Z&X-Amz-Expires=86400&X-Amz-Signature=cde98354a85c7dea6905edbbd8b94f7450bfff8dd4c034e251e36725a6214fea&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
​
<br>
<br>
​

## Extraction Components

​
크고 포괄적인 component 작게 쪼개면 그만큼 재사용성 향상 시킬 수 있습니다.
​

```jsx
// 'comment' object
​
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};
```


```jsx
// 'Comment' component에
/*
	props ={
		date: new Date(),
		text: 'I hope you enjoy learning React!',
		author:{
			name: 'Hello Kitty',
			avatarUrl: 'https://placekitten.com/g/64/64',
		}
	};
	이와 같은 props 전달
*/
​
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);
```

<br>
​
Comment라는 component를 'Avatar'component와 'UserInfo'component로 쪼개서 표현할 수 있습니다.
​

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

<br>
​
```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
```
​
<br>

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}
```

​
<br>
​
결론적으로 다음과 같이 'Comment' component는 훨씬 간단하게 표현할 수 있습니다!
​

```jsx
/*
	 props ={
	 	user: {
			name: 'Hello Kitty',
			avatarUrl: 'https://placekitten.com/g/64/64',
		}
	};
	이와 같은 props 전달
*/
​
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

​
<br>
<br>
​

## All React components must act like pure functions with respect to their props.

​
모든 components는 pure function처럼 component 자체 props를 수정하지 않습니다.
​

pure  function
​

```jsx
function sum(a, b) {
  return a + b;
}
```

​
<br>
​
impure function
​

```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```

​
<br>
<br>
​
⭐**하지만 UI는 계속 변하면서 사용자의 action에 응답을 해야합니다. 위의 규칙도 지키면서 이를 가능하게 해주는 게 바로 `state`!!**
