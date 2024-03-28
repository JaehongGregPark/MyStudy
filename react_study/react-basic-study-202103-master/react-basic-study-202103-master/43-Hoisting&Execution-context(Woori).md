# Execution Context

자바스크립트의 모든 것은 execution context 안에서 일어납니다.

execution context는 코드가 실행되기 위해 필요한 환경 정보들을 모아둔 객체라고 말할 수 있습니다.   
환경 정보들을 모아서 context를 구성하고 이를 call stack에 담아서 실행되는 코드의 순서가 정해지게 됩니다.   
이 때 하나의 execution context를 구성하는 방법은 다음과 같습니다.   

- 전역 공간
- eval 함수
- 함수

<br>

execution context를 본격적으로 살펴보기에 앞서 알아두면 좋은 자바스크립트의 개념이 있습니다.   

바로 자바스크립트는 **synchronous, single-threaded language** 라는 것입니다.   
**위와 같은 특성을 가지고 있기 때문에 자바스크립트 코드를 시행할 때에는 한 줄이 끝나야 그 다음 줄로 넘어갈 수 있습니다(동기적 시행).**   
**따라서 한 번에 한 명령만 수행하며**
**명령을 수행할 때 특정한 순서가 생기게 됩니다.**   

위의 개념을 인지하고나서, 예시 코드를 보면서 execution context가 어떻게 형성되고 자바스크립트가 시행되는지 살펴보겠습니다.   

<br>

1. execution context의 구성

이 execution context는 앞으로 2가지 단계를 거치며 생성될 것입니다.   
- 첫번째는 memory가 생성될 것이고   
- 두번째로는 code가 실행될 것입니다.   
  
memory에는 variable 과 Function이 key-value pair의 형태로 저장됩니다.   
이 memory를 variable envirnment라고도 합니다.   
그리고 실행되는 code 부분이 있는데, 이 코드를 Thread of execution이라고도 합니다.   

그림으로 나타내면 다음과 같습니다.   

![JavaScript-8](https://user-images.githubusercontent.com/53216594/115571564-14d59f00-a2fa-11eb-8ce3-6055223b50d0.jpg)

```javacsript
var n = 5;
function doubleTwo(num) {
  var result = num * 2;
  return result;
}

var doubleNum = doubleTwo(n);
var doubleNine = doubleTwo(9);
```
위의 코드의 execution context를 그림으로 그려서 살펴보겠습니다.   

1. 가장 먼저 Global Execution context가 생성됩니다.   

위에서 execution context는 2단계를 거쳐서 생성된다고 했습니다.   

먼저 첫번째로 memory가 생성되는 과정을 살펴봅시다.   
자바스크립트가 전체 코드를 한줄씩 차례대로 쭉 훑어봅니다. 그리고 모든 variable과 function에 메모리를 할당하게 됩니다.   
차례대로 n, doubleTwo함수, doubleNum, doubleNine에 메모리를 할당하게 될 것입니다.   
이때 주의해야할 것은 variable에는 undefined값이 들어왔다는 것입니다.   
doubleTwo함수에는 함수 전체의 복사된 값이 들어올 것입니다.   

![JavaScript-9](https://user-images.githubusercontent.com/53216594/115572013-7b5abd00-a2fa-11eb-960a-ecc6bd5b1524.jpg)

두번째 단계에서는 code가 시행될 것입니다.   
첫번째 줄에 n에 5값을 넣어주었기 때문에, 메모리의 n값이 5가 됩니다.   
다음 줄에서는 함수를 선언하고 있는데 바뀔만한 것이 없습니다.   

그 다음으로 #번째 줄에서 `doubleTwo함수를 시행`하고 있습니다.    
`함수를 시행`하면서 `새로운 execution context`를 생성하게 됩니다.   

![JavaScript-10](https://user-images.githubusercontent.com/53216594/115572104-90375080-a2fa-11eb-9a82-76c826d49db0.jpg)

이제 `새로운 execution context`에도 아까와 마찬가지로 2개의 단계를 거치게 됩니다.
먼저 memory 생성입니다. 앞서 말했듯이 variable과 function에 메모리를 할당합니다.   
함수의 parameter도 변수로 취급되어 메모리를 할당하게 됩니다.   

![JavaScript-11](https://user-images.githubusercontent.com/53216594/115572234-acd38880-a2fa-11eb-9e9c-f99b9392a808.jpg)


다음으로 코드를 시행하는 단계입니다.   
doubleTwo함수를 차례대로 한줄씩 시행합니다.   

n값이 5인데 이 값이 num값으로 전달됩니다. 따라서 num값은 undefined에서 5가 됩니다.   
다음 줄의 result는 5곱하기 2가 시행되어 undefined에서 10이 됩니다.   

그리고 우리는 result값을 return 합니다.   
return을 하게되면 return한 값을 local memory에서 찾게 됩니다.    
여기서는 `result:10` 이 부분이겠죠?

result값이 10이므로 이 값을 doubleNum 변수에다가 전달하여 doubleNum은 10이 됩니다.   

![JavaScript-12](https://user-images.githubusercontent.com/53216594/115572334-c2e14900-a2fa-11eb-9bc1-0188c091ed6f.jpg)


이제 이 함수에서 할 일은 다 끝냈고 이제 이 context는 사라지게 될 것입니다.   

(그림)

그리고나서 해당 함수가 호출되었던 곳으로 돌아가게 됩니다. 즉 함수가 호출되었던 execution context로 돌아갑니다.   

이제 다음 줄로 넘어가서 우리는 doubleTwo(9)를 호출하게 됩니다.   
새롭게 함수가 호출되었기 때문에 새로운 execution context가 생길 것입니다.   
그리고 메모리가 할당 될 것입니다.(num: undefiend, result: undefiend)   

![JavaScript-16](https://user-images.githubusercontent.com/53216594/115572660-10f64c80-a2fb-11eb-9912-880f6f943fd7.jpg)

메모리가 할당되었으니 다음으로 코드가 시행됩니다.   

![JavaScript-13](https://user-images.githubusercontent.com/53216594/115572768-2c615780-a2fb-11eb-80aa-23110a1dca74.jpg)

아까와 같은 과정을 거쳐 새로운 context의 num에는 9, result에는 18이 들어갑니다.   
result값이 return되면서 해당 context 역시 사라지게 됩니다.   

![JavaScript-14](https://user-images.githubusercontent.com/53216594/115572921-4ac75300-a2fb-11eb-979d-d8127c471e9c.jpg)

마지막으로 모든 코드가 시행되었으니 global execution context역시 사라집니다.   

![JavaScript-15](https://user-images.githubusercontent.com/53216594/115573043-65013100-a2fb-11eb-8f42-5fb455ccd386.jpg)


## call stack

위의 과정은 call stack개념과도 큰 연관이 있습니다.   

자바스크립트는 데이터 a,b,c,d 를 순서대로 저장했을 때 d,c,b,a 순서로 꺼내지는 단일 콜스택을 갖습니다.   
![Computer-science-fundamentals_6 1](https://user-images.githubusercontent.com/53216594/115568171-01750480-a2f7-11eb-9c66-98a812147547.png)
(이미지 출처: https://gohighbrow.com/stacks-and-queues/)

위 코드의 execution context를 call stack으로 나타내면 다음과 같습니다.   

![JavaScript-17](https://user-images.githubusercontent.com/53216594/115573153-7d714b80-a2fb-11eb-9301-6090dcc9da71.jpg)


# Hoisting

Hoisting은 우리가 initialize하기 전에 variable과 Function에 접근할 수 있도록 해줍니다.   

위에서 살펴봤던 execution context에서 메모리에 variable과 function을 할당하는 과정이 있었는데,   
그에 해당하는 과정이라고 생각하시면 됩니다.   

```javascript
sayHi();
console.log(x);

var x = 10;

function sayHi() {
  console.log("hello");
}
```

```javascript
sayHi();
console.log(x);

var x = 10;

const sayHi = () => {
  console.log("hello");
}
```

함수선언식일 때는 execution contex에서 메모리에 저장되는 단계에서 function의 복사본이 담기기 때문에 잘 실행되지만   
함수표현식인 경우는 메모리에 저장되는 단계에서 함수가 variable 취급을 받게 됩니다.   
즉 이때 sayHi는 undefined이기 때문에 레퍼런스에러가 발생하게 됩니다.   
`ReferenceError: Cannot access 'sayHI' before initialization`


