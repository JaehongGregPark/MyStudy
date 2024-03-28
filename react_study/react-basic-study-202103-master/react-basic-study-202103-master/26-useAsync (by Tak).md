# useAsync 

### 이게 뭐에요? 🙄
API request에서 전달받은 response에 상태를 핸들링 해주는 Custom Hook입니다.

API request의 response의 상태는 아래와 같습니다.
1. idle
2. pending
3. success 
4. error

사용자가 보는 페이지에서는,  
api server에서 어떤 status를 주는냐에 따라,  
서비스는 사용자에게 무엇을 보여주는냐를 결정합니다.  

- 없 - idle
- 로딩을 보여주는냐 - pending
- 받아온 데이터를 보여주느냐 - sucess
- 에러 페이지를 보여주느냐 - error

컴포넌트 안에서, 해당 response의 status를 받아와 state를 관리하기에는  
다량의 useState hook을 선언 해줘야됩니다.

> Juno님 코드 ㅎㅎ  
![image](https://user-images.githubusercontent.com/77006427/113883643-4e39e500-97f9-11eb-9e11-d4c037dda8c4.png)  
![image](https://user-images.githubusercontent.com/77006427/113884107-affa4f00-97f9-11eb-870f-45fa8d46ed45.png)  


status에 따라 그려주는 절차는 똑같은데,   
각각의 컴포넌트에서 중복되는 이런 상태 선언(useState)들을 어떻게 줄일 수 있을까?  
라는 생각이 **useAsync** 라는 custom hook을 만들어 사용하는 계기입니다.  

※ DRY(Don't Repeat Yourself) - software development principle
※ 중복되는 코드가 있을 시, 어떻게 하면 내가 한 라인이라도 줄일 수 있을 까 고민하는게, 개발자 특 아닌가 싶습니다.
※ 쉽게 말하자면, 똑같은 코드 다시 적기 귀찮아~~~~


### 그럼 useAsync를 어떻게 만들어요?

오늘 준비한 코딩부터 보시죠.

(라이브 코딩 세션)


Reference
- [useAsync 커스텀 훅 만들기](https://react.vlpt.us/integrate-api/03-useAsync.html) 
- [useAsync](https://react.vlpt.us/integrate-api/03-useAsync.html)
- [Fetching Asynchronous data with react hooks](https://polvara.me/posts/fetching-asynchronous-data-with-react-hooks)

