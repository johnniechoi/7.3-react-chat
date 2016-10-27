var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var MessageCollection = require('../../models/messages.js').MessageCollection;
var moment = require('moment');
require('backbone-react-component');


var Chat = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function() {
    return {
      username: '',
      content: '',
      time: null
    };
  },

  // Login
  handleLoginSubmit: function(e){
    e.preventDefault();
    var router = this.props.router;
    // router.navigate('chat/', {trigger: true});
    var username = document.getElementById("usernameInput").value;
    this.setState({ username });
    // console.log('handleSubmit');
  },
  renderLogin: function(){
    // console.log('render');
    return this.state.username ? null : (
      <form className="well" onSubmit={this.handleLoginSubmit}>
        <input name="username" id="usernameInput" placeholder="Username" />
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    );
  },


  // Form
  handleFormContent: function(e){
    var content = e.target.value;
    var time =  new Date().getTime();
    this.setState({ content, time });

    // console.log('handleContent');
  },
  handleFormSubmit: function(e){
    e.preventDefault();
    var { content, time, username } = this.state;
    this.getCollection().create({ content, time, username });
    this.setState({content: ''});
    // console.log('handleSubmit');
  },
  renderForm: function(){
    return !this.state.username ? null : (
      <form className="well footer" onSubmit={this.handleFormSubmit}>
        <input onChange={this.handleFormContent} name="title" value={this.state.content} placeholder="Chat..." />
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    );
  },


  // Chat Listing
  renderChatListing: function(){
    var collection = this.getCollection();
    var listOfContent = collection.map((message) => {
      var content = message.get('content');
      var time = moment(message.get('time')).format('MMMM Do, YYYY HH:mm');
      var username = message.get('username');
      return !message.get('time') ? null : (
        <li key={message.get('_id') || message.cid} className="well">
          <span> {`${username} ${content} at ${time}`}</span>
        </li>
      );
    });

    return !this.state.username ? null : (
      <ul>
        {listOfContent}
      </ul>
    );
  },


  render: function(){
    return (
      <div>
        {this.renderLogin()}
        {this.renderForm()}
        {this.renderChatListing()}
      </div>
    );
  }
});


module.exports = {
  Chat
};
