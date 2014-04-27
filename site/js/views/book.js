/* globals Backbone jQuery $ _ */
/* js/views/book.js */

var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: _.template($('#bookTemplate').html()),

    events: {
        'click .delete': 'deleteBook'
    },

    render: function() {
        // this.$elはtagNameで指定されたオブジェクト
        // jQueryのhtml()関数を呼び出す際に利用できる。
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    deleteBook: function() {
        // モデルを削除
        this.model.destroy();

        // ビューを削除
        this.remove();
    }
});