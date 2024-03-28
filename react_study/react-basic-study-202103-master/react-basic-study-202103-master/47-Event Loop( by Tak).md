# Event Loop

## Event
> Events are actions or occurrences that happen in the system you are programming

- 프로그램 파일에서 특정한 행동 혹은 사건의 발생을 일컫어 이벤트라 지칭합니다.

### Web에서 Event가 발생하는 요인들
- 유저의 특정 액션 ex) click, keyboard
- API ex) fetching data
- script 가 실행 시

### Event가 발생하면 어떻게?
- 부착해둔 EventListenr가 event가 발생 됐다는걸 감지 -> Event Loop을 통해 각종 event 발생 시 작동하는 특정 메세지(task)을 handling 합니다.

## Event Loop

![image](https://user-images.githubusercontent.com/77006427/115996864-f59d8100-a61b-11eb-90fa-d7e6d093c47c.png)

#### Runtime concepts - 시각적 자료
  
![image](https://user-images.githubusercontent.com/77006427/115996181-35169e00-a619-11eb-8aad-d66c9746912d.png)

- 함수는 stack of frames
- object -> Heap
- 호출된 함수의 메시지(task)를 처리해주는 곳 -> Queue

![image](https://user-images.githubusercontent.com/77006427/115997163-216d3680-a61d-11eb-97cf-89f8aa90dc83.png)

보다 이해하기 쉬운 Visuals를 보고 싶으시다면 하단 링크: 
- [Javascript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)



#### 왜 loop이라 해요?
  
```bash
while (queue.waitForMessage()) {
  queue.processNextMessage()
}
```

처리해줄 메시지를 queue가 계속 기다려 주니... loop이라 표현합니다.

Hey... 이벤트마무 
다음 message( task ) 들어올 떄까지 기다리는 너란 놈...
  
![image](https://user-images.githubusercontent.com/77006427/115997053-9b50f000-a61c-11eb-8097-8c9022d866bc.png)

#### JS engine
자바스크립트 코드를 실행하기 위해, JS엔진의 스페셜 agent들이 각각 맡은 바 임무를 수행합니다.

각 agent들은 execution context로 구성 돼있습니다.

이 agent들이 미션을 수행하기 도와주는 것이 바로, event loop! 

- event를 수집해주고 -> call stack
- tasks를 queue에다 선착순으로(First in, First served)로 처리해주는 기차 -> queue
- 다음 tasks가 또 오기 전에 DOM에 그려준다. 
※ (Event loop 내에 Task가 끝나야 해당 액션이 DOM에 그려지는 것 입니다.)

#### 글로서는 도저히 이해가 힘들어요!!

아래 사진과 같이 각각의 agent들의 task는 크게 보면 3개의 프로세스를 통해 처리 된다는 것 입니다!
  
![image](https://user-images.githubusercontent.com/77006427/115998311-a35f5e80-a621-11eb-9792-cfe5d655b64b.png)

Event loop이 실제로 돌아가는 과정을 보여주는 [사이트](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)를 확인 해보시면 보다 쉽게 접근 하실 수 있습니다.

(데모)

See Also
- [Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [Event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event loop: microtasks and macrotasks](https://javascript.info/event-loop#event-loop)
- [Event loop algorithms](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)
- [What the heck is event loop anyway](https://youtu.be/8aGhZQkoFbQ)