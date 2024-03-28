# 22-Sass

## 🙏 Sass(**Syntactically Awesome** Style Sheets)?

<br/>

> Sass는 CSS pre-processor로서, 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성과 가독성을 높여줍니다.

<br/>

> 💡 CSS pre-processor(CSS 전처리기) ?
>
> CSS를 확장하는 스크립팅 언어로서, 컴파일러를 통하여 브라우저에서 사용 할 수 있는 일반 CSS 문법 형태로 변환합니다.
>
> Sass, Less, PostCSS, Stylus etc...

<br/>

## 1. 💾 셋팅하기

<br/>

&nbsp; Sass를 사용하기위해 node-sass를 설치합니다.

<br/>

```bash
yarn add node-sass
```

<br/>

&nbsp; 이후 Sass를 사용하기위해 css파일의 확장자명을 .scss를 사용하여 생성합니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Ft4zLY%2Fbtq1JANybVD%2FprnbSgGPNPaMstmksO3DX0%2Fimg.png"/></p>

<br/>

> 💡 .sass 와 .scss  
>  Sass가 처음 릴리즈 되었을때는 .sass확장자로 CSS와 문법이 많이 달랐습니다.  
> 때문에 Sass버전 3이상부터는 주 문법으로 .scss로 변경되었습니다.  
> .scss는 .css의 상위 집합으로 css와 동일한 문법에서 Sass의 특별한 기능이 추가되었습니다.

<br/>

## 2. 👓 살펴보기

<br/>

### 2-1. Comment (주석)

<br/>

&nbsp; .scss내부에서 주석을 할 경우 한줄 주석은 `//`로 표기합니다.

<br/>

```scss
/*This is comment*/

// This is comment

/*
This
is
comment
*/
```

<br/>

```css
/*This is comment*/

/*
This
is
comment
*/
```

<br/>

### 2-2. Variable (변수)

---

<br/>

&nbsp; Sass에서 변수의 개념을 사용할 수 있습니다. 원하는 변수명의 앞에 `$`문자를 사용합니다.

<br/>

```scss
/* Sass */
$personal: #369fff;

.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;
}
```

<br/>

```css
/* css */
.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: #369fff;
  border-radius: 3px;
  border: 0;
  outline: 0;
}
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb2uqd5%2Fbtq1JWJzWjF%2FBEBOzTPpNkJczUOxKgi7bk%2Fimg.png"/></p>

<br/>

#### 2-2-1. Variable Scope (변수 범위)

---

<br/>

&nbsp; Sass의 변수는 javascript와 마찬가지로 Block Scope를 사용합니다.

<br/>

```scss
/* Sass */
$personal: #369fff;

.btn {
  $personal: #000;
  padding: 5px 20px;
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.p {
  color: $personal;
}
```

<br/>

```css
/* css */
.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: #000;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.p {
  color: #369fff;
}
```

<br/>

#### 2-2-2. Variable Scope (!global)

---

<br/>

&nbsp; Block Scope내에서 변수를 선언하더라도 `!global` 플래그를 사용하면 전역에서 사용이 가능합니다.

<br/>

```scss
/* Sass */
$personal: #369fff;

.btn {
  $personal: #000 !global;
  padding: 5px 20px;
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.p {
  color: $personal;
}
```

<br/>

```css
/* css */
.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: #000;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.p {
  color: #000;
}
```

<br/>

#### 2-2-3. Variable Scope (!default)

---

<br/>

&nbsp; 추가적인, `!default` 플래그를 사용하면 해당 변수가 설정되지 않았거나 값이 null때 해당 값을 사용합니다. (\* 대부분 mixin을 작성 할 때 사용)

<br/>

```scss
/* Sass */
$personal: #369fff;

$personal: #000 !default;

.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.p {
  color: $personal;
}
```

<br/>

```css
/* css */
.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: #369fff;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.p {
  color: #369fff;
}
```

<br/>

### 2-3. Built-in Functions (내장함수)

---

<br/>

&nbsp; Sass에서는 여러 내장함수를 제공합니다.(`darken`, `lighten`, `saturate` etc...)  
예를들어 `darken`은 색과 인수값을 던져주면 얼마나 어둡게할지, `lighten`은 얼마나 밝게할지 계산하여줍니다.

<br/>

```scss
/* Sass */
$personal: #369fff;

.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;

  &:hover {
    background-color: darken($personal, 10%);
  }
}
```

<br/>

```css
/* css */
.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: #369fff;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.btn:hover {
  color: #0387ff;
}
```

<br/>

[Sass 내장함수 알아보기](https://poiemaweb.com/sass-built-in-function)

<br/>

### 2-4. Nesting (중첩)

---

<br/>

&nbsp; Sass에서는 선언의 중첩이 가능합니다. 기본 CSS에서는 아래와 같이 작성합니다.

<br/>

```css
/* css */
.wrap {
  width: 100%;
}

.wrap .wrap-title {
  color: #000;
}
```

<br/>

&nbsp; Sass에서는 아래와 같이 작성합니다.

<br/>

```scss
/* Sass */
.wrap {
  width: 100%;

  .wrap-title {
    color: #000;
  }
}
```

<br/>

&nbsp; 또 버튼의 hover 경우를 작성하자면 CSS에서는 아래와 같습니다.

<br/>

```css
/* css */
.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: #369fff;
  border-radius: 3px;
  border: 0;
  outline: 0;
}

.btn:hover {
  color: #0387ff;
}
```

<br/>

&nbsp; Sass에서는 부모선택자를 참고할때 `&`문자를 사용하여 간편하게 표현가능합니다.

<br/>

```scss
//  Sass
.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: #369fff;
  border-radius: 3px;
  border: 0;
  outline: 0;

  &:hover {
    background-color: darken($personal, 10%);
  }
}
```

<br/>

&nbsp; `@at-root`를 사용하게되면 선택자 내부에 `@at-root 선택자`의 선택자를 포함한 경우 css를 적용시킵니다. `.wrap` 내부에 `@at-root .root`에 대한 css를 지정 하고

<br/>

```scss
// Sass
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  @at-root .root {
    color: red;
  }
}
```

<br/>

&nbsp; 아래와 같이 .wrap 내부에 .root를 포함한 요소가 존재한다면

<br/>

```js
/* Page.jsx */
import React from "react";
import Button from "../components/Button";
import "./Page.scss";

const Page = () => {
  return (
    <div className="wrap">
      <Button />
      <div className="container root">
        container
        <div className="box">box</div>
      </div>
    </div>
  );
};

export default Page;
```

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fuiz7p%2Fbtq1OMe0LLG%2FSOD98aww7liECZ5mD9RJmk%2Fimg.png"/></p>

<br/>

&nbsp; 위와 같이 적용을 받게 됩니다.

<br/>

### 2-5 Import

---

<br/>

&nbsp; `import` 기능을 이용하여 나눠져있는 스타일 파일들을 불러와서 사용 할 수 있습니다. 아래와 같은 구조로 있을 경우

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmpZ37%2Fbtq1K3IvwLS%2Fvfkvr53AM3yPnEK2Hxh4K0%2Fimg.png"/></p>

<br/>

&nbsp; \_colors.scss 파일에 작업에 사용할 color를 변수 선언을 하고

<br/>

```scss
$personal: #369fff;
```

<br/>

&nbsp; 작업할 파일에서 `@import "path";` 의 형식으로 선언을 하면 아래와 같이 사용이 가능합니다.

<br/>

```scss
@import "../_common/colors";

.btn {
  padding: 5px 20px;
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;

  &:hover {
    background-color: darken($personal, 10%);
  }
}
```

<br/>

> 💡 Partial 기능  
> 만약 .sass 파일이나 .scss 파일의 이름을 `_`로 시작 할 경우 css 파일로 따로 컴파일 되지 않습니다.
> 해당 css 파일을 불러올 일이 없고 import 만 되는경우 이 기능을 사용하시면 됩니다.

<br/>

### 2-6 Extend

---

<br/>

&nbsp; 특정 선택자를 상속 할 때 `@extend`를 사용합니다.

<br/>

```scss
/* Sass */
.box {
  border: 1px solid gray;
  padding: 10px;
  display: inline-block;
}

.success-box {
  @extend .box;
  border: 1px solid green;
}
```

<br/>

```css
/* css */
.box,
.success-box {
  border: 1px solid gray;
  padding: 10px;
  display: inline-block;
}

.success-box {
  border: 1px solid green;
}
```

<br/>

&nbsp; `%`를 사용하면 상속은 할 수 있지만 해당 선택자는 컴파일되지 않습니다.

<br/>

```scss
/* Sass */
%box {
  padding: 0.5em;
}

.success-box {
  @extend %box;
  color: green;
}

.error-box {
  @extend %box;
  color: red;
}
```

<br/>

```css
/* css */
.success-box,
.error-box {
  padding: 0.5em;
}

.success-box {
  color: green;
}

.error-box {
  color: red;
}
```

<br/>

### 2-7 Function

---

<br/>

&nbsp; 위의 Built-in Function과는 달리 사용자 지정 함수입니다. 파라미터 값을 계산하여 값을 반환하며 `@function`을 사용하여 선언합니다.

<br/>

```scss
// Sass
@function calc-percent($target, $container) {
  @return ($target / $container) * 100%;
}

.my-module {
  width: calc-percent(650px, 1000px);
}
```

<br/>

```css
/* css */
.my-module {
  width: 65%;
}
```

<br/>

### 2-8 Mixin

---

<br/>

&nbsp; Sass에서는 가장 유용한 기능인 Mixin입니다. `@mixin`을 사용하여 선언을하고 `@include`를 이용하여 내부에서 사용을합니다.

<br/>

```scss
// Sass
@mixin title {
  font-size: 1.25rem;
  font-weight: 500;
}
@mixin title-sub {
  font-size: 0.875rem;
  font-weight: 400;
}

.title {
  @include title;
}

.title-sub {
  @include title-sub;
}
```

<br/>

```css
/* CSS */
.title {
  font-size: 1.25rem;
  font-weight: 500;
}

.title-sub {
  font-size: 0.875rem;
  font-weight: 400;
}
```

<br/>

## ✨ 3. 활용하기

<br/>

&nbsp; 파일 구조는 아래와 같습니다.

<br/>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdH7RB2%2Fbtq1KcGiDdG%2FJCUBW1SfoVbNVGpOXwxf00%2Fimg.png"/></p>

<br/>

### 3-1. className 활용

<br/>

&nbsp; className에 전달받은 `size` 따라서 element의 크기를 변경할 수 있습니다. "small"과 "large"일 경우의 css를 작성 한 뒤

<br/>

```scss
// Sass
@import "../_common/colors";

.btn {
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;

  &.small {
    padding: 5px 20px;
  }

  &.large {
    padding: 10px 40px;
  }

  &:hover {
    background-color: darken($personal, 10%);
  }
}
```

<br/>

```css
/* css */
.btn {
  color: #fff;
  background-color: $personal;
  border-radius: 3px;
  border: 0;
  outline: 0;
}
.btn.small {
  padding: 5px 20px;
}
.btn.large {
  padding: 10px 40px;
}
.btn:hover {
  background-color: #0387ff;
}
```

<br/>

&nbsp; `Button` 컴포넌트의 props에 `size`를 넘겨줍니다.

<br/>

```js
// Page.jsx
import React from "react";
import Button from "../components/Button";
import "./Page.scss";

const Page = () => {
  return (
    <div className="wrap ">
      <Button />
      <Button size="large" />
    </div>
  );
};

export default Page;
```

<br/>

```js
// Button.jsx
import React from "react";
import "./Button.scss";

const Button = ({ size }) => {
  return <button className={`btn ${size}`}>Button</button>;
};

Button.defaultProps = {
  size: "small",
};

export default Button;
```

<br/>

&nbsp; 이때, `size`를 넘겨주지 않을경우 `Button.defaultProps`에 의해 `size`는 "small"이 됩니다.

<br/>

<p align="center"><img src="https://blog.kakaocdn.net/dn/byEaGQ/btq1Nu0aHgu/XIkCBbbm6SJgpSeRH1aF4K/img.png"/></p>

<br/>

### 3-2. font-style 활용

<br/>

&nbsp; `mixin()`을 사용하여 디자인 가이드에 맞는 폰트 스타일을 관리하여 사용 할 수 있습니다.

<br/>

```scss
// _font-style.scss
@mixin font-style-24 {
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.005em;
}

@mixin font-style-20 {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.05em;
}

@mixin font-style-14 {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.05em;
}

@mixin font($size, $color: false) {
  @if ($size == 24) {
    @include font-style-24;
  }
  @if ($size == 20) {
    @include font-style-20;
  }
  @if ($size == 14) {
    @include font-style-14;
  }

  @if (type-of($color) == color) {
    color: $color;
  }
}
```

<br/>

```js
// Content.jsx
import React from "react";
import "./Content.scss";

const Content = () => {
  return (
    <div>
      <h1 className="title">이것은 font-style-24 입니다.</h1>
      <p className="sub">이것은 font-style-20 입니다.</p>
      <p className="content">이것은 font-style-14 입니다.</p>
    </div>
  );
};

export default Content;
```

<br/>

```scss
@import "../_common/font-style";

.title {
  @include font(24, red);
}

.sub {
  @include font(20, blue);
}

.content {
  @include font(14);
}
```

<br/>

<p align="center"><img src="https://blog.kakaocdn.net/dn/F2BmJ/btq1NtAidFJ/bTpDKT7KD3ZxY62aF57Wpk/img.png"/></p>

<br/>

### 3-3. reponsive 활용

<br/>

&nbsp; `mixin()`을 사용하여 Mobile, Tablet, Desktop등의 기기에 대응이 가능합니다.

<br/>

```scss
// _media.scss
@mixin media($screen) {
  @if ($screen == T) {
    @media all and (min-width: 768px) and (max-width: 1023px) {
      @content;
    }
  }
  @if ($screen == D) {
    @media all and (min-width: 1024px) {
      @content;
    }
  }
}
```

<br/>

&nbsp; 이때 해당 element의 안에서 `mixin()`의 내용을 정의하기 위해서는 `@content`를 사용해야 합니다.

<br/>

```scss
@import "../_common/font-style";
@import "../_common/media";

.title {
  @include font(24, red);
  @include media(T) {
    color: #fff;
    background-color: #000;
  }
  @include media(D) {
    color: #000;
    background-color: #fff;
  }
}

.sub {
  @include font(20, blue);
}

.content {
  @include font(14);
}
```

<br/>

&nbsp; 이외에도 필요에 따라 많은 용도로 활용이 될 수 있습니다.

<br/>

👋

<br/>

[더 알아보기](https://webclub.tistory.com/category/StyleSheet/SASS%E3%86%8DSCSS)
