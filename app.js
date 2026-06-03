let gameseq=[];
let userseq=[];

let color=["red","yellow","blue","green"];
let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');

let start = false;
let level = 0;
let hgscore = 0;
// h3.innerText=`High Score = ${hgscore}`;



document.addEventListener("keypress", function(){
    if(start == false){
        // console.log("start");
        levelup();
    }
});

document.addEventListener("click", function(event){
    if(event.target.nodeName != "BUTTON"){
        return;
    }
    if(start == false){
        // console.log("start");
        // levelup();
        setTimeout(levelup,500);
    }
});

function levelup(){
    level++;
    h2.innerText =`level ${level}`;
    start = true;

    let randidx = Math.floor(Math.random()*4);
    if(randidx == 4){
        randidx = 3;
    }
    let randclr = color[randidx];
    let randbtn = document.querySelector(`.${randclr}`);
    // console.log(randbtn);
    gameseq.push(randclr);
    gameblink(randbtn);
    userseq = [];
}


function checkans(idx){
    if(gameseq[idx]===userseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup, 750);
        }
    }
    else{
        if(level-1 > hgscore){
            h2.innerText=`Game Over, Your score was ${level-1}, You created a new High Score, Press any key to start again`;
            hgscore = level-1;
        }
        else{
            h2.innerText=`Game Over, Your score was ${level-1}, Press any key to start again`;
        }
        reset();
        
    }
}

function gameblink(btn){

    btn.classList.add("white");
    setTimeout(function(){
        btn.classList.remove("white");
    },250);
}


function btnpressed(){
    if(start == false){
        return;
    }
    // console.log("button was pressed");
    userblink(this);

    userclr = this.getAttribute("id");
    // console.log(userclr);
    userseq.push(userclr);
    checkans(userseq.length-1);
}

function userblink(ele){
    ele.classList.add("grey");
    setTimeout(() => {
        ele.classList.remove("grey");
    }, 250);
}

let allbtn = document.querySelectorAll(".btn");
for(bt of allbtn){
    bt.addEventListener("click",btnpressed);
}



function reset(){
    gameseq = [];
    userseq = [];
    level = 0;
    h3.innerText=`High Score = ${hgscore}`;
    document.querySelector("*").style.background="red";
    setTimeout(() => {
        document.querySelector("*").style.background="beige";
    }, 200);
    start = false;
}