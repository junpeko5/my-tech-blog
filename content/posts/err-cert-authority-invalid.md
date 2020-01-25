---
templateKey: blog-post
title: httpで接続時、`NET::ERR_CERT_AUTHORITY_INVALID`となった時の対処法
date: 2020-01-25T12:34:15.945Z
description: 
cover: /images/homestead.png
category: PHP
tags:
  - Vagrant
  - Homestead
slug: err-cert-authority-invalid
---

.devや.foo、.appなどで終わるTLD(Top Level Domain)ドメインは、

事前にロードされたHTTP Strict Transport Security（HSTS）ヘッダーを介してHTTPSにリダイレクトされます。

つまり、hostsファイルにhomestead.appと書いて、ブラウザでアクセスすると、

<http://homestead.app>

にアクセスするつもりが、

<https://homestead.app> 

にリダイレクトされてしまうということです。

(.devはgoogleが購入したらしい)

ローカルの開発環境でhttpで開発する場合は、開発用に予約されているgTLDの`.test`を利用すると良いそうです。

## 参考

<https://ma.ttias.be/chrome-force-dev-domains-https-via-preloaded-hsts/>
