interface SupportedLanguages { en: string, iw: string};
interface Translations {
  [index: string]: SupportedLanguages;
}

module game {
  // I export all variables to make it easy to debug in the browser by
  // simply typing in the console:
  // game.state
  export let animationEnded = false;
  export let canMakeMove = false;
  export let isComputerTurn = false;
  export let move: IMove = null;
  export let state: IState = null;
  export let isHelpModalShown: boolean = false;
  export let diceValue : number;
  
  var RedPath  = [[6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14 ,6], [13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]];
  
  var BluePath  = [[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14 ,6], [13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]];
  
  
  var YellowPath  = [[8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14 ,6], [13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [7, 13], [7,12], [7, 11], [7, 10], [7, 9], [7, 8]];
  
  
  var GreenPath  = [[13 ,6], [12 ,6], [11 ,6], [10 ,6], [9 ,6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6,1], [6,2], [6,3], [6,4], [6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7], ];
  
  var dieValue : number = 0; 
  
 
  export function init() {
    translate.setTranslations(getTranslations());
    translate.setLanguage('en');
    log.log("Translation of 'RULES_OF_LUDO' is " + translate('RULES_OF_LUDO'));
    resizeGameAreaService.setWidthToHeight(1);
    moveService.setGame({
      minNumberOfPlayers: 4,
      maxNumberOfPlayers: 4,
      checkMoveOk: gameLogic.checkMoveOk,
      updateUI: updateUI
    });

    // See http://www.sitepoint.com/css3-animation-javascript-event-handlers/
    document.addEventListener("animationend", animationEndedCallback, false); // standard
    document.addEventListener("webkitAnimationEnd", animationEndedCallback, false); // WebKit
    document.addEventListener("oanimationend", animationEndedCallback, false); // Opera

    let w: any = window;
    if (w["HTMLInspector"]) {
      setInterval(function () {
        w["HTMLInspector"].inspect({
          excludeRules: ["unused-classes", "script-placement"],
        });
      }, 3000);
    }
  }

  function getTranslations(): Translations {
    return {
      RULES_OF_LUDO: {
        en: "Rules of Ludo",
        iw: "חוקי המשחק",
      },
      RULES_SLIDE1: {
        en: "TODO : Update these rules",
        iw: "",
      },
      RULES_SLIDE2: {
        en: "TODO : Update these rules",
        iw: "",
      },
      CLOSE:  {
        en: "Close",
        iw: "סגור",
      },
    };
  }

  function animationEndedCallback() {
    $rootScope.$apply(function () {
      log.info("Animation ended");
      animationEnded = true;
      sendComputerMove();
    });
  }
  

  function sendComputerMove() {
    if (!isComputerTurn) {
      return;
    }
    isComputerTurn = false; // to make sure the computer can only move once.
    moveService.makeMove(aiService.findComputerMove(move));
  }

  function updateUI(params: IUpdateUI): void {
    log.info("Game got updateUI:", params);
    animationEnded = false;
    move = params.move;
    state = move.stateAfterMove;
    if (!state) {
      state = gameLogic.getInitialState();
    }
    canMakeMove = move.turnIndexAfterMove >= 0 && // game is ongoing
      params.yourPlayerIndex === move.turnIndexAfterMove; // it's my turn

    // Is it the computer's turn?
    isComputerTurn = canMakeMove &&
        params.playersInfo[params.yourPlayerIndex].playerId === '';
    if (isComputerTurn) {
      // To make sure the player won't click something and send a move instead of the computer sending a move.
      canMakeMove = false;
      // We calculate the AI move only after the animation finishes,
      // because if we call aiService now
      // then the animation will be paused until the javascript finishes.
      if (!state.delta) {
        // This is the first move in the match, so
        // there is not going to be an animation, so
        // call sendComputerMove() now (can happen in ?onlyAIs mode)
        sendComputerMove();
      }
    }
  }

  export function rollDice() {
    var die1 = document.getElementById("die1");
    var status = document.getElementById("status");
    var button = <HTMLInputElement>document.getElementById("rollDice");
    var d1 = Math.floor(Math.random() * 6) + 1;
    var diceTotal = d1;
    die1.innerHTML = diceTotal+'';
    status.innerHTML = "You rolled "+diceTotal+".";
    diceValue = d1;
    //button.disabled=true;
    dieValue = diceTotal;    
    }
    
  export function cellClicked(row: number, col: number): void {
    log.info("Clicked on cell:", row, col);
    if (window.location.search === '?throwException') { // to test encoding a stack trace with sourcemap
      throw new Error("Throwing the error because URL has '?throwException'");
    }
    if (!canMakeMove) {
      return;
    }
    try {
      let nextMove = gameLogic.createMove(
          state, row, col, move.turnIndexAfterMove);
      canMakeMove = nextMove.canMove;
      moveService.makeMove(nextMove);
    } catch (e) {
      log.info(["Cell is already full in position:", row, col]);
      return;
    }
  }
  
  export function destinationCell(initRow: number, initCol : number, colorofPlayer: string) {
      
      var initArrPos = 0
      let endCellPos :Cell = {row: 0, col : 0}
      if(colorofPlayer == 'R'){
      for(var z=0;z<RedPath.length;z++)
      {
          if((RedPath[z][0] == initRow) && (RedPath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + dieValue;
      endCellPos = {row: RedPath[finalArrPos][0], col : RedPath[finalArrPos][1]}
      }
     else if(colorofPlayer == 'B'){
      for(var z=0;z<BluePath.length;z++)
      {
          if((BluePath[z][0] == initRow) && (BluePath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + dieValue;
      endCellPos = {row: BluePath[finalArrPos][0], col : BluePath[finalArrPos][1]}
      }
            
      else if(colorofPlayer == 'Y'){
      for(var z=0;z<YellowPath.length;z++)
      {
          if((YellowPath[z][0] == initRow) && (YellowPath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + dieValue;
      endCellPos = {row: YellowPath[finalArrPos][0], col : YellowPath[finalArrPos][1]}
      }
      else if(colorofPlayer == 'G'){
      for(var z=0;z<GreenPath.length;z++)
      {
          if((GreenPath[z][0] == initRow) && (GreenPath[z][1] == initCol))
          {
              initArrPos = z;
          }
      }
      var finalArrPos = initArrPos + dieValue;
      endCellPos = {row: GreenPath[finalArrPos][0], col : GreenPath[finalArrPos][1]}
      }
      else{
           log.info("Incorrect Player color sent. send only R B G Y");
      }
      return endCellPos;
 
  }
 

  export function shouldShowImage(row: number, col: number): boolean {
    let cell = state.board[row][col];
    return cell !== "";
  }

  //Move Allowed
  export function isPieceInaccessible(row: number, col: number): boolean {
    return state.board[row][col] === 'X';
  }
  
  //Color of homes
  export function isPieceRedHome(row: number, col: number): boolean {
    return state.board[row][col] === 'RH';
  }

  export function isPieceGreenHome(row: number, col: number): boolean {
    return state.board[row][col] === 'GH';
  }
  
  export function isPieceBlueHome(row: number, col: number): boolean {
    return state.board[row][col] === 'BH';
  }
  
  export function isPieceYellowHome(row: number, col: number): boolean {
    return state.board[row][col] === 'YH';
  }
  
  //Color of stars
  export function isPieceRedStar(row: number, col: number): boolean {
    return state.board[row][col] === 'RS';
  }
  
  export function isPieceGreenStar(row: number, col: number): boolean {
    return state.board[row][col] === 'GS';
  }
  
  export function isPieceBlueStar(row: number, col: number): boolean {
    return state.board[row][col] === 'BS';
  }
  
  export function isPieceYellowStar(row: number, col: number): boolean {
    return state.board[row][col] === 'YS';
  }
  
  //Color of lane
  export function isPieceRedLane(row: number, col: number): boolean {
    return state.board[row][col] === 'RL';
  }
  
  export function isPieceGreenLane(row: number, col: number): boolean {
    return state.board[row][col] === 'GL';
  }
  
  export function isPieceBlueLane(row: number, col: number): boolean {
    return state.board[row][col] === 'BL';
  }
  
  export function isPieceYellowLane(row: number, col: number): boolean {
    return state.board[row][col] === 'YL';
  }
  
  //Plain star
  export function isPiecePlainStar(row: number, col: number): boolean {
    return state.board[row][col] === 'S';
  }
  
  export function isPieceRedPlayer(row: number, col: number): boolean {
    return state.board[row][col] === 'RP';
  }
  
  export function isPieceGreenPlayer(row: number, col: number): boolean {
    return state.board[row][col] === 'GP';
  }
  
  export function isPieceBluePlayer(row: number, col: number): boolean {
    return state.board[row][col] === 'BP';
  }
  
  export function isPieceYellowPlayer(row: number, col: number): boolean {
    return state.board[row][col] === 'YP';
  }
  //color of border
  export function isPieceRedBorder(row: number, col: number): boolean {
    return state.board[row][col] === 'RB';
  }
  export function isPieceBlueBorder(row: number, col: number): boolean {
    return state.board[row][col] === 'BB';
  }
  export function isPieceGreenBorder(row: number, col: number): boolean {
    return state.board[row][col] === 'GB';
  }
  export function isPieceYellowBorder(row: number, col: number): boolean {
    return state.board[row][col] === 'YB';
  }
  export function isPieceBlack(row: number, col: number): boolean {
    return state.board[row][col] === 'B';
  }
  
  
  
  

  export function shouldSlowlyAppear(row: number, col: number): boolean {
    return !animationEnded;
    //TODO : check this  
        //&&
        //state.delta &&
        //state.delta.row === row && state.delta.col === col;
  }

  export function clickedOnModal(evt: Event) {
    if (evt.target === evt.currentTarget) {
      evt.preventDefault();
      evt.stopPropagation();
      isHelpModalShown = false;
    }
    return true;
  }
}

angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
  .run(function () {
    $rootScope['game'] = game;
    game.init();
  });
