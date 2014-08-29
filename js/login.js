/********************[ INIT ]********************/

// hidden defaults
$('#sidebar').hide();
$('#main').hide();
$('#logged').hide();



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
		$('#msg').html("Please enter a valid email");

	} else if(pass.length === 0 || pass.length >= 10) {
		$('#msg').html("Please enter a valid password");

	} else if(check.length) {
		$('#msg').html("This email is already registered");

	} else {
		var user = new User({mail:mail, pass:pass});
		users.add(user);
		user.save();
		$('#msg').html("Register successful! Now please log in");
	}
};


function login() {
	var mail = $('#mail').val();
	var pass = $('#pass').val();
	user = users.findWhere({mail:mail}); // assign to global var for future reference
	if(user && (user.get('pass') === pass)){
		$('#msg').html("It's showtime!");
		start();
	} else {
		$('#msg').html("Incorrect mail or password");
	}
};


function start() {
	$('#login').fadeOut('slow', function() {
		$('#logged').fadeIn('slow');
		$('#sidebar').fadeIn('slow');
		$('#main').fadeIn('slow');
		$('#msg').empty();
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
