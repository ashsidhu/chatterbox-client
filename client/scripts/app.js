var Message = Backbone.Model.extend({

});

var Messages = Backbone.Collection.extend({
  model: Message,

  url: 'https://api.parse.com/1/classes/chatterbox',

  parse: function(response, options){
    return response.results;
  },

  fetchOptions: {
    data: {
      order: '-createdAt',
      limit: 10
    }
  },

  loadMsgs: function () {
    this.fetch(this.fetchOptions);
  }
});

var MessagesView = Backbone.View.extend({

  render: function () {
    // append all messages to this.el
    console.log(this.collection);
    this.collection.each(function(message) {
      var messageView = new MessageView({
        model: message
      });
      this.$el.prepend(messageView.render());
    }, this);
    return this.$el
  }

});

var MessageView = Backbone.View.extend({

  template: _.template($('#message-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var FormView = Backbone.View.extend({
  events: {
    'submit' : 'submitForm'
  },

  submitForm: function (event) {
    event.preventDefault();
    var messageText = this.$('.message-input').val();
    console.log(messageText);
    var message = {
      text: messageText,
      username: "jon"
    };
    this.collection.create(message);
    this.$('.message-input').val('');
  }

  // new Message

  // $('#message-form').on('submit', function() {
    // post this input to the server
    // prepend text to messages
    // clear message box
  // });
});


// APP CODE
var messages = new Messages();
var messagesView = new MessagesView({
  el: '#messages-container',
  collection: messages
});

var formView = new FormView({
  // model: message,
  collection: messages,
  el: '#message-form'
});

messages.loadMsgs();
messagesView.render();

messages.on('sync', messagesView.render, messagesView);
