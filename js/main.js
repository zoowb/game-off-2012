var gamejs = require('gamejs');

// gamejs.preload([]);

gamejs.ready(function() {

    var display = gamejs.display.setMode([800, 600]);
    display.blit(
        (new gamejs.font.Font('30px Sans-serif')).render('Hello World')
    );

});

var p = new player();
p.clone();
alert(p.getPlayables().length)