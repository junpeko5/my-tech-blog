---
templateKey: blog-post
title: CentOS7、sshログイン設定メモ
date: 2021-02-09
description: ssh鍵をリモートサーバーに設置し、ローカルから作成した一般ユーザーでログインしたい。
cover: /images/centos.png
category: CentOS7
tags:
  - CentOS7
  - ssh
slug: centos7-ssh-login
---

## やりたいこと

ssh鍵をリモートサーバーに設置し、ローカルから作成した一般ユーザーでログインしたい。

## 手順

1. 一般ユーザーの作成
2. 一般ユーザーに`sudo`権限を付与
3. ssh鍵の設定
4. ログイン出来るかテスト

## 一般ユーザーの作成

```shell
adduser vpsuser
passwd vpsuser
```

## 一般ユーザーにsudoの権限を付与する。

## wheelグループの設定変更・確認

`visudo`コマンドで`sudoers`というファイルを編集・内容の確認を行う。

```shell
su -
visudo
```

```
## Allows people in group wheel to run all commands
%wheel  ALL=(ALL)       ALL

## Same thing without a password
# %wheel        ALL=(ALL)       NOPASSWD: ALL
```

`%wheel  ALL=(ALL)       ALL`の行がコメントアウトされていれば外す。

（wheelグループにすべてのコマンドの実行権限を与えるようになる。）

※ `# %wheel        ALL=(ALL)       NOPASSWD: ALL`をコメントアウトすると、
sudoの実行をパスワードなしで許可する設定となる。

### 一般ユーザーをwheelグループに追加する

```shell
usermod -aG wheel vpsuser
```

### グループに追加されているか確認

```shell
id vpsuser
```

### 再ログイン後に、wheelが追加されているか確認

```shell
groups
sudo su -
```

## ssh鍵の設定

### 秘密鍵公開鍵の作成

ローカルでssh用の秘密鍵と公開鍵を作成する。
```shell
ssh-keygen -t rsa -C "junpeko5@example.com"
chmod 600 test_vps_id_rsa
```

### 公開鍵をリモートサーバーに設置

```shell
scp ~/.ssh/test_vps_rsa.pub vpsuser@example.com:~/
ssh vpsuser@example.com
```

```shell
mkdir .ssh
chmod 700 .ssh/
mv test_vps_id_rsa.pub .ssh/authorized_keys
chmod 600 .ssh/authorized_keys
```

### sshの設定変更

```shell
sudo su
vim /etc/ssh/sshd_config
```

`PermitRootLogin no`でrootでアクセスできないように。

`PasswordAuthentication no`でパスワードでログイン出来ないように設定する。

```
PermitRootLogin no
PasswordAuthentication no
```

設定を反映する。

```shell
systemctl restart sshd
```
### .ssh/configの設定

```vim
 Host example.com
   HostName example.com
   User vpsuser
   Port 22
   IdentityFile ~/.ssh/test_vps_id_rsa
   TCPKeepAlive yes
```

## ログイン

```shell
ssh example.com
```

＼(^o^)／