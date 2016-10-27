var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var MessageCollection = require('../models/messages.js').MessageCollection;
// var LoginComponent = require('./components/chat.jsx').LoginComponent;
// var ChatComponent = require('./components/chat.jsx').ChatComponent;
var Chat = require('./components/chat.jsx').Chat;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'chat/': 'chat'
  },
  initialize: function(){
    this.username = '';
  },
  index: function(){
    ReactDOM.render(
      React.createElement(Chat, {router:this}),
      document.getElementById('app')
    );
  },
  chat: function(){
    var collection = new MessageCollection();
    setInterval(() => collection.fetch(), 3000);

    ReactDOM.render(
      React.createElement(Chat, {collection: collection, username: this.username}),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
