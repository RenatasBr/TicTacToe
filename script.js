document.addEventListener('click', function(event) {
    var target = event.target;
    markX(target);
});

function markX(element){
    if (element.classList.contains("cell") && element.innerText == ""){
        element.innerText = "X";
        let gameContinues = checkResult();
        if (gameContinues) {
            opponentMove();
            checkResult();
        }
    }
    else {
        // Do nothing
    }
}

function anyMovesLeft(){
    var cells = Array.from(document.getElementsByClassName("cell"));
    cells = cells.filter(cell => cell.innerText == "");
    if (cells.length == 0){
        //modify .game--status to be draw
        var gameStatusElement = document.querySelector(".game--status");
        gameStatusElement.innerText = "DRAW";
        return false; //the game is finished
    }
    return true; // the game continues
}

function opponentMove(){
    // Get all elements with class name
    var cells = Array.from(document.getElementsByClassName("cell"));
    // Filter the elements by just selecting empty ones.
    cells = cells.filter(cell => cell.innerText == "");
    // Get random number
    let randomNumber = getRandomNumber(0, cells.length);
    // Select random element 
    let randomCell = cells[randomNumber];
    //and modify its innertext to O
    randomCell.innerText = '0'
}

function getRandomNumber(min, max){
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
}

function checkResult(){
    isWinnerDetermined();
    return anyMovesLeft();
}

function isWinnerDetermined(){
    let winningCellCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
        //Go  through there winning combinations
        winningCellCombinations.forEach(combination =>
            {
                let i1 = combination[0];
                let i2 = combination[1];
                let i3 = combination[2];

                let element1 = document.querySelector(`[data-cell-index="${i1}"]`);
                let element2 = document.querySelector(`[data-cell-index="${i2}"]`);
                let element3 = document.querySelector(`[data-cell-index="${i3}"]`);

                let isGameCompleted = 
                    element1.innerText == element2.innerText 
                    && element2.innerText == element3.innerText
                    && element1.innerText != "";
                
                if (isGameCompleted){
                    var gameStatusElement = document.querySelector(".game--status");
                    gameStatusElement.innerText = `${element1.innerText} has won the game`
                    return true;
                }
            });

        return false;
}

function resetGame(){
}