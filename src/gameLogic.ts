type Board = string[][];
interface BoardDelta {
  players: Player[];
  row:number;
  col:number;
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

interface ClickInformation{
    player : number;
    pawnClicked : Cell;
}
//board consists of 15 rows and columns; each player has 4 pawns to move
module gameLogic {
  export const ROWS = 15;
  export const COLS = 15;
  export const NUMPLAYERS = 4;
  var previousClick:ClickInformation;
  let diceValue : number;
  
  var RedPath  = [[6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14 ,6], [13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]];
  
  var BluePath  = [[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14 ,6], [13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]];
  
  
  var YellowPath  = [[8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14 ,6], [13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [7, 13], [7,12], [7, 11], [7, 10], [7, 9], [7, 8]];
  
  
  var GreenPath  = [[13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7], ];
  
  function getIntialPositions(player:string):Cell[]{
      let cells : Cell[] = [];
      if(player === 'R'){
          cells.push({row:2,col:2});
          cells.push({row:2, col:3});
          cells.push({row:3,col:2});
          cells.push({row:3,col:3});
      }else if(player === 'B'){
          cells.push({row:2,col:11});
          cells.push({row:2, col:12});
          cells.push({row:3,col:11});
          cells.push({row:3,col:12});
      }else if(player === 'G'){
          cells.push({row:11,col:2});
          cells.push({row:11, col:3});
          cells.push({row:12,col:2});
          cells.push({row:12,col:3});
      }else if(player === 'Y'){
          cells.push({row:11,col:11});
          cells.push({row:11, col:12});
          cells.push({row:12,col:11});
          cells.push({row:12,col:12});
      }
      
      return cells;
  }
  function setIntialPlayerConfiguration(): BoardDelta{
      let initPlayerState : Player[] = [];
      let redPlayer : Player = {pawnsOnBoard:4, color: 'R', position : getIntialPositions('R')};
      let bluePlayer : Player = {pawnsOnBoard:4, color: 'B', position : getIntialPositions('B')};
      let yellowPlayer : Player = {pawnsOnBoard:4, color: 'Y', position : getIntialPositions('Y')};
      let greenPlayer : Player = {pawnsOnBoard:4, color: 'G', position : getIntialPositions('G')};
      initPlayerState.push(redPlayer);
      initPlayerState.push(bluePlayer);
      initPlayerState.push(yellowPlayer);
      initPlayerState.push(greenPlayer);
      let delta: BoardDelta = {players : initPlayerState, row:null,col:null};
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
                board[i][j] = 'BC';
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
                    board[i][j] = '';    
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
              board[i][j] = 'RC';
          }else if( j == 6 || j == 8){
              board[i][j] = 'BLACK';
          }else if(j == 7){
              board[i][j] = 'BH';
          }else if(j == 12){
              board[i][j] = ''
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
              board[i][j] = 'BLACK';
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
              board[i][j] = '';
          }else if(j == 6 || j == 8){
              board[i][j] = 'BLACK';
          }else if(j == 7){
              board[i][j] = 'GH';
          }else if(j == 13){
              board[i][j] = 'YC'
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
                if( i == 9){
                    board[i][j] = 'X';    
                }
                
                if( i == 14){
                    board[i][j] = '';
                }
                
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
                board[i][j] = '';
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
                board[i][j] = 'GC';
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
  
  function getStringValueOfPlayer(player : number):string{
      if(player == 0){
          return 'R';
      }else if(player == 1){
          return 'B';
      }else if(player == 2){
          return 'Y';
      }else if(player == 3){
          return 'G';
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
  
  function getValueForSourceCell(board: string[][], row:number, col: number):string{
      if(board[row][col] == 'RP'){
         return 'RC';
      }else if(board[row][col] == 'BP'){
          return 'BC';
      }else if(board[row][col] == 'YP'){
          return 'YC';
      }else if(board[row][col] == 'GP'){
          return 'GC';
      }else if(board[row][col] == 'R' ||board[row][col] == 'B'||board[row][col] == 'Y'||board[row][col] == 'G' ){
          return '';
      }
      else{
          return board[row][col];
      }
  }
  
  function getValueForDestinationCell(board: string[][], row:number, col: number, turnIndexBeforeMove: number):string{
      if(turnIndexBeforeMove == 0){
          if(board[row][col] == 'RC' || board[row][col] == 'RL'){
              return 'RP';
          }
          return 'R';  
      }else if(turnIndexBeforeMove == 1){
          if(board[row][col] == 'BC' || board[row][col] == 'BL'){
              return 'BP';
          }
          return 'B'; 
      }else if(turnIndexBeforeMove == 2){
          if(board[row][col] == 'YC' || board[row][col] == 'YL'){
              return 'YP';
          }
          return 'Y'; 
      }else if(turnIndexBeforeMove == 3){
          if(board[row][col] == 'GC' || board[row][col] == 'GL'){
              return 'GP';
          }
          return 'G'; 
      }
  }
  
  function getEndMatchScores(winner: string):number[]{
      //TODO : prepare the array of result
      if(winner === 'R'){
          return [1,0,0,0];
      }else if(winner === 'B'){
          return [0,1,0,0];
      }else if(winner === 'Y'){
          return [0,0,1,0];
      }else if(winner === 'G'){
          return [0,0,0,1];
      }
  }
  
  function getDestinationCell(initRow: number, initCol : number, colorofPlayer: string, initMove:boolean) {
      
      let initArrPos = 0
      let endCellPos :Cell = {row: 0, col : 0}
      if(colorofPlayer == 'R'){
      if(initMove){
          return {row: RedPath[0][0], col : RedPath[0][1]}
      }
      for(var z=0;z<RedPath.length;z++)
      {
          if((RedPath[z][0] == initRow) && (RedPath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + diceValue;
      endCellPos = {row: RedPath[finalArrPos][0], col : RedPath[finalArrPos][1]}
      }
     else if(colorofPlayer == 'B'){
         if(initMove){
          return {row: BluePath[0][0], col : BluePath[0][1]}
      }
      for(var z=0;z<BluePath.length;z++)
      {
          if((BluePath[z][0] == initRow) && (BluePath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + diceValue;
      endCellPos = {row: BluePath[finalArrPos][0], col : BluePath[finalArrPos][1]}
      }
            
      else if(colorofPlayer == 'Y'){
          if(initMove){
          return {row: YellowPath[0][0], col : YellowPath[0][1]}
      }
      for(var z=0;z<YellowPath.length;z++)
      {
          if((YellowPath[z][0] == initRow) && (YellowPath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + diceValue;
      endCellPos = {row: YellowPath[finalArrPos][0], col : YellowPath[finalArrPos][1]}
      }
      else if(colorofPlayer == 'G'){
          if(initMove){
          return {row: GreenPath[0][0], col : GreenPath[0][1]}
      }
      for(var z=0;z<GreenPath.length;z++)
      {
          if((GreenPath[z][0] == initRow) && (GreenPath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + diceValue;
      endCellPos = {row: GreenPath[finalArrPos][0], col : GreenPath[finalArrPos][1]}
      }
      else{
           log.info("Incorrect Player color sent. send only R B G Y");
      }
      return endCellPos;
 
  }
  
  
  function getPawnIndex(player:Player, row : number, col: number):number{
      for(let i = 0;i<4;i++){
          if(player.position[i].row == row && player.position[i].col === col){
             return i;
          }
      }
      return -1;
      //This method will always find an index. If it doesn't fix it.
  }
function getDeltaAfterMove(boardDelta : BoardDelta , turnIndexBeforeMove : number,sourceRow : number, sourceCol : number, destinationRow : number, destinationCol : number): BoardDelta{
    //TODO : Update the player information here.
    let player :Player =  boardDelta.players[turnIndexBeforeMove];
    //get pawn index : match the source row, col
    let index : number = getPawnIndex(player, sourceRow, sourceCol);
    let destination : Cell = {row:destinationRow, col:destinationCol};
    if(index === -1){
        throw new Error("The source is not found. Cannot make the move");
    }else{
        player.position[index] = {row:destinationRow, col:destinationCol};
    }
    boardDelta.players[turnIndexBeforeMove] = player;
    let sourceCell : Cell = {row:sourceRow, col:sourceCol};
    boardDelta.row = sourceRow;
    boardDelta.col = sourceCol;
    //TODO : update the pawn count here
    return boardDelta;
}


function isPawnInCell(boardDelta : BoardDelta, row:number, col:number, playerId: number){
        let player : Player = boardDelta.players[playerId];
        if(playerId === 0){
            return (row === 2 && col === 2) || (row === 2 && col === 3) || (row === 3 && col === 2) || (row === 3 && col === 3); 
        }else if(playerId === 1){
            return (row === 2 && col === 11) || (row === 2 && col === 12) || (row === 3 && col === 11) || (row === 3 && col === 12);
        }else if(playerId === 2){
            return (row === 11 && col === 11) || (row === 11 && col === 12) || (row === 12 && col === 11) || (row === 12 && col === 12);
        }else if(playerId === 3){
            return (row === 11 && col === 2) || (row === 11 && col === 3) || (row === 12 && col === 2) || (row === 12 && col === 3);
        }
        return false;
}


  export function getDiceValue():number {
    diceValue = Math.floor(Math.random() * 6) + 1;
    return diceValue;
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
    //if (board[row][col] !== '') {
    //  throw new Error("One can only select a pawn to move");
    //}
    if (getWinner(boardDelta) !== '' || isTie(board)) {
      throw new Error("Can only make a move if the game is not over!");
    }
    
    let pawnInCell : boolean = isPawnInCell(boardDelta, row, col, turnIndexBeforeMove);
    if(pawnInCell && !(diceValue === 6 || diceValue === 4)){
       let boardAfterMove = angular.copy(board);
       //In this case the board does not get updated. Only the turnIndexAfterMove does. Everything else remains the same
        //TODO : update board delta here
        let winner = getWinner(boardDelta);
        let endMatchScores: number[];
        let turnIndexAfterMove: number;
        if (winner !== '') {
        // Game over.
        turnIndexAfterMove = -1;
        endMatchScores = getEndMatchScores(winner);
        } else {
        //TODO: here, check for killed pawn, star destination
        turnIndexAfterMove =  getNextPlayer(turnIndexBeforeMove);
        endMatchScores = null;
        }
        let boardDeltaCopy = angular.copy(boardDelta);
        boardDeltaCopy.row = row;
        boardDeltaCopy.col = col;
        let stateAfterMove: IState = {delta: boardDeltaCopy, board: board};
        return {endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: stateAfterMove};
    }
    
    if(pawnInCell && (diceValue === 6 || diceValue === 4)){
        let boardAfterMove = angular.copy(board);
        //Set the value of the source
        boardAfterMove[row][col] = getValueForSourceCell(board, row, col);
        let desitnation : Cell = getDestinationCell(row,col,getStringValueOfPlayer(turnIndexBeforeMove), true);
        //Set the value of the desitnation cell
        boardAfterMove[desitnation.row][desitnation.col] = getValueForDestinationCell(board, desitnation.row, desitnation.col, turnIndexBeforeMove);
        //TODO : update board delta here
        let winner = getWinner(boardDelta);
        let boardDeltaCopy = angular.copy(boardDelta);
        let endMatchScores: number[];
        let turnIndexAfterMove: number;
        if (winner !== '') {
        // Game over.
        turnIndexAfterMove = -1;
        endMatchScores = getEndMatchScores(winner);
        } else {
        //TODO: here, check for killed pawn, star destination
        turnIndexAfterMove = turnIndexBeforeMove;
        endMatchScores = null;
        }
        let delta: BoardDelta = getDeltaAfterMove(boardDeltaCopy, turnIndexBeforeMove, row,col, desitnation.row, desitnation.col);
        let stateAfterMove: IState = {delta: delta, board: boardAfterMove};
        return {endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: stateAfterMove};
    }else{
        let boardAfterMove = angular.copy(board);
        //Set the value of the source
        boardAfterMove[row][col] = getValueForSourceCell(board, row, col);
        let desitnation : Cell = getDestinationCell(row,col,getStringValueOfPlayer(turnIndexBeforeMove),false);
        //Set the value of the desitnation cell
        boardAfterMove[desitnation.row][desitnation.col] = getValueForDestinationCell(board, desitnation.row, desitnation.col, turnIndexBeforeMove);
        //TODO : update board delta here
        let winner = getWinner(boardDelta);
        let boardDeltaCopy = angular.copy(boardDelta);
        let endMatchScores: number[];
        let turnIndexAfterMove: number;
        if (winner !== '') {
        // Game over.
        turnIndexAfterMove = -1;
        endMatchScores = getEndMatchScores(winner);
        } else {
        //TODO: here, check for killed pawn, star destination
        turnIndexAfterMove = getNextPlayer(turnIndexBeforeMove);
        endMatchScores = null;
        }
        let delta: BoardDelta = getDeltaAfterMove(boardDeltaCopy, turnIndexBeforeMove, row,col, desitnation.row, desitnation.col);
        let stateAfterMove: IState = {delta: delta, board: boardAfterMove};
        return {endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: stateAfterMove};
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
    
    //PROBLEM!!!
    //let dirtyCell : Cell = deltaValue.dirtyCell;
    let row = deltaValue.row;
    let col = deltaValue.col
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
