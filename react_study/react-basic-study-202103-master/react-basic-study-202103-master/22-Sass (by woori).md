# Sass란?

<br>

`Sass(Syntactically Awesome Style Sheets)`는 CSS preprocessor로서, CSS의 기능을 확장해서 사용할 수 있는 Extension 입니다.   
preprocessor란 '전처리기'라는 의미를 가지고있으며, 말그대로 CSS가 동작하기 전에 사용하는 기능으로 CSS가 가지고 있는    
문제점을 보완해주는 확장 기능을 가지고 있습니다.   

CSS를 작성할 때 코드가 중복되는 경험을 다들 해보셨을 겁니다. 또한 파일이 방대해지면 그만큼 가독성도 떨어지고 유지 및 보수가 힘들어집니다.   
이러한 문제점들을 `프로그래밍 언어`와 가까운 방식으로 변환하여 `변수, 함수 등의 프로그래밍 개념`을 사용할 수 있게 만들어줍니다.

`SCSS(Sassy CSS)`는 `SASS` 이후에 나온 것입니다. 두개는 문법의 차이가 존재합니다. 큰 특징을 뽑자면 `SASS`문법은 들여쓰기를 잘해야하며   
`SCSS`와 다르게 `{} curly braces` 나 `; semicolon` 은 사용하지 않습니다.   
`SASS`가 업그레이드 된 버전이 `SCSS`라고 할 수 있습니다.

`SCSS`가 범용성과 CSS와의 호환성이 더 높아 `SCSS`를 사용하는 것이 권장되기 때문에 이 뒤로 `SCSS`의 문법을 다루도록 하겠습니다.   

<br>
<br>

## Sass 실행 과정

`SASS`는 css file이 아닌 sass file에 작성합니다.   
`SASS`를 사용하고 싶다면 `.sass` 확장자를 사용하면 되고, `SCSS`를 사용하고 싶다면 `.scss` 확장자를 사용하면 됩니다.   
그렇게 작성된 코드는 css코드로 변환되는 과정을 거쳐야 합니다. 웹 브라우저는 css만 이해할 수 있기 때문에 컴파일하는 과정이 필요한 것입니다.   
간단하게 정리하자면 이렇습니다.

#### Sass source code ---> (Sass Compiler) ---> compiled CSS code

<br>
<br>

## Sass의 다양한 기능

#### 1. Variable

SCSS는 변수를 사용할 수 있습니다. 색깔, 폰트크기 등을 재사용할 수 있습니다.

```html
<nav>
  <ul class="menu">
    <li><a href="#">Incense</a></li>
    <li><a href="#">Diffuser</a></li>
    <li><a href="#">Candle</a></li>
  </ul>
  <div class="button">
    <a class="checkout-button" href="#">checkout</a>
    <a class="cart-Button" href="#">add to cart</a>
  </div>
</nav>
```

```css
/*SCSS*/

/*다음과 같이 변수를 만들어줍니다.*/
$color-mint: #c9fffe;
$color-purple: #c9d0ff;
$color-yellow: #fcee90;
$color-gray: #808080;
$color-white: #fff;
$width-button: 150px;

/*nav tag의 background-color에 변수를 넣어줬습니다.*/

nav {
  margin: 30px;
  background-color: $color-mint;
}

```

<br>
<br>

#### 2. Nesting   

SCSS에서도 selectors 안에 다른 selectors를 포함할 수 있습니다. 이 방법으로 우리는 코드를 간결하게 줄일 수 있습니다.   

```css
.menu {
  list-style: none;
  float: left;
  
  li { /* nested selelctor */
    margin-left: 50px;
    
    &:first-child {  /* &는 여기까지의 selector path를 의미합니다.*/
      margin: 0;
    }

    a:link {
      text-decoration: none;
      text-transform: uppercase;
      color: $color-gray;
    }
  }
}
```
여기서는 depth가 한 단계뿐이지만 제한없이 얼마든지 깊게 nest할 수 있습니다.    
CSS였다면 이런 식으로 작성됐을 것입니다.   

```css
.menu {
  list-style: none;
  float: left;
}
.menu li {
  margin-left: 50px;
}
.menu li:first-child {
  margin: 0;
}
.menu li a:link {
  text-decoration: none;
  text-transform: uppercase;
  color: #808080;
}
```

<br>
<br>

#### 3. Mixins

버튼을 꾸미는 scss 코드를 추가했습니다. 

```javascript

.button {
  float: right;
}

.checkout-button:link,
.cart-Button:link {
  padding: 10px;
  display: inline-block;
  text-align: center;
  border-radius: 100px;
  text-transform: uppercase;
  width: $width-button;
  text-decoration: none;
  text-transform: uppercase;
  color: $color-white;
}

.checkout-button {
  &:link {
    background-color: $color-purple;
  }
  
  &:hover {
    background-color: darken($color-purple, 20%);
  }
}

.cart-Button {
  &:link {
    background-color: $color-yellow;
  }
  
  &:hover {
    background-color: darken($color-yellow, 20%);
  }
}
```
그런데 중복되는 코드가 보입니다. 바로 menu class안에 있는 a tag의 텍스트를 꾸며주는 부분과   
버튼의 텍스트를 꾸며주는 부분입니다. 바로 이 부분입니다.   

```javascript
   .menu li a:link {
     text-decoration: none;
     text-transform: uppercase;
     color: $color-gray;
   }

   .cart-Button:link {
     text-decoration: none;
     text-transform: uppercase;
     color: $color-white;
   }
```
이 부분을 mixin을 사용해서 간결하고 효율적으로 만들어보겠습니다.    

```javascript
@mixin text-style($color) {
  text-transform: uppercase;
  text-decoration: none;
  color: $color;
}
```
이렇게 텍스트 스타일 mixin을 만들어주었습니다. 함수처럼 변수를 넣어 색깔도 바꿀 수 있습니다.   

```css
.menu {
  list-style: none;
  float: left;
  
  li {
    margin-left: 50px;
    
    &:first-child {
      margin: 0;
    }

    a:link {
      @include text-style($color-gray);
      /* 
      text-decoration: none;
      text-transform: uppercase;
      color: $color-gray;
      */
    }
  }
}
```
@include를 사용해 포함시켜줍니다. 버튼도 마찬가집니다.   

```css
.checkout-button:link,
.cart-Button:link {
  padding: 10px;
  display: inline-block;
  text-align: center;
  border-radius: 100px;
  text-transform: uppercase;
  width: $width-button;
  @include text-style($color-white);
}
```

보다 더 간결하고 재사용까지 가능하게 되었습니다.   

<br>
<br>

<img width="1429" alt="스크린샷 2021-04-04 오후 11 22 40" src="https://user-images.githubusercontent.com/53216594/113511814-bc35a080-959c-11eb-88bb-c86d2a1f5378.png">

<br>

reference: https://www.udemy.com/course/advanced-css-and-sass
