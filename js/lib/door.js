/**
 * Simulates an AND gate in JavaScript. As an io object this can be used to
 * chain together logic operators and objects
 *
 * @author David North
 */
function door()
{
    this.image = gamejs.image.load('img/door.png');

    var _size = this.image.getSize();
    this.rect = new gamejs.Rect([0, 0], [_size[0], _size[1]]);

    this.setState = function( state )
    {
        if ( state != this.getState() )
        {
            if ( state )
            {
                this.rect.y -= (this.rect.height);
            }
            else
            {
                this.rect.y += (this.rect.height);
            }
        }

        //Update the state using the parent setState method
        door.prototype.setState.call(this, state);
    }

    this.handleCollision = function( playable ){
        playerCollides(playable, this.rect);
    }
}

//Set the parent of the orGate to io
door.prototype =  new io();
