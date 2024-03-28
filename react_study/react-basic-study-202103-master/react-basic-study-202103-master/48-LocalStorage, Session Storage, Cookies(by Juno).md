# 48-LocalStorage, Session Storage, Cookies

<br/>

> 이용자들이 사이트를 이동할때 사용하는 HTTP는 Stateless입니다. 즉, 메모리가 없습니다.
> 웹사이트는 유저와 항상 연결이 되어있지 않고 Request, 방문시에만 요청을 하고 순간 '연결'이 되며 HTML을 받는순간 연결이 끝나게 됩니다. 하지만 유저를 기억해야하는 일이 있습니다. 유저의 프로필, 언어, 지역정보 등등의 정보를 기억해야하기때문에 cookie나 Web Storage들이 생기게 됩니다.

<br/>

## **🧩 종류**

<br/>

&nbsp; 크게 `Cookie`와 `Web Storage`로 나눠집니다. 여기서 `Web Storage`는 `Local Storage`와 `Session Storage` 두종류가 있으며 HTML5에서 표준으로 지정 되었습니다. `Cookie`에 비해 큰데이터를 저장할 수 있고 브라우저에 로컬하게 저장된다는 특징과 함께 서버로는 전송이 되지않는다는 차이가 있습니다.

<br/>

&nbsp; Desktop 기준 용량제한

<br/>

<p align="center"><img src="https://t1.daumcdn.net/cfile/tistory/9956F8495BF4344813"/></p>

<br/>

&nbsp; Mobile 기준 용량제한

<br/>

<p align="center"><img src="https://t1.daumcdn.net/cfile/tistory/99262F495BF4344722"/></p>

<br/>

&nbsp; 용량제한 부분은 참고만

<br/>

### **1. Cookie**

---

<br/>

&nbsp; Cookie는 정보를 서버와 통신을하며 작은데이터를 저장할 수 있습니다.

<br/>

**특징**

- 4kb의 용량제한 (용량이 부족하다면 Web Storage나 IndexdDB를 추천합니다.)
- 만료 기간이 존재합니다.
- 종류

  - Session Cookie : 만료시간설정하고 메모리에만 저장되며 브라우저 종료시 쿠키를 삭제합니다.
  - Pesistent Cookie : 장기간 유지되는 쿠키, 파일로 저장되어 브라우저 종료와 관계없이 사용합니다.
  - Secure Cookie : HTTPS에서만 사용하며 쿠키 정보가 암호화 되어 전송됩니다.
  - Third-Party Cookie : 방문한 도메인과 다른 도메인의 쿠키, 보통 광고 배너등을 관리할 때 유입 경로를 추적하기 위해 사용합니다.

<br/>

**단점**

- 쿠키에 대한 정보를 매 헤더(HTTP Header)에 추가하여 보내기 때문에 상당한 트래픽을 발생시킵니다.
- XSS(크로스 사이트 스크립트)나 스니핑(Sniffing)공격을 통한 탈취가 일어날 수 있습니다.

<br/>

**정책**

&nbsp; 쿠키의 사용을 직접적으로 금지하거나 제한하는 법률은 존재하지 않으나 여러 방법으로 침해로부터 보호하고 있음

> "쿠키를 운용하는 웹서버는 개인정보보호정책의 일환으로서 쿠키의 존재, 쿠키로 수집하는  
>정보의 형태와 내용, 수집의 방법과 수집한 개인정보의 사용 목적을 분명하고 정확하게,  
>가능한 한 인터넷이용자가 이해하기 쉽게 공개하여야 한다."
>
> \- 개인정보보호지침 제7조 1항 2호 참조 -

<br/>

[구글의 쿠키지원 중단](http://it.chosun.com/site/data/html_dir/2020/02/16/2020021600579.html)

<br/>

**사용법**

```js
const setCookies = (name, value, expired) => {
  let date = new Date();
  date.setTime(date.getTime() + expired * 60 * 60 * 24 * 1000);
  document.cookie = `${name}=${value}; expires=${date};`;
};

setCookies("name", "Juno", "1");
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F6118L%2Fbtq3t3TIEka%2FXk7Cas8Yn42335bq35vjQK%2Fimg.png"/></p>

<br/>

### **2. Local Storage**

---

<br/>

&nbsp; `Web Storage`인 `Local Storage`는 `window`객체 안에 존재하며 데이터저장하는데에 유효기간이 존재하지 않습니다.

<br/>

**특징**

- 10mb의 용량제한 (브라우저마다 상이하기때문에 확인을 해서 사용해야합니다. 예를들어 파이어폭스는 도메인당 최대 5mb까지 가능합니다.)
- 만료 기간이 없는 키 - 값 저장소입니다.
- 도메인이 다른경우 접근이 불가능합니다.
- 브라우저를 종료해도 유지가 됩니다.

<br/>

**사용법**

```js
localStorage.setItem("name", "Juno");
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRvFGb%2Fbtq3q6wHmW9%2FcDt2nLsE4EsaUNeAh32X90%2Fimg.png"/></p>

<br/>

```js
localStorage.setItem("name", "Juno");
localStorage.removeItem("name");
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbvpyeG%2Fbtq3mOYxZyE%2FIbFGBekyUGY7AUtdJeJiPK%2Fimg.png"/></p>

<br/>

### **3. Session Storage**

---

<br/>

&nbsp; `Local Storage`와 마찬가지로 `window`객체 안에 존재하며 브라우저 컨텍스트 영역에 저장됩니다. 즉, 사용하는 탭에따라 개별적으로 저장이 됩니다.

<br/>

**특징**

- 탭이 종료될때 데이터가 만료됩니다.
- 같은 도메인이여도 세션이 다르다면 데이터에 접근할 수 없습니다.

<br/>

**사용법**

```js
sessionStorage.setItem("name", "Juno");
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbLZre8%2Fbtq3nTERuR6%2FFQWMKy3iy8AkrfjIgPKfFk%2Fimg.png"/></p>

<br/>

```js
sessionStorage.setItem("name", "Juno");
sessionStorage.removeItem("name");
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdfyNOj%2Fbtq3stSIjhx%2FM4iZSkmXPBQkDKFminl7j0%2Fimg.png"/></p>

<br/>

> **🎇 Bonus(IndexedDB)**  
> 위에서 언급된 `Cookie`와 `Web Storage`말고도 `IndexedDB`가 있습니다.  
> 과거 `WebSimpleDB`현재의 `IndexedDB`는 용량에대한 부분도 유연합니다.  
> 많은 데이터를 저장하지만 Index를 이용하여 빠르게 검색할 수 있게 설계되어있습니다.
>
> [IndexedDB - MDN](https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API)
>
> [IndexexDB 간단 정리](https://pks2974.medium.com/indexeddb-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-ca9be4add614)

<br/>

[제로초 로컬스토리지, 세션스토리지](https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048)

[Youtube - Web Dev Simplified](https://www.youtube.com/watch?v=GihQAC1I39Q&t=62s)

<br/>

👋
