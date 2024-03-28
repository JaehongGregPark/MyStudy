# What is emotion?

- Emotion is a library designed for writing css styles with `JavaScript`. Javascript형식으로 css sytling 을 할 수 있는 많은 library 중 하나입니다.

- It has support for **nested selectors, media queries, and auto vendor-prefixing**.

> **Media Queries** : 반응형 웹디자인을 위한 기능. Breakpoint를 설정해서, '그 breakpoint에서는 이렇게 스타일링을 해라' 처럼 조건에 따라 스타일을 다르게 적용 할 수 있음.

> **auto-vendor-prefixing** : vedor-profixing은 웹브라우저 공급자가 새로운 기능을 제공할 때 이전 버전의 웹브라우저에 그 사실을 알려주기 위해 사용하는 접두사를 의미 => 즉 `아직 CSS 권고안에 포함되지 못한 기능이나, CSS 권고안에는 포함되어 있지만 아직 완벽하게 제정된 상태가 아닌 기능을 사용하고자 할 때` 벤더 프리픽스를 사용하게 된다.
>
> ```jsx
> <style>
>
>   .button {
>
>        background: -webkit-linear-gradient(red, yellow); /* 크롬과 사파리 4.0 이상을 위한 코드*/
>
>       background: -moz-linear-gradient(red, yellow);    /* 파이어폭스 3.6 이상을 위한 코드*/
>
>        background: -ms-linear-gradient(red, yellow);     /* 익스플로러 10.0 이상을 위한 코드*/
>
>       background: linear-gradient(red, yellow);         /* CSS 표준 문법 코드*/
>
>    }
>
> </style>
> ```
>
> => 버전 차이 때문에 생기는 문제를 해결. 이걸 직접하지 않아도 css내부에서 알아서 해주는 게 auto-vendor-prefix!

<br>

## How to use emotion in React?

- Install package

  ```jpx
  npm i @emotion/react
  ```

- JSX Pragma

  ```jsx
  /** @jsx jsx */
  ```

  React.createElement 대신 jsx 함수를 사용하게끔 하는 것. jsx함수는 jsx를 일반 자바 스크립트로 변환하는 데 사용할 함수.

  > example
  >
  > [React공식문서] : <https://reactjs.org/docs/introducing-jsx.html>
  >
  > [jsx pragma사용] : <https://www.javaer101.com/ko/article/42050407.html>
  >
  > ```jsx
  > class Hello extends React.Component {
  >   render() {
  >     return jsx("h1", null, `Hello world!`);
  >   }
  > }
  > ```

<br>

- **CSS prop**

  String Styles, Object Styles

  1.  String styles

          ```jsx
          /** @jsxRuntime classic */
          /**@jsx jsx */
          import { jsx, css } from '@emotion/react'

          function BtnWrapper({ children }) {
              return (
                  <div className="wrapper" css={css`border: solid 1px black;`}>
                      { children }
                  </div>
              )
          }

           export default BtnWrapper;
          ```

      <br>

  2.  Object styles

      ```jsx
      <div
        css={{
          color: "red",
          [mq[0]]: {
            color: "orange",
          },
          [mq[1]]: {
            color: "green",
          },
        }}
      >
        Some text!
      </div>
      ```

<br>

- **Style API**

  : styled-component와 사용법이 같습니다!

  ```jsx
  npm i @emotion/styled
  ```

    <br>

  ```jsx
  import styled from "@emotion/styled";

  const LinkWithEmotion = styled.a`
    background-color: pink;
    color: black;
    cursor: pointer;
    &:hover {
      color: white;
    }
  `;

  function App() {
    return <LinkWithEmotion>emotion😮</LinkWithEmotion>;
  }
  ```

<br>

- **Theming**

  : `@emotion/react` package에 포함되어 있어 추가적인 package 설치가 필요 없습니다.

  ```jsx
  /** @jsxRuntime classic */
  /**@jsx jsx */
  import { jsx, ThemeProvider } from "@emotion/react";

  function Button({ btn }) {
    const theme = {
      colors: {
        primary: "hotpink",
      },
    };
    return (
      <ThemeProvider theme={theme}>
        <button css={(theme) => ({ color: theme.colors.primary })}>
          {btn}
        </button>
      </ThemeProvider>
    );
  }

  Button.defaultProps = {
    btn: "Button!",
  };

  export default Button;
  ```

<br>

- **Media queries**

  ```jsx
  /** @jsxRuntime classic */
  /**@jsx jsx */
  import { jsx, css } from "@emotion/react";

  const breakpoints = [576, 768, 992, 1200];

  const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

  const Text = () => {
    return (
      <div css={{ fontSize: 50 }}>
        <div
          css={{
            color: "red",
            [mq[0]]: {
              color: "orange",
            },
            [mq[1]]: {
              color: "green",
            },
          }}
        >
          Some text!
        </div>
        <p
          css={css`
            color: green;
            ${mq[2]} {
              color: orange;
            }
            ${mq[3]} {
              color: blue;
            }
          `}
        >
          Some other text!
        </p>
      </div>
    );
  };

  export default Text;
  ```

<br>

## Emotion VS Styled-components

- Features

  ![image](https://user-images.githubusercontent.com/75834421/113499822-08102780-9554-11eb-98a4-e43652cc79a5.png)

- Stats

  ![image](https://user-images.githubusercontent.com/75834421/113499860-5de4cf80-9554-11eb-822f-1e548717ee3a.png)

  [출처] <https://github.com/jsjoeio/styled-components-vs-emotion>

<br>

[emotion vs styled-components PlayWright] <https://www.youtube.com/watch?v=MN3RWhGudvw>

[which one should we use?] <https://community.frontity.org/t/which-one-should-we-use-emotion-vs-styled-components/27>

[emotion 공식문서] <https://emotion.sh/docs/introduction>

[emotion in React] <https://blog.logrocket.com/emotion-in-react/>
