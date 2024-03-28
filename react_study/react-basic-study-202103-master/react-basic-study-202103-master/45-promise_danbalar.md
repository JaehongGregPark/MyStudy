# 프로미스 객체는 어떻게 만들까?


```jsx
const makePromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let random = Math.random();
            if (random < 0.5){
                reject('실패했음');
            } else if (random > 0.5){
                resolve('성공했음');
            }
        },1000);
    });
}
makePromise()
	.finally(() => alert('프라미스의 결과가 나왔습니다.'))
    .then((result)=> alert(result) , (error) => alert(error));
```

![image](https://user-images.githubusercontent.com/75282888/115944188-3ba8f680-a4ef-11eb-8501-20bfee0ea5d8.png)

![image](https://user-images.githubusercontent.com/75282888/115944466-e1a93080-a4f0-11eb-98e5-a32ac51fd4aa.png)

1. new Promise에 전달되는 함수를 executor(실행자, 실행함수)라고 부른다.
2. executor는 new Promise가 만들어질 때 자동으로 그리고 즉각적으로 호출된다. 
3. executor의 인수 resolve와 reject는 자바스크립트가 자체적으로 제공하는 콜백이다.
4. resolve(value) : 일이 성공적으로 끝난 경우, 그 결과를 나타내는 value와 함께 호출된다.
5. reject(error) : 에러 발생 시 에러 객체를 나타내는 error와 함께 호출
6. new Promise 생성자가 반환하는 promise 객체는 다음과 같은 내부 프로퍼티를 갖는다.
7. state : 처음에는 'pending' 이었다 resolve가 호출되면 'fulfilled', reject가 호출되면 'rejected'로 변한다.
8. result : 처음에는 undefined였다 resolve(value)가 호출되면 value로, reject(error)가 호출되면 error로 변한다.



# 후속처리 메서드 then / catch / finally

![image](https://user-images.githubusercontent.com/75282888/115943478-26ca6400-a4eb-11eb-86aa-00474bcf481d.png)

### then

```jsx
promise.then(
  function(result) { /* 결과(result)를 다룹니다 */ },
  function(error) { /* 에러(error)를 다룹니다 생략 가능 */  } 
);
```

then의 첫번째 인자(콜백)에는 프로미스의 결과가 fulfilled일 때의 로직이 담긴다.

콜백의 인자인 result는 fulfilled일 때의 result값이다.



then의 두번째 인자에는 프로미스의 결과가 rejected일 때의 로직이 담긴다.

콜백의 인자인 error는 rejected일 때의 result값이다.



### catch

```javascript
promise.catch(
  function(error) { /* 에러(error)를 다룹니다 */  } 
);
```

then(null, (err) => {} ) 와 똑같다.

프로미스가 rejected일 때의 로직이 담기고, error인자는 rejected일 때의 result값이다.



### finally

```javascript
promise.finally(
  function() { /* 결과가 성공인지 실패인지와 무관 */ },
);
```

프로미스가 성공인지 실패인지와 무관한 로직이 담긴다. 





# 콜백헬이 왜 발생하지?

 비동기적인 로직이 담긴 함수의 파라미터는 **비동기함수(로직(콜백), 로직의 실행조건)**으로 구성된다.

간단한 비동기적인 로직이라면 상관 없지만 복잡한 비동기적인 로직이 담기면 필연적으로 수많은 nesting이 발생한다.

예를 들어볼까?

```jsx
비동기함수1(() => {
    로직 1;
	비동기함수2(() => {
        로직2;
        비동기함수3(() => {
            로직 3;
        }, 조건3)
    }, 조건2)
}, 조건1)


 
```



```javascript
setTimeout(() => {
	console.log('로직1');
	setTimeout(() => {
		console.log('로직2');
		setTimeout(() => {
			console.log('로직3');
		}, 1000)
	},1000)
},1000)


```





# 프로미스를 쓴다면 어떻게 될까?

```javascript
const newTimeout = (arg, sec) => {
    let promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(arg);
        }, sec);
    })
    return promise;
}

newTimeout('로직1', 1000)
	.then((result) => {
    	console.log(result)
    	return newTimeout('로직2', 1000);
	})
	.then((result) => {
    	console.log(result);
    	return newTimeout('로직3', 1000)
	})
	.then((result) => {
    	console.log(result);
	})
	
```

then 콜백의 return을 프라미스 객체로 함으로써

프라미스 체이닝을 구현할 수 있다.



# Async를 쓴다면 어떻게 될까?

```javascript
const newTimeout = (arg, sec) => {
    let promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(arg);
        }, sec);
    })
    return promise;
}

const asyncTimeout = async () => {
    let a = await newTimeout('로직1', 1000);
    console.log(a);
    a = await newTimeout('로직2', 1000);
    console.log(a);
    a = await newTimeout('로직3', 1000);
    console.log(a);
    
}
asyncTimeout();

```

async는 함수의 리턴을 프라미스화한다.

await은 프라미스에 붙일 수 있는데

await이 붙은 프라미스의 결과가 나올 때까지 뒤의 로직들은 대기하게 된다.

