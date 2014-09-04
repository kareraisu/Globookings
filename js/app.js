/********************[ INIT ]********************/

// hidden defaults
timelapse.hide();
btn_no.hide();
txt_btn.fadeTo(0,0);

// render timelapse
var set_from = 8;
var set_to = 20;
for (var i = set_from; i <= set_to; i++) {
   timelapse.append('<div>' + i + '</div><div>.</div>');
 };
 timelapse.children().addClass('free');




/********************[ LISTENERS ]********************/

// on site selection, render floor list and clear floor image
sel_site.change(function() {
  site = sites[sel_site.val()];
  listFloors();
  showText('PLEASE SELECT A FLOOR');
});

// on floor selection, render floor image+map
sel_floor.change(function(){
  floor = site.floors[sel_floor.val()];
  renderFloor();
});

// on btn click, create booking
btn_ok.click(function() {
  if (site && floor && room && date.val() && from.val() && to.val() && desc.val()) {
    createBooking();
  } else {
    flashText(txt_btn,'Please complete all fields');
  };
});

// or cancel
btn_no.click(function() {
  cancel();
});

// timelapse divs behaviour
var pressing = false;

timelapse.mousedown(function(event) {
  pressing = true;
});

timelapse.on('mouseup mouseleave', function(event) {
  pressing = false;
});



/********************[ FUNCTIONS ]********************/

function listSites() {
  sel_site.html(_.template($('#tpl-site').html())({list: sites}));
};

function listFloors() {
  sel_floor.html(_.template($('#tpl-floor').html())({list: site.floors}));
};


function renderFloor() {
  var main = new ViewFloor({
    model: floor
  });
};


function renderTime(){
  timelapse.children().removeClass('booked booking').addClass('free');

  var filtered = bookings.where({room_n: room_n, date: date.val()});

  $.each(filtered, function(index, book) {
     paint(book.get('from'), book.get('to'));
  });

  updateBinds();
};


function paint(s_from, s_to){
  // parse time strings
  var from = parseInt(s_from.split(":")[0]);
  var to = parseInt(s_to.split(":")[0]);
  // normalize to timelapse's start time and scale (0.5 hs)
  from = (from - set_from)*2;
  to = (to - set_from)*2;
  // adjust for half hours
  from = parseInt(s_from.split(":")[1]) ? from +1 : from;
  to = parseInt(s_to.split(":")[1]) ? to : to -1;
  // apply class to corresponding divs in timelapse
  for (i = from; i <= to; i++){
    timelapse.children().eq(i).removeClass('free').addClass('booked');
  };
};


function updateBinds(){

  timelapse.children().off();

  timelapse.children('.free').mousedown(function(event) {
    $('.booking').removeClass('booking').addClass('free');
    $(this).removeClass('free').addClass('booking');
  });

  timelapse.children('.free').mouseover(function(event) {
    if (pressing) {
      $(this).removeClass('free').addClass('booking');
    };
  });

  timelapse.children().mouseup(function(event) {
    if ($(this).hasClass('booking')) {
      flashText(txt_btn, "time updated");
    };
  });

};


function showText(txt){
  image.mapster('unbind');
  timelapse.fadeOut(300);
  image.fadeOut(300, function(){
    txt_main.fadeOut(300, function(){
      txt_main.html(txt).fadeIn(300);
    });
  });
};


function flashText(el, txt){
  el.finish().html(txt).fadeTo(300, 1).delay(2000).fadeTo('slow', 0);
};


function createBooking(){

  var current = new Booking();

  // use existing id or else assign new one
  if (id) {
    current.set({id:id});
  };

  current.set({
    site: site.name, // plain object, not a backbone model
    site_n: sel_site.val(),
    floor: sel_floor.val(),
    room: room.name, // plain object, not a backbone model
    room_n: room_n, // set via mapster or via edit function
    date: date.val(),
    from: from.val(),
    to: to.val(),
    desc: desc.val(),
    user: user.get('mail'),
  });

  bookings.add(current);
  current.save();
  flashText(txt_btn,'Booking created!');
  renderTime();
  cancel();
};


function cancel(){
  id = false; // reset id & num
  btn_ok.html('BOOK');  // revert buttons
  btn_no.hide(300);
};



/********************[ MAPSTER AUTO-RESIZE ]********************/

// mapster auto-resize
var resizeTime = 100;     // total duration of the resize effect, 0 is instant
var resizeDelay = 100;    // time to wait before checking the window size again
                          // the shorter the time, the more reactive it will be.
                          // short or 0 times could cause problems with old browsers.

// Resize the map to fit within the boundaries provided
function resize(maxWidth,maxHeight) {
  imgWidth = image.width(),
  imgHeight = image.height(),
  newWidth = 0,
  newHeight = 0;

  if (imgWidth/maxWidth>imgHeight/maxHeight) {
    newWidth = maxWidth;
  } else {
    newHeight = maxHeight;
  }
  image.mapster('resize',newWidth,newHeight,resizeTime);   
}

// Track window resizing events, but only actually call the map resize when the
// window isn't being resized any more
function onWindowResize() {
  
  var curWidth = $('#main').width(),
    curHeight = $('#main').height(),
    checking = false;
  if (checking) {
    return;
  }
  checking = true;
  window.setTimeout(function() {
    var newWidth = $('#main').width(),
      newHeight = $('#main').height();
    if (newWidth === curWidth &&
      newHeight === curHeight) {
      resize(newWidth,newHeight); 
    }
    checking = false;
  }, resizeDelay);
}

$(window).bind('resize', onWindowResize);
