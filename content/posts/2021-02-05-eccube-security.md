---
templateKey: blog-post
title: eccube4のSecurity.yamlを完全に理解する
date: 2021-02-05
description: 
cover: /images/eccube.png
category: ec-cube
tags:
  - eccube
  - Symfony
slug: eccube-security
---

eccube4系の管理画面やマイページのログイン機能は、SymfonyのSecurityをもとに構築されています。

このSecurityのシステムが強力で、`security.yaml`に設定を書いておけば、特定の特定のURLには、ログインが必要といった実装がかなり楽に実装できます。

今回はeccube4系の実装をみて理解していきます。

## 設定ファイルの場所

eccube4の場合`security.yaml`のパスは、`app/config/eccube/packages/security.yaml`にあります。
またアクセスコントロールの設定は別ファイル`src/Eccube/DependencyInjection/EccubeExtension.php`に書かれています。

```yaml
security:
    encoders:
        # Our user class and the algorithm we'll use to encode passwords
        # https://symfony.com/doc/current/security.html#c-encoding-the-user-s-password
        Eccube\Entity\Member:
          id: Eccube\Security\Core\Encoder\PasswordEncoder
        Eccube\Entity\Customer:
          id: Eccube\Security\Core\Encoder\PasswordEncoder
    providers:
        # https://symfony.com/doc/current/security.html#b-configuring-how-users-are-loaded
        # In this example, users are stored via Doctrine in the database
        # To see the users at src/App/DataFixtures/ORM/LoadFixtures.php
        # To load users from somewhere else: https://symfony.com/doc/current/security/custom_provider.html
        member_provider:
            id: Eccube\Security\Core\User\MemberProvider
        customer_provider:
            id: Eccube\Security\Core\User\CustomerProvider
    # https://symfony.com/doc/current/security.html#initial-security-yml-setup-authentication
    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        admin:
            pattern: '^/%eccube_admin_route%/'
            anonymous: true
            provider: member_provider
            form_login:
                check_path: admin_login
                login_path: admin_login
                csrf_token_generator: security.csrf.token_manager
                default_target_path: admin_homepage
                username_parameter: 'login_id'
                password_parameter: 'password'
                use_forward: false
                success_handler: eccube.security.success_handler
                failure_handler: eccube.security.failure_handler
            logout:
                path: admin_logout
                target: admin_login
        customer:
            pattern: ^/
            anonymous: true
            provider: customer_provider
            remember_me:
                secret: '%kernel.secret%'
                lifetime: 3600
                name: eccube_remember_me
                remember_me_parameter: 'login_memory'
            form_login:
                check_path: mypage_login
                login_path: mypage_login
                csrf_token_generator: security.csrf.token_manager
                default_target_path: homepage
                username_parameter: 'login_email'
                password_parameter: 'login_pass'
                use_forward: false
                success_handler: eccube.security.success_handler
                failure_handler: eccube.security.failure_handler
            logout:
                path: logout
                target: homepage

    access_decision_manager:
        strategy: unanimous
        allow_if_all_abstain: false
```

あと、eccube4の特徴としてアクセスコントロールの設定が、`src/Eccube/DependencyInjection/EccubeExtension.php`に書かれています。

`security.yaml`に書けば、設定を`security.yaml`のみに集約できるため読みやすいですが、

あえてこちらに書かれているのは、動的に設定値を設定したい機能があるためと思われます。
↓`src/Eccube/DependencyInjection/EccubeExtension.php`

```injectablephp
$accessControl = [
    ['path' => '^/%eccube_admin_route%/login', 'roles' => 'IS_AUTHENTICATED_ANONYMOUSLY'],
    ['path' => '^/%eccube_admin_route%/', 'roles' => 'ROLE_ADMIN'],
    ['path' => '^/mypage/login', 'roles' => 'IS_AUTHENTICATED_ANONYMOUSLY'],
    ['path' => '^/mypage/withdraw_complete', 'roles' => 'IS_AUTHENTICATED_ANONYMOUSLY'],
    ['path' => '^/mypage/change', 'roles' => 'IS_AUTHENTICATED_FULLY'],
    ['path' => '^/mypage/', 'roles' => 'ROLE_USER'],
];
```

## 複数の種類のログイン制御を行う

eccube4では`firewalls`という階層の下に、`admin`と`customer`が設定されています。

eccube4ではサイト運営者用の管理画面、と会員マイページの画面の2つのログイン制御を行う必要があります。

複数のログインを制御するために`admin`、`customer`の下に`provider`というキーがあり、

そこで、`member_provider`と、`customer_provider`が指定されています。

また、その実装クラスは、第2階層の`providers`に指定されています。

管理画面の`MemberProvider`と会員マイページの`CustomerProvider`のクラスには、
`Core/User/UserProviderInterface.php`のインターフェースが定義されています。

例えばですが、`Providers`と`firewalls`下の値を増やせば、管理画面・マイページ以外の認証機能も追加していくことが可能です。

## ログイン・ログアウト、フォーム周りの設定

ログインフォームのパスを指定している部分が`form_login`下の`login_path`と`check_path`です。

`/login`等のURLまたは、ルート名（eccubeの場合admin_login）を指定することで、

ログイン時のフォームのリダイレクト設定をいい感じにしてくれます。

`firewalls`を設定しても、これだけでは、ログイン後の画面はセキュアではありません。

後ほど解説するアクセスコントロールの設定と合わせることで認証の制御が可能となります。

参考: <https://symfony.com/doc/3.4/security/form_login_setup.html#create-the-correct-routes>

## anonymous（匿名）

アクセスコントロールの解説の前に、anonymous（匿名）について軽く説明します。

管理画面、マイページともに`firewalls`の中で、`anonymous: true`と設定されています。

`anonymous: true`とすることで、匿名のユーザーを作り出します。

また、この匿名ユーザーはログイン前のロールとして使用されます。

（Symfonyのプロファイラーでも`anonymous`は確認できます。

## アクセスコントロール

認証されたユーザーのみ閲覧できるようにする場合は、URLのパターンとロール（Role）で制御します。

eccube4の場合、`src/Eccube/DependencyInjection/EccubeExtension.php`の実装がそれに当たります。

ログインしていない状態の場合、`IS_AUTHENTICATED_ANONYMOUSLY`が設定されています。

たとえば`/admin`のpathと`ROLE_ADMIN`のRoleが設定されている場合、

匿名ユーザーの場合、アクセスコントロールで設定されたURLはロール閲覧できません。

管理画面のURLには、`ROLE_ADMIN`つまり管理者としてログインしていないと閲覧できないといった設定をしています。

マイページの場合も同様です。

参考: <https://symfony.com/doc/3.4/security.html#add-code-to-deny-access>

## `IS_AUTHENTICATED_FULLY`とは

アクセスコントロールの実装をよくみると、

```injectablephp
$accessControl = [
    ['path' => '^/%eccube_admin_route%/login', 'roles' => 'IS_AUTHENTICATED_ANONYMOUSLY'],
    ['path' => '^/%eccube_admin_route%/', 'roles' => 'ROLE_ADMIN'],
    ['path' => '^/mypage/login', 'roles' => 'IS_AUTHENTICATED_ANONYMOUSLY'],
    ['path' => '^/mypage/withdraw_complete', 'roles' => 'IS_AUTHENTICATED_ANONYMOUSLY'],
    ['path' => '^/mypage/change', 'roles' => 'IS_AUTHENTICATED_FULLY'],
    ['path' => '^/mypage/', 'roles' => 'ROLE_USER'],
];
```

マイページの会員情報の編集（/mypage/change）のロールに`IS_AUTHENTICATED_FULLY`の指定があります。

Securityの機能で以下の特別な属性があるようです。

- `IS_AUTHENTICATED_REMEMBERED`
- `IS_AUTHENTICATED_FULLY`
- `IS_AUTHENTICATED_ANONYMOUSLY`

`IS_AUTHENTICATED_ANONYMOUSLY`はログイン前の状態です。

セッションが続く時間よりも長くログインしたままにすることをユーザーに選択させることができる`remember_me`の状態によって、

`IS_AUTHENTICATED_REMEMBERED`と`IS_AUTHENTICATED_FULLY`での認証の結果は変わります。

`remember_me`のクッキーがブラウザに残っており、セッションが切れている場合に、

`IS_AUTHENTICATED_FULLY`では認証に失敗しますが、

`IS_AUTHENTICATED_REMEMBERED`は認証に成功します。

マイページの会員登録画面は不正にログインされると問題があるため、

他の画面と異なり、remember meではなく、セッションが保持されているときのみアクセス可能とすることで、セキュリティの強度を上げていると考えられます。

> 参考: <https://symfony.com/doc/3.4/security/remember_me.html>

> 参考: <https://symfony.com/doc/3.4/security.html#checking-to-see-if-a-user-is-logged-in-is-authenticated-fully>

## まとめ

すべての設定値を解説できていないので、eccube4のSecurity.yamlを完全に理解したとまでは言えないですが、

Securityの主要な部分について解説できたかなと思います。

eccube4はSymfonyに則って実装されているので、ドキュメントが豊富です。

本記事はこれで終了ですが、詳しく知りたい方はぜひドキュメントを確認してみてください。（Google翻訳さえあればなんとかなります。）

eccube4の開発は、実装でも迷ったら最悪ドキュメント当たりつつ本体のソースコードを読めばだいたい解決するので、安心感がありますねー。



