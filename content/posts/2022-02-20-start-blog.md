---
templateKey: blog-post
title: 個人の技術ブログをGatsbyJSで運用する理由
date: 2022-02-20
description: この記事では、個人の技術ブログをGatsbyJSで運用する理由について語ってみたいと思います。
cover: /images/happy-new-year.png
category: Gatsby
tags:
  - Netlify
  - Gatsby
  - JavaScript
  - TypeScript
  - React
slug: start-blog
---

この記事では、個人の技術ブログをGatsbyJSで運用する理由について語ってみたいと思います。

## 自由にカスタマイズできる

サイトの設計を自由にできるので、

エンジニアであれば技術力さえあれば好きなようにカスタマイズしていけるメリットがあります。

## アウトプットを増やすため、技術記事を書くハードルを下げたい

アウトプットする場が欲しい場合QiitaやZenn、Noteなど様々なプラットフォームがありますが、

個人ブログという選択肢もまだまだありだと考えています。

個人的には自分の記事は脳内メモとして残しておきたい目的が強く、

特に他の人に読まれるために書いているものでもなかったりするので、

個人ブログとして記事を書くほうが心理的なハードルを下げることができ、

結果的にアウトプットも増えるのではとの目論見があります。

また、WordPressとの比較になりますが、

GatsbyJSであれば、 VSCodeやWebstorm等のIDEで編集し、`git push`で記事を更新できます。

MarkdownかつVimのキーバインドで書けるという個人的なメリットがあるため、

記事を書くハードルが下げることが期待できます。

## 脳内メモを書いておく場所が欲しい

エンジニアという仕事柄、日々のインプット量が多くなりがちで、

アウトプットを都度やっておかないと、 脳内がパンクしがちです。（ここは人にもよるところかと思います）

簡単なTipsなど外部にメモとして参照できるようにしておくことで、脳の負荷を下げたいと考えています。

## 運用コストが低い

Gatsbyは、Starterという、WordPressでいうテーマのようなテンプレがたくさんあります。

そのため、初期開発コストもかなり低めだと思います。

記事の内容自体もMarkdownでGit管理されており、

データベースが不要となるためこの点においても運用コストを下げることができます。

また、僕の場合Netlifyというサービスでホスティングしていて、

個人的な利用だとフリープランで問題がありません。

基本的には年間のドメイン代のみで運用できるため、ほとんど費用がかからないことになります。

## SEO、サイトのパフォーマンスに優れる

静的サイトという性質もありますが、

SEOやサイトのパフォーマンス対策としてのGatsbyJSのプラグインなども豊富で、

特に独自の実装を入れなくても、

プラグインを正しく設定すれば、 GoogleのLighthouseの採点においてかなりの高得点が割と楽に狙えます。

ちなみに、PWA対応も結構簡単にできたりします。

## ReactJS、GraphQL、TypeScriptに慣れる

個人でブログを運用するとどうしても様々な問題に遭遇します。

その際に、ドキュメントを当たったり、他の方のブログ記事を漁ったり、

また利用しているライブラリの ソースコードを確認したりなどの試行錯誤をすることになります。

これが結果的には技術力の向上に最もつながると考えています。

ReactJS、GraphQL、TypeScriptはいずれも旬な技術ですので、

ブログを運用する中で理解を深めて行きたいと考えています。

## Githubの草を生やす

このサイトはGithubのpublicリポジトリで公開されています。

- <https://github.com/junpeko5/my-tech-blog>

そのため、１記事を新しく書いたり、更新したりすれば、Githubの草が生えることになります。

本質的には意味のないメリットではありますが、

地味にモチベーション維持に関わってくるんじゃないかと感じています。

## おわりに

引き続きやっていきます。