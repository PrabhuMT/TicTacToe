const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

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

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
  checkWin();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.innerText = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    const closeBtn = document.querySelector('.close');
  
    popupMessage.innerText = message;
    popup.style.display = 'block';
  
    closeBtn.addEventListener('click', function() {
      popup.style.display = 'none';
      restartGame();
    });
  
    window.addEventListener('click', function(e) {
      if (e.target == popup) {
        popup.style.display = 'none';
        restartGame();
      }
    });
  }
  
  function checkWin() {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
        continue;
      }
      if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        gameActive = false;
        showPopup(`${currentPlayer} wins!`);
        // restartGame()
        return;
      }
      else {
        checkDraw()
      }
    }
  }

  function checkDraw() {
    if (!gameState.includes('')) {
      gameActive = false;
        showPopup('It\'s a draw!');
        return;
    }
  }
  