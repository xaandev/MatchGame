var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
	var $game = $("#game");
	var cards = MatchGame.generateCardValues();
	MatchGame.renderCards(cards, $game);
	
	$('button').click(function() {
		var $game = $("#game");
		var cards = MatchGame.generateCardValues();
		MatchGame.renderCards(cards, $game);
	});
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var begin_array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
	var end_array = [];
	var y = 16;
	var z;
	
	for (x=0; x < 16; x++) {
		z = Math.floor(Math.random() * y);
		end_array[x] = begin_array[z];
		begin_array.splice(z, 1);
		y--;
	}
		
	return end_array;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	$game.empty();
	$game.data('flipped_cards', []); 
	var colors = ["hsl(25,85%,65%)","hsl(55,85%,65%)","hsl(90,85%,65%)","hsl(160,85%,65%)",
				  "hsl(220,85%,65%)","hsl(265,85%,65%)","hsl(310,85%,65%)","hsl(360,85%,65%)"];
	
	for(var x=0;  x < cardValues.length; x++) {
		var value = cardValues[x];
		var color = colors[value - 1];
		var data = {
			value: value,
			color: color,
			flipped: false
		};
		
		var $card = $('<div class="col-3 card"></div>');
		$card.data(data);
		
		$game.append($card);
	}
	
	$('.card').click(function() {
		MatchGame.flipCard($(this), $('#game'));
	});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
	
	if ($card.data('flipped')) {
		return;
	}
	
	$card.css('background-color', $card.data('color'))
		.text($card.data('value'))
		.data('flipped', true);
		
	var flipped = $game.data('flipped_cards');
	flipped.push($card);
	
	if (flipped.length === 2) {
		if (flipped[0].data('value') === flipped[1].data('value')) {
			var match = {
				backgroundColor: 'rgb(153, 153, 153)',
				color: 'rgb(204, 204, 204)'
			};
			flipped[0].css(match);
			flipped[1].css(match);
		} else {
			window.setTimeout(function() {
				flipped[0].css('background-color', 'rgb(32, 64, 86)')
					.text('')
					.data('flipped', false);
				flipped[1].css('background-color', 'rgb(32, 64, 86)')
					.text('')
					.data('flipped', false);
			}, 300);
		}
	$game.data('flipped_cards', []);	
	}		
};






