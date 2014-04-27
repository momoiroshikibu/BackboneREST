/* globals Backbone jQuery $ _ */
/* js/views/library.js */

var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    /**
     * データの配列を受け取ってapp.Libraryのコンストラクタに渡している。
     * これはサンプルデータとしてコレクションに与えられ、アプリケーションが
     * 正しく機能していることを確認するためにも利用できる。
     */
    initialize: function(initialBooks) {
        this.collection = new app.Library(initialBooks);
        this.render();
    },

    /*
     * コレクション内のそれぞれの本について描画処理を呼び出し、
     * リスト全体を表現します。
     */
    render: function() {
        this.collection.each(function(item) {
            this.renderBook(item)
        }, this);
    },

    /**
     * BookViewを使い、個々の本を描画します。
     * 生成された要素はリストのDOMに追加されます。
     */
    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append(bookView.render().el);
    }
});