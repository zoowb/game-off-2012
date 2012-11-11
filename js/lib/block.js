
function block()
{
    //Load the variables required by gamejs.sprite.Sprite
    block.superConstructor.apply(this, [0, 0]);
    this.image = gamejs.image.load('img/block.png');

    var _size = this.image.getSize();
    this.rect = new gamejs.Rect([0, 0], [_size[0], _size[1]]);

    this.setPosition = function(x, y){
        this.rect.x = x;
        this.rect.y = y;

        return this;
    }

    this.getPosition = function(){
        return {"x": this.rect.x, "y": this.rect.y};
    }

    this.handleCollision = function( playable ){
        playerCollides(playable, this.rect);
    }
}

//Extend the playable object so that the parent is the sprite
gamejs.utils.objects.extend(block, gamejs.sprite.Sprite);