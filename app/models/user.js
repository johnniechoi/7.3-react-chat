var Backbone = require('backbone');
var $ = require('jquery');

var User = Backbone.Model.extend({
  defaults: {
    username: ''
  },
});

module.exports = {
  User: User,
};
