/* globals __dirname require */

// モジュールの依存先
var application_root = __dirname;
var express = require('express'), // WAF
    path = require('path'), // パス関連のユーティリティ
    mongoose = require('mongoose') // MongoDB
;


// サーバを作成
var app = express();

// サーバを設定
app.configure(function() {
    // リクエストの本文を解析してrequest.bodyにセットする
    app.use(express.bodyParser());

    // リクエストメソッドのオーバーライドのためにrequest.bodyをチェックする
    app.use(express.methodOverride());

    // URLとリクエスト形式の組に基づいてrequest.bodyをチェックする
    app.use(app.router);

    // 静的コンテンツが置かれた場所を示す
    app.use(express.static(path.join(application_root, 'site')));

    // 開発中にはすべてのエラーを表示する
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

// ルート
app.get('/api', function(request, response) {
    response.send('ライブラリのAPIを利用可能です');
});

var port = 4711;
app.listen(port, function() {
    console.log('Expressサーバがポート %dで起動しました。 モード: %s', port, app.settings.env)
});
