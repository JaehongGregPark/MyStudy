### 소프트웨어 디자인 패턴이란?

**소프트웨어 디자인 패턴**(software design pattern)은 [소프트웨어 공학](https://ko.wikipedia.org/wiki/소프트웨어_공학)에서 [소프트웨어 디자인](https://ko.wikipedia.org/wiki/소프트웨어_디자인)에서 특정 문맥에서 공통적으로 발생하는 문제에 대해 재사용 가능한 해결책이다. 소스나 기계 코드로 바로 전환될수 있는 완성된 디자인은 아니며, 다른 상황에 맞게 사용될 수 있는 문제들을 해결하는데에 쓰이는 서술이나 **템플릿**이다. 디자인 패턴은 프로그래머가 어플리케이션이나 시스템을 디자인할 때 공통된 문제들을 해결하는데에 쓰이는 형식화 된 가장 좋은 **관행**이다.

### MVC패턴

![img](<https://media.vlpt.us/images/nomadhash/post/5beef914-16a1-459c-8e84-426f0e1c6b99/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3%20(4).png>)

- Model, View, Controller를 합친 용어이다.
- 어플리케이션의 코드를 모델, 뷰, 컨트롤러의 역할을 나눠 관리한다는 일종의 코딩 방법론이다.
- 컨트롤러는 모델에 명령을 보냄으로써 모델의 상태를 변경할 수 있다.
- 모델은 모델의 상태에 변화가 있을 때 컨트롤러와 뷰에 이를 통보한다. 이와 같은 통보를 통해서 뷰는 최신의 결과를 보여줄 수 있고, 컨트 롤러는 모델의 변화에 따른 적용 가능한 명령을 추가, 제거, 수정할 수 있다.
- 뷰는 사용자가 볼 결과물을 생성하기 위해 모델로부터 정보를 얻어온다.
- 

### MVC패턴의 한계와 Flux 패턴의 등장

![Facebook에서 이야기 하는 MVC의 단점](https://blog.kakaocdn.net/dn/ALrHe/btqBTMSuHfN/ZlW9i9ET34e90APgCRChk1/img.png)

기존 MVC 패턴이 갖고 있던 가장 큰 단점은 양방향 데이터 흐름이다. 특히 Model이 업데이트 되면 View가 이걸 화면에 반영하고, View 또한 Model을 업데이트 할 수 있다. 앱의 구조가 단순하다면 문제가 되지 않지만 어플리케이션의 규모가 거대해진다면 View와 Model사이의 <u>데이트흐름이 기하급수적으로 복잡해진다.</u>

![페이스북 알림버그](https://blog.kakaocdn.net/dn/AeyYk/btqBO7RutbO/jF8wxI6kwsXxKk2Qg6D5dk/img.png)

이러한 시스템 복잡도가 야기했던 대표적인 문제가 페이스북의 알림 버그이다. 새로운 메시지가 없는데도 알림이 계속 뜨는 버그였는데 아무리 해결해도 주기적으로 유사한 버그가 발생했다고 한다. 이와 같은 문제에 대해 페이스북은 어플리케이션을 보다 예측 가능한 방향으로 설계해야 한다는 결론을 내렸다. 그리고 기존 MVC패턴의 양방향 데이터 흐름이 아닌 FLUX패턴이라는 단방향 데이터 흐름을 도입한다.

### Flux의 단방향 데이터 흐름

![img](https://media.vlpt.us/images/nomadhash/post/6f6ad4ee-4fb7-4072-8565-c8aa28a2f0a5/05.png)

Flux의 가장 큰 특징은 **<u>단방향 데이터 흐름</u>**이다.

디스패처에서 스토어, 스토어에서 뷰, 뷰는 다시 액션을 만들어서 디스패처부터 이와 같은순서를 반복한다.

**디스패처 :** 플럭스 패턴의 모든 데이터 흐름을 관리하는 허브 역할을 하는 부분이다. 액션이 발생하면 디스패처로 전달되고, 디스패처로 전달된 액션을 보고, 스토어에 데이터를 전달한다.

**스토어 :** 어플리케이션 모든 상태 변경을 결정한다. 스토어가 변경되면 뷰에 변경되었다는 사실을 알려주게 된다.

**뷰 :** flux에서의 뷰는 mvc의 뷰와 달리 화면을 보여주는 것 외에도 컨트롤러의 성격 또한 가지고 있따. 특히 최상위 뷰는 스토어에서 데이터를 가져와 이를 자식 view로 내려보내주는 역할을 하고 있기에 컨트롤러-뷰라고도 부른다.

**액션 :** store 업데이트는 dispatch에서 데이터가 담겨져 있는 객체를 인자로 하는 콜백 함수를 통해 이뤄진다. 이 객체를 Action이라고 한다. Action은 대체로 액션 생성자로 만들어 진다.





## Redux의 이해



![img](https://media.vlpt.us/images/taylorkwon92/post/1411e1c2-ebb4-49ea-8fe2-a721f4e21dac/image.png)

리덕스와 Flux는 약간의 차이를 가진다. 리덕스의 경우 단일 스토어이며



## 리덕스의 대략적인 구조



![undefined](https://cdn.filepicker.io/api/file/eHSa386Q2qz4PUCDNmPA)

#### **액션** 

 type이라는 프로퍼티를 갖는 객체(Object)이다. 모든 상태 변경은 액션을 디스패치함으로써 시작한다. 



#### **스토어**  

리덕스는 어플리케이션에 단 하나의 스토어를 만든다. 스토어 안에는 현재 앱의 상태와, 리듀서가 들어가 있고, 추가적으로 몇가지 내장함수를 갖고 있다.



#### **리듀서**  

현재의 상태와 전달 받은 액션을 참고하여 새로운 상태를 반환한다. 





```jsx
import { combineReducers } from "redux";

import heartReducer from "./heart";
import flowerReducer from "./flower";

const rootReducer = combineReducers({
  heartReducer,
  flowerReducer
});

export default rootReducer;

```




#### combineReducers

여러 리듀서를 합쳐서 하나의 리듀서를 만들어 준다. 


#### 디스패치

액션을 발생시키는 함수라고 이해하면 된다. 파라미터로 액션 객체가 들어가면, 해당 액션이 발생되고, 리듀서를 통해 상태가 업데이트 된다.



#### **프로바이더**

react-redux라이브러리에 담긴 컴포넌트이다. 프로바이더 컴포넌트로 감싸진 컴포넌트(혹은 프로바이더 컴포넌트로 nested된 컴포넌트,  혹은 프로바이더 컴포넌트의 자손 컴포넌트)에서는 action을 디스패치할 수 있고, 현재 state를 읽을 수 있다.



#### **HOOK**(useDispatch, useSelector) 

\<Provider>로 감싸진 (혹은 Provider의 자손이라 할 수 있는) 컴포넌트안에서 위의 HOOK을 통해 액션을 Dispatch하고, 스토어에 담긴 앱의 현재 상태를 받아올 수 있다.

![img](http://redux-middleware.surge.sh/images/redux-middleware.png)

#### **미들웨어**

액션이 리듀서로 전달 되기 전에 거치는 곳이다.  꼭 있어도 되고 없어도 되는 부분이다. redux-thunk같은 미들웨어는 함수 형태의 action을 사용할 수도 있다.



예시

https://codesandbox.io/s/reduxstudy2021-04-15-2ijk1

