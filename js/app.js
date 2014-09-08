/********************[ INIT ]********************/

// hidden defaults
timelapse.hide();
btn_no.hide();
txt_btn.fadeTo(0,0);

// render timelapse
var set_from = 8;
var set_to = 20;
for (var i = set_from; i < set_to; i++) {
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
  if (site && floor && room && date.val() && from && to && desc.val()) {
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

timelapse.children().mousedown(function(event) {
  if ($(this).hasClass('free') || $(this).hasClass('booking')){
    $('.booking').removeClass('booking').addClass('free');
    $(this).removeClass('free').addClass('booking');
    from = ($(this).index() / 2) + set_from;
    show_from.html(formatTime(from));
  }
});

timelapse.children().mouseover(function(event) {
  if ($(this).hasClass('free') && pressing) {
    $(this).removeClass('free').addClass('booking');
  };
});

timelapse.children().mouseup(function(event) {
  if ($(this).hasClass('booking')) {
    flashText(txt_btn, "time updated");
    to = ($('.booking').last().index() / 2) + set_from +0.5;
    show_to.html(formatTime(to));
  };
});



/********************[ FUNCTIONS ]********************/

function listSites() {
  sel_site.html(_.template($('#tpl-site').html())({list: sites}));
}


function listFloors() {
  sel_floor.html(_.template($('#tpl-floor').html())({list: site.floors}));
}


function renderFloor() {
  var main = new ViewFloor({
    model: floor
  });
}


function createBooking(){

  var current = new Booking();
  
  current.set({
    site: site.name, // plain object, not a backbone model
    site_n: sel_site.val(),
    floor: sel_floor.val(),
    room: room.name, // plain object, not a backbone model
    room_n: room_n, // set via mapster or via edit function
    date: date.val(),
    from: from,
    to: to,
    desc: desc.val(),
    user: user.get('mail'),
  });

  // use existing id or else assign new one
  if (id) {
    current.set({
      id: id,
      collection: bookings,
    });
  } else {
    bookings.add(current);
  };
  current.save();
  flashText(txt_btn,'Booking created!');
  renderTime();
  cancel();
}


function cancel(){
  id = false; // reset id & num
  btn_ok.html('BOOK');  // revert buttons
  btn_no.hide(300);
}


function renderTime(){
  // reset global vars
  from = undefined;
  to = undefined;
  // clear timelapse
  timelapse.children().removeClass('booked booking').addClass('free');
  // filter bookings by date and room
  var filtered = bookings.where({room_n: room_n, date: date.val()});
  // paint timelapse
  $.each(filtered, function(index, book) {
    var from = parseFloat(book.get('from'));
    var to = parseFloat(book.get('to'));
    paint(from, to, 'free', 'booked');
  });
}


function paint(from, to, oldclass, newclass){
  // parse time strings
  from = parseFloat(from);
  to = parseFloat(to);
  // normalize to timelapse's start time and scale (0.5 hs)
  from = (from - set_from)*2;
  to = (to - set_from)*2 +0.5;
  // apply class to corresponding divs in timelapse
  for (i = from; i <= to; i++){
    timelapse.children().eq(i).removeClass(oldclass).addClass(newclass);
  };
}


function showText(txt){
  image.mapster('unbind');
  timelapse.fadeOut(300);
  image.fadeOut(300, function(){
    txt_main.fadeOut(300, function(){
      txt_main.html(txt).fadeIn(300);
    });
  });
}


function flashText(el, txt){
  el.finish().html(txt).fadeTo(300, 1).delay(2000).fadeTo('slow', 0);
}


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
