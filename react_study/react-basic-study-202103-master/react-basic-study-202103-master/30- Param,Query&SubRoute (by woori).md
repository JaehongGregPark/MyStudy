# URL의 path 와 query string

<br>

`URL`은 우리가 어떤 정보를 요청하느냐에 따라 역동적으로 변화합니다.   
`URL`에 정보를 담는 방법으로는 크게 2가지가 있습니다.   

#### 1. Path Variable  => /items/123
#### 2. Query string   => /items?id=123

<br>

이들은 `URL`에 대한 추가적인 정보를 제공하며 주소만 보고도 어떤 정보가 들어왔는지 어느정도 구분해낼 수 있습니다. 
우리가 검색할 때 페이지는 하나지만 검색어에 따라서 콘텐츠나 레이아웃이 변할 수 있습니다.   
이러한 상황에서 가변적인 콘텐츠를 처리하기 위해 사용됩니다.   

<br>

`URL parameter`(Query string)는 주로 웹 페이지의 콘텐츠를 지정하고 정렬하는 데 사용되지만 트래픽 추적에도 종종 사용된다고 합니다.   
예를 들어 파워 링크를 타고 들어왔을 경우에는 특정한 `parameter`를 추가하고 나중에 `parameter` 값을 분석해서 사용자가 어떤 링크를 타고 들어왔는지 등을 파악하여 트래픽을 추적할 수 있습니다.

<br>  

## Route Parameter 읽기

### 1. params 사용하기 (Path Variable)

`/shop:id`처럼 `item`의 뒷부분에 `id` 값을 붙여서(예 `/shop/1234`) 해당 `id`를 가진 특정 `item`을 조회할 수 있습니다.   
##### 즉 위의 패턴에서 `id` 에 변화를 주어 페이지를 동적으로 구성할 수 있습니다.

`URL`이 `/shop` 이거나 `/shop:id` 일 때를 구분해서 렌더링해보겠습니다.
`URL`이 `/shop` 일때는 `itemList`가 보여지며, 하나의 `item`을 클릭했을 때 `/shop:id`로 이동하며 `itemDetail`이 보여집니다.

```javascript
import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Shop from './Shop';
import ItemDetail from './ItemDetail';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="Nav">
        <Nav />
        <Switch>
          <Route path="/" exact render={() => <h1>Home</h1>} />
          <Route path="/about" component={About} />
          <Route path="/shop/items" exact component={Shop} />
          <Route path="/shop/items/:id" component={ItemDetail}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```
<br>

`Router`를 `path`가 `/` 일 때는 `Home`,   
`/about` 일 때는 `About` 컴포넌트,   
`/shop` 일 때는 `Shop` 컴포넌트,   
그리고 `/shop` 뒤에 `id`가 붙은 경우는 `ItemDetail` 컴포넌트가 렌더링 되도록 했습니다.   

이어서 Nav컴포넌트를 만들어 각각의 메뉴를 클릭하면 해당 컴포넌트로 이동하도록 하였습니다.   

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <h3>Router Class</h3>
      <ul className="links">
        <Link to='/about' >
          <li>About</li>
        </Link>
        <Link to='/shop/items' >
          <li>Shop</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;

```

##### React Router는 `match`, `location`, `history`라는 3개의 `prop`을 내려줍니다.   
이 중에서 `match prop`을 사용해서 `URL`의 `path variable`값을 가져와보도록 하겠습니다.     

<br>

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Shop({ match }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  console.log('Shop match', match); //match prop을 사용해서 path variable값을 가져올 수 있습니다.

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');
      const result = await response.json();
      setItems(result.data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  return (
    <div className="Shop">
      {loading ?
      <h1>Loading...</h1> :
      items.map(item => {
        const { name } = item.item;
        return (
          <h1 key={item.itemId}>
            <Link to={`/shop/items/${item.itemId}`}>{name}</Link>
          </h1>
        );
      })}
    </div>
  );
}

export default Shop;
```

이것은 `Shop`컴포넌트 입니다. `ItemList`를 `fetch`하여 가져오고, 각각의 `item`에 `Link`를 달아   
클릭하면 `Item Id`가 뒤에 `parameter`로 붙은 `URL`로 이동하도록 해주었습니다.   

그러면 `match prop`에 담긴 값을 살펴봅시다.   

<img width="497" alt="스크린샷 2021-04-12 오후 12 49 07" src="https://user-images.githubusercontent.com/53216594/114341177-1aade080-9b94-11eb-8f23-82e936e1f5e5.png">

`match`에 `isExact, params, path, url`과 같은 `property`가 담겨있는 것을 볼 수 있습니다.   
`isExact`값을 `true`입니다. 이것은 `path`로 넘겨준 `url` 주소와 현재 화면의 주소가 정확히 일치하기 때문입니다.   
만약 정확히 일치하지 않는다면 `false` 값이 찍힐 것입니다.   

`path, url`이 어떻게 다른지 밑에서 살펴보겠습니다.   

```javascript
import React, { useState, useEffect } from 'react';

function ItemDetail({ match }) {
  console.log("ItemDetail Match", match);
  const { id } = match.params;
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${id}`);
      const result = await response.json();
      const { item } = result.data;
      setItem(item);
    };
    fetchItems();
  }, []);

  return (
    <div className="Item">
      {item && (
        <>
          <div>{item.name}</div>
          <div>{item.ratings.avgStars}</div>
        </>
      )}
    </div>
  );
}

export default ItemDetail;
```
`ItemDetail` 컴포넌트의 `match prop`에 담긴 값을 살펴봅시다.   

<br> 

<img width="809" alt="스크린샷 2021-04-12 오후 1 44 43" src="https://user-images.githubusercontent.com/53216594/114341692-5006fe00-9b95-11eb-962e-f2e74eb3bee8.png">

<br> 

`match.url`은 실제 `URL`의 `path variable`부분의 `문자열`을 담고 있는 반면에, `match.path`은 경로의 패턴(/shop/:id)을 담고 있습니다.   

<br> 

`match.params`에는 `URL`의 패턴(/shop/:id)에서 `id`부분에 해당하는 값을 가져왔다는 것을 알 수 있습니다.   
이렇게 `match.params`를 사용해서 `id`를 가져올 수도 있고   
`React Router`에서 제공하는 `useParams hook`을 이용해서 `id`를 가져오는 방법도 있습니다.   

```javascript
import { useParams } from 'react-router-dom'

//...

const { id } = useParams();

```

<br>

### 2. query string 사용하기

앞에서 React Router는 `match`, `location`, `history`라는 3개의 `prop`을 내려준다고 언급했습니다.     
그리고 `URL`의 `id parameter`에 접근하기 위해 `match prop`을 사용했습니다.   

이번에는 `location prop`을 사용해서 `URL`의 `query`에 접근해보도록 하겠습니다.   

##### query string은 다음과 같이 생겼습니다.   

![example url parameter](https://user-images.githubusercontent.com/53216594/114307093-18f30700-9b19-11eb-8064-4e925a092ea2.png)
reference: https://www.botify.com/learn/basics/what-are-url-parameters

다음은 카우치코딩을 구글에 카우치코딩을 검색했을 때의 `URL`입니다.

#### https://www.google.com/search?q=카우치코딩&rlz=1C5GCEA_enKR867KR867&oq=카우치코딩

`query string`는 `'?'` 기호 뒤에 `URL` 끝에 추가됩니다. 복수의 파라미터는 `'&'` 기호로 구분할 수 있습니다.   
`URL`의 `query string`을 보면 어떤 검색어가 들어왔는지 등을 구분할 수 있게 됩니다.   

이제 예시를 보면서 어떻게 `query string`값을 가져봅시다.   

먼저 `query-string` 패키지를 설치해줍니다.   

<br>

```
npm i query-string
```

<br>

위의 예시에서 `About` 컴포넌트를 활용해보겠습니다.   

```javascript
import React from 'react';
import queryString from "query-string";
import { Link } from 'react-router-dom';

function About({ location }) {
  const query = queryString.parse(location.search);
  const { content } = query;

  return (
    <div className="About">
      <h1>About</h1>
      <ul>
        <li>
          <Link to="/about?content=history">Company History</Link>
        </li>
        <li>
          <Link to="/about?content=vision">Company Vision</Link>
        </li>
      </ul>
      <h3>
        This is about {content}
      </h3>
    </div>
  );
}

export default About;
```
`Company History`와 `Company Vision`에는 각각 다른 `query-string`을 가진 링크가 걸려있습니다.   

맨 처음 `About Page`에 들어갔을 때 `location` 값은 다음과 같습니다.   

<img width="772" alt="스크린샷 2021-04-12 오후 4 19 37" src="https://user-images.githubusercontent.com/53216594/114355964-06291280-9bab-11eb-8dc7-8a7f4e9c461a.png">

`location.search` 값에는 아무런 값도 들어있지 않습니다. 이것은 현재 주소가 http://localhost:3000/about 으로   
뒤에 `query-string`이 붙어있지 않기 때문입니다.   

다음으로 `Company History` 를 눌러보겠습니다.    


<img width="772" alt="스크린샷 2021-04-12 오후 4 17 50" src="https://user-images.githubusercontent.com/53216594/114356272-5e601480-9bab-11eb-8ef9-f971e618ac34.png">

주소가 http://localhost:3000/about?content=history 으로 바뀌면서 location.search에 String 값인 "?content=history" 가 들어왔습니다.   

<br>

`location.search`값을 아까 설치한 `query-string` 패키지를 사용해 객체로 만들어줍니다.   
이제 변수 `query`를 보면 새로운 객체가 들어온 것을 확인할 수 있습니다.  

<img width="772" alt="스크린샷 2021-04-12 오후 4 17 59" src="https://user-images.githubusercontent.com/53216594/114356598-c4e53280-9bab-11eb-8a6f-df8f31c9c38e.png">

복수의 `query-string` 역시 객체로 만들 수 있습니다.   
아까 봤던 카우치코딩을 구글에 검색했을 때 주소의 `query-string`을 파싱하면 이렇게 되겠죠?   

<img width="413" alt="스크린샷 2021-04-12 오후 4 29 36" src="https://user-images.githubusercontent.com/53216594/114357158-5eacdf80-9bac-11eb-838e-6dc69f7538e8.png">

<br>

# Sub Router

서브 라우트는, 라우트 내부의 라우트를 만드는것을 의미합니다. 컴포넌트를 만들어서 그 안에 또 Route 컴포넌트를 렌더링하면 됩니다.

<br>

위의 코드에서는 모든 `Router` 관련 설정이 `App` 컴포넌트에서 이루어지고 있습니다.   
이 코드에서 `sub-router`를 만들기위해 `Shop` 컴포넌트 안에서 또 다른 `Router`를 만들어 `ItemDetail` 을 렌더링하도록 바꾸어 보겠습니다.

<br>

먼저 기존 `Router`에서 `DetailItem`을 렌더링하는 라우터를 삭제하였습니다.

```javascript
import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Shop from './Shop';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="Nav">
        <Nav />
        <Switch>
          <Route path="/" exact render={() => <h1>Home</h1>} />
          <Route path="/about" component={About} />
          <Route path="/shop" component={Shop} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
```

그다음 Shop 컴포넌트로 가서, 해당 컴포넌트 내부에 새로운 라우터를 만들어 주었습니다.   

```javascript
import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import ItemDetail from './ItemDetail';

function Shop({ match }) {
  const [items, setItems] = useState([]);
  console.log('match', match)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('https://fortnite-api.theapinetwork.com/upcoming/get');
      const result = await response.json();
      setItems(result.data);
    };
    fetchItems();
  }, []);

  const itemList = items.map(item => {
    const { name } = item.item;
    return (
      <h1 key={item.itemId}>
        <Link to={`/shop/${item.itemId}`}>{name}</Link>
      </h1>
    );
  });

  return (
    <div className="Shop">
      <Route exact path={match.path} render={() => itemList} />
      <Route
        path={`${match.path}/:id`}
        component={ItemDetail}
      />
    </div>
  );
}

export default Shop;
```
<br>

살펴보면 `Shop` 컴포넌트에서 `match prop`을 이용하여 `Router`의 분기점을 만들어주었습니다.   
만약 `URL`이 `match.path(/shop)` 일 경우에는 `itemList`를 렌더링해줍니다.   
`URL`이 `/shop:id` 일 경우에는 `ItemDetail`을 렌더링해줍니다.   
`sub-router`는 구조의 차이일 뿐 결과적으로 바꾸기 전과 똑같이 작동합니다.

conference: https://www.youtube.com/watch?v=Law7wfdg_ls&t=1515s,   
https://react.vlpt.us/integrate-api/04-react-async.html
