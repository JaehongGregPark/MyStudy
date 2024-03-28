# Redux Saga 맛보기

#### Saga란  
> An intuitive Redux side effect manager.


### saga에서 해결할려는 side-effect란?

<p align="center">
    <image src="https://user-images.githubusercontent.com/77006427/115148826-4fda9700-a09c-11eb-95d6-f1f9b13a2176.png" witdh=400 height=500>
</p>


현재 React에서 주로 사용되고있는 middlewares plugins:
- thunk
- saga
- observable

다른 plugins/extension가 궁금하시다면 아래의 repo를 참고해주세요:
[리액트 상태 모음 git repo](https://github.com/GantMan/ReactStateMuseum)


### Thunk의 단점
- Promise Callback Hell
- 기능이 단조로움

### Redux-saga는 그럼 위와 같은 단점을 어떤 방식으로 개선했는가?
- Generator사용

### Generator 사용 할 때
- 무한의 개념을 표현
- 비동기 처리

※ 위의 개념들은 하단 References를 참고

(용기있는 자는 sagas라는 디자인패턴을 한번! 😡)

sagas가 무엇인가요? 
> Sagas are a design pattern that comes from the distributed transactions world, where a saga manages processes that need to be executed in a transactional way, keeping the state of the execution and compensating failed processes.

redux-saga 동작을 간단히 표현하자면, 
> action listener (think of event listener 😮)


비동기를 핸들링하는 액션을 주시하다가,  
dispatch가 일어났을 떄, 그 사이에 인터셉트해서
처리해주는것입니다. 

**"Yes. it's a middleware"**

예시:
```bash
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// Worker saga 'fetchUser'가 USER_FETCH_REQUESTED 액션들이 dispatch 될 떄 실행
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

// USER_FETCH_REQUESTED라는 액션이 dispatch 될 때, fetchUser 함수를 실행.
// 사용자 fetch를 동시적으로 해줄 수 있게 해준다.
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
```

#### Call()
- Fork()가 함수를 비동기적으로 실행한다고 하면, Call()은 함수를 동기적으로 실행합니다. Call에 넘겨진 함수가 Promise를 리턴하면 그 Promise가 resolved 될 때까지 call()을 호출한 부분에서 실행이 멈춥니다.

#### Put()
- 액션을 dispatch 합니다. 보통 take로 액션을 캐치해서 api 호출을 call로 실행하고 성공/실패 여부에 따라 리덕스 스토어에 반영하기 위해서 호출하는 Effects입니다.
※ put은 diaptch와 동일하게 보시면 됩니다.

#### takeEvery()
- 캐치된 모든 액션에 대해서 핸들러를 실행합니다.
- 
#### takeLatest()
가장 마지막에(최신) 실행된 액션에 대해서만 핸들러를 실행합니다.

출처: [리덕스 사가 이해하기](https://simsimjae.medium.com/%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%82%AC%EA%B0%80-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-8e573de9786e)

이외 API 함수들은:
[API documentation](https://redux-saga.js.org/docs/api/)에서 확인 가능

See Also: 
[generators](https://javascript.info/generators)

[coroutines](https://medium.com/@dashron/coroutines-2cd5c41c088a)
[Javascript 개발자에게 coroutine 10분만에 이해시키기](https://www.letmecompile.com/kotlin-coroutine-vs-javascript-async-comparison/)

[비동기 프로그래밍과 실전 에러 핸들링](https://www.youtube.com/watch?v=o9JnT4sneAQ)

[Understanding redux saga: From action creators to sagas](https://blog.logrocket.com/understanding-redux-saga-from-action-creators-to-sagas-2587298b5e71/#:~:text=Redux%2Dsaga%20is%20a%20library,better%20by%20working%20with%20sagas.)
[왜 Redux Saga인가](https://gracefullight.dev/2017/12/06/Why-redux-saga/)


용감하시다면 💩
[Pattern Saga](https://microservices.io/patterns/data/saga.html)
[Applying the Saga Pattern • Caitie McCaffrey](https://www.youtube.com/watch?v=xDuwrtwYHu8)
[sagas 페이퍼](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.93.7258&rep=rep1&type=pdf)