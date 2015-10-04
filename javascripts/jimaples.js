// load the showerthoughts if needed
load_quotes = function() {
	$('#quotes')[0].style.borderBottom = '4px solid #434343';
	$('.wrapper')[0].style.marginTop = '20px';		

	$('#quotetext').click(new_quote);
	$('#quotetext')[0].title = 'Click me!';
	resize_quote();

	if (typeof thoughts == 'undefined') {
		$.get('/files/showerthoughts.txt', function(data) {
			//alert(data);
			thoughts = data.split('\n');
			console.log('load_quotes: '+thoughts.length+' quotes loaded');
			new_quote();
		});
	} else { new_quote(); }
}

resize_quote = function() {
	// set in CSS
	var w = $(window).width()-$('#quotelink').width()-40;
	console.log('Window '+$(window).width()+' link '+$('#quotelink').width()+' text '+w);
	$('#quotetext').width(w);
}

// update the quote
new_quote = function() {
	var i = Math.floor(Math.random() * thoughts.length);
	console.log('new_quote: '+i+' '+thoughts[i]);
	$('#quotetext')[0].innerHTML = thoughts[i];
	$('#quotelink')[0].innerHTML = '<a href="https://www.reddit.com/r/showerthoughts" target="_blank">/r/showerthoughts</a>';	
}

// update the page
$('#quotes').ready(load_quotes);
$(window).resize(resize_quote);

// pictures.html layout functions ////////////////////////////////////////////
$('#pic').ready(function() {
	var e = $('.thumbnail');
	if (e.length) {
		// click on a thumbnail to show that image
		change_pic = function(src) {
			$('#pic')[0].src = src;
		}
		e.click(function(){ change_pic(this.src); });
		
		// click on the big pic to show the next
		var src = [];
		var prev_next = {};
		for (var i=0; i < e.length; i++) {
			src.push(e[i].src);
			prev_next[e[i].src] = { 'next': (e[i+1] ? i+1 : 0),
			                        'prev': (e[i-1] ? i-1 : e.length-1) };
		}
		$('#pic').mousedown(function(event) {
			switch (event.which) {
				case 1:
					this.src = src[prev_next[this.src].next];
					break;
				//case 2:
				//	alert('Middle Mouse button pressed.');
				//	break;
				case 3:
					this.src = src[prev_next[this.src].prev];
					break;
				//default:
				//	alert('You have a strange Mouse!');
			}
			this.scrollIntoView(true);
		// and disable the right-click menu
		}).contextmenu(function() {return false;});
	}
})
