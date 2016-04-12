type Board = string[][];
interface BoardDelta {
  players: Player[];
}
interface IState {
  board: Board;
  delta: BoardDelta;
}

interface Cell {
    row: number;
    col: number;
}

interface Player{
    pawnsOnBoard : number;
    color : string;
    position : Cell[];
}

//board consists of 15 rows and columns; each player has 4 pawns to move
module gameLogic {
  export const ROWS = 15;
  export const COLS = 15;
  export const NUMPLAYERS = 4;
  var previousClick:IMove;

  function setIntialPlayerConfiguration(): BoardDelta{
      let initPlayerState : Player[] = [];
      let redPlayer : Player = {pawnsOnBoard:4, color: 'R', position : []};
      let bluePlayer : Player = {pawnsOnBoard:4, color: 'B', position : []};
      let yellowPlayer : Player = {pawnsOnBoard:4, color: 'Y', position : []};
      let greenPlayer : Player = {pawnsOnBoard:4, color: 'G', position : []};
      initPlayerState.push(redPlayer);
      initPlayerState.push(bluePlayer);
      initPlayerState.push(yellowPlayer);
      initPlayerState.push(greenPlayer);
      let delta: BoardDelta = {players : initPlayerState};
      return delta;
  }
  
  /** Returns the initial Ludo board, which is a ROWSxCOLS matrix containing ''. */
  function getInitialBoard(): Board {
    let board: Board = [];
    for (let i = 0; i < ROWS; i++) {
      board[i] = [];    
      for (let j = 0; j < COLS; j++) {
        if( i == 0){
            if( j == 6 || j == 7 || j == 8){
                board[i][j] = '';
            }else if(j == 0 || j == 1 || j == 2 || j==3 || j==4 || j==5){
                board[i][j] = 'RB'
            }else if(j == 9 ||  j==10 || j ==11 || j==12 || j==13 ||j==14){
                board[i][j] = 'BB'
            }
            else{
                board[i][j] = 'X';
            }
        }
        if( i == 1){
            if(j == 0 || j == 5){
                board[i][j] = 'RB'
            }else if(j == 6){
                board[i][j] = '';
            }else if(j == 7){
                board[i][j] = 'BL';
            }else if(j == 8){
                board[i][j] = 'BS';
            }else if(j == 9|| j == 14){
                board[i][j] = 'BB'
            }else{
                board[i][j] = 'X';
            }
        }
        
        if( i == 2 || i == 3){
            if( j== 0 || j == 5){
                board[i][j] = 'RB'
            }else if(j == 2 || j == 3){
                board[i][j] = 'RP'
            }else if(j == 6){
                if(i == 2){
                    board[i][j] = 'S';    
                }else if(i == 3){
                    board[i][j] = '';
                }
            }else if(j == 7){
                board[i][j] = 'BL';
            }else if(j == 8){
                board[i][j] = '';
            }else if(j == 11 || j == 12){
                board[i][j] = 'BP'
            }else if(j == 9|| j == 14){
                board[i][j] = 'BB'
            }else{
                board[i][j] = 'X'
            }
      }
      if(i == 4 || i == 5){
          if( j== 0 || j == 5){
             board[i][j] = 'RB'
            }else if(j == 6 || j == 8){
                board[i][j] = '';
            }else if(j == 7){
                board[i][j] = 'BL';
            }else if(j == 9|| j == 14){
                board[i][j] = 'BB'
            }else if(i == 5){
                if(j == 1 || j == 2 || j ==3 || j ==4){
                    board[i][j] = 'RB'
                }else if( j == 10 || j == 11|| j ==12 || j ==13){
                    board[i][j] = 'BB'
                }
            }else{
                board[i][j] = 'X';
            }
      }
      
      if( i == 6){
          if( j == 1){
              board[i][j] = 'RS';
          }else if( j == 6 || j == 8){
              board[i][j] = 'B';
          }else if(j == 7){
              board[i][j] = 'BH';
          }else if(j == 12){
              board[i][j] = 'S'
          }else{
              board[i][j] = '';
          }
      }
      
      if(i == 7){
          if(j == 1 ||  j == 2 || j ==3 || j == 4 || j ==5 ){
              board[i][j] = 'RL';
          }else if(j == 6){
              board[i][j] = 'RH';
          }else if(j == 7){
              board[i][j] = 'B';
          }else if(j == 8){
              board[i][j] = 'YH';
          }else if( j == 9 || j == 10 || j == 11 || j == 12 || j ==13){
              board[i][j] = 'YL';
          }else {
              board[i][j] = '';
          }
      }
      
      if( i == 8){
          if( j == 2){
              board[i][j] = 'S';
          }else if(j == 6 || j == 8){
              board[i][j] = 'B';
          }else if(j == 7){
              board[i][j] = 'GH';
          }else if(j == 13){
              board[i][j] = 'YS'
          }else{
              board[i][j] = ''
          }
      }
      
      if( i == 9 || i == 14){
          if( j >=0 && j <=5){
              board[i][j] = 'GB';
          }else if(j == 6 || j == 8){
                board[i][j] = '';
            }else if(i == 9 && j == 7){
                board[i][j] = 'GL';
            }else  if( j >=9 && j <=14){
              board[i][j] = 'YB'
          }else{
                board[i][j] = 'X';
            }
      }
      
      if(i == 10 || i == 11){
          if(j == 0 || j == 5){
              board[i][j] = 'GB';
          }else if(i == 11 && (j == 2 || j == 3)){
                board[i][j] = 'GP'
            }else if(j == 6 || j == 8){
                board[i][j] = '';
            }else if(j == 7){
                board[i][j] = 'GL';
            }else if(i == 11 && (j == 11 || j == 12)){
                board[i][j] = 'YP'
            }else if(j == 9 || j == 14){
                board[i][j] = 'YB'
            }else{
                board[i][j] = 'X'
            }
      }
      
      if( i == 12){
          if(j == 0 || j == 5){
              board[i][j] = 'GB';
          }else if(j == 2 || j == 3){
                board[i][j] = 'GP'
            }else if(j == 6){
                board[i][j] = '';
            }else if(j == 7){
                board[i][j] = 'GL';
            }else if(j == 8){
                board[i][j] = 'S';
            }else if(j == 11 || j == 12){
                board[i][j] = 'YP'
            }else if(j == 9 || j == 14){
                board[i][j] = 'YB'
            }else{
                board[i][j] = 'X'
            }
      }
      
      if(i == 13){
          if(j == 0 || j == 5){
              board[i][j] = 'GB';
          }else if(j == 6){
                board[i][j] = 'GS';
            }else if(j == 7){
                board[i][j] = 'GL';
            }else if(j == 8){
                board[i][j] = '';
            }else if(j == 9 || j == 14){
                board[i][j] = 'YB'
            }else{
                board[i][j] = 'X';
            }
      }
      
    }
  }
  return board;
  }

  export function getInitialState(): IState {
    return {board: getInitialBoard(), delta: setIntialPlayerConfiguration()};
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
  function getWinner(boardDelta: BoardDelta): string {
      let players : Player[] = boardDelta.players;
      for(let i =0;i<4;i++){
          let player = players[i];
          if(player.pawnsOnBoard == 0){
              return player.color;
          }
      }
      return '';
  }
  
  function getColor(player:number):string{
      if(player == 0){
          return 'RP';
      }else if(player == 1){
          return 'BP';
      }else if(player == 2){
          return 'YP'
      }else if(player == 3){
          return 'GP'
      }
  }
  function checkPreviousCLick(row:number, col : number, turnIndexBeforeMove: number,board:Board): boolean{
      //1: Check if the cell clicked is a pawn 
      //2: Check if the player and the pawn color is the same
      let valueInBoard = board[row][col];
      return valueInBoard == getColor(turnIndexBeforeMove);      
  }
  
  //TODO : handle the scenario when the player lands on a star
  function getNextPlayer(turnIndexBeforeMove:number):number {
      if(turnIndexBeforeMove == 0){
          return 1;
      }else if(turnIndexBeforeMove == 1){
          return 2;
      }else if(turnIndexBeforeMove == 2){
          return 3;
      }else if(turnIndexBeforeMove == 3){
          return 0;
      }
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
    let boardDelta : BoardDelta = stateBeforeMove.delta;
    if (getWinner(boardDelta) !== '' || isTie(board)) {
      throw new Error("Can only make a move if the game is not over!");
    }
    let turnIndexAfterMove: number;
    let pawnClicked : Cell;
    let boardAfterMove = angular.copy(board);
    if(!previousClick){//Saving the information of the first click
         let delta: BoardDelta = {players : []};//TODO : create/add players array
        let stateAfterMove: IState = {delta: delta, board: boardAfterMove};
        let validClick = checkPreviousCLick(row, col, turnIndexBeforeMove,board);
        if(!validClick){
           return {endMatchScores: null, turnIndexAfterMove: turnIndexBeforeMove, stateAfterMove: stateAfterMove,errorCode:1, canMove:true};  
        }else{
            pawnClicked = {row:row, col:col};
           return {endMatchScores: null, turnIndexAfterMove: turnIndexBeforeMove, stateAfterMove: stateAfterMove,errorCode:-1,canMove:true};  
        }
    }else{
        previousClick = null;
        if (board[row][col] !== '') {
            throw new Error("One can only make a move in an empty position!");
        }
        boardAfterMove[row][col] = '';//Set the original row column to empty. Will need to add additional checks here
        //TODO: Update after the final row column has been calculated.
        //boardAfterMove[row][col]
        //TODO : create board delta after move and pass it to the getWinner method
        let winner = getWinner(boardDelta);//to be changed. 
        let endMatchScores: number[];
        
        if (winner !== '' || isTie(boardAfterMove)) {
        // Game over.
        turnIndexAfterMove = -1;
        endMatchScores = winner === 'X' ? [1, 0] : winner === 'O' ? [0, 1] : [0, 0];
        } else {
        // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
        turnIndexAfterMove = getNextPlayer(turnIndexBeforeMove);
        endMatchScores = null;
        }
        let delta: BoardDelta = {players : []};//TODO : create/add players array
        let stateAfterMove: IState = {delta: delta, board: boardAfterMove};
        return {endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: stateAfterMove, errorCode:-1,canMove:false};
    }
    
  }

  export function checkMoveOk(stateTransition: IStateTransition): void {
    // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
    // to verify that the move is OK.
    let turnIndexBeforeMove = stateTransition.turnIndexBeforeMove;
    let stateBeforeMove: IState = stateTransition.stateBeforeMove;
    let move: IMove = stateTransition.move;
    let deltaValue: BoardDelta = stateTransition.move.stateAfterMove.delta;
    //TODO: Check the values here
    let row = 0;//deltaValue.row;
    let col = 1;//deltaValue.col;
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
