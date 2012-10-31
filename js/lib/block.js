
function block()
{
    //Load the variables required by gamejs.sprite.Sprite
    playable.superConstructor.apply(this, [0, 100]);
    this.image = gamejs.image.load('img/block.png');

    var _size = this.image.getSize();
    this.rect = new gamejs.Rect([0, 100], [_size[0], _size[1]]);

    this.getX = function(){
        return this.rect.x;
    }
}

//Extend the playable object so that the parent is the sprite
gamejs.utils.objects.extend(block, gamejs.sprite.Sprite);