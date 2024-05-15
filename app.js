// there are 8 winning patterns
// 0 1 2
// 3 4 5
// 6 7 8
// 0 3 6
// 1 4 7
// 2 5 8
// 0 4 8
// 2 4 6
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let turnX;
let winnerMsg=document.querySelector(".winnerTitle");
let msg=document.querySelector(".winMsg");
let title=document.querySelector(".title");
let resetgame=document.querySelector(".resetgame");
let start=document.querySelector(".start");
let x=document.querySelector("#x");
let o=document.querySelector("#o");
let clickcount=0;
const winningPattern=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
const startgame=()=>
    {
        start.classList.add("starthide");
        document.querySelector(".container").classList.remove("gamehide");
        document.querySelector("#game").classList.remove("gamehide");
        resetBtn.classList.remove("gamehide");
        for(let box of boxes)
            {
                box.classList.remove("gamehide");
            }
    }
const endgame=()=>
    {
        start.classList.remove("starthide");
        document.querySelector(".container").classList.add("gamehide");
        document.querySelector("#game").classList.add("gamehide");
        resetBtn.classList.add("gamehide");
        for(let box of boxes)
            {
                box.classList.add("gamehide");
            }
    }
x.addEventListener("click",()=>
    {
        turnX=true;
        startgame();
    })
o.addEventListener("click",()=>
    {
        turnX=false;
        startgame();
    })
const enableBtns=()=>
    {
        for(let box of boxes)
            {
                box.disabled=false;
            }
    }
const disableBtns=()=>
    {
        for(let box of boxes)
            {
                box.disabled=true;
            }
    }
const showWinner=(winner)=>
    {
        msg.innerText=`Player ${winner} wins!`;
        winnerMsg.classList.remove("hide");
        title.classList.add("reducesize");
        resetgame.classList.remove("hide");
        disableBtns();
    }
const checkWinner=()=>
{
    for(let pattern of winningPattern)
        {
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;
            if(pos1Val!==""&&pos2Val!==""&&pos3Val!=="")
                {
                    if(pos1Val===pos2Val&&pos2Val===pos3Val)
                        {
                            showWinner(pos1Val);
                        }
                }
        }
}
const checkDraw=(count)=>
    {
        if(count===9)
            {
                msg.innerText=`Oops! It's a Draw.`;
                winnerMsg.classList.remove("hide");
                title.classList.add("reducesize");
                resetgame.classList.remove("hide");
                disableBtns();
            }
    }
resetBtn.addEventListener("click",()=>
{
    turnX=true;
    clickcount=0;
    enableBtns();
    for(let box of boxes)
        {
            box.innerText="";
        }
    winnerMsg.classList.add("hide");
    title.classList.remove("reducesize");  
    resetgame.classList.add("hide");
    endgame();
})
boxes.forEach((box)=>
{
    box.addEventListener("click",()=>
    {
        if(turnX)
            {
                box.innerText="X";
            }
        else
            {
                box.innerText="O";
            }
        turnX=!turnX;
        clickcount++;
        box.disabled=true;
        checkWinner();
        checkDraw(clickcount);
    })
})