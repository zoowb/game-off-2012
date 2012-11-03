gamejs = require('gamejs');
gamejs.preload(['img/player.png','img/block.png']);

gamejs.ready(function() {

    var display = gamejs.display.setMode([800, 600]);


    $('head').append('<script type="text/javascript" src="js/lib/world.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/io.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/andGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/orGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/gates/notGate.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/playable.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/block.js"></script>');
    $('head').append('<script type="text/javascript" src="js/lib/player.js"></script>');

    var mainSurface = gamejs.display.getSurface();
    var lvl         = new world();

    //Initialise the world
    lvl.init( mainSurface );

    // msDuration = time since last tick() call
    var tick = function(msDuration)
    {
        mainSurface.fill("#FFFFFF");

        //Handle user input
        lvl.handleInput();

        //Update the worlds objects
        lvl.update( msDuration );

        //Draw the new objects
        lvl.draw( mainSurface );
    };

    gamejs.time.fpsCallback(tick, this, 60);
});
