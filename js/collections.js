var Bookings = Backbone.Collection.extend({
  model: Booking,
  localStorage: new Backbone.LocalStorage("bookings"),
  url: '/bookings',

  initialize: function(){
    this.on('add', function(model,collection){
      $('#total-bookings').html(collection.length);
      console.log('booking added');
      console.log(model.toJSON());
    });
    this.on('remove', function(model,collection){
      $('#total-bookings').html(collection.length);
      console.log('booking removed');
    });
  }
});


var Users = Backbone.Collection.extend({
  model: User,
  localStorage: new Backbone.LocalStorage("users"),
  url: '/users',

  initialize: function(){
    this.on('add', function(model,collection){
      console.log('user added');
      console.log(model.toJSON());
    });
  }
});

