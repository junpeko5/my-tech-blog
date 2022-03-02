---
templateKey: blog-post
title: PHPで配列をフィルタリングする方法(array_filter)
date: 2022-03-02
description: 
cover: /images/php.png
category: PHP
tags:
  - PHP
slug: php-array-filter
---

PHPで配列をフィルタリングするときは、array_filter関数が便利です。

JavaScriptの`Array.prototype.filter()`のようなコールバック関数を使った配列操作が可能となります。

第３引数によって挙動が少し変わるのでまとめました。

## 基本的な使い方

1〜5の数値となっている配列を用意しています。

この配列の値から偶数をフィルタリングする例です。

```php
$arr = [1, 2, 3, 4, 5];
$result = array_filter($arr, function ($number) {
	return $number % 2;
});
var_dump($result);
```

第１引数に配列、第２引数にコールバック関数を渡しています。

第３引数は指定なしのため、デフォルトで0が設定されます。

```shell
array(3) {
  [0]=>
  int(1)
  [2]=>
  int(3)
  [4]=>
  int(5)
}
```

`return`の値が`false`となる場合に値がフィルタリングされ、偶数がフィルタリングされました。

## 第３引数にARRAY_FILTER_USE_KEYを設定する

第３引数に`ARRAY_FILTER_USE_KEY`を設定すると、配列のキーをコールバックの引数として渡します。

```php
$arr = [1, 2, 3, 4, 5];
$result = array_filter($arr, function ($key) {
	var_dump($key);
	return $key % 2;
}, ARRAY_FILTER_USE_KEY);

var_dump($result);
```

```shell
int(0)
int(1)
int(2)
int(3)
int(4)
array(2) {
  [1]=>
  int(2)
  [3]=>
  int(4)
```

## 第３引数にARRAY_FILTER_USE_BOTHを設定する

第３引数に`ARRAY_FILTER_USE_BOTH`を設定すると、

コールバックの引数に値とキーの両方を設定することで、

配列のキーと値を扱うことができるようになります。

```php
$arr = [1, 2, 3, 4, 5];
$result = array_filter($arr, function ($number, $key) {
	var_dump($key);
	var_dump($number);
	return $number % 2;
}, ARRAY_FILTER_USE_BOTH);

var_dump($result);
```

```shell
int(0)
int(1)
int(1)
int(2)
int(2)
int(3)
int(3)
int(4)
int(4)
int(5)
array(3) {
  [0]=>
  int(1)
  [2]=>
  int(3)
  [4]=>
  int(5)
}
```

## まとめ

`array_filter`に関しては、第３引数の挙動さえ抑えておけば、

JavaScriptの`Array.prototype.filter()`のような使用感で使えそうです。