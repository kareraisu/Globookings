var Booking = Backbone.Model.extend({
  defaults: {
    site: 'site',
    site_n: 0,
    floor: 0,
    room: 'room',
    room_n: 0,
    date: 'date',
    from: 0,
    to: 0,
    desc: 'description',
    user: 'user',
  },

  initialize: function(){
    // console.log('booking created');
    // console.log(this.toJSON());
  },

  edit: function(){
    id = this.get('id');
    
    site_n = parseInt(this.get('site_n'));
    site = sites[site_n];
    sel_site.val(site_n);

    floor = site.floors[parseInt(this.get('floor'))];
    listFloors();
    sel_floor.val(this.get('floor'));
    renderFloor();
    timelapse.fadeIn(300);

    room_n = parseInt(this.get('room_n'));
    room = floor.get('rooms')[room_n];
    // select room via mapster (will trigger info display)
    $('area[data-mapster-key=' + room_n + ']').mapster('select');

    $('#date').val(this.get('date'));
    $('#from').val(this.get('from'));
    $('#to').val(this.get('to'));
    $('#desc').val(this.get('desc'));

    btn_ok.html('UPDATE');
    btn_no.show(300);
  },

});


var Floor = Backbone.Model.extend({
  defaults: {
    img: 'img/noimg.png',
    rooms: []
  }
});


var User = Backbone.Model.extend({
  defaults: {
    mail:'mail',
    pass:'password',
    active: false
  },

  initialize: function(){
    // console.log('user created');
    // console.log(this.toJSON());
  }
});
