---
templateKey: blog-post
title: dig、nslookupコマンドでDNSのTTLを確認する
date: 2020-03-16
description: 例えば、お名前ドットコムなどで新しくドメインを取得して、お名前ドットコムのNS（ネームサーバー）にRoute53などで作成したNSレコードを登録してもすぐには反映されません。
cover: /images/java.png
category: DNS
tags: 
  - DNS
  - dig
  - nslookup
slug: check-dns-ttl
---


例えば、お名前ドットコムなどで新しくドメインを取得して、お名前ドットコムのNS（ネームサーバー）にRoute53などで作成したNSレコードを登録してもすぐには反映されません。

TTL（Time to Live）という決められた秒数が過ぎるまで、フルリゾルバにキャッシュとして残っているためです。

例えば、`junpeko.work`というドメインを取得して、`nslookup`コマンドを叩くと以下のようになります。

```bash
$ nslookup junpeko.work
Server:		2400:2650:7081:e800:1111:1111:1111:1111
Address:	2400:2650:7081:e800:1111:1111:1111:1111#53

Non-authoritative answer:
*** Can't find junpeko.work: No answer
```
`junpeko.work`は見つからないよと言われました。

こういった場合は、TTLを確認していつ反映されるのかをチェックします。

## nslookupコマンドで確認する

`nslookup`コマンドで`set debug`という値を設定して実行すると、ttlを確認できます。

```bash
$ nslookup
> set debug
> junpeko.work
Server:		2400:2650:7081:e800:1111:1111:1111:1111
Address:	2400:2650:7081:e800:1111:1111:1111:1111#53

------------
    QUESTIONS:
	junpeko.work, type = A, class = IN
    ANSWERS:
    AUTHORITY RECORDS:
    ->  junpeko.work
	origin = ns-1371.awsdns-43.org
	mail addr = awsdns-hostmaster.amazon.com
	serial = 1
	refresh = 7200
	retry = 900
	expire = 1209600
	minimum = 86400
	ttl = 900
    ADDITIONAL RECORDS:
------------
Non-authoritative answer:
*** Can't find junpeko.work: No answer
```

`ttl = 900`、つまり、15分でお名前ドットコムのデフォルトのNSレコードから、Route53のNSレコード反映されることが分かりました。
