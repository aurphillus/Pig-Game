var scores, roundScore, activePlayer,gamePlaying,previous;

init();


function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previous = 0;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}



function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

}


function winGame(){
    var input = document.querySelector('.final-score').value;
    var winningscore;
    if(input){
        winningscore = input;
    }
    else{
        winningscore = 100;
        document.querySelector('.final-score').value = '100';
    }

    if (scores[activePlayer] >= winningscore){
        document.getElementById('name-'+activePlayer).textContent = 'Winner';
        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;
    }
    else{
        nextPlayer();
    }
}



document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying){
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2= Math.floor(Math.random() * 6) + 1;

        var diceDom1 = document.getElementById('dice-1');
        var diceDom2= document.getElementById('dice-2');

        diceDom1.style.display = 'block';
        diceDom1.src = 'dice-'+dice1+'.png';

        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-'+dice2+'.png';
    
        if(dice1===6 && dice2===6){
            scores[activePlayer]=0;
            document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
        else if (dice1 !== 1 && dice2 !==1){
            roundScore+=dice1;
            roundScore+=dice2;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        }
    }

});


document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[activePlayer]+=roundScore;
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        winGame();
    }
});


document.querySelector('.btn-new').addEventListener('click',function(){
    init();
});