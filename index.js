let turn=0;
initGame();
function initGame() {
    console.log("Game Initialized");
    turn=0;
    document.querySelector('[game-status]').style.color = '';
    document.querySelector('[game-status]').style.backgroundColor = '';
    document.querySelector('[game-status]').textContent = "Current Turn: X";
    const boxes = document.querySelectorAll('[data-box]');
    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = '';
        document.querySelector('#btn').classList.add('hidden');
        box.addEventListener('click', handleBoxClick, { once: true });
        
    });
}

function handleBoxClick(event) {
    const box = event.target;
    turn++;
    const currentTurn = document.querySelector('[game-status]').textContent.includes('X') ? 'X' : 'O';
    box.textContent = currentTurn;
    if (checkGameStatus(currentTurn)) {
        const boxes = document.querySelectorAll('[data-box]');
        boxes.forEach(box => box.removeEventListener('click', handleBoxClick));
        return;
    }
    if(turn === 9){
        document.querySelector('[game-status]').textContent = "Game Drawn!";
        document.querySelector('[game-status]').style.cssText = 'color:yellow;background-color:black';
        document.querySelector('#btn').classList.remove('hidden');
        return;
    }
    if(currentTurn === 'X'){
        document.querySelector('[game-status]').textContent = "Current Turn: O";
    }   
    else{
        document.querySelector('[game-status]').textContent = "Current Turn: X";
    }  
}

function checkGameStatus(player) {
    const boxes = document.querySelectorAll('[data-box]');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],      
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],              
        [0, 4, 8],
        [2, 4, 6]
    ];              
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;              
        if (boxes[a].textContent === player && boxes[b].textContent === player && boxes[c].textContent === player) {
            boxes[a].style.backgroundColor = 'green';
            boxes[b].style.backgroundColor = 'green';
            boxes[c].style.backgroundColor = 'green';
            document.querySelector('[game-status]').textContent = `Player ${player} Wins!`;
            document.querySelector('[game-status]').style.cssText = 'color:green;background-color:black';
            document.querySelector('#btn').classList.remove('hidden');
            return true;
        }       
    }
    return false;
}