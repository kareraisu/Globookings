/********************[ INIT ]********************/

// hidden defaults
timelapse.hide();
btn_no.hide();
txt_btn.fadeTo(0,0);

// render site list
sel_site.html(_.template($('#tpl-site').html())({list: sites}));



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



/********************[ FUNCTIONS ]********************/

function listFloors() {
  sel_floor.html(_.template($('#tpl-floor').html())({list: site.floors}));
};


function renderFloor() {
  var main = new ViewFloor({
    model: floor
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
  // keep same id if editing a booking
  if (id) {
    current.set({id:id});
  };
  // use existing num or else assign new one
  if (num) {
    current.set({num:num});
  } else {
    current.set({num: bookings.lenght + 1});
  };

  current.set({
    site: site.name, // plain object, not a backbone model
    site_n: sel_site.val(),
    floor: sel_floor.val(),
    room: room.name, // plain object, not a backbone model
    room_n: room_n,
    date: date.val(),
    from: from.val(),
    to: to.val(),
    desc: desc.val(),
    user: user.get('mail'),
  });

  bookings.add(current);
  current.save();
  flashText(txt_btn,'Booking added');
  cancel();
};


function cancel(){
  id = false;
  btn_ok.html('BOOK');
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
