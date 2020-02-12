---
templateKey: blog-post
title: 【Flutter】StreamBuilderをザックリ理解する。
date: 2020-02-13T12:34:15.945Z
description: 
cover: /images/flutter.png
category: Dart
tags: 
  - Flutter
  - Firebase
slug: flutter-widget-streambuilder
---

最近のアプリは非同期処理が多くなっています。

また、いつどのタイミングで発生するのかは明確には決まっておらず、処理の流れが複雑になりがちです。

こうした非同期的なイベント処理は、データストリーム（連続したデータを流れるものとして捉える）と考えることが良いのではないでしょうか？

Dart言語は非同期データストリームを大きくサポートしており、

Flutterアプリでは、StreamBuilderウィジェットを使うことで、ストリームから流れるイベントを取得することができます。

## StreamBuilderの概要

新しいイベントごとに小要素を再作成し、最新イベントに与え連携させます。

StreamBuilderのコンストラクタに、streamを与えます。

また、builderにsnapshotを渡し、アプリの当該部分の外観を宣言します。

FireStoreからデータを取得する際の実装例が以下です。

```js
Widget _buildBody(BuildContext context) {
  return StreamBuilder<QuerySnapshot>(

    stream: Firestore.instance.collection('habits').snapshots(),
    builder: (context, snapshot) {
      if (!snapshot.hasData) return LinearProgressIndicator();

      return _cardList(context, snapshot.data.documents);
    },
  );
}

Widget _cardList(context, List<DocumentSnapshot> documents) => ListView(

  children: documents.map((data) => _buildCardItem(context, data)).toList(),
);
```

また、初期データ`initialData`を与えて、最初のイベントの待機中にウィジェットに表示させることもできます。

`initialData`を設定しない場合は、snapshotにデータが存在するか`snapshot.hasData`必ず確認しましょう。

まだであれば、ローディングインジケータを表示しても良いでしょう。

上記の実装では`LinearProgressIndicator`を利用しています。

詳しくは、ConnectionStateを確認します。

エラーハンドリングは、`snapshot.hasError`が便利です。

おしまい。
