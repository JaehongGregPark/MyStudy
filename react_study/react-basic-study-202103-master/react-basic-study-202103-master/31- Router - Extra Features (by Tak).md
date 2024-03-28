# 라우터 부가기능


### History
Route에서 component prop에 넣어진 component들은 routing 관련 객체 3개를 받습니다. 

1. history
2. match
3. location

```bash
<Route exact path="/" component={HomePage} />
```

위와 같이, Route에 설정된 HomePage라는 Component에 prop에 3개의 객체가 추가 되는걸로 이해하시면 됩니다.

#### history 객체란
- session history를 보다 유연하게 관리해주는 [history library](https://github.com/ReactTraining/history) 에서 제공해주는 객체입니다.
  ※ history object is from history library.
- 기존의 SPA가 아닌 웹에서 관리하는 session history와 동작이 다르지만서도, 기존 웹이 관리하는 것과 동일시하게 작동을 해주는 method들이 포함되어있는 객체라고 생각하시면 이해하기 쉽습니다. 

많이 사용하는 method들은 아래와 같습니다.
- push - 이동 할 path
- goBack - 이전 컴포넌트
- block - 이동 전 alert
- 이 외에도 length, location, action등 다른 method들도 있으니 [react-router library 공식문서](https://reactrouter.com/web/api/history)에서 자세한 내용은 확인 하 실수 있습니다.


### withRouter HoC
- 앞서 말했다싶히, Route prop 'component'에 설정 된 component들은 기본적으로 위의 3개의 객체를 받는다고했습니다.
- withRouter HoC는 Route에 설정 되어있지 않은 Component에도 위 3개의 객체를 prop에 추가할 수 있게 해주는 방법입니다.  

[예시 코드](https://codesandbox.io/s/rauteobugagineung-8rs8l?file=/src/App.js)  


### Switch
- 단어 그대로, 우리가 흔히 아는 Switch문입니다. 다만 규칙(case)가 이미 정해져있는..
- Switch안에 Route는 위에서부터 아래로 차례대로 matching 되는 component를 그려줍니다.
- 위에 매칭 되는 코드가 없을 시에는 보통 잘못된 URL 접속이기에 아래와 같이 NonFountPage를 주입해, 404page를 보여줄 수 있습니다.

```bash
<Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/profile" component={ProfilePage} />
    <Route path="/profile/new" component={NewProfilePage} />
    <Route exact path="/apartments" component={ApartmentPage} />
    <Route path="/apartments/:id" component={ApartmentPage} />
    <Route exact path="/result" component={ResultPage} />
    <Route component={NotFoundPage} />
</Switch>
```

### NavLink
- ReactRouter의 Link는 원하는 path로 이동을 시켜주는 Component인 반면, NavLink는 현재 Routing에 있는 현재 URL을 참고하여 다른 Link들과 구별 할 수 있게 해주는 Component입니다.

- inline으로 주입시켜주고 싶으면 **activeStyles**  
```bash
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  FAQs
</NavLink>
```
- className을 주입시켜주고 싶으면 **activeClassName**  
```bash
<NavLink to="/faq" activeClassName="selected">
  FAQs
</NavLink>
```
  
이 외 Router에관해 부가적인 기능은 찾고찾으면 금광을 캐실 수 있으니 [library](https://reactrouter.com/web/)에서 한번 찾아보시기를 추천드립니다 :)  



See Also:
- [Session History](https://www.w3.org/TR/2010/WD-html5-20101019/history.html#:~:text=The%20sequence%20of%20Document%20s,context%20is%20its%20session%20history%20.&text=Each%20session%20history%20entry%20consists,other%20information%20associated%20with%20it.)
- [라우터부가기능](https://react.vlpt.us/react-router/04-extra.html)