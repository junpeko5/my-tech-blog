---
templateKey: blog-post
title: Docker Network で複数の Docker Compose 環境を共有する
date: 2023-01-29
description:
cover: /images/docker.png
category:
tags:
  -
slug: docker_network
---

複数のDocker Compose環境で通信を行いたい場合は共有するNetworkを設定する必要があります。

ここでは、redisのDBサーバーとPythonのwebサーバーを別の`docker-compose.yml`ファイルで作成して Docker Networkの共有を行ってみます。

## 構成ファイル

ディレクトリの階層は以下のようにしました。

```shell
tree
.
├── db
│   └── docker-compose.yml
└── web
    ├── Dockerfile
    ├── app.py
    ├── docker-compose.yml
    └── requirements.txt
```

db/配下の `docker-compose.yml`と`web/配下の`docker-compose.yml`の2種類があります。

## 動作確認

各ディレクトリに入り、以下のコマンドをそれぞれ実行します。

今回の構成の場合はdbがwebに依存する作りになっており、webの方からコンテナを起動する必要があります。

```shell
cd web/
docker compose up
```

```shell
cd db/
docker compose up
```

ブラウザで
<http://localhost:8000/> にアクセスすると、

`Hello World! I have been seen 1 times.` のテキストが表示されると正常に動作していることになります。

アクセス数によって、数値がインクリメントされていきます。

## 作成されるnetwork

以下のネットワークが生成されます。

```shell
docker network ls
d51b3d134b41   db                     bridge    local
7180169bae5f   db_default             bridge    local
c6fc31adbea3   web_default            bridge    local
```

```shell
docker network inspect db
[
    {
        "Name": "db",
        "Id": "d51b3d134b417dbba29755e0a3ee4a2c6e7e2806317aae3b24027ac1bf48c9b7",
        "Created": "2023-01-29T13:09:55.622193753Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.23.0.0/16",
                    "Gateway": "172.23.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "1e7a6fab6ea0930f3861b1f211300a899bdc9b04b59ca3f429fe53dd3cd5a127": {
                "Name": "db-redis-1",
                "EndpointID": "d3f230572877316ad5b31d86a6aa8f5184f1c60527716e3c2e9249fb61e5b2ab",
                "MacAddress": "02:42:ac:17:00:03",
                "IPv4Address": "172.23.0.3/16",
                "IPv6Address": ""
            },
            "e4416696d5bf59822bf15deb780a0d11b7b9e2d3f55e82fbbbb83b4eef078d1b": {
                "Name": "web-web-1",
                "EndpointID": "c3f5d8b0627b19e2c18f76293bb730c4c8baf596b2afcb6990338627c943fa10",
                "MacAddress": "02:42:ac:17:00:02",
                "IPv4Address": "172.23.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {
            "com.docker.compose.network": "db",
            "com.docker.compose.project": "web",
            "com.docker.compose.version": "2.13.0"
        }
    }
]
```

Containers の中にデフォルトで生成されるネットワークが含まれていることが確認できます。

## 各ファイルの内容確認

`db/docker-compose.yml`

```yaml
version: '3.9'
services:
  redis:
    image: 'redis:alpine'
    networks:
      - default
      - db
networks:
  db:
    external: true
    name: '${NETWORK_ID}'
```

```yaml
networks:
  - default
  - db
```

の部分でトップレベルのnetworkキー、ここでは、

```yaml
networks:
  db:
    external: true
    name: '${NETWORK_ID}'
```

の部分のエントリを参照しています。

`external`を`true`にした場合はこのdocker-compose.ymlで管理しない外部のネットワークを利用します。

NETWORK_IDという変数を`name`に設定していて、外部の実装に依存しないようにしています。

> <https://docs.docker.jp/compose/compose-file/index.html#external>
> <https://docs.docker.jp/compose/compose-file/index.html#id51>

`web/Dockerfile`

```Dockerfile
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
```

```yaml
version: '3.9'
services:
  web:
    build: .
    ports:
      - '8000:5000'
    networks:
      - default
      - db
networks:
  db:
    name: db
```

`db`という名前のネットワークを作成するため、トップレベルのnetworksエントリにネットワークの設定があります。

このネットワークをredis側より参照します。

`web/app.py`

```python
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)

```

`web/requirements.txt`

```txt
flask
redis
```

その他、Webサーバーの実装については本題とずれるため解説しません。

ちなみにnetworkの設定がないと、webサーバーがredisに接続できず、ブラウザ側では500エラーとなります。

コンソールには、以下のようなエラーメッセージが表示されます。

```shell
web-web-1  | redis.exceptions.ConnectionError: Error -2 connecting to redis:6379. Name does not resolve.
```
