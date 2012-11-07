/**
 * Simulates an AND gate in JavaScript. As an io object this can be used to
 * chain together logic operators and objects
 *
 * @author David North
 */
function lever()
{

    this.image = gamejs.image.load('img/switch.png');
    this.image.crop( new gamejs.Rect([0,0], [64,64] ));

    this.rect  = new gamejs.Rect([0,0], [64, 64]);

    this.setState = function( state )
    {
        if ( state != this.getState() )
        {
            if ( state )
            {
                this.image.crop( new gamejs.Rect([64,0], [64,64] ));
            }
            else
            {
                this.image.crop( new gamejs.Rect([0,0], [64,64] ));
            }
        }

        //Update the state using the parent setState method
        andGate.prototype.setState.call(this, state);
    }
}

//Set the parent of the orGate to io
lever.prototype =  new io();
