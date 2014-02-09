function getStyle(element, rule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(element, "").getPropertyValue(rule);
    }
    else if(element.currentStyle){
        rule = rule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = element.currentStyle[rule];
    }
    return strValue;
}


(function(){
    function randomImg() {
      var imgs  = ['b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11', 'b12'],
        random  = Math.floor(Math.random() * ((imgs.length - 1) - 0 + 1) + 0);
      return imgs[random];
    }
    var poster = document.getElementById('poster');
    var widthStyle = getStyle(poster, 'width');
    widthStyle = widthStyle.substr(0, widthStyle.indexOf('px'));
    var width = Math.ceil(widthStyle, 10);
    if (width > 479) {
        poster.setAttribute('style', 'background-image: url("../gfx/' + randomImg() + '.jpg");');
    }
}());