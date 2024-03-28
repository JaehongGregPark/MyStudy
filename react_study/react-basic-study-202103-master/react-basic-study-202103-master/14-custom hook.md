# CUSTOM HOOKs 수심 50cm 🖐

## TELEPATHY
---
**동일한 컴포넌트 로직**이, **복수의 컴포넌트**에 중복 사용 된다면,  
 
 ![image](https://user-images.githubusercontent.com/77006427/113147643-ec630380-926b-11eb-8675-a1247817c40b.png)

`Custom Hook`를 만들라는 신호입니다.


대체 무슨 얼토당토 안되는 말를 하고 있는 것인지  
준비한 코드를 살펴보며  
확인해보겠습니다.

---

간단한 Form 코드입니다. 
(*Controlled Component* 기억나시나요...?)


```bash
function Form() {
  const [isValid, setValid] = useState(fals
  return (
    <div className="Form">
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        onChange={e => {
          const newValue = e.target.value;
          let _isValid = false;
          if (newValue.length >= 8) _isValid = true;
          setValid(_isValid);
        }}
      />
      {isValid ? <p>Your password is valid </p> : null}
    </div>
  );
}
```

위의 코드는 다음과 같습니다. 

1. password를 입력하는 input
2. password의 값이 변경이 될 시에, 해당 password의 값을 검증해주는 onChange 함수
3. 검증에 합당할 시, 입력된 password는 검증됬다는 메세지를 사용자에게 보여준다. 

※ 위의 2번의 로직에서는 길이가 8개 이상인 경우, validation을 통과합니다.

---

이제 위와 같이 validation 로직을 적용해야되는 Form이 
구축하고 있는 사이트에서 20군데나 있다고 가정해봅시다.

일일이 onChange에 동일한 validation 로직을 기입하겠다 다짐하였으면,  
개발이 과연 자기의 진로인가에 대해 깊게 고려해보셔야됩니다. 

각설하고,  

위와 같이 중복되는 로직이 보이면 **분리를 시켜줘야 될거같은데?** 라는 `신호`로 보시면 됩니다.


Valiadtion 로직이 분리된 코드를 살펴보겠습니다.
```bash
function Form() {
  const [isValid,onPasswordChange] = useSmartPassword();
  return (
    <div className="Form">
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        onChange={e => onPasswordChange(e)}
      />
      {isValid ? <p>Your password is valid </p> : null}
    </div>
  );
}

function useSmartPassword(){
  const [isValid, setValid] = useState(false);

  const onChange= e => {
    const newValue = e.target.value;
    let _isValid = false;
    if (newValue.length >= 8) _isValid = true;
    setValid(_isValid);
  };

  return [isValid, onChange]; 
}
```
[샌드박스 링크](https://codesandbox.io/s/react-custom-hooks-1zlvc?file=/src/index.js)

1. **useSmarPassword**라는 custom hook function을 만든다.   
(use 접두어는 custom hook에 rules of hook을 적용하기 위해 붙여야됩니다.)
1. custom hook에 useState를 사용함으로 stateful 하게 만든다.
`const isValid, setValid] = useState(false)` 
3. 이전에 설명하였던 로직이 포함된 함수를 선언한다. (`onChange`)
4. 해당 로직은 외부에서 state를 받아와 custom hook안의 상태를 업데이트시켜준다.
`onChange={(event) => onPasswordChange(event)}`
5. 해당 custom hook의 상태와 로직을 꺼내 Form에서 사용한다. `[isValid, on PasswordChange] = useSmartPassword()`

### 정말 간단하지 않나요? 😀


객체에서만 destructing 하는게 아닌 배열에서도 가능하다는 점 유의하시면 되겠습니다.

해당 예시에서는 배열을 반환하지만,   
꼭 배열이 아니더라도 원하는 로직을 반환하여 어디서든 사용 가능합니다. 

---

### ⚠ 주의 ⚠

Custom Hook을 사용하며 주의하셔야 될 점은,  
기존에 Hook을 사용하는 방법과 동일합니다.  

- 리액트 컴포넌트에서 사용할 것 (TOP LEVEL에서)
- 커스텀 훅에서 사용 할 것,  


custom hook within custom hook with custom hook  
![image](https://user-images.githubusercontent.com/77006427/113161835-b593ea00-9279-11eb-9a70-1b299707a9a2.png)

이미 만들어져있는 좋은 custom hook들이 많습니다. 찾아보고 없으면 만들어봅시다.  
[깃헙 링크](https://github.com/rehooks/awesome-react-hooks)


### 여담
---
인터넷에 널리고 널려있는 예시들을 살펴보면,   
> 중복되는 로직을 리팩토링해서, 어디서나 사용 가능하게 만들 수 있는게 바로 커스텀훅이야
쩔지? 👩‍💻


정말 좋습니다. ㅎㅎ


근데 이 신호에 대해 다르게 해석해보자면...

바로👀 

>Whenever you see a component knowing more than it should,
>it should a sign that you might need to refactor it.

하나의 컴포넌트에 여러 관심사가 집중 되있을 경우,  
로직을 따로 분리해서 관리하는게 좋다라는 관점도 있다고 보여집니다.

관심사의 분리라는 개념입니다... 
궁금하신 분들은 구글에 separation of concerns 을 검색해보시기를 추천드립니다.
비단, 리액트에서만 다루는 개념이 아닌, 프로그래밍을 어떻게 작성 할 것인지 대한 큰 개념이기에,  
한번 살펴보시는 것을 강력추천드립니다. 

정리하신 글 공유 기다리겠습니다.  
![image](https://user-images.githubusercontent.com/77006427/113154325-e290ce80-9272-11eb-8a48-bd5542462419.png)



References: 
- [BYOH](https://reactjs.org/docs/hooks-custom.html)
- [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Your First Custom Hook](https://itnext.io/react-custom-hooks-basics-f92de2a0ac0e)






