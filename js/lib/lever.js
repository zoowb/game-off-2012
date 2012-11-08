/**
 * Simulates an AND gate in JavaScript. As an io object this can be used to
 * chain together logic operators and objects
 *
 * @author David North
 */
function lever()
{
    var _canBeOn = false;

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
        lever.prototype.setState.call(this, state);
    }

    this.update = function(){
        if ( !_canBeOn )
        {
            this.setState(false);
        }

        _canBeOn = false;
    }

    this.handleCollision = function( playable ){
        _canBeOn = true;
    }

    this.handleInput = function(world, event){
        var playable = world.getPlayer().getCurrentPlayable();

        if ( event.type === gamejs.event.KEY_DOWN
            && gamejs.sprite.collideRect(playable, this) )
        {
            switch( event.key )
            {
                case gamejs.event.K_e:
                case gamejs.event.K_ENTER:
                    this.setState( !this.getState() );
                    break;
            }
        }
    }
}

//Set the parent of the orGate to io
lever.prototype =  new io();
