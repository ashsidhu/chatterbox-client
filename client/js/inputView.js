define(["backbone"], function(Backbone) {
  var InputView = Backbone.View.extend({
    // el: '#message-form',

    initialize: function (app) {
      this.user = app.user;
      this.$el = $('#message-form');

      this.$input = this.$el.find('input');
      this.$el.on('submit', this.submitForm.bind(this));
    },

    submitForm: function (e) {
      e.preventDefault();
      message = {
        text: this.$input.val(),
        username: app.user.get('name'),
        roomname: app.rooms.getSelectedRoom()
      };

      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(message),
        success: (function () {
          Backbone.Events.trigger('click:fetch-messages');
          this.clearForm();
        }).bind(this)
      });
    },

    clearForm: function () {
      this.$input.val('');
    }
  });

  return InputView;
});
