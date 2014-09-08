/********************[ INIT ]********************/

var msg = $('#txt-login');

// hidden defaults
$('#sidebar').hide();
$('#main').hide();
$('#logged').hide();
$('#sites').hide();
msg.fadeTo(0,0);



/********************[ LISTENERS ]********************/

$('#btn-reg').click(function(){
	register();
});


$('#btn-login').click(function(){
	login();
});


$('#btn-logout').click(function(){
	logout();
});



/********************[ FUNCTIONS ]********************/

function register() {
	var mail = $('#mail').val();
	var pass = $('#pass').val();
	var check = users.where({mail:mail});

	if(mail.length === 0 || mail.length >= 30) {
		flashText(msg,"Please enter a valid email");

	} else if(pass.length === 0 || pass.length >= 10) {
		flashText(msg,"Please enter a valid password");

	} else if(check.length) {
		flashText(msg,"This email is already registered");

	} else {
		var user = new User({mail:mail, pass:pass});
		users.add(user);
		user.save();
		flashText(msg,"Register successful! Now please log in");
	}
};


function login() {
	var mail = $('#mail').val();
	var pass = $('#pass').val();
	user = users.findWhere({mail:mail}); // assign to global var for future reference
	if(user && (user.get('pass') === pass)){
		start();
	} else {
		flashText(msg,"Incorrect email or password");
	}
};


function start() {

	$('#login').fadeOut('slow', function() {
		$('#sites').fadeIn('slow');
		listSites();

		$('.site').click(function(){
		 	sel_site.val($(this).index()).trigger('change'); // get site number

			$('#sites').fadeOut('slow', function(){
				$('#logged').fadeIn('slow');
				sidebar.children().fadeTo(0, 0);
				sidebar.fadeIn('slow', function(){
					// show sidebar panels
					sidebar.children().each(function(){
			  		$(this).delay(200 * $(this).index()).fadeTo(400,1);
					});
				});
				$('#main').fadeIn('slow');
				msg.empty();
			});
		});
	});
};


function logout(){
	logged = false;
	$('#main').fadeOut('slow');
	$('#sidebar').fadeOut('slow');
	$('#logged').fadeOut('slow', function() {
		$('#login').fadeIn('slow');
	});
}
