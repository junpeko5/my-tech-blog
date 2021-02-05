---
templateKey: blog-post
title: macOSでbashからでzshに切り替える方法
date: 2020-01-25T12:34:15.945Z
description: Macはデフォルトでzshが入っているので、設定変更自体は簡単にできます。
cover: /images/apple-logo.png
category: macOS
tags:
  - zsh
  - macOS
slug: change-mac-zsh
---

Macはデフォルトでzshが入っているので、設定変更自体は簡単にできます。

```sh
$ which zsh
/bin/zsh
```

```sh
$ /bin/zsh --version
zsh 5.7.1 (x86_64-apple-darwin19.0)
```

現在のシェルを確認するとbashでしたので、zshに切り替えます。

```sh
echo $SHELL
/bin/bash
```

以下の１コマンドで切り替えることができます。
```sh
chsh -s /bin/zsh
```

シェルを再起動すると反映されます。

```sh
echo $SHELL
/bin/zsh
```

以上です。
