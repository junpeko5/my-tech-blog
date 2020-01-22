---
templateKey: blog-post
title: anyenvでインストールできる言語
date: 2020-01-23T12:34:15.945Z
description: anyenvでインストールできる言語を調べてみました。
cover: /images/homebrew.png
category: Mac
tags:
  - Homebrew
slug: anyenv-install-list
---

anyenvでインストールできる言語を調べてみました。
anyenvのバージョンは1.1.1です。

```sh
$ anyenv -v
anyenv 1.1.1
```
リストを表示すると以下となりました。18種類あるようです。
```sh
anyenv install -l
  Renv
  crenv
  denv
  erlenv
  exenv
  goenv
  hsenv
  jenv
  luaenv
  nodenv
  phpenv
  plenv
  pyenv
  rbenv
  sbtenv
  scalaenv
  swiftenv
  tfenv
```

### Renv

R言語（統計解析向けのプログラミング言語）のプロジェクトのようです。

https://www.r-project.org/

### crenv

Crystalという言語をインストールする際に利用します。

Crystalの構文はRubyの影響を強く受けていて、読みやすく、簡単に記述できるのが特徴です。

経験豊富なRuby開発者にとっては学習曲線が低いという利点があるようです。

https://crystal-lang.org/

### denv

Dは、静的型付け、システムレベルのアクセス、およびCのような構文を備えた汎用プログラミング言語です。 Dプログラミング言語を使用すると、高速で書き込み、高速で読み取り、高速で実行できます。

> D言語（ディーげんご、D programming language）は、プログラミング言語のひとつ。C言語をベースとしABI互換を保ちつつも、テンプレートによるジ> ェネリックプログラミングやオブジェクト指向プログラミング、関数型プログラミングなどをサポートするマルチパラダイムプログラミング言語である
引用：
Wikipediaより引用

https://dlang.org/index.html

### erlenv

> Erlang（イーラン）は、高可用性を必要とする非常にスケーラブルなソフトリアルタイムシステムを構築するために使用されるプログラミング言語です。そ> の用途のいくつかは、電気通信、銀行、電子商取引、コンピューターテレフォニー、インスタントメッセージングで使用されています。 Erlangのランタイ> ムシステムには、並行性、配布、およびフォールトトレランスのサポートが組み込まれています。
引用：
https://www.erlang.org/

### exenv

> Elixirは、スケーラブルで保守可能なアプリケーションを構築するために設計された動的で機能的な言語です。
引用：
https://elixir-lang.org/

### goenv

ghqを利用する際にお世話になってます。

> Goは、シンプルで信頼性の高い効率的なソフトウェアを簡単に構築できるオープンソースのプログラミング言語です。
引用：
https://golang.org/
### hsenv
Haskellの環境構築で利用します。
関数型言語を学ぶ際に良いと聞いたことがあります。
> 高度で純粋に機能的なプログラミング言語
引用：
https://www.haskell.org/

### jenv

Java環境を整える事ができるようです。

https://docs.oracle.com/en/java/index.html

### luaenv

> Luaは、強力で効率的、軽量、埋め込み可能なスクリプト言語です。手続き型プログラミング、オブジェクト指向プログラミング、関数型プログラミング、データ駆動型プログラミング、およびデータ記述をサポートしています。
引用：
https://www.lua.org/

### nodenv
Node.js環境をインストールできます。これは利用している方も多いのではと思います。
ndenvやnodebrewなど色々あって迷った記憶があります。
> Node.js® は、Chrome の V8 JavaScript エンジン で動作する JavaScript 環境です。
引用：
https://nodejs.org/ja/

### phpenv

PHPerのわたしが一番お世話になっているやつです。
> PHPは、Web開発に特に適した一般的な汎用スクリプト言語です。高速で柔軟性があり、実用的なPHPは、ブログから世界で最も人気のあるWebサイトまで、あらゆるものをサポートします。
引用：
https://www.php.net/

### plenv
Perl環境を構築できます。実はPerlはMovable TypeというCMSで少しだけ触ったことがあります。

> Perl（パール）とは、ラリー・ウォールによって開発されたプログラミング言語である。実用性と多様性を重視しており、C言語やsed、awk、シェルスクリプトなど他のプログラミング言語の優れた機能を取り入れている。ウェブ・アプリケーション、システム管理、テキスト処理などのプログラムを書くのに広く用いられている。
引用：Wikipedia

https://perldoc.perl.org/

### pyenv

海外で人気ですよね、Python。

> Pythonは、迅速に作業し、システムをより効果的に統合できるプログラミング言語です。
引用：
https://www.python.org/

### rbenv
Ruby on Railsで人気のRuby環境を作成するならこれです。
個人的には、プログラミングスクールに通っていた時に書いたことありまして、直感的で書きやすい印象です。

> Rubyとは...
> オープンソースの動的なプログラミング言語で、 シンプルさと高い生産性を備えています。 エレガントな文法を持ち、自然に読み書きができます。
引用：
https://www.ruby-lang.org/ja/

### sbtenv

> sbtは、ScalaおよびJavaのためのオープンソースのビルドツールである。JavaのMavenやAntに相当するツールである。 
引用：Widipedia

### scalaenv

> Scalaは、オブジェクト指向プログラミングと関数型プログラミングを1つの簡潔な高水準言語に統合します。 Scalaの静的型は、複雑なアプリケーションのバグを回避するのに役立ち、そのJVMおよびJavaScriptランタイムにより、ライブラリの巨大なエコシステムに簡単にアクセスできる高性能システムを構築できます。
https://www.scala-lang.org/

### swiftenv


> iOS、Mac、Apple TV、Apple Watch向けのアプリケーションを開発するためにAppleが作った、
強固で直感的なプログラミング言語。それがSwiftです。デベロッパのみなさんに、かつてないほどの
自由を届けられるように設計されています。Swiftは簡単に使えて、しかもオープンソースなので、
アイデアがある人なら誰でも、画期的なアプリケーションを作ることができます。
引用：
https://www.apple.com/jp/swift/

### tfenv

Terraformのバージョン管理が出来るツールです。

> インフラストラクチャをコードとして使用して、クラウド、インフラストラクチャ、またはサービスをプロビジョニングおよび管理します
引用：
https://www.terraform.io/