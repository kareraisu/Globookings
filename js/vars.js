// model and collection instances
var user;// = new User();
var users = new Users();
users.fetch();

var bookings = new Bookings([]);
var booklist = new ViewBookings({
  collection: bookings,
});
bookings.fetch(); // fetch after view creation, or else view is not updated


// booking attributes
var id = false;
var num = false;
var site;
var site_n = 0;
var floor;
var room;
var room_n = 0;


// DOM elements
var sel_site = $('#site');
var sel_floor = $('#floor');
var timelapse = $('#timelapse');
var image = $('#img-floor');
var img = $('#img-margin');
var text = $('#txt-main');
var btn_ok = $('#btn-ok');
var btn_no = $('#btn-no');


// mapster options
var mapoptions = {
  // style stuff
  highlight: true,
  stroke: true,
  fillColor: '00ff00',
  fade: true,
  fadeDuration: 150,
  render_highlight: {
      fillOpacity: 0.2
  },
  render_select: {
      fillOpacity: 0.8
  },
  // important stuff
  scaleMap: true,
  singleSelect: true,
  onClick: function (e) {
    room = floor.get('rooms')[e.key];
    $('#room-name').html(room.name);
    $('#room-info').html('Capacity: ' + room.capacity);
  }
};



