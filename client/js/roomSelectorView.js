define(["backbone"], function(Backbone) {
  var RoomSelectorView = Backbone.View.extend({
    el: '#room-select',

    template: _.template($('#rooms-changer-template').html()),

    rooms: null,

    initialize: function (app) {
      this.$el = $('#room-select');
      this.rooms = app.rooms;
      this.render();
      this.$el.on('click', function(e) {
        e.preventDefault();
        var newRoom = $(e.target).data('roomName');
        console.log(newRoom);
      })
    },

    render: function () {
      this.$el.html(this.template({rooms: this.rooms.toJSON()}));
    }

  });

  return RoomSelectorView;
})
