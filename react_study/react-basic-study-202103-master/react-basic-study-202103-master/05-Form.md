# Form 

### 수심 1m with Hooks 🤗 

#### 1.1 Single Source of truth
**single source of the truth**(이 하 SSOT)에 대한 정의를 간단히 짚고 넘어갈께요.

> **'신뢰 가능한 단일 출처' 
> 혹은 
> '유일한 중앙 자료'**

이해하기 쉽게 풀어보자면, 
유일무이한 단 하나의 공급원,
우리집에 있는 단 하나의 냉장고라,
지금은 이해하시기를 바래요. 

예시)
    
    - 어제 바나나 우유를 5개를 구매했어요. 
    - 형과 저만 있는 집에 단 하나 있는 냉장고에 우유를 넣어놨어요. 
    - 아침에 일어나보니 4개가 남아있어요. (분명 형이라 예상)
    - 형은 아니래요. 
    - 🐶소리에요. 
    - 냉장고가 우리집에 단 하나인데 그럼 제가 어따 뒀겠어요?
    - 하나 뿐인 냉장고에서 없어진거면, 없어진거에요.
    - 범인은 한명.

※더 정확히 알고 싶으신 분이 계시다면 최 하단에 reference를 참고해주세요. 

#### 1.2 Controlled Component(제어 컴포넌트)
react state를 우리집 냉장고(SSOT)로 만들어, 
form element를 제어를 하는 경우, 
**Controlled Component**

1. 냉장고를 만듭니다!

![image](https://user-images.githubusercontent.com/77006427/112298647-83631500-8cda-11eb-9cfe-ca0fe3c30245.png)

2. 우리 냉장고에 보관 된 이름을 value로 잡아줄거에요.

![image](https://user-images.githubusercontent.com/77006427/112298934-9fff4d00-8cda-11eb-83f2-9ee19c71fa76.png)

3. onChange 이벤트가 발생 시, 해당 냉장고에서 교체 해줄거에요.

![image](https://user-images.githubusercontent.com/77006427/112299072-cae9a100-8cda-11eb-8f1f-186db298fa08.png)

4. 폼을 제출하는 이벤트가 발생 시, 냉장고에 지금 뭐가 있는지 확인 할 수 있어요!

![image](https://user-images.githubusercontent.com/77006427/112299440-2451d000-8cdb-11eb-9c74-9ead9711acfb.png)

[Controlled Component 예시 코드](https://codesandbox.io/s/controlled-component-epirw?file=/src/ControlledComponent.js)

#### 1.3 Uncontrolled Component(비제어 컴포넌트)
react state가 아닌 DOM을 우리집 냉장고(SSOT)로 만들어, 
form element를 제어를 하는 경우, 
**UnControlled Component**


1. 냉장고가 어딘이지 알려줄 친구들이에요. 

![image](https://user-images.githubusercontent.com/77006427/112300052-cd002f80-8cdb-11eb-8438-e5c43a18d3a3.png)

2. 냉장고는 여기야! 알려줍니다.

![image](https://user-images.githubusercontent.com/77006427/112299882-9aeecd80-8cdb-11eb-99b0-5eadb0f7dde8.png)

3. 폼을 제출 하는 이벤트가 발생시, 냉장고는 지금 뭐가 있는지 확인 할 수 있어요.

![image](https://user-images.githubusercontent.com/77006427/112300207-ee611b80-8cdb-11eb-8a85-60755e3ec5c0.png)

![image](https://user-images.githubusercontent.com/77006427/112300570-53b50c80-8cdc-11eb-8129-1de980d7ccce.png)

[Uncontrolled Component 예시 코드](https://codesandbox.io/s/controlled-component-epirw?file=/src/UncontrolledComponent.js)

위의 작동 원리는 
js에서 DOM을 조작하는 원리와 같은 맥락이라고 보시면 훨씬 더 이해하기 편합니다.

1. form mark-up

![image](https://user-images.githubusercontent.com/77006427/112300735-865f0500-8cdc-11eb-8693-5c733c89d4e5.png)

2. js-form 클래스를 가진 친구가 제출 이벤트를 듣게 되면, 
input이라는 친구가 자기가 뭘 가지고 있는지 알려줍니다.

![image](https://user-images.githubusercontent.com/77006427/112300819-9bd42f00-8cdc-11eb-90a9-0395ba1a95b8.png)

[Vanilla JS 예시 코드](https://codesandbox.io/s/form-m5k3x)

**react에서 만든 상태가 아닌, DOM에 집적 접근해서 해당 element의 정보를 가져온다라는 맥락입니다.**

### 정리
냉장고를 어디에 둘 것이냐의 기준으로 제어/비제어로 나눠진다고 보면 됩니다.
**React state** or **DOM**

### ※ ⚠ 주의 할 점 ⚠
1. `input type="file"` element는 비제어 컴포넌트입니다.

2. React 공식문서에서는, controlled component를 되도록 사용하라고 권장합니다.

3. unControlled Component를 무조건 사용하지 않는 건 아닙니다. 남발하지 말라는겁니다. :)

   ![image](https://user-images.githubusercontent.com/77006427/112302760-c8894600-8cde-11eb-8d98-fd391f73693b.png) 
  [출처](https://ko.reactjs.org/docs/refs-and-the-dom.html#when-to-use-refs)

4. 구현 하고 싶은 기능에 따라, 선택해서 사용하면 됩니다.

![image](https://user-images.githubusercontent.com/77006427/112302222-2f5a2f80-8cde-11eb-9800-10a79165691e.png)

References:
- [Single Source of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth)
- [월드 와이드 웹 협회 - 폼에 대한 정의](https://www.w3.org/TR/html401/interact/forms.html)
- [폼 연대기](https://www.ventureharbour.com/the-evolution-of-web-forms/#:~:text=The%20first%20generation%20of%20true,of%20Web%202.0%20in%202004)
- [폼 공식문서](https://reactjs.org/docs/forms.html)
- [비제어 컴포넌트](https://reactjs.org/docs/uncontrolled-components.**html**)
- [useRef](https://reactjs.org/docs/hooks-reference.html#useref)
