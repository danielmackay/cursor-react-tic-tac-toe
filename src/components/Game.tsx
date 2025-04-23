import { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;
type BoardState = (Player)[];

const Game = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameStatus, setGameStatus] = useState<string>('');

  const checkWinner = (boardState: BoardState): Player => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        boardState[a] && 
        boardState[a] === boardState[b] && 
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setGameStatus(`Player ${newWinner} wins!`);
      return;
    }

    if (newBoard.every(cell => cell !== null)) {
      setGameStatus("It's a draw!");
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setGameStatus(`Player ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameStatus(`Player X's turn`);
  };

  useEffect(() => {
    setGameStatus(`Player ${currentPlayer}'s turn`);
  }, []);

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      
      <div className="game-status">
        {gameStatus}
      </div>
      
      <div className="board">
        {board.map((cell, index) => (
          <div 
            key={index} 
            className="cell" 
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      
      <button 
        className="reset-button" 
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default Game;