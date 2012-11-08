
function block()
{
    //Load the variables required by gamejs.sprite.Sprite
    block.superConstructor.apply(this, [0, 0]);
    this.image = gamejs.image.load('img/block.png');

    var _size = this.image.getSize();
    this.rect = new gamejs.Rect([0, 0], [_size[0], _size[1]]);

    this.setPosition = function(x, y)
    {
        this.rect.x = x;
        this.rect.y = y;

        return this;
    }

    this.getPosition = function(){
        return {"x": this.rect.x, "y": this.rect.y};
    }

    this.handleCollision = function( playable ){
        //Define the top edge (left to right, along the top of the
        //colliding block)
        var topEdge = [
            [this.rect.left, this.rect.top],
            [this.rect.right, this.rect.top]
        ];

        //Define the top edge (left to right, along the bottom of the
        //colliding this)
        var bottomEdge = [
            [this.rect.left, this.rect.bottom],
            [this.rect.right, this.rect.bottom]
        ];

        //Define the left edge (top to bottom, along the left of the
        //colliding this)
        var leftEdge = [
            [this.rect.left, this.rect.top],
            [this.rect.left, this.rect.bottom]
        ];

        //Define the right edge (top to bottom, along the right of the
        //colliding this)
        var rightEdge = [
            [this.rect.right, this.rect.top],
            [this.rect.right, this.rect.bottom]
        ];

        //Check the top and bottom colliision points. If a collision is
        //detected then set the velocity on the Y axis to zero and move
        //the playable so that it is no longer colliding
        if ( playable.rect.collideLine(topEdge[0], topEdge[1]) )
        {
            playable.setVelocity( playable.getVelocity().x, 0 );
            playable.rect.bottom = (this.rect.top - 0.1);
        }
        else if ( playable.rect.collideLine(bottomEdge[0], bottomEdge[1]) )
        {
            playable.setVelocity( playable.getVelocity().x, 0 );
            playable.rect.top = (this.rect.bottom + 0.1);
        }

        //Check the left and right colliision points. If a collision is
        //detected then set the velocity on the X axis to zero and move
        //the playable so that it is no longer colliding
        if ( playable.rect.collideLine(leftEdge[0], leftEdge[1]) )
        {
            playable.setVelocity( 0, playable.getVelocity().y );
            playable.rect.right = (this.rect.left - 0.1);

        }
        else if ( playable.rect.collideLine(rightEdge[0], rightEdge[1]) )
        {
            playable.setVelocity( 0, playable.getVelocity().y );
            playable.rect.left = (this.rect.right + 0.1);
        }
    }
}

//Extend the playable object so that the parent is the sprite
gamejs.utils.objects.extend(block, gamejs.sprite.Sprite);