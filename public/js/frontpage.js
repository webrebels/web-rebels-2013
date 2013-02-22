(function(){
	function randomImg() {
	  var imgs  = ['b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11', 'b12'],
	    random  = Math.floor(Math.random() * ((imgs.length - 1) - 0 + 1) + 0);
	  return imgs[random];
	}
	var poster = document.getElementById('poster');
	poster.setAttribute('style', 'background-image: url("../gfx/' + randomImg() + '.jpg");');
}());