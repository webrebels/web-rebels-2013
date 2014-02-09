(function(){
    var supportedBrowser = (
        !!document.querySelectorAll &&
        !!document.getElementsByClassName
    );

    /* Toggle off message for older browsers */
    var surprompenEl    = document.getElementById('surprompen');
    var pageEl          = document.querySelectorAll('.wrap')[0];

    if (!supportedBrowser) {
        surprompenEl.style.display = 'block';
        pageEl.style.display = 'none';
    }

    surprompenEl.onclick = function () {
        surprompenEl.style.display = 'none';
        pageEl.style.display = 'block';
    };
}())