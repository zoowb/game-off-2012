var gamejs = require('gamejs');

// gamejs.preload([]);

gamejs.ready(function() {

    var display = gamejs.display.setMode([800, 600]);
    display.blit(
        (new gamejs.font.Font('30px Sans-serif')).render('Hello World')
    );

});

x = new io();
y = new io();
z = new notGate();

and = new andGate();
and.addInput(x);
y.addOutput( z );
and.addInput(z);

x.setState(true);
y.setState(true);

alert(and.getState());

y.setState(false);
alert(and.getState());