var name_user = "";

$(document).ready(function(){
	$(".start_game").click(function(){
		name_user = $('.name').val();
		let block_menu = $('#menu');
		let block_game = $('#game');
		if(name_user != ""){
					block_menu.css("display","none");
		block_game.css("display","block");
		Game();
		}
		else{
			alert("Введите свое имя, пожалуйста")
		}
		console.log(name_user);
		console.log(block_menu);
		console.log(block_game);
	});

	$('.settings').click(function(){
		let settings_window = $('.settings_window');
		settings_window.fadeIn();
	});
	$('.close').click(function(){
		let settings_window = $('.settings_window');
		settings_window.fadeOut();
	});

	$('.records').click(function(){
		let records_window = $('.records_window');
		records_window.fadeIn();
	});
	$('.close').click(function(){
		let records_window = $('.records_window');
		records_window.fadeOut();
	});
});