# Statement, Declaration, and Expression

> A program is basically a sequence of statements

프로그램은 문으로 구성 되있는 것.

## Statement (문)
> Infomring the comupter to do some imperative thing such as if, for, loop, and etc.  
> Perfomring some actions

특정 행위 혹은 명령을 내재하고 있는 코드라고 생각 하면 됩니다.
**개별적으로 작동이 될 수 있는**

Statements은 토큰으로 구성
- 키워드
- 식별자
- 연산자
- 리터럴
- 세미콜론
- 마침표
- etc...

대표적인 Statement의 종류 
- Declartion
- Assignment
- Condition
- Loop


## Expression (표현식)
> It is a piece of code that can be evaluated to produce a value.

평가를 하여 값을 도출 되는 것이 expression이다. 

3 + 4 가 expression의 한 예시다. (BinaryExpression left, operator, 그리고 right으로 구성)

값이 도출 돼는 것. 

`{ }`

중괄화 안에는 expression이 내재 돼있어야 한다.

statement가 내재 돼있을 시

```bash
{if(true){ return 4}
```

>Unexpected token
위와 같은 에러가 발생

```jsx
<div>
    {if(true){
         return 4
    }
</div>
```

위의 jsx로 작성된 코드가 작동이 안되는 이 와 같다.


이 [AST EXPLORER](https://astexplorer.net/)사이트를 통해 문과 식을 구별 할 수 있습니다.
(abstract syntax tree를 생성 해주기에 가능)
플레이그라운드 ❤

함수를 부르는 행위는 expression으로 간주합니다.

클래스도 결국 expression입니다.  

명칭만 클래스이지 prototype을 보다 쉽게 표현할려는 방식으로 나온게 class이기에  

보통 funtion under hood라고 표현합니다. 

그러니, 위 와 같이 expression으로 칭합니다.

이 외
- Await
- tenrary opertor

    
## Function

(선언문)
declaration: with name
  
```bash
function doStuff() {};
```

함수가 실제로 만들어지는 코드는 아래와 같습니다.
```bash
let func = new Function ([arg1, arg2, ...argN], functionBody);

//example
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

(익명 함수)
expressions: without name (anonymous)  
  
```bash
const doStuff = function() {}
```

ES6 Syntax arrow function
```bash
const doStuff = () => {}
```

함수 선언문은 호이스팅이 되는 반면, 
익명함수들 즉 함수 표현식
Function declarations are hoisted but function expressions are not.

```bash
doStuff();

function doStuff() {};
```

```bash
doStuff();

const doStuff = () => ({});
```

IIFE( Immediately Invoked Function Expression )
```bash
(function() => {})()

//or

(() => {})()
```

함수 표현식은 global scope으로 까지 올릴 필요 없는 함수들이기에,
익명 함수, 즉 실행돼고 잊혀진다고도 표현합니다.

```bash
function mapAction(item) {
  // do stuff to an item
}

array.map(mapAction)
```
  
global scope  

```bash
const mapAction = function(item) {
  // do stuff to an item
}

array.map(mapAction)

//or

array.map(item => { //do stuff to an item })
```

avaialble below its initialization.
  
function declarations  (함수 선언문)  
- 코드를 global scope에서 관리하고 싶을 떄  

※ react component 가 fucntion declaration인 이유.


function expressions  (함수 표현식)
- function의 특정 scope에 제한을 두고 싶을 떄,
- global scope을 light하게 가지고 싶을떄,
- 정리정돈이 잘된 syntax를 원할떄.

함수 표현식의 장점.
- As closures
- As arguments to other functions
- As Immediately Invoked Function Expressions (IIFE)

See Also:
- [Javascript new Function](https://javascript.info/new-function)
- [statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
- [statment vs expression](https://exploringjs.com/impatient-js/ch_syntax.html#statement-vs-expression)
- [Differences Between Expression and Declartion](https://www.sitepoint.com/function-expressions-vs-declarations/)
- [Use Cases For IIFE](https://mariusschulz.com/blog/use-cases-for-javascripts-iifes)


