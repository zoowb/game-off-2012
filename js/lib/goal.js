
function goal()
{
    //Load the variables required by gamejs.sprite.Sprite
    goal.superConstructor.apply(this, [0, 0]);
    this.image = gamejs.image.load('img/block.png');

    var _size = this.image.getSize();
    this.rect = new gamejs.Rect([0, 0], [_size[0], _size[1]]);

    var _active = false;

    this.setPosition = function(x, y){
        this.rect.x = x;
        this.rect.y = y;

        return this;
    }

    this.isActive = function()
    {
        return _active;
    }

    this.update = function(msDuration)
    {
        _active = false;
    }

    this.handleCollision = function( playable ){
        _active = true;
    }
}

//Extend the playable object so that the parent is the sprite
gamejs.utils.objects.extend(goal, gamejs.sprite.Sprite);