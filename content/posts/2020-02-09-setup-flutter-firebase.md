---
templateKey: blog-post
title: FlutterでFirebaseに接続する際に考慮する点
date: 2020-02-09T12:34:15.945Z
description: 
cover: /images/flutter.png
category: Dart
tags: 
  - Flutter
  - Firebase
slug: setup-flutter-firebase
---

- Flutterの環境を構築する
- Firebase プロジェクトを作成する
- Firebaseプロジェクトでアプリを登録する（iOS、Android）


## Flutterプロジェクトの作成

### プロジェクトの雛形作成・動作確認

<https://flutter.dev/docs/get-started/test-drive>の手順で作成してください。

### pubspec.yamlの設定

```yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^0.4.0+9  // 追記
  cloud_firestore: ^0.12.9+5  // 追記
  firebase_auth: ^0.14.0+5  // 追記
```

この`pubspec.yaml`の追記箇所は、プロジェクトごとに必要な項目を設定することになります。

そして、以下コマンドで、Flutterのpackageを入れることができます。

```sh
~ flutter packages get
```

dartファイルでfirestoreのパッケージを上記のようにimportできるようになります。

```dart
import 'package:cloud_firestore/cloud_firestore.dart';
```

## Firebase プロジェクトを作成する

firebaseのコンソールから新規プロジェクトを作成しておきます。

特に迷うところはないので説明は割愛します。

<https://console.firebase.google.com/>

## iOSの設定

### iOS bundle IDの設定

iOSの設定には、`iOS bundle ID`が必要です。

以下コマンドで、xcodeを開いて確認しましょう。

```sh
~ open ios/Runner.xcworkspace
```

### FlutterプロジェクトにGoogleService-Info.plistを設置

設定画面で`GoogleService-Info.plist`をダウンロードできるので、

Xcodeのプロジェクトのツリー上に`Runner/Runner`の配下にダウンロードしてきた`GoogleService-Info.plist`をドラッグアンドドロップで設置します。

## Androidの設定

### Android package name の設定

`android/app/src/main/AndroidManifest.xml`のpackageの設定項目にFlutterプロジェクトを作成したときに設定した、

package nameは確認できます。

### Flutterプロジェクトにgoogle-services.jsonを設置

設定画面より`google-services.json`をダウンロードできるので、

`android/app`配下に`google-services.json`を設置しましょう。

### android/app/build.gradleの設定

以下を追記します。

```gradle
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'com.google.gms.google-services' // 追記
```

また、64Kを超えるメソッドを使用するアプリ向けにmultidexを有効化しておく必要があります。

`android/app/build.gradle`に追記します。

```gradle
  defaultConfig {
    applicationId "habit.com.junpeko.flutter_habit"
    minSdkVersion 16
    targetSdkVersion 28
    multiDexEnabled true    // 追記
    versionCode flutterVersionCode.toInteger()
    versionName flutterVersionName
    testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
```

参考: <https://developer.android.com/studio/build/multidex?hl=ja>

### android/build.gradleの設定

```json
buildscript {
   repositories {
       // ...
   }

   dependencies {
       // ...
       classpath 'com.google.gms:google-services:4.3.3'   // 追記
   }
}
```

### gradleで設定した項目の反映

build.gradleファイルに追記したら、設定項目を反映させるために再ビルドする必要があります。

ここで僕ははまりました。


## 終わりに

以上がFlutterでFirebaseに接続する際に考慮する点となります。

実際にチュートリアルなどで確認するのが最も手っ取り早く理解はできるかなと思いますので、

興味ある方はやってみてくださいね。

<https://codelabs.developers.google.com/codelabs/flutter-firebase/>
