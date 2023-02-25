---
templateKey: blog-post
title: MacのローカルでKubernetesのコンテナを実行する
date: 2023-02-25
description: 
cover: /images/docker.png
category: Kubernetes
tags:
  - Kubernetes
slug: kubernetes_local_test
---

## 環境構築

Docker for Macをインストールする。

`kind`、`kubectl`をインストールする。

`kind` はKubernetesをローカルでテストしたりすることができるツール。

`kubectl` はKubernetesのコマンドラインツール。

### インストール

```shell
brew install kind
brew install kubectl
```

### 確認

```shell
kind version
kubectl version --short
```

## kindでKubernetesクラスタを作成

```shell
kind create cluster --image docker.io/kindest/node:v1.26.0
```

### Kubernetesノードの一覧確認

```shell
kubectl get node
NAME                 STATUS   ROLES           AGE   VERSION
kind-control-plane   Ready    control-plane   22m   v1.26.0
```

## マニフェスト

nginxコンテナを作成したクラスタにデプロイしていきます。

### Deploymentリソースのマニフェスト

Kubernetesでコンテナをデプロイするにはマニフェストファイルを作成する必要がある。

`myapp.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - image: docker.io/nginx:1.23
          name: nginx
          env:
            - name: MY_ENV
              valueFrom:
                secretKeyRef:
                  name: myapp-secret
                  key: MY_ENV
          volumeMounts:
            - name: myapp-config
              mountPath: /etc/nginx/templates
      volumes:
        - name: myapp-config
          configMap:
            name: myapp-config

```

### ConfigMapリソースのマニフェストファイル

Kubernetesで設定情報を扱うにはConfigMapリソースを使う

`myapp-config.yaml`

```yaml
kind: ConfigMap
metadata:
  name: myapp-config
data:
  default.conf.template: |
    server {
      location / {
        return 200 'Hello $MY_ENV';
        add_header Content-Type text/plain;
      }
    }
```

docker.io/nginxイメージには`/etc/nginx/templates`に`*.template`の名前で設定ファイルのテンプレートを
配置すると、テンプレートに含まれる環境変数をその値で変換し、`/etc/nginx/conf.d`に配置する。

ConfigMapを`/etc/nginx/templates`にマウントするように変更している。

### Secretリソースのマニフェストファイル

Kubernetesで秘匿情報を扱う場合はSecretリソースを使う。

Secretリソースのdataフィールドに値をBase64エンコードして設定する。

`myapp-secret.yaml`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
data:
  MY_ENV: a3ViZXJuZXRlcw==
```

### Secretリソースのマニフェストの管理

- パスワードのついた別の保管庫に保存する
- Sealed Secrets などを利用してSecretリソースを暗号化する
- External Secrets Operator などを利用して、外部のシークレットストアと連携する。

## クラスタに適用する

以下のコマンドでクラスタにPodの作成、変更ができる。

```shell
kubectl apply -f myapp-config.yaml -f myapp.yaml -f myapp-secret.yaml
```

## リソースの状況確認

### Deploymentリソースの状況確認

```shell
kubectl get deployments
```

### 作成したPodを確認

```shell
kubectl get pods
```

### podのログ確認

```shell
kubectl logs [Pod Name]
```

### PodにHTTPでアクセスする

```shell
kubectl port-forward [Pod Name] 8080:80
```

別ターミナルを開いて確認すると、

`Hello kubernetes` が出力される。

```shell
curl -s http://127.0.0.1:8080/
Hello kubernetes
```
