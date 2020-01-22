---
templateKey: blog-post
title: Reactでコンポーネントに関数を渡す際に注意すること
date: 2020-01-05T12:34:15.945Z
description: Reactでは、一般的に他のコンポーネントに渡すメソッドについてはバインドする必要があります。
cover: /images/React.png
category: JavaScript
tags:
  - React
slug: react-bind
---

Reactでは、一般的に他のコンポーネントに渡すメソッドについてはバインドする必要があります。

例えば、React.Componentクラス内で、increment()関数を定義し、

子コンポーネントに関数を渡したい場合は,
`Function.prototype.bind()`でbindしなければなりません。

## コンポーネントにイベントハンドラを渡す方法について

イベントハンドラやその他の関数を`props`として、子コンポーネントに渡すようにします。
例えば、increment()という関数がある場合には以下のようにして、propsとして渡します。

```js
<button onClick={this.increment}>
```
## 関数をコンポーネントインスタンスにバインドする必要がある場合について



関数をthisキーワードをバインドする方法は主に２つで、

- コンストラクタでバインドする
- アロー関数でクラスプロパティとして定義する

があります。

### コンストラクタでバインド
increment関数をコンポーネントインスタンスにバインドする方法は以下のようになります。

```js
class App extends React.Component {
  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({
      count: this.state.count + 1
    })
  };
}
```
コンストラクタ内で、`Function.prototype.bind()`メソッドを利用し、

thisキーワードをバインドしたincrement関数を`this.increment`に代入しています。

これにより、increment関数内でReact.Componentの`SetState()`を利用できています。

### アロー関数でクラスプロパティとして定義する

increment関数をクラスのプロパティとして定義することでも同様の動作となります。

```js
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  };
}
```