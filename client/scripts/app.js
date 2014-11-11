// YOUR CODE HERE:

// MODELS

// COLLECTIONS
var ChatsCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  initialize: function(){
    this.fetch();
    //
  },
  parse: function(data) {
    return data.results;
  }
});

// VIEWS
var ChatsView = Backbone.View.extend({
  el: '#messages-container',
  initialize: function(){
    console.log("chats ")

  }
});

var InputView = Backbone.View.extend({
  el: '#message-form',
  initialize: function(){
    console.log("input ")

  }
});

var MainView = Backbone.View.extend({
  el: '#main',
  initialize: function(){
    this.inputView = new InputView();
    this.chatsView = new ChatsView();
    this.chatsCollection = new ChatsCollection();
    console.log("main ")
  },
});

var mainView = new MainView();
