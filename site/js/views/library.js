/* globals Backbone jQuery $ _ */
/* js/views/library.js */

var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    events: {
        'click #add': 'addBook'
    },

    /**
     * データの配列を受け取ってapp.Libraryのコンストラクタに渡している。
     * これはサンプルデータとしてコレクションに与えられ、アプリケーションが
     * 正しく機能していることを確認するためにも利用できる。
     */
    initialize: function() {
        this.collection = new app.Library();
        this.collection.fetch({reset: true});
        this.render();

        this.listenTo(this.collection, 'add', this.renderBook);
        this.listenTo(this.collection, 'reset', this.render);
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
    },

    addBook: function(e) {
        e.preventDefault();

        var formData = {};
        $('#addBook div').children('input').each(function(i, el) {
            var val = $(el).val();
            if (val != '') {
                if (el.id === 'keywords') {
                    formData[el.id] = [];
                    _.each($(el).val().split(' '), function(keyword) {
                               formData[el.id].push({'keyword': keyword});
                           });
                } else if (el.id === 'releaseDate') {
                    formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
                } else {
                    formData[el.id] = $(el).val();
                }

                // フィールドに入力されている値をクリアする
                $(el).val('');
            }
        });

        this.collection.create(formData);
    }
});