'use strict';
// selecting elements

const player1=document.querySelector('.first-player');
const player2=document.querySelector('.second-player');

const score1=document.querySelector('.score1');
const score2=document.querySelector('.score2');
const current1=document.querySelector('.current1');
const current2=document.querySelector('.current2');

const dice=document.querySelector('.dice');

const roll=document.querySelector('.roll-Dice');
const hold=document.querySelector('.hold');
const newGame=document.querySelector('.new-Game');



//starting conditions
score1.textContent=0;
score2.textContent=0;
dice.classList.add('hidden');
current1.textContent=0;
current2.textContent=0;
let currentscore=0;
let activeplayer=1; //can be 1 or 2
let score=[0,0];
let playing=true;
let numberofplaying=0;

//function

function switchplayer(){
    if(activeplayer==1)
    {
        current1.textContent=0;
        activeplayer=2;
    }
    else
    {
        current2.textContent=0;
        activeplayer=1;
    }
    currentscore=0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}
//rolling dice

roll.addEventListener('click',function(){
    if(playing==false)
    {
        return;
    }
    numberofplaying++;
    const random=Math.trunc(Math.random()*6+1);
    dice.classList.remove('hidden');
    dice.src=`images/dice-${random}.png`;
    //check for rolled 1
    if(random!==1){
        currentscore+=random;
        if(activeplayer==1)
        {
        //add random to current 
            current1.textContent=currentscore;
        }
        else
        {
            current2.textContent=currentscore;
        }
    }
    else{
        //switch player
       switchplayer();
       numberofplaying=0;
    }
});



hold.addEventListener('click',function(){
    if(numberofplaying!==0)
    {
        numberofplaying=0;
    if(playing==false)
    {
        return;
    }
    //add current score to active player
    score[activeplayer-1]+=currentscore;
    if(activeplayer==1)
    {
        score1.textContent=score[0];
        current1.textContent=0;
    }
    else
    {
        score2.textContent=score[1];
        current2.textContent=0;
    }


    //check if Player's score is >=100
    if(score[activeplayer-1]>=100)
    {
        //player wins
        playing=false;
        dice.classList.add('hidden');
        if(activeplayer==1)
        {
            player1.classList.add('player--winner');
            player1.classList.remove('player--active');
        }
        else
        {
            player2.classList.add('player--winner');
            player2.classList.remove('player--active');
        }
    }
    else
    //switch to the next player

    switchplayer();
}

});

newGame.addEventListener('click',function(){
    score1.textContent=0;
    score2.textContent=0;
    current1.textContent=0;
    current2.textContent=0;
    currentscore=0;
    activeplayer=1;
    playing=true;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    numberofplaying=0;
    score=[0,0];
    dice.classList.add('hidden');
});
