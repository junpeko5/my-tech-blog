---
templateKey: blog-post
title: 
date: 2021-04-29
description:
cover: /images/php.png
category: WordPress
tags:
  - PHP
  - WordPress
  - nginx
  - Ubuntu
slug: crontab-certbot
---

前提として、Ubuntu20.04環境です。
環境によってcronのサービス名が変わると思います。

## crontabの編集

```bash
sudo crontab -e
```

## crontab記述内容

```bash
37      1,13    *       *       *       root    certbot renew
```

毎日、01:37 と 13:37 にコマンドが実行されるようにスケジュールします

## cronデーモンを再起動

```bash
sudo systemctl restart cron
```

## 証明書の自動更新をテスト

```bash
sudo certbot renew --dry-run
```

問題なければ、
```bash
Congratulations, all simulated renewals succeeded:
```

と出力されます。

## 動作確認

### crontabを閲覧する
```bash
crontab -l 
```

### 実行されているか確認

```bash
less /var/log/syslog | grep CRON
```

`certbot renew`コマンドが実行されているか確認します。
