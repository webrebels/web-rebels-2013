(function(){
	function randomImg() {
		var imgs 	= ['b0','b1','b2','b3','b4'],
			random 	= Math.floor(Math.random() * ((imgs.length - 1) - 0 + 1) + 0);
		return imgs[random];
	}
	var body = document.getElementById('body');
	body.setAttribute('style', 'background-image: url("../gfx/' + randomImg() + '.jpg");');
}())