/* globals __dirname require console */

// モジュールの依存先
var application_root = __dirname;
var express = require('express'), // WAF
    path = require('path'), // パス関連のユーティリティ
    mongoose = require('mongoose') // MongoDB
;


// データベースに接続
mongoose.connect('mongodb://localhost/library_database');

// スキーマ
var Keywords = new mongoose.Schema({
    keyword: String
});

var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [Keywords]
});

// モデル
var BookModel = mongoose.model('Book', Book);



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
    app.use(express.static(path.join(application_root, 'BackboneREST')));

    // 開発中にはすべてのエラーを表示する
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});



// ルート
app.get('/', function(req, res) {
    res.sendfile('index.html')
});


app.get('/api/books', function(req, res) {
    return BookModel.find(function(err, books) {
               if (!err) {
                   return res.send(books)
               } else {
                   return console.log(err);
               }
           });
});

app.post('/api/books', function(req, res) {
    var book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        releaseDate: req.body.releaseDate,
        keywords: req.body.keywords
    });
    book.save(function(err) {
        if (!err) {
            return console.log('追加されました');
        } else {
            return console.log(err);
        }
    });
    return res.send(book);
});

// 指定されたIDを持つ本を返す
app.get('/api/books/:id', function(req, res) {
    return BookModel.findById(req.params.id, function(err, book) {

               if (!err) {
                   return res.send(book);
               } else {
                   return console.log(err);
               }
           });
});

// 本のデータを更新する
app.put('/api/books/:id', function(req, res) {
    console.log('更新します: ' + req.body.titl);
    return BookModel.findById(req.params.id, function(err, book) {
               book.title = req.body.title;
               book.author = req.body.author;
               book.releaseDate = req.body.releaseDate;
               book.keywords = req.body.keywords;

               return book.save(function(err) {
                          if (!err) {
                              console.log('更新されました');
                          } else {
                              console.log(err);
                          }
                          return res.send(book);
                      });
           })
});

// 本のデータを削除する
app.delete('/api/books/:id', function(req, res){
    console.log('削除する本のID:' + req.params.id);
    return BookModel.findById(req.params.id, function(err, book) {
               return book.remove(function(err) {
                          if (!err) {
                              console.log('本が削除されました');
                              return res.send('');
                          } else {
                              return console.log(err);
                          }
                      });
           });
});



var port = 4711;
app.listen(port, function() {
    console.log('Expressサーバがポート %dで起動しました。 モード: %s', port, app.settings.env)
});
