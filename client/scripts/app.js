$(document).on('ready', function() {

  // YOUR CODE HERE:
  window.app = {
    server:'https://api.parse.com/1/classes/chatterbox'
  };

  app.init = function() {
    app.username = window.location.search.slice(window.location.search.indexOf("=")+1);
    $('form').on('submit', function(event){
      event.preventDefault();
      var newMessage = {};
      newMessage.username = app.username;
      newMessage.text = $('.message-input').val();
      newMessage.roomname = "lobby";
      app.send(newMessage);
      $('.message-input').val("");
      // TODO: read later
      // return false;
    });
    console.log("I'm initiated!");
    // should fetch existing messages from the server
    app.fetch(app.renderMessages);

    // should display all of the fetched messages
  };


  app.send = function(message) {
    $.ajax({
      type: 'POST',
      url: app.server,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log("send success!", data);
      }
    });
  };

  app.fetch = function(successCallback) {
    // default callback
    successCallback = successCallback || function() {};
    // initiate a new request
    $.ajax({
      type: 'GET',
      url: app.server,
    // pass the results to a callback
      success: successCallback
    });
  };


  app.renderMessages = function(data) {
    var message;
    for (var i = 0; i < data.results.length; i++) {
      message = data.results[i];
      if (!message || !message.text) {
        // console.log(message)
        continue;
      }
      // set .message text to message.text
      // set .message username to message.username
      if (message.text.indexOf('alert') > -1 || message.text.indexOf('"') > -1) {
        console.log('alert prevented >> '+message.text);
        continue;
      }
      app.addMessage(message);
    }
  };

  app.addMessage = function(message) {
    var node = $("<div>" + message.username + ': ' + message.text + "</div>");
    // append empty message div to #chats
    $('#chats').append(node);
  };

  app.clearMessages = function() {
    $('#chats').html('');
  }

  app.init();
})
