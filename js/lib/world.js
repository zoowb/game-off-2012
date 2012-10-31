
function world()
{
    const MAX_X_VELOCITY = 200;
    const MAX_Y_VELOCITY = 200;

    const MIN_X_VELOCITY = -200;
    const MIN_Y_VELOCITY = -200;

    var _p = new player();
    var _blocks = new gamejs.sprite.Group();

    _blocks.add( new block() );

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
                        break;

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
        _applyGravity();
        _applyCollisions();

        _p.update( msDuration );
    }

    this.draw = function ( mainSurface )
    {
        _p.draw( mainSurface );
        _blocks.draw( mainSurface );
    }

    var _applyGravity = function()
    {
        _p.getPlayables().forEach(function(obj){
            _sanatiseVelocity(obj);
        });
    }

    var _sanatiseVelocity = function(obj)
    {
        var velocity = obj.getVelocity();

        velocity.x = Math.max( MIN_X_VELOCITY, velocity.x );
        velocity.x = Math.min( MAX_X_VELOCITY, velocity.x );

        velocity.y = Math.max( MIN_Y_VELOCITY, velocity.y );
        velocity.y = Math.min( MAX_Y_VELOCITY, velocity.y );

        obj.setVelocity( velocity.x, velocity.y );
    }

    var _applyCollisions = function()
    {
        var colliders = (gamejs.sprite.groupCollide(_p.getPlayables(), _blocks));
        for( var i = 0; i < colliders.length; i++ )
        {
            var playable = colliders[i].a;
            var block    = colliders[i].b;

            if ( playable.getVelocity().x > 0
                && block.rect.left < playable.rect.right
                && playable.rect.left < block.rect.left
            )
            {
                playable.setVelocity( 0, playable.getVelocity().y );
            }
            else if ( playable.getVelocity().x < 0
                && block.rect.right > playable.rect.left
                && playable.rect.right > block.rect.right
            )
            {
                playable.setVelocity( 0, playable.getVelocity().y );
            }
        }
    }
}