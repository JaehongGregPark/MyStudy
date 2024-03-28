# useMemo란?

useMemo는 React Hook의 한 종류이며, memoized value를 반환합니다.   

memoization은 caching, 즉 저장한다는 의미입니다. 작업의 결과를 저장함으로써 걸리는 시간 및 비용을 단축할 수 있습니다.    
React에서 component 로직은 렌더링 될 때마다 다시 정의되고 계산되기 때문에 컴포넌트 로직이 계산하는데 시간이 오래걸린다면   
급격한 속도 저하를 초래할 수 있습니다.   
실제로 리엑트로 프로젝트를 할 때 memoization library를 이용하기도 하였지만 useMemo가 등장하면서 외부 라이브러리의 도움없이   
React에 내장된 memoization 기능을 보다 쉽게 이용할 수 있게 되었습니다.

useMemo, useCallback을 이용해서 React내부에서 memoization 기능을 구현할 수 있습니다.

## useMemo 사용 방법

useMemo hook의 문법은 useEffect와 문법이 같고 작동 방식 또한 비슷합니다.   
useMemo의 첫번째 인자에는 계산하는 함수, 두번째 인자에는 dependencies를 담은 배열이 들어갑니다.   
useMemo의 dependencies 값이 변할 때만 useMemo의 첫번째 인자값인 callback함수를 시행합니다.   

#### 예제 1

```javascript
import React, { useState, useEffect, useMemo } from 'react';

const delayAndDoubleNum = num => {
  console.log('delaying...');
  for(let i = 0; i <= 1000000000; i++) {}
  return num * 2;
};

const UseMemoApp = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [number, setNumber] = useState(0);
  const doubledNumber = delayAndDoubleNum(number);
  const theme = {
    backgroundColor: isDarkTheme ? 'black' : 'white',
    color: isDarkTheme ? 'white' : 'black'
  };

  return (
    <div style={theme}>{doubledNumber}
      <input type="number" value={number} onChange={e => setNumber(e.target.value)}/>
      <button onClick={() => setIsDarkTheme(currentTheme => !currentTheme)}>Change Theme</button>
    </div>
  );
};

export default UseMemoApp;

```
input 창에 숫자를 넣으면 그 숫자의 2배의 값을 보여주도록 했습니다.   
단, 2배를 곱해서 반환하기 전에 for문을 여러번 돌려서 delay를 주도록 했습니다.   
숫자가 바뀔 때 마다 state가 변화하기 때문에 해당 컴포넌트가 re-rendering 되면서 delayAndDoubleNum 함수가 다시 선언되고 시행될 것입니다.   
   
그렇다면 이 코드에서 ChangeTheme 버튼을 누르면 어떻게 될까요? 이때 문제점은 무엇일까요?   
테마를 바꾸는 것과 숫자를 연산하는 것은 아무런 연관이 없습니다. 그럼에도 isDarkTheme이란 state가 변화하면 해당 컴포넌트가 re-rendering 되면서   
delayAndDoubleNum 함수가 불필요하게 시행되어 버립니다.

```javascript
import React, { useState, useEffect, useMemo } from 'react';

const delayAndDoubleNum = num => {
  console.log('delaying...');
  for(let i = 0; i <= 1000000000; i++) {}
  return num * 2;
};

const UseMemoApp = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [number, setNumber] = useState(0);
  const doubledNumber = useMemo(() => { //useMemo로 바꾸어줍니다.
    return delayAndDoubleNum(number);
  }, [number]);
  const theme = {
    backgroundColor: isDarkTheme ? 'black' : 'white',
    color: isDarkTheme ? 'white' : 'black'
  }

  return (
    <>
      <div style={theme}>{doubledNumber}
        <input type="number" value={number} onChange={e => setNumber(e.target.value)}/>
      </div>
      <button onClick={() => setIsDarkTheme(currentTheme => !currentTheme)}>Change Theme</button>
    </>
  );
};

export default UseMemoApp;
```
delayAndDoubleNum 함수가 시행되는 조건을 useMemo를 이용해서 바꾸었습니다.   
Theme 을 바꾸면 state가 바뀐 것이기 때문에 여전히 해당 component 가 re-rendering 될 것입니다.   
다만 useMemo의 dependency값인 number가 변했는지 확인할 것이고, number가 변하지 않았다면 저장되었던 값을 그대로 사용할 것입니다.   
따라서 delayAndDoubleNum은 시행되지 않을 것 입니다.    
   
이렇게 useMemo를 사용해서 연산이 불필요한 곳에서 반복되는 것을 막고 성능을 개선시킬 수 있습니다.   

#### 예제 2 (referencial equality)


위의 코드에서 theme이 바뀔 때마다 'theme changed'를 출력하도록 useEffect문을 추가하였습니다.   

```javascript
import React, { useState, useEffect, useMemo } from 'react';

const delayAndDoubleNum = num => {
  console.log('delaying...');
  for(let i = 0; i <= 1000000000; i++) {}
  return num * 2;
};

const UseMemoApp = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [number, setNumber] = useState(0);
  const doubledNumber = useMemo(() => {
    return delayAndDoubleNum(number);
  }, [number]);
  const theme = {
    backgroundColor: isDarkTheme ? 'black' : 'white',
    color: isDarkTheme ? 'white' : 'black'
  };

  useEffect(() => {
    console.log('theme changed');
  }, [theme]);

  return (
    <>
      <div style={theme}>{doubledNumber}
        <input type="number" value={number} onChange={e => setNumber(e.target.value)}/>
      </div>
      <button onClick={() => setIsDarkTheme(currentTheme => !currentTheme)}>Change Theme</button>
    </>
  );
};

```
코드를 시행해서 'Change Theme' 버튼을 누를 때마다 'theme changed'가 출력되는 것을 확인할 수 있습니다.   
   
그런데 여기서 number를 바꾸면 어떻게 될까요?   
number를 dependency로 주지 않았기 때문에 콘솔창에 'theme changed'는 찍히지 않을 것 같아 보입니다.   
   
하지만 예상과 달리 number가 바뀌어도 해당 문구가 찍히는데, 이는 referential equality 때문입니다.   
자바스크립트의에서 Array, Function, Object는 주소값을 가지고 있습니다.   
위의 코드에서 number가 변해 componenet가 re-rendering이 되면, theme 객체가 다시 선언되면서   
이전의 theme 과는 다른 주소값을 가지게 되어 서로 다른 theme으로 간주하게 됩니다.   

실제로 theme이 바뀌었을 때만 'Theme Changed'를 출력하기 위해서 useMemo를 사용할 수 있습니다.

```javascript
import React, { useState, useEffect, useMemo } from 'react';

const delayAndDoubleNum = num => {
  console.log('delaying...');
  for(let i = 0; i <= 1000000000; i++) {}
  return num * 2;
};

const UseMemoApp = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [number, setNumber] = useState(0);
  const doubledNumber = useMemo(() => {
    return delayAndDoubleNum(number);
  }, [number]);
  const theme = useMemo(() =>{ //useMemo로 바꾸어줍니다.
    return {
      backgroundColor: isDarkTheme ? 'black' : 'white',
      color: isDarkTheme ? 'white' : 'black'
    };
  }, [isDarkTheme]);

  useEffect(() => {
    console.log('theme changed');
  }, [theme]);

  return (
    <>
      <div style={theme}>{doubledNumber}
        <input type="number" value={number} onChange={e => setNumber(e.target.value)}/>
      </div>
      <button onClick={() => setIsDarkTheme(currentTheme => !currentTheme)}>Change Theme</button>
    </>
  );
};

export default UseMemoApp;
```
theme을 선언하는 곳에 useMemo hook을 추가해주었습니다.   
isDarkTheme state를 dependency로 줬으므로 만약 테마가 바뀌지 않는다면 useMemo 내부의 callback함수가 시행되지 않고   
이전에 반환됐었던 객체를 불러옵니다. 따라서 theme 객체의 주소값 역시 동일할 것이고 'Theme Changed' 출력되지 않을 것 입니다.   

reference: https://blog.webdevsimplified.com/2020-05/memoization-in-react,   
           https://www.youtube.com/watch?v=THL1OPn72vo,   
           https://www.geeksforgeeks.org/react-js-usememo-hook/
