---
templateKey: blog-post
title: Reduxの基礎
date: 2020-01-04T12:34:15.945Z
description: 前回の記事の続きとなります。Reduxに必要なライブラリのインストールを行います。
cover: /images/redux.png
category: React
tags:
  - React
  - Redux
  - JavaScript
slug: redux-fundamental
---
前回の記事の続きとなります。

Reduxに必要なライブラリのインストールを行います。

```shell
$ yarn add redux react-redux
```

## Actionの設定

src/actions/index.js

```js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});
```

actionを設定することで、適切な状態遷移を実行させる仕組みを提供します。

`INCREMENT`と`DECREMENT`はreducerでも利用するため、定数化しています。

## Reducer

状態を変更する責任を担うのがReducerの役割です。

src/reducer/index.js

```js
import { combineReducers } from 'redux';
import count from './count';

export default combineReducers({ count });
```

export時に、combineReducersでReducerのファイルを指定することで、reducerのファイルを結合することができます。

src/reducer/count.js

```js
import { INCREMENT, DECREMENT } from "../actions";

const initialState = { value: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + 1 };
    case DECREMENT:
      return { value: state.value - 1 };
    default:
      return state;
  }
}
```

第一引数にstateの初期値を設定しています。

また、action.typeによって処理を分岐するように記述しています。

## Store

src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

`const store = createStore(reducer);`で、storeを作成しています。

`redux`、`react-redux`、`reducer/index.js`をインポートします。
また、AppコンポーネントをProviderコンポーネントでラップするように記述しています。


## 前回の実装をreduxに置き換える

前回の記事[Reactの基礎](https://blog.junpeko.com/react-fundamental)で実装したファイルをsrc/componentsフォルダに移動し、
stateの状態管理をReduxに置き換えていきます。

src/components/App.js

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions'

class App extends Component {
  render() {
    const props = this.props
    return (
    <React.Fragment>
      <div>
          value: {props.value}
      </div>
      <button onClick={props.increment}>+1</button>
        <button onClick={props.decrement}>-1</button>
    </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ value: state.count.value });

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
});

// const mapDispatchToProps = ({ increment, decrement })

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

mapStateToPropsで、propsにstateをマッピングしています。

また同様に、mapDispatchToPropsでpropsから関数を呼び出すようにマッピングしています。

mapDispatchToPropsは、コメントアウトしている省略形の書き方でも同様に動作します。

最後にconnect関数で、stateとactionを関連付けることを行います。

コンポーネントとstateの状態管理の役割について、Appコンポーネントの外で行うことが可能となりました。

## 所感

ReduxではStateを変更する際に、action→reducerという流れでstate（状態）の変更を行うようです。

このチュートリアルだとイマイチ良さを感じにくいですが、サイトが大きくなるにつれ、良さを実感できるんだろうなと思いました。

