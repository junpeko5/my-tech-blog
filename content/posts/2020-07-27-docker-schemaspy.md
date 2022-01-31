---
templateKey: blog-post
title: dockerでSchemaSpyを利用する
date: 2020-07-27
description: 
cover: /images/postgres.png
category: Schemaspy
tags:
  - Docker
  - PostgreSQL
  - Schemaspy
slug: docker-schemaspy
---

```shell
docker run \
--rm \
--net=host \
-v $PWD/output:/output \
-v $PWD/schemaspy.properties:/schemaspy.properties \
schemaspy/schemaspy:snapshot
```


schemaspy.properties
```
# type of database. Run with -dbhelp for details
schemaspy.t=pgsql
# optional path to alternative jdbc drivers.
# schemaspy.dp=drivers
# database properties: host, port number, name user, password
schemaspy.host=localhost
schemaspy.port=5432
schemaspy.db=eccube4
schemaspy.u=docker
schemaspy.p=docker
# output dir to save generated files
# schemaspy.o=output
# db scheme for which generate diagrams
schemaspy.s=public
```


