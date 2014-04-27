/* globals Backbone jQuery $ _ */
/* js/collections/Library.js */

var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books'
});