document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const result = document.querySelector('.result');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add('occupied');
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            result.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            result.textContent = 'It\'s a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s Turn (${currentPlayer})`;
    }

    function handleCellClickEvent(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.id.split('-')[1]);

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellClick(clickedCell, clickedCellIndex);
        checkResult();
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        message.textContent = `Player ${currentPlayer}'s Turn (${currentPlayer})`;
        result.textContent = '';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('occupied');
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClickEvent);
    });

    document.querySelector('.restart').addEventListener('click', restartGame);
});
