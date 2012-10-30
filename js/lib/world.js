
function world()
{
    const MAX_X_VELOCITY = 200;
    const MAX_Y_VELOCITY = 200;

    const MIN_X_VELOCITY = -200;
    const MIN_Y_VELOCITY = -200;

    var _p = new player();

    this.handleInput = function()
    {
        gamejs.event.get().forEach(function(event)
        {
            if ( event.type === gamejs.event.KEY_DOWN )
            {
                switch( event.key )
                {
                    case gamejs.event.K_UP:
                    case gamejs.event.K_DOWN:
                    case gamejs.event.K_LEFT:
                        _p.setVelocity( MIN_X_VELOCITY, _p.getVelocity().y );
                        break;

                    case gamejs.event.K_RIGHT:
                        _p.setVelocity( MAX_X_VELOCITY, _p.getVelocity().y );
                        break;

                    case gamejs.event.K_c:
                        _p.clone();
                        break;
                    case gamejs.event.K_TAB:
                        _p.moveToNext();
                }
            }

            if ( event.type === gamejs.event.KEY_UP)
            {
                switch( event.key )
                {   
                    case gamejs.event.K_LEFT:
                    case gamejs.event.K_RIGHT:
                        _p.setVelocity( 0, _p.getVelocity().y );
                        break;
                }
            }
        });
    }

    this.update = function( msDuration )
    {
        for ( var i = 0; i < _p.getPlayables().length; i++ )
        {
            var playable = _p.getPlayables()[i];
            var velocity = playable.getVelocity();

            velocity.x = Math.max( MIN_X_VELOCITY, velocity.x );
            velocity.x = Math.min( MAX_X_VELOCITY, velocity.x );

            velocity.y = Math.max( MIN_Y_VELOCITY, velocity.y );
            velocity.y = Math.min( MAX_Y_VELOCITY, velocity.y );

            playable.setVelocity( velocity.x, velocity.y );
        }

        _p.update( msDuration );
    }

    this.draw = function ( mainSurface )
    {
        _p.draw( mainSurface );
    }
}