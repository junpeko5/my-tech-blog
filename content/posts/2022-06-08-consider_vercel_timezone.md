---
templateKey: blog-post
title: Vercel環境でタイムゾーンがズレる場合の対処法
date: 2022-06-08
description: JavaScriptのDateオブジェクトのインスタンスはUTC（協定世界時）1970年1月0時0分0秒を基準とした相対的なミリ秒として保持されています。
cover: /images/apple-logo.png
category: JavaScript
tags:
  - JavaScript
  - Vercel
slug: consider_vercel_timezone
---

JavaScriptの`Date`オブジェクトのインスタンスはUTC（協定世界時）1970年1月0時0分0秒を基準とした相対的なミリ秒として保持されています。

つまり、`Date`オブジェクト自体にはタイムゾーンの情報を持っておらず、

同じタイミングで作成した`Date`オブジェクトのインスタンスでも、

実行環境によっては違った時間になってしまう場合があります。

例えば、Next.jsのSSRの処理内で`Date`オブジェクトを利用する場合、

ローカルで開発している時のSSRの処理は`Asia/Tokyo`のタイムゾーンで処理され、

VercelにデプロイしたソースコードのSSRの処理は`UTC`のタイムゾーンで処理されることになります。

ここで、`Date`オブジェクトはミリ秒の情報しか保持しておらず、同じタイミングで`Date`オブジェクトのインスタンスを作成した場合、

Vercel環境の処理（ここではSSRやnext build時に実行される処理）とブラウザで行われる処理の間で9時間の差が発生します。

Next.jsではSSRで取得したデータを利用してページを表示しますから、ブラウザで表示させると、9時間ずれた状態で表示されてしまいます。

アプリケーションを作成する際には、この点を考慮する必要があります。

## 対処方法

対応方法としては、Vercelの環境で実行される処理内で発生する9時間のズレを解消すれば良いことになります。

Vercelの実行環境は`UTC`ですから、Vercel実行環境の処理内で作成される`UTC`な`Date`オブジェクトを、

`Asia/Tokyo`というタイムゾーンの時間に合わせれば良いです。

具体的な方法の例として、`date-fns-tz`というライブラリの`utcToZonedTime`という関数を使う方法があります。

この関数を利用すると特定のUTC時刻から任意のタイムゾーンの現地時間としてフォーマットされる`Date`オブジェクトを返してくれます。

```typescript
const date = utcToZonedTime(new Date(), 'Asia/Tokyo');
```

Vercel実行環境で処理される可能性のある部分で`Date`オブジェクトを使う場合に、

必ず`utcToZonedTime`で変換するようにしておけば、Vercel環境でのタイムゾーンによるズレは解消されます。

## ソースコード例
```typescript
export async function getPublishedNewsOrderBy(): Promise<NewsList> {
  const q = await query(
    collection(db, path).withConverter(newsConverter),
    where('published', '==', true),
    where(
      'publishDate',
      '<=',
      startOfDay(utcToZonedTime(new Date(), SystemConst.TIMEZONE))
    ),
    orderBy('publishDate', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
}
```

```typescript
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { SystemConst } from '@/config/const';
import { News } from '@/service/model/news';

export const newsConverter: FirestoreDataConverter<News> = {
  toFirestore(news: WithFieldValue<News>): DocumentData {
    return {
      newsTitle: news.newsTitle,
      publishDate: news.publishDate,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): News {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      publishDate: format(
        utcToZonedTime(data.publishDate.toDate(), SystemConst.TIMEZONE),
        'yyyy/M/d'
      ),
    };
  },
};
```
