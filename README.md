# AccessCounter-for-VRC

VRChatの動画アクセスを記録してその結果に応じてリダイレクトするやつ。  
記録先はGoogle App Script経由でスプレッドシートに書く。

~~Renderにデプロイする関係でこの時点で決め打ちしてるけどいずれ可変にしたい。~~  
[Issue #2](https://github.com/axtuki1/AccessCounter-for-VRC/issues/2)で環境変数にいれることでできるようにした。

## 使い方

以下にアクセスすると初回時は青画面の動画、それ以降は赤画面の動画を表示する。  
https://vrc-counter.axtuki1.com/api/v1/VRChatAccess

## URLの指定方法

以下は環境変数に設定する必要がある。

### `DATABASE_URL`

データベースへデータを投げるURL。  
`{IPADDR}`でアクセス元のIPアドレスに置換される。

### `FIRST_ACCESS`

初回アクセス時にリダイレクトする先。

### `OTHER_ACCESS`

2回目以降アクセス時のリダイレクト先。