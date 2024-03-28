# 28-Context

## 🙏 API와 Context 연동하기

<br/>

> Axios를 이용하여 API데이터를 로드와 Context API로 상태관리를 활용하여 봅시다.

<br/>

### 👀 코드로 알아보기

---

<br/>

&nbsp;전체의 파일 구조는 아래와 같습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdfp75X%2Fbtq11LVWTkj%2FMbqhG7UMX1y1MYiKFKtD31%2Fimg.png"/></p>

<br/>

### 📂 src>App.js

---

<br/>

&nbsp;테스트를 위하여 App.js의 코드는 아래와 같습니다.

<br/>

```js
import DataProvider from "./Provider/DataProvider";

const App = () => {
  return (
    <>
      <Header />
      <DataProvider>// ...</DataProvider>
      <Footer />
    </>
  );
};

export default App;
```

<br/>

### 📂 src>context>DataContext.js

---

<br/>

&nbsp; DataContext 코드는 아래와 같습니다.

<br/>

```js
import { createContext } from "react";
const DataContext = createContext({
  state: "init",
  handleState: () => {},
});

export default DataContext;
```

<br/>

&nbsp; createContext()를 사용하였고 기본 value들을 가지고있습니다.

<br/>

### 📂 src>provider>DataProvider.js

---

<br/>

&nbsp; DataProvider 코드는 아래와 같습니다.

<br/>

```js
import React, { useState } from "react";
import DataContext from "../context/DataContext";

const DataProvider = ({ children }) => {
  const handleState = (state) => {
    setState((prevState) => {
      return {
        ...prevState,
        state,
      };
    });
  };

  const init = {
    state: "init",
    handleState,
  };

  const [state, setState] = useState(init);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export default DataProvider;
```

<br/>

&nbsp; createContext()를 사용하였기때문에 DataContext.Provider를 사용 할 수 있게 되었고 value라는 props에 state를 담고있으며 state는 위에서 명시한 state, handleState를 담고있습니다.

<br/>

### 📂 src>components>KoreaData>KoreaAllData>KoreaAllData.jsx

---

<br/>

&nbsp; KoreaAllData컴포넌트의 코드는 아래와 같습니다.

<br/>

```js
import DataContext from "../../../context/DataContext";

const KoreaAllData = () => {
  const { state, handleState } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);

  //... 중략

  useEffect(() => {
    //... 중략

    axios
      .get("https://projectgoc.herokuapp.com/api")
      .then((res) => {
        const data = res.data.elements[0].elements[1].elements[0].elements;
        const items = data.slice(0, 133);
        const totalData = items[18].elements;
        const yesterDayData = items[37].elements;
        panelDataHandler(totalData);
        cardsDataHandler(totalData, yesterDayData);
        chartDataHandler(items);
        setIsLoading(false);
        handleState("success");
      })
      .catch((err) => {
        handleState("false");
        console.log(err);
      });
  }, [state]);

  return (
    <DataContext.Consumer>
      {(DataContext) => {
        return (
          <>
            {DataContext.state != "false" ? (
              <>{isLoading ? <Loading /> : <>//... 중략</>}</>
            ) : (
              <Err />
            )}
          </>
        );
      }}
    </DataContext.Consumer>
  );
};

export default KoreaAllData;
```

<br/>

&nbsp; 해당 컴포넌트는 Axios를 이용하여 공공데이터포털의 API를 사용하여 데이터를 로드하고 있으며, 성공을 하게되면 handleState에 success를 전달하고 실패시 false를 전달하게 됩니다. 또 이 컴포넌트는 DataContext.Consumer를 사용하여 DataContext의 상태를 구독하고 있기 때문에 그에 따른 결과를 보여주게 됩니다.

<br/>

👋
