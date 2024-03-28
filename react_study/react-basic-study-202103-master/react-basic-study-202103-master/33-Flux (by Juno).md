# 33-Flux

## 🤷‍♀️ Flux 란?

<br/>

> Flux는 MVC 모델의 단점을 보안하기 위해 만든 페이스북에서 발표한 패턴(pattern)입니다.  
> React, Redux의 디자인 패턴이기도 합니다. 이러한 Flux 패턴에 영감을 받아 Vue에서는 Vuex를 만들어서 사용합니다.

<br/>

## 🙄 MVC 패턴 ?

<br/>

&nbsp; MVC(Model View Controller) 패턴은 "무엇을 할지"(Model) 내부 비지니스 로직을 처리하고, "무엇을 보여줄지"(View) 유저에게 화면을 보여주기 위함을 처리하고, "어떻게 처리할지"(Controller) 사용자의 요청을 받아서 어떻게 처리하고 보여줄지 Model과 View를 요청합니다.

<br/>

<p align="center"><img src="https://velopert.com/wp-content/uploads/2016/04/MVC.png"/></p>

<br/>

<p align="center"><img src="https://t1.daumcdn.net/cfile/tistory/2311AC46521AF3E80A"/></p>
<p align="center">*Java MVC2</p>

<br/>

## 😥 MVC 한계

<br/>

&nbsp; MVC(Model View Controller) 패턴에는 Model과 View가 양방향 패턴에서 나오는 의존성을 가진다는 특성이 있습니다. 이는 복잡한 어플리케이션을 서비스하게 된다면 새로운 기능이 추가 될 떄마다 시스템의 복잡도를 기하급수적으로 증가 시키고, 예측 불가능한 코드를 만들게 되며, 예측 못할 버그들이 쏟아지게 됩니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FALrHe%2FbtqBTMSuHfN%2FZlW9i9ET34e90APgCRChk1%2Fimg.png"/></p>

<br/>

&nbsp;페이스북이 가졌던 문제점 중 한가지는 바로 알림(notification)버그 입니다. 페이스북에 로그인 했을 때 메시지 아이콘에 알림이 떠 있지만, 그 메시지 아이콘을 클릭하면 아무런 메시지가 없는등의 버그가 생긴겁니다. 또 알림은 사라지겠지만, 몇 분 뒤 알림이 다시 나타나고 다시 아무런 메시지는 나타나지 않습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FAeyYk%2FbtqBO7RutbO%2FjF8wxI6kwsXxKk2Qg6D5dk%2Fimg.png"/></p>

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fekb6k6%2Fbtq2trClwna%2FZjKvGYAwkIpIravAIGwBd0%2Fimg.png"/></p>

<br/>

&nbsp;이러한 악순환은 페이스북 개발자들이 문제를 해결하더라도 다시 문제가 생기는 사이클이 계속 반복되었습니다.
때문에 이를 해결하기 위한 Flux라는 흐름을 도입하게 되었습니다.

<br/>

## 🙏 Flux !

<br/>

&nbsp; 위의 MVC패턴을 벗어나고자 고안해낸것이 다른 종류의 아키텍처 Flux입니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlmfPW%2FbtqBQnTPgIs%2FZ1jmHHdNcOTNiu93kQ9gMk%2Fimg.png"/></p>

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbr7Ob3%2Fbtq2ryaSMx3%2FPKrNxFuaeHSgRxusCmCur1%2Fimg.png"/></p>

<br/>

&nbsp;Flux의 가장 큰 특징은 단방향 데이터 흐름입니다. 흐름은 항상 Dispatcher에서 Store로 Store에서 View로, View는 Action을 통해 다시 Dispatcher로 데이터가 흐릅니다. 이러한 단방향 데이터 흐름을 이용하면 데이터의 변화를 예측 하기 쉽게 만들게 됩니다.

<br/>

## 👀 자세히 알아보기

<br/>

### 1. Dispatcher

---

<br/>

&nbsp;Dispatcher는 데이터의 흐름을 관리하는 허브 역할입니다. Action이 발생되면 Dispatcher로 전달되며 Dispatcher는 전달된 Action을 보고, 등록된 콜백을 실행하여 Stroe에 데이터를 전달하게 됩니다.

<br/>

### 2. Action

---

<br/>

&nbsp;Dispatcher에서 콜백함수가 실행되면 Store가 업데이트 되는데 이때 데이터가 담겨있는 객체를 인수로 전달합니다. 이때 전달 되는 객체를 Action이라고 합니다.

<br/>

### 3. Store

---

<br/>

&nbsp;Store는 애플리케이션의 모든 상태와 관련 로직을 가지고 있습니다. Store의 state 변경이 완료가 되면 View에 상태가 변경 했다는 것을 알려주게 됩니다.

<br/>

### 4. View

---

<br/>

&nbsp; Flux의 View는 화면에 나타내는 것 뿐만아니라, 자식의 View로 데이터를 흘려 보내는 View Controller 역할도 같이합니다. 애플리케이션 내부에 대해서는 아는 것이 없지만, 받은 데이터를 처리하여 사람들에게 보여주기 위한 일을 합니다.

<br/>

[Flux 카툰 안내서](http://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/)

[Flux와 MVC](https://beomy.tistory.com/44)

👋
