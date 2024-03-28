# Asynchronous process with Redux-Thunk

<br>

API에서 data를 fetching 하는 것이 대표적인 비동기처리의 예시가 될 수 있습니다. Redux를 사용해서 한번 진행해 볼게요!

<br>

## 🤔 Why we need thunk?

<br>

- thunk 가 왜 필요한지 알기 위해서 thunk 없이 redux에서 비동기 처리를 진행할 때 어떤 문제가 생기는 지 알아 볼게요!

- 일단 우리는 **action creator가 API call, request를 담당하길 원합니다.** redux를 사용하지 않는 react에서는 component가 mount된 이후에 API fetching을 진행하려고 useEffect를 사용했다면, Redux에서는 저희 생각대로 action creator에 data를 가져오는 과정을 넣어볼게요!

  ◽ Redux의 boilerplate라고 할 수 있죠! reducer와 store를 생성해 주고 App component를 Provider로 감싸줍니다.

  ```jsx
  //reducer.js

  const initState = [];

  const postsReducer = (state, action) => {
    return state;
  };

  export default postsReducer;
  ```

  ```jsx
  //index.js

  const store = createStore(postsReducer);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  ```

  ◽ App과 Posts component도 다음과 같이 정의해 줍니다.

  ```jsx
  //App.jsx

  const App = () => {
    return (
      <div>
        <Posts />
      </div>
    );
  };
  ```

  ```jsx
  const Posts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPosts());
    }, []);
    return <div></div>;
  };

  export default Posts;
  ```

  ◽ 그리고 우리가 생각했던 것 처럼 action creator 함수 fetchPosts를 다음과 같이 정의하고 실행해 봅니다!

  ```jsx
  import Axios from "axios";

  export const fetchPosts = async () => {
    const response = await Axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return {
      type: "FETCH_POSTS",
      payload: response.data,
    };
  };
  ```

  ![image](https://user-images.githubusercontent.com/75834421/115106872-3523f780-9fa2-11eb-9d54-6215c9e7d2f7.png)

  이와 같은 error가 뜹니다. error에서는 `action은 반드시 plain object여야 한다.` 는데 저희가 보기엔 type과 payload만 순수한 객체로 반환했는데 왜 이런 오류가 뜨는지 의문이 듭니다!!

    <br>

  그럼 여기서 왜 저의 fetch posts action이 작동하지 않는지 이유를 다시 정리해 보면

        ❗ Action creators can only return plain javascript objects with a type property.

        ❗ The action will get sent to the reducer before the data fetched from the API.

  이렇게 두가지로 정리될 수 있는데 첫번째가 우리가 본 error문 입니다.

  ### 여기서 체크해야 될 점은 우리가 작성한 **action creator(fetchPosts)가 실제로 웹브라우저가 실행시키는 코드와 다르다**는 점입니다!

  우리가 사용하는 Babel이라는 tool은 우리의 코드를 웹브라우저가 알아들을 수 있도록 변형시켜주는 역할을 합니다.

  그럼 실제로 웹브라우저가 실행시키는 코드는 어떻게 되어있는지 살펴볼게요!

  <https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAQQB7AgZzgMyhEcBEAhiuvgNwBQFApkpLHAMYQB2a8m1MjAFgAroYGALxxCaAJ4tGcABQBKOMIB8cAN5U4TVuzhRqaSG2pKxAd0LB4yVGgB0Acy6yKWrfh4wYYNAC4A9P4AVmisYAA2hIzUPBDhACbUUHYwEmDAzIl2zCD-kOxo-K5w8pTF-jAArlAs6sVaqWDUvgQAYgCiACoAwgASAPp8APIAyp0j-AA09XBghBLhEITxLfqGOtR28YQwhNNaAL6URxRAA&debug=false&forceAllTransforms=true&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&prettier=false&targets=&version=7.13.15&externalPlugins=>

  ![image](https://user-images.githubusercontent.com/75834421/115107304-f17ebd00-9fa4-11eb-8bf0-92215e87f663.png)

  오른쪽 코드에서 case2를 보면 저희가 원하는 대로 action object를 반환하고 있습니다. 하지만 case0을 보시면 Axios.get()을 반환하고 있는데 이게 바로 error의 이유가 됩니다. **plain object를 반환해야하는 규칙에 어긋나는 거죠!!**

  여기서 async/await syntax를 사용하지 않으면 error없이 잘 실행되는 것 같지만 결론적으로는 위에서 언급한 두번째 이유때문에 제대로 작동하지 않습니다 😂😂

    <br>

  ### 이 시점에서 필요한 것이 바로 **redux-thunk** 입니다!!

    <br>

## 🤔 How to perform an asynchronous action within Redux using "redux-thunk"

<br>

- middleware의 한 종류인 redux-thunk를 이용해서 위의 문제를 해결해 볼게요!

  ```jsx
  npm install redux-thunk
  ```

<br>

- middleware인 thunk를 사용하기 위해서 index.js를 수정해 볼게요!

  ```jsx
  import thunk from "redux-thunk";

  const store = createStore(postsReducer, applyMiddleware(thunk));

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  ```

<br>

- 여기서 thunk의 역할은 **action creator가 object또는 function도 반환할 수 있게 해준다!** 입니다.

  ```jsx
  import Axios from "axios";

  export const fetchPosts = () => {
    return async (dispatch, getState) => {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      console.log(response.data);

      dispatch({
        type: "FETCH_POSTS",
        payload: response.data,
      });
    };
  };
  ```

  ![image](https://user-images.githubusercontent.com/75834421/115108307-a8ca0280-9faa-11eb-8170-1f422b783c96.png)

  👏👏 thunk 덕분에 function을 반환할수 있게 되면서 async/await syntax도 문제 없이 사용하는 건 물론, API data fetching이 끝난 이후에 dispatch로 action object를 정의함으로써 `data를 얻는게 끝나고 action을 실행할 수 있게 됩니다.` **우리가 원하는 대로 실행 순서를 제어하는게 가능해집니다!! (asyncronous action success!!)**

<br>

## 🤔 Loading & Error Handling

<br>

- 우리가 API로 부터 data를 fetching할 때, 정의해 줘야할 state 두가지가 더 있습니다. 바로 **Loading과 Error** 입니다.

- Redux에선 `request, success and failure pattern`을 사용할 수 있습니다. action을 세가지 경우로 쪼갠다고 생각하면 됩니다!

  ```jsx
  const initState = {
    items: [],
    loading: false,
    error: null,
  };

  const postsReducer = (state = initState, action) => {
    switch (action.type) {
      case "FETCH_POSTS_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "FETCH_POSTS_SUCCESS":
        return {
          ...state,
          loading: false,
          items: action.payload,
        };

      case "FETCH_POSTS_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      default:
        return state;
    }
  };

  export default postsReducer;
  ```

<br>

- reducer에 맞게 action creator인 fetchPosts도 바꿔볼게요!

  ```jsx
  export const fetchPosts = () => async (dispatch, getState) => {
    dispatch({ type: "FETCH_POSTS_REQUEST" });

    try {
      const response = await Axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_POSTS_FAILURE", error });
    }
  };
  ```

  => 이렇게 dispatch를 사용해서 원하는 타이밍에 원하는 action을 넣어줍니다. data fetching전에 Loading중 이었다가`FETCH_POSTS_REQUEST`, data를 다 가져왔으면 그 data로 state.items를 update시켜주고 `FETCH_POSTS_SUCCESS`, error가 있는 경우에는 error에 대한 action을 호출합니다`FETCH_POSTS_FAILURE`.

<br>

- 그럼 Posts.jsx에도 loading state가 생겼으니 적용해 볼게요!

  ```jsx
  const Posts = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
      dispatch(fetchPosts());
    }, []);

    const renderPosts = () => {
      if (state.loading) {
        return <h1>Loading...</h1>;
      }
      return state.items.map((post) => {
        return <h3 key={post.id}>{post.title}</h3>;
      });
    };

    return <div>{renderPosts()}</div>;
  };

  export default Posts;
  ```

- 마지막으로 redux-devTools를 사용하면 state 변화를 더 잘 볼 수 있으니 같이 사용해 볼게요!

  ```jsx
  npm install redux-devtools-extension
  ```

    <br>

  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import { Provider } from "react-redux";
  import { applyMiddleware, createStore } from "redux";
  import App from "./App";
  import postsReducer from "./reducer";
  import thunk from "redux-thunk";
  import { composeWithDevTools } from "redux-devtools-extension";

  const store = createStore(
    postsReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  ```

  => 완성된 react app에서 redux-devTools 사용 확인하기!

<br>

⭐⭐ 이렇게 Redux에서는 Asyncronous action을 어떻게 처리하고, middleware인 thunk 적용 방법을 아주 쉬운 예제로 알아보았습니다!!

[참고] : <https://www.youtube.com/watch?v=qA6oyQQTJ3I&list=LL>
