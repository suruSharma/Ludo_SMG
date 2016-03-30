type Board = string[][];
//positions are of type board delta, i.e the last changed positions of all the pawns of that player
//whe we define the player the name will be the color and the and the pos will be the initial positions
interface Player{
    name: string;
    pos1: BoardDelta;
    pos2: BoardDelta;
    pos3: BoardDelta;
    pos4: BoardDelta;
    pawnsOnBoard: number;
    id : string
}

interface BoardDelta {
  row: number;
  col: number;
}
//instead of BoardDelta as per used in tictactoe, we will provide player info
interface IState {
  board: Board;
  //delta: BoardDelta;
  player: Player;
}
//board consists of 15 rows and columns; each player has 4 pawns to move
module gameLogic {
  export const ROWS = 15;
  export const COLS = 15;
  var playerCount={
        'R' : 4,
        'B' : 4,
        'G' : 4,
        'Y' : 4
  
};

  /** Returns the initial Ludo board, which is a ROWSxCOLS matrix containing ''. */
  function getInitialBoard(): Board {
    let board: Board = [];
    for (let i = 0; i < ROWS; i++) {
      board[i] = [];    
      for (let j = 0; j < COLS; j++) {
        if( i == 0 || i == 14 ){
            if( j == 6 || j == 7 || j == 8){
                board[i][j] = ' ';
            }else{
                board[i][j] = 'X';
            }
        }
        if( i == 1){
            if(j == 6){
                board[i][j] = ' ';
            }else if(j == 7){
                board[i][j] = 'BL';
            }else if(j == 8){
                board[i][j] = 'BS';
            }else{
                board[i][j] = 'X';
            }
        }
        
        if( i == 2){
            if(j == 2 || j == 3){
                board[i][j] = 'RI'
            }else if(j == 6){
                board[i][j] = 'S';
            }else if(j == 7){
                board[i][j] = 'BL';
            }else if(j == 8){
                board[i][j] = ' ';
            }else if(j == 11 || j == 12){
                board[i][j] = 'BI'
            }else{
                board[i][j] = 'X'
            }
      }
      if(i == 3){
          if(j == 2 || j == 3){
                board[i][j] = 'RI'
            }else if(j == 6 || j == 8){
                board[i][j] = ' ';
            }else if(j == 7){
                board[i][j] = 'BL';
            }else if(j == 11 || j == 12){
                board[i][j] = 'BI'
            }else{
                board[i][j] = 'X'
            }
      }
      if(i == 4 || i == 5){
          if(j == 6 || j == 8){
                board[i][j] = ' ';
            }else if(j == 7){
                board[i][j] = 'BL';
            }else{
                board[i][j] = 'X';
            }
      }
      
      if( i == 6){
          if( j == 1){
              board[i][j] = 'RS';
          }else if( j == 6 || j == 8){
              board[i][j] = 'X';
          }else if(j == 7){
              board[i][j] = 'BH';
          }else if(j == 12){
              board[i][j] = 'S'
          }else{
              board[i][j] = ' ';
          }
      }
      
      if(i == 7){
          if(j == 1 ||  j == 2 || j ==3 || j == 4 || j ==5 ){
              board[i][j] = 'RL';
          }else if(j == 6){
              board[i][j] = 'RH';
          }else if(j == 7){
              board[i][j] = 'X';
          }else if(j == 8){
              board[i][j] = 'YH';
          }else if( j == 9 || j == 10 || j == 11 || j == 12 || j ==13){
              board[i][j] = 'YL';
          }else {
              board[i][j] = ' ';
          }
      }
      
      if( i == 8){
          if( j == 2){
              board[i][j] = 'S';
          }else if(j == 6 || j == 8){
              board[i][j] = 'X';
          }else if(j == 7){
              board[i][j] = 'GH';
          }else if(j == 13){
              board[i][j] = 'YS'
          }else{
              board[i][j] = ' '
          }
      }
      
      if( i == 9 || i == 10){
          if(j == 6 || j == 8){
                board[i][j] = ' ';
            }else if(j == 7){
                board[i][j] = 'GL';
            }else{
                board[i][j] = 'X';
            }
      }
      
      if( i == 11){
          if(j == 2 || j == 3){
                board[i][j] = 'GI'
            }else if(j == 6 || j == 8){
                board[i][j] = ' ';
            }else if(j == 7){
                board[i][j] = 'GL';
            }else if(j == 11 || j == 12){
                board[i][j] = 'YI'
            }else{
                board[i][j] = 'X'
            }
      }
      
      if( i == 12){
          if(j == 2 || j == 3){
                board[i][j] = 'GI'
            }else if(j == 6){
                board[i][j] = ' ';
            }else if(j == 7){
                board[i][j] = 'GL';
            }else if(j == 8){
                board[i][j] = 'S';
            }else if(j == 11 || j == 12){
                board[i][j] = 'YI'
            }else{
                board[i][j] = 'X'
            }
      }
      
      if(i == 13){
          if(j == 6){
                board[i][j] = 'GS';
            }else if(j == 7){
                board[i][j] = 'GL';
            }else if(j == 8){
                board[i][j] = ' ';
            }else{
                board[i][j] = 'X';
            }
      }
    }
  }
  return board;
  }

  export function getInitialState(): IState {
    return {board: getInitialBoard(), delta: null};
  }

  /**
   * This method will always return false because a tie is not possible in the game of ludo
   */
  function isTie(board: Board): boolean {
    return false;
  }

  /**
   * Return the id of the player if the player does not have any pawns on the board. Else return an empty string
   */
  function getWinner(player: Player): string {
    let countOnBoard = player.pawnsOnBoard;
    if(countOnBoard == 0)
    {
        return player.id;
    }
      return '';
  }

  /**
   * Returns the move that should be performed when player
   * with index turnIndexBeforeMove makes a move in cell row X col.
   */
  export function createMove(
      stateBeforeMove: IState, row: number, col: number, turnIndexBeforeMove: number): IMove {
    if (!stateBeforeMove) { // stateBeforeMove is null in a new match.
      stateBeforeMove = getInitialState();
    }
    let board: Board = stateBeforeMove.board;
    if (board[row][col] !== '') {
      throw new Error("One can only make a move in an empty position!");
    }
    if (getWinner(board) !== '' || isTie(board)) {
      throw new Error("Can only make a move if the game is not over!");
    }
    let boardAfterMove = angular.copy(board);
    boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'X' : 'O';
    let winner = getWinner(boardAfterMove);
    let endMatchScores: number[];
    let turnIndexAfterMove: number;
    if (winner !== '' || isTie(boardAfterMove)) {
      // Game over.
      turnIndexAfterMove = -1;
      endMatchScores = winner === 'X' ? [1, 0] : winner === 'O' ? [0, 1] : [0, 0];
    } else {
      // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
      turnIndexAfterMove = 1 - turnIndexBeforeMove;
      endMatchScores = null;
    }
    let delta: BoardDelta = {row: row, col: col};
    let stateAfterMove: IState = {delta: delta, board: boardAfterMove};
    return {endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: stateAfterMove};
  }

  export function checkMoveOk(stateTransition: IStateTransition): void {
    // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
    // to verify that the move is OK.
    let turnIndexBeforeMove = stateTransition.turnIndexBeforeMove;
    let stateBeforeMove: IState = stateTransition.stateBeforeMove;
    let move: IMove = stateTransition.move;
    let deltaValue: BoardDelta = stateTransition.move.stateAfterMove.delta;
    let row = deltaValue.row;
    let col = deltaValue.col;
    let expectedMove = createMove(stateBeforeMove, row, col, turnIndexBeforeMove);
    if (!angular.equals(move, expectedMove)) {
      throw new Error("Expected move=" + angular.toJson(expectedMove, true) +
          ", but got stateTransition=" + angular.toJson(stateTransition, true))
    }
  }

  export function forSimpleTestHtml() {
    var move = gameLogic.createMove(null, 0, 0, 0);
    log.log("move=", move);
    var params: IStateTransition = {
      turnIndexBeforeMove: 0,
      stateBeforeMove: null,
      move: move,
      numberOfPlayers: 4};
    gameLogic.checkMoveOk(params);
  }
}
