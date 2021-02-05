---
templateKey: blog-post
title: Reactの基礎
date: 2020-01-03T12:34:15.945Z
description: Reactの基礎をおさらいしていきます。今回はyarn、create-react-appを利用し、環境を作成していきます。
cover: /images/React.png
category: React
tags:
  - Homebrew
  - React
  - JavaScript
  - Yarn
slug: react-fundamental
---

Reactの基礎をおさらいしていきます。
今回はyarn、create-react-appを利用し、環境を作成していきます。

## 動作する環境を構築

Homebrewでyarnをインストールします。

```bash
$ brew install yarn
```


```bash
$ yarn -v
1.21.1
```

また、Node.js環境が必要です。nodenvなどでインストールしておいてください。

```bash
$ node -v
v13.5.0
```

create-react-appはReactのアプリケーション環境をコマンド1つで作成してくれるツールです。

yarnでグローバルにインストールします。
```bash
yarn global add create-react-app
```

create-react-appでReactアプリケーションを作成します。

```bash
$ yarn create react-app react-sample-application
```

以上で環境構築は完了です。

## JSX

JSXの記法を使うと、JavascriptでHTMLのような記法ができます。

例えば、以下の２つの構文は同じ挙動となります。

src/App.jsを編集します。

src/App.js

```js
import React, {Component} from 'react';

class App extends Component {
  render() {
    return React.createElement(
      "h1",
      null,
      "Hello, World"
    )
  }
}

export default App;
```

src/App.js

```js

import React, {Component} from 'react';

class App extends Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}

export default App;
```

上がjsで、下がjsxの記法です。

render関数の中で、HTMLに似た記法が出来るため、可読性が高いという利点があります。

JSXで書く場合、必ず`React`をインポートする必要があります。

```js
import React from 'react';
```

また、HTMLの中にJavascriptの処理を書くことも出来ます。


src/App.js

```js
import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <label htmlFor="bar">bar</label>
        <input type="text" onChange={() => { console.log("I am clicked.") }} />;
      </React.Fragment>
    );
  }
}

export default App;
```

JSX内にJavaScriptを記述したい場合は、`{}`で囲みます

labelタグのfor属性を追加したい場合は、`htmlFor`と記述するなど、素のHTMLとは異なる記述をする場合があります。


## Components

Reactのコンポーネントをパーツごとに適切に分けることで、再利用性が高まり、メンテナンスコストが下がります。

例えば、以下のようにDogコンポーネントを作成すると、繰り返しDogコンポーネントを利用出来ます。


src/App.js

```js
import React from 'react';

const App = () => {
  return <div>
    <Dog />
    <Dog />
    <Dog />
  </div>
}

const Dog = () => {
  return <div>Bow!</div>
}

export default App;
```

## Props

子コンポーネントに値を渡したい場合はpropsを使います。

src/App.js

```js
import React from 'react';
import PropTypes from 'prop-types';

const profiles = [
  {name: "Taro", age: 10},
  {name: "Hanako", age: 20},
  {name: "Junpeko", age: 30},
  {name: "Junpeko3"},
]
const App = () => {
  return <div>
    {
      profiles.map((profile, index) => {
        return <User key={index} name={profile.name} age={profile.age} />
      })
    }
  </div>
}

const User = (props) => {
  return <div>Hi, I am {props.name}! and {props.age} years old!</div>
}

User.defaultProps = {
  age: 1
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}

export default App;
```

Userコンポーネントにnameとageをpropsとして渡しています。
受け取る場合は引数として受け取ることができます。

propsはstateと異なり、不変な値（イミュータブル）である点に注意してください。

また、繰り返しの処理を行う場合はkey属性が必要です。

### defaultProps

`User.defaultProps`で、propsの初期値を設定することも出来ます。

### propTypes

`User.propTypes`を設定することで、型を指定することもできます。

## State

Stateを利用することで、コンポーネント内で、状態の変化を察知し、再レンダリングすることが出来るようになります。

+1ボタンを

src/App.js

```js
import React, { Component } from 'react';

const App = () => {
  return (
    <Counter />
  );
}

class Counter extends Component {
  constructor(props) {
    super(props);
    console.log(this.state);
    this.state = { count: 0 };
  }

  handlePlusButton = () => {
    console.log("handlePlusButton");
    this.setState({
      count: this.state.count + 1
    })
  }

  handleMinusButton = () => {
    console.log("handleMinusButton");
    this.setState({
      count: this.state.count - 1
    })
  }
  render() {
    console.log('call render');
    return (
    <React.Fragment>
      <div>
          count: {this.state.count}
      </div>
      <button onClick={this.handlePlusButton}>+1</button>
        <button onClick={this.handleMinusButton}>-1</button>
    </React.Fragment>
    );
  }
}

export default App;
```

初期表示時、render()が呼ばれ、コンストラクタで設定されたStateの値`0`が表示されます。

その後+1ボタンが押下した場合、handlePlusButton関数がコールされ、関数内でsetState関数が呼ばれます。

setState()はReactの機能で状態を変更する関数です。

setState関数内でstate.countの状態を+1することで、stateの状態を更新します。

更新されると、render()が再度呼ばれ、更新されたstate.countの値`1`が表示されます。

stateの値が更新されるたびに、render()が呼ばれる点は大事なポイントです。

また、setState()以外で状態を更新することは出来ません。

