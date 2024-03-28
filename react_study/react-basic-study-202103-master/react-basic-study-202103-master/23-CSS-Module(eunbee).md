# CSS Module 이란?

해당 기술을 사용하면 리액트 프로젝트에서 컴포넌트를 스타일링 할 때, CSS 클랙스가 중접되는 것을 방지할 수 있다.

### 사용법 : 파일 확장자를 `.module.cs` 라고 만들어주면 된다.

<br>
<br>

## CSS Module 사용예시

![file-directory](https://user-images.githubusercontent.com/37354708/113509017-46c2d380-958e-11eb-8d3f-b4fa89c7eeb1.png)

<br>

Box.module.css

```css
.Box {
  background: black;
  color: white;
  padding: 2rem;
}
```

<br>

Box.js

```jsx
import React from "react";
import styles from "./Box.module.css";

function Box() {
  return <div className={styles.Box}>{styles.Box}</div>;
}

export default Box;
```

<br>

컴포넌트에서 해당 css 파일을 불러올 때, css 파일에 선언한 클래스 이름들이 모두 고유해진다. 파일경로, 파일이름, 클래스이름, 해쉬값들을 사용하여 고유값으로 만든다.

![developer-tools](https://user-images.githubusercontent.com/37354708/113509030-593d0d00-958e-11eb-8276-cf305cbae14c.png)

→ 클래스 이름에 대해 고유한 이름이 생성되었다. CSS 클래스 이름 중복에 대해 걱정할 필요가 없어졌다!

<br>
<br>

## 언제 사용하면 좋은가?

- 레거시 프로젝트에 리액트를 도입할 때(기존 프로젝트 css 클래스 이름과 중복 방지)
- css 클래스 중복 방지를 위해 클래스 네이밍 규칙을 만들기 귀찮을때
- ✅ 클래스 네이밍 규칙 예시
  1. 컴포넌트의 이름은 다른 컴포넌트랑 중복되지 않게 한다.
  2. 컴포넌트의 최상단 CSS 클래스는 컴포넌트의 이름과 일치시킨다. (예: `.Button`
  3. 컴포넌트 내부에서 보여지는 CSS 클래스는 CSS Selector 를 잘 활용한다. (예: `.MyForm .my-input`)

<br>
<br>
<br>

## ✨CSS Module 실전예시 1 - 커스텀 체크박스를 만들어보자!

- 프로젝트를 `create-react-app`으로 만들었다면, CSS Module 을 사용하기 위해 별도로 설치해야할 라이브러리는 없습니다. webpack에서 사용하는 css-loader에서 지원됩니다.
- 스타일링 추천 라이브러리: [react-icons](https://react-icons.github.io/react-icons/#/)
  Font Awesome, Ionicons, Material Design Icons, 등 아이콘들을 컴포넌트 형태로 쉽게 사용 할 수 있다.

  설치방법)

  ```shell
  yarn add react-icons
  ```

## 예시 화면

![example-1](https://user-images.githubusercontent.com/37354708/113509150-f304ba00-958e-11eb-967c-3e7d4fe367fb.png)

![example-2](https://user-images.githubusercontent.com/37354708/113509157-01eb6c80-958f-11eb-8cbb-fb5648db4df4.png)

## 코드 예시

[styling-with-css-module](https://codesandbox.io/s/styling-with-css-module-y4qlj?fontsize=14&file=/src/components/CheckBox.js:421-428)

<br>

App.js

```jsx
import React, { useState } from "react";
import CheckBox from "./components/CheckBox";

function App() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <div>
      <CheckBox onChange={onChange} checked={check}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>check: </b>
        {check ? "true" : "false"}
      </p>
    </div>
  );
}

export default App;
```

<br>

components/CheckBox.js

```jsx
import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styles from "./CheckBox.module.css";

function CheckBox({ children, checked, ...rest }) {
  return (
    <div className={styles.checkbox}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={styles.icon}>
          {checked ? (
            <MdCheckBox className={styles.checked} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
```

<br>

components/CheckBox.module.css

```css
checkbox {
  display: flex;
  align-items: center;
}

.checkbox label {
  cursor: pointer;
}

/* 실제 input 을 숨기기 위한 코드 */
.checkbox input {
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
}

.checkbox span {
  font-size: 1.125rem;
  font-weight: bold;
  /* line-height: 1; */
}

.icon {
  display: flex;
  align-items: center;
  /* 아이콘의 크기는 폰트 사이즈로 조정 가능 */
  font-size: 2rem;
  margin-right: 0.25rem;
  color: #adb5bd;
}

.checked {
  color: #339af0;
}
```

<br>
<br>
<br>

## CSS Module 실전예시 2- 조금 더 편하게 써보기 (sass 의 bind)

- sass 의 classnames 라이브러리의 bind 기능을 사용!
- 설치방법:

```bash
yarn add classnames
```

(적용전) components/CheckBox.js

```jsx
import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styles from "./CheckBox.module.css";

function CheckBox({ children, checked, ...rest }) {
  return (
    <div className={styles.checkbox}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={styles.icon}>
          {checked ? (
            <MdCheckBox className={styles.checked} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
```

(적용후) components/CheckBox.js

```jsx
import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styles from "./CheckBox.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function CheckBox({ children, checked, ...rest }) {
  return (
    <div className={cx("checkbox")}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={cx("icon")}>
          {checked ? (
            <MdCheckBox className={cx("checked")} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
```

<br>
<br>
<br>

## CSS Module 실전예시 3- Sass 에서 CSS Module을 사용해보자

- 사용조건: node-sass 설치

```bash
yarn add node-sass
```

<br>

### 사용방법

- CSS Module을 사용하고 있는 파일에서 클래스 이름을 고유화 하지 않고 전역적 클래스 이름을 사용하고 싶다면

  ```scss
  :global .my-global-name {
  }
  ```

  - Sass 사용시

  ```scss
  :global {
    .my-global-name {
    }
  }
  ```

- CSS Module을 사용하지 않는 곳에서 특정 클래스에서만 고유이름을 만들어서 사용하고 싶다면

  ```scss
  :local .make-this-local {
  }
  ```

  - Sass 사용시

  ```scss
  :local {
    .make-this-local {
    }
  }
  ```
