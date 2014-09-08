// model and collection instances
var user;// = new User();
var users = new Users();
users.fetch();


function formatTime(time){
  var trunctime = Math.floor(time);
  if (time == trunctime) {
    return time + ':00';
  } else {
    return trunctime + ':30';
  };
}

var bookings = new Bookings([]);
var booklist = new ViewBookings({
  collection: bookings,
});
bookings.fetch(); // fetch after view creation, or else view is not updated


// booking attributes
var id = false;
var site;
var site_n;
var floor;
var room;
var room_n;
var from;
var to;


// DOM elements
var sidebar = $('#sidebar');
var timelapse = $('#timelapse');
var image = $('#img-floor');
var txt_main = $('#txt-main');
var txt_btn = $('#txt-btn');

var sel_site = $('#site');
var sel_floor = $('#floor');

var btn_ok = $('#btn-ok');
var btn_no = $('#btn-no');

var date = $('#date');
var show_from = $('#from');
var show_to = $('#to');
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
  onStateChange: function (e) {
    if (e.state == 'select') {
      if (e.selected) {
        room_n = e.key; // key is a string so room_n is too 
        room = floor.get('rooms')[parseInt(room_n)];
        $('#room-name').html(room.name);
        $('#room-info').html('Capacity: ' + room.capacity + '<br>' + room.extra);
        renderTime();
      } else {
        timelapse.children().removeClass('booked');
      };
    };
  }
};



