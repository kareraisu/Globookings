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
var site_n;
var floor;
var room;
var room_n;


// DOM elements
var sel_site = $('#site');
var sel_floor = $('#floor');
var timelapse = $('#timelapse');
var image = $('#img-floor');
var img = $('#img-margin');
var txt_main = $('#txt-main');
var btn_ok = $('#btn-ok');
var btn_no = $('#btn-no');
var txt_btn = $('#txt-btn');

var date = $('#date');
var from = $('#from');
var to = $('#to');
var desc = $('#desc');


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
    room_n = e.key;
    room = floor.get('rooms')[room_n];
    $('#room-name').html(room.name);
    $('#room-info').html('Capacity: ' + room.capacity);
  }
};



