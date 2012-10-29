gamejs = require('gamejs');

// gamejs.preload([]);

gamejs.ready(function() {

    var display = gamejs.display.setMode([800, 600]);
    display.blit(
        (new gamejs.font.Font('30px Sans-serif')).render('Hello World')
    );

    $('head').append('<script type="text/javascript" src="js/lib/io.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/andGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/orGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/notGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/playable.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/player.js"></script>');

    var p = new player();

});