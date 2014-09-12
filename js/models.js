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
    // get id
    id = this.get('id');
    // get site
    site_n = parseInt(this.get('site_n'));
    site = sites[site_n];
    sel_site.val(site_n);
    // get floor
    floor = site.floors[parseInt(this.get('floor'))];
    listFloors();
    sel_floor.val(this.get('floor'));
    renderFloor();
    timelapse.fadeIn(300);
    // get room
    room_n = parseInt(this.get('room_n'));
    room = floor.get('rooms')[room_n];
    // select room via mapster (will trigger room info display and time render)
    $('area[data-mapster-key=' + room_n + ']').mapster('select');
    // get date, from, to
    date.val(this.get('date'));
    from = parseFloat(this.get('from'));
    show_from.html(formatTime(from));
    to = parseFloat(this.get('to'));
    show_to.html(formatTime(to));
    // repaint this booking's time so it's editable
    paint(from, to, 'booked', 'booking');
    // get event description
    desc.val(this.get('desc'));
    // change buttons
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
  },

  initialize: function(){
    // console.log('user created');
    // console.log(this.toJSON());
  }
});
