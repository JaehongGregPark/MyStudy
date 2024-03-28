# useReactRouter 란?

공식 깃헙: [https://github.com/CharlesStover/use-react-router](https://github.com/CharlesStover/use-react-router)

- 최근배포 2019년 5월

<br>
<br>

라우터에 관련된 값들을 Hook으로 사용할 수 있다.

useReactRouter()는 `history`, `location`, `match` 을 포함한 객체를 반환한다.
<br>
<br>

### 설치방법

react-router 와 react-router-dom 버전 5.0.0 혹은 그 이상의 버전을 사용해야한다.

```bash
yarn add use-react-router
npm install use-react-router
```

<br>
<br>

### 코드예시

```jsx
import useReactRouter from "use-react-router";

function RouterHookSample() {
  const { history, location, match } = useReactRouter();
  console.log({ history, location, match });
  return null;
}

export default RouterHookSample;
```

![useReactRouterSample](https://user-images.githubusercontent.com/37354708/114307483-c4e92200-9b1a-11eb-8d12-e5629dab3898.png)

useReactRouter를 사용하면 location, match, history 객체들을 조회할 수 있다.

정식 릴리즈가 아니기 때문에 withRouter가 불편하다고 느낄 경우에만 사용을 권장한다.
