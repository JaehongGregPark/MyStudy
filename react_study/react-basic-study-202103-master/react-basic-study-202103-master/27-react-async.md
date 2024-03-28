# React-async

### react-async 란?

- 요청 상태 관리를 하기 좀 더 쉽게 하기 위한 라이브러리
- 공식문서에 따르면, '데이터의 형태나 요청 유형에 대해 비동기 프로세스의 모든 상태를 쉽게 처리할 수 있다' 라고 합니다.
- 공식문서 : [https://docs.react-async.com/](https://docs.react-async.com/)

<br>
<br>

## 설치법

```bash
yarn add react-async
```

<br>
<br>

## 사용방법

react-async 는 3가지 주요 API를 제공합니다.

- hook 으로서의 기능
- async 컴포넌트의 기능
- createInstance factory로서의 기능

<br>
<br>

## 1. hook으로서의 사용 (As a hook)

16.8 버전 이후로 사용이 가능하며, 자체 함수 내에서 react-async의 핵심 기능을 사용할 수 있도록 한다.

코드 예시)

```jsx
import { useAsync } from "react-async";

// API 호출 함수
const loadCustomer = async ({ customerId }, { signal }) => {
  const res = await fetch(`/api/customers/${customerId}`, { signal });
  if (!res.ok) throw new Error(res);
  return res.json();
};

const MyComponent = () => {
  // useAsync({ promiseFn: API 호출하는 함수, 함수 호출 시에 넘겨줘야하는 파라미터 필드와 값})
  const { data, error, isLoading } = useAsync({
    promiseFn: loadCustomer,
    customerId: 1,
  });
  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data)
    return (
      <div>
        <strong>Loaded some data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  return null;
};
```

<br>
<br>

### 어떤 값이 넘어오게 될까?

<br>

- `[data]` : 결과 데이터값
- `[error]` : 에러객체
- `[value]` : 데이터나 에러
- `[initialValue]` The data or error that was provided through the `initialValue` prop.
- `[startedAt]` : promoise가 시작된 시간
- `[finishedAt]` : promoise가 종료된 시간
- `[status]` One of: `initial`, `pending`, `fulfilled`, `rejected`.
- `[isPending]` :팬딩중이면 true, Alias: `isLoading`
- `[isFulfilled]` :호출 성공이면 true Alias: `isResolved`
- `[isRejected]` : 요청이 거절됬을 때 true

등등... 자세한 내용은 살펴보세요

- `[isSettled]` true when the last promise was fulfilled or rejected (not initial or pending).
- `[counter]` The number of times a promise was started.
- `[promise]` A reference to the internal wrapper promise, which can be chained on.
- `[run]` Invokes the `deferFn`.
- `[reload]` Re-runs the promise when invoked, using any previous arguments.
- `[cancel]` Cancel any pending promise.
- `[setData]` Sets `data` to the passed value, unsets `error` and cancels any pending promise.
- `[setError]` Sets `error` to the passed value and cancels any pending promise.

<br>
<br>

## 2. 컴포넌트 로서의 사용 (As a component)

```jsx
import Async from "react-async";

const loadPlayer = async ({ playerId }, { signal }) => {
  const res = await fetch(`/api/players/${playerId}`, { signal });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

const MyComponent = () => (
  <Async promiseFn={loadPlayer} playerId={1}>
    {({ data, error, isPending }) => {
      if (isPending) return "Loading...";
      if (error) return `Something went wrong: ${error.message}`;
      if (data)
        return (
          <div>
            <strong>Player data:</strong>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
      return null;
    }}
  </Async>
);
```

<br>
<br>

## 3. factory로서의 사용(As a factory)

자체 구성 요소 인스턴스를 생성하여, 기본 onResolve 및 onReject 콜백을 구성할 수 있다.

실제 코드)

```jsx
createInstance<T>(defaultOptions?: AsyncProps<T>, displayName?: string)
```

사용예시)

```jsx
import { createInstance } from "react-async";

const loadPlayer = async ({ playerId }, { signal }) => {
  const res = await fetch(`/api/players/${playerId}`, { signal });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

const AsyncPlayer = createInstance({ promiseFn: loadPlayer }, "AsyncPlayer");

const MyComponent = () => (
  <AsyncPlayer playerId={1}>
    <AsyncPlayer.Fulfilled>
      {(player) => `Hello ${player.name}`}
    </AsyncPlayer.Fulfilled>
  </AsyncPlayer>
);
```

사용할 수 있는 콜백)

```jsx
declare type AsyncConstructor<T> = React.ComponentClass<AsyncProps<T>> & {
  Initial: React.FC<InitialProps<T>>,
  Pending: React.FC<PendingProps<T>>,
  Loading: React.FC<PendingProps<T>>,
  Fulfilled: React.FC<FulfilledProps<T>>,
  Resolved: React.FC<FulfilledProps<T>>,
  Rejected: React.FC<RejectedProps<T>>,
  Settled: React.FC<SettledProps<T>>,
};
```
