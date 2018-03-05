# basic-auth-lambda-edge
---

## Description
CIDR 表記で指定した IP アドレス範囲に対してベーシック認証を行う Lambda@Edge スクリプトのサンプルです。

## Environment
* node v6.10.3
* Typescript 2.8.1

## Install
```
$ git clone git@github.com:kenryooo/basic-auth-lambda-edge.git
$ cd basic-auth-lambda-edge
$ npm install
```

## Edit & Build

CIDR 指定を修正します。
修正箇所は[こちら](https://github.com/kenryooo/basic-auth-lambda-edge/blob/master/src/index.ts#L21)

```
    const allowCidrSubnets = [
        'cidr1',
        'cidr2'
    ];
```

ベーシック認証のユーザー、パスワードを設定します。
修正箇所は[こちら](https://github.com/kenryooo/basic-auth-lambda-edge/blob/master/src/index.ts#L31)


```
    const credentials = [
        {
            'user':'hoge',
            'password':'fuga'
        }
    ]
```



```
$ npm run webpack
```

## Deploy

dst ディレクトリ配下に生成された js ファイルを直接 Lambda のコードエディット画面に入力する、もしくは zip ファイルをアップロードします。

* dst/bundle.js
* dst/bundle.zip
