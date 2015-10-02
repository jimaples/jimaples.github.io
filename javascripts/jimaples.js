// load the showerthoughts if needed
load_quotes = function() {
	$('#quotetext').click(new_quote);
	$('#quotetext')[0].title = 'Click me!';

	if (typeof thoughts == 'undefined') {
		$.get('/files/showerthoughts.txt', function(data) {
			//alert(data);
			thoughts = data.split('\n');
			console.log('load_quotes: '+thoughts.length+' quotes loaded');
			new_quote();
		});
	} else { new_quote(); }
}

// add the quote structure
// <a href="https://www.reddit.com/r/showerthoughts" target="_blank">/r/showerthoughts</a>

// update the quote
new_quote = function() {
	var i = Math.floor(Math.random() * thoughts.length);
	console.log('new_quote: '+i+' '+thoughts[i]);
	$('#quotetext')[0].innerHTML = thoughts[i];
}

// update the page
$('#quotes').ready(load_quotes);

