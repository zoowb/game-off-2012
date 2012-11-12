
function scorecard()
{
    var _clonePar = 0;

    var _timePar = 0;

    var _clones = 0;

    var _timeTaken = 0;

    if ( !($('#game_scorecard').length) )
    {
        $('body').append('<div id="game_scorecard"></div>');
        $('#game_scorecard').append('<p>Number of Clones: <span class="clones"></span></p>');
        $('#game_scorecard').append('<p>Time: <span class="time"></span></p>');
        $('#game_scorecard').append('<p><span class="score"></span></p>');
    }

    this.setParForClones = function( par ){
        _clonePar = par;
        return this;
    }

    this.setParForTime = function( par ){
        _timePar = par;
        return this;
    }

    this.setTimeTaken = function( time ){
        _timeTaken = time;
        return this;
    }

    this.setClonesUsed = function( clones )
    {
        _clones = clones;
        return this;
    }

    this.show = function(){
        $('#game_scorecard p span.clones').text(_clones);
        $('#game_scorecard p span.time').text(_time);

        var score = 0;
        $('#game_scorecard').show();
    }

    this.hide = function(){

    }

}