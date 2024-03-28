# Immer

🤔 **Why is Immutability important in React??**

- React는 state가 변할 때 그걸 `인지`하고 re-rendering합니다. 그럼 React는 어떻게 이 `변화를 인지`하는 걸 까요? 

- 어떤게 변했다는 사실을 알기 위해서는 일단 비교 대상, 즉 원본이 있어야 '아! 원본이 변했구나'라는 걸 알 수 있습니다. 그러므로 **원본을 복사해서 그 복사본을 수정한 다음 원본과 복사본을 비교하면 `"원본이 변했다"`는 사실과 "어떤 부분이 변했다"를 알 수 있습니다.**

- 하지만 객체의 프로퍼티를 하나 하나 비교하면서 어떤부분이 변한지를 먼저 찾고 변한 사실을 인지하는 건 객체가 깊어 질수록 시간이 오래 걸리고 과정이 복잡해집니다. 

    ```jsx
    const userState = {
        name: 'Choi', 
        age: '25', 
        loginToken: 'asfwerasdf', 
        friends: ['Lee', 'Park'], 
        skills: { 
            frontEnd: ['React', 'Vue', 'jQuery', 'HTML','CSS'], 
            backEnd: ['Node.js'], 
            common: ['TS'] 
            } 
        }
    ```

    예를 들어, 위와 같은 객체가 있을 때 'skills' 객체 프로퍼티에서, 'backend' 프로퍼티에 'JAVA'를 추가했다면 React는 변화했다는 걸 알아내기 위해 모든 프로퍼티를 하나하나 비교해야 합니다. 

- 그래서 React는 `원본이 변했다`는 사실만 빠르게 알아내고 re-rendering을 합니다. 이렇게 `원본이 변했다는 사실`을 제일 빨리 알아낼 수 있는 방법이 참조 값이 다른 복사본을 만드는 것입니다. 객체 내부를 깊이 들여다 볼 필요 없이, 상위 객체 자체가 다른 참조값을 가지는 복사본을 만들어 냈다는 것은 그 객체를 변하게 할거라는 의미와 동일하므로 re-rendering을 결정 합니다. 

<br>

## Make copy using Javascript

- array.concat()

    ```jsx
    handleClick() {
    this.setState(state => ({
        words: state.words.concat(['marklar'])
    }));
    }
    ```

- spread syntax

    ```jsx
    handleClick() {
    this.setState(state => ({
        words: [...state.words, 'marklar'],
    }));
    };
    ```

- Object.assign()

    ```jsx
    function updateColorMap(colormap) {
        return Object.assign({}, colormap, {right: 'blue'});
    }
    ```

>간단하게 위의 함수 연습해보기: <https://codesandbox.io/s/suspicious-resonance-lv6wj>

<br>

🤔 **Why we need 'Immer'?**

- 위에서 살펴봤듯이, 불변성을 유지하기 위해 javascript에서 원래 부터 사용가능한 함수들이 있습니다. 그럼 어떨 때 'Immer' library를 사용하면 좋을까요??

    ```jsx
    const user = { 
        name: 'Choi', 
        age: 25, 
        friends: ['Park', 'Kim']
        } 

    const otherUser = { ...user }; 

    user.name = 'Lee'; 

    user.friends.push('Kang'); 

    /* user = { name: 'Lee', age: 25, friends: ['Park', 'Kim', 'Kang'] } 
    otherUser = { name: 'Choi', age: 25, friends: ['Park', 'Kim', 'Kang'] } */ 

    user === otherUser // false 
    user.friends === otherUser.friends // true
    ```

    spread syntax로 otherUser라는 복사본 객체를 만들었습니다. user.name을 바꿔준 것은 otherUser에 반영되지 않았지만 user.friends.push()를 했을 땐 두 객체가 같이 바뀝니다. React라고 생각 했을 땐 어떤 문제가 생길까요?

<br>

- 위와 같이 우리가 자주 사용하는 spread syntax는  shallow copy(얕은 복사)를 하게 되는데, 저희가 원하는 건 완전히 다른 객체를 만들되, 안의 내용은 완전히 똑같기를 원합니다. 이걸 바로 deep copy(깊은 복사)라고 하는 데, 객체가 깊어질 수록 deep copy도 어려워집니다. 이 때 사용 가능한 것이 바로 **'Immer' library** 입니다. 

<br>

## How Immer works

- 어떤 객체가 있다고 했을 때, immer은 자체적으로 그 객체의 drafState를 만듭니다. 이 복사본에서 원하는 대로 수정을 끝내면 immer는 그 수정된 사항들을 반영한 nextState를 만듭니다. 


    ![image](https://user-images.githubusercontent.com/75834421/113087067-d4fd2980-921d-11eb-811a-9072c9ed7d6b.png)

<br>

- immer 을 사용하기 위해선 외부 library이므로 설치가 필요합니다.

    ```jsx
    $ npm install immer 
    ```

- 그리고 작성중인 코드 상단에서 import 해주어야 합니다.

    ```jsx
    import produce from 'immer';
    ```

- produce 함수를 사용 할 때에는 첫번째 파라미터에는 **수정하고 싶은 상태**, 두번째 파라미터에는 **어떻게 업데이트하고 싶을지 정의하는 함수**를 넣어줍니다.

    ```jsx
    //immer사용 전 
    case "CREATE_USER":
        return {
            inputs: initialState.inputs,
            users: state.users.concat(action.user)
        }
    case "REMOVE_USER":
        return {
            ...state,
            users: state.users.filter(user => user.id !== action.id)
        }
    case "TOGGLE_USER":
        return {
            ...state, 
            users: state.users.map(user => 
                user.id === action.id ? {...user, active: !user.active} : user
            )
        };

    //immer 사용 후
    case 'CREATE_USER':
        return produce(state, draft => {
            draft.users.push(action.user);
        });
    case 'REMOVE_USER':
        return produce(state, draft => {
            const index = draft.users.findIndex(user => user.id === action.id);
            draft.users.splice(index, 1);
        });
    case 'TOGGLE_USER':
        return produce(state, draft => {
            const user = draft.users.find(user => user.id === action.id);
            user.active = !user.active;
        });
    ```

    >👀 여기서 알 수 있듯이 객체가 깊지 않거나, immutability를 유지하기위해 코드가 길어 지는 경우가 아닌 이상 immer을 사용하지 않아도 됩니다. 최대한 일반 javascript로 구현하고, 필요한 곳에만 immer을 사용합니다! 

<br>

- React의 setState와 같이 사용하기 

    : 첫번째 파라미터를 생략하고 바로 업데이트 함수를 넣어주게 된다면, 반환 값은 새로운 상태가 아닌 `상태를 업데이트 해주는 함수`가 됩니다.

    ```jsx
    const todo = {
    text: 'Hello',
    done: false
    };

    const updater = produce(draft => {
    draft.done = !draft.done;
    });

    const nextTodo = updater(todo);

    console.log(nextTodo);
    // { text: 'Hello', done: true }
    ```
    <br>

    : setTodo 함수에서 함수형 업데이를 함으로써, useCallback 을 사용하는 경우 두번째 파라미터인 deps 배열에 todo 를 넣지 않아도 됩니다. 이렇게 setState(여기서는 setTode)는 함수를 가질 수 있으므로 위와 같은 첫번째 파라미터를 생략한 produce함수를 가질 수 있습니다. 

    :produce 가 반환하는것이 업데이트 함수가 되기 때문에 useState 의 업데이트 함수를 사용 할 떄 다음과 같이 구현 할 수 있게 됩니다.

    ```jsx
    //immer 사용 전

    const [todo, setTodo] = useState({
        text: 'Hello',
        done: false
    });

    const onClick = useCallback(() => {
        setTodo(todo => ({
            ...todo,
            done: !todo.done
        }));
    }, []);

    //immer사용 후 
    const [todo, setTodo] = useState({
        text: 'Hello',
        done: false
    });

    const onClick = useCallback(() => {
    setTodo(
        produce(draft => {
        draft.done = !draft.done;
        })
    );
    }, []);
    ```

    <br>

참고자료
- Immutability in React with Immer: <https://blog.logrocket.com/immutability-in-react-with-immer/>

- Pros and Cons of using immutability with React.js: <https://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/>

- React에서 불변성을 지켜야 하는 이유: <https://webigotr.tistory.com/293>

- immer 공식 페이지: <https://immerjs.github.io/immer/>
