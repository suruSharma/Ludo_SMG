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
    let diceValue: number = gameLogic.getDiceValue();
     var die1 = document.getElementById("die1");
    var status = document.getElementById("status");
    var button = <HTMLInputElement>document.getElementById("rollDice");
    die1.innerHTML = diceValue+'';
    status.innerHTML = "You rolled "+diceValue+".";
    //button.disabled=true;
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
      canMakeMove = false;
      moveService.makeMove(nextMove);
    } catch (e) {
      log.info(["Cell is already full in position:", row, col]);
      return;
    }
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
  
  //Set color of cells
  export function isPieceRedCell(row:number, col:number):boolean{
      return state.board[row][col] === 'RC'
  }
  export function isPieceBlueCell(row:number, col:number):boolean{
      return state.board[row][col] === 'BC'
  }
  export function isPieceYellowCell(row:number, col:number):boolean{
      return state.board[row][col] === 'YC'
  }
  export function isPieceGreenCell(row:number, col:number):boolean{
      return state.board[row][col] === 'GC'
  }
  
  export function isPieceRedPawn(row:number, col:number):boolean{
      return state.board[row][col] === 'R'
  }
  export function isPieceBluePawn(row:number, col:number):boolean{
      return state.board[row][col] === 'B'
  }
  export function isPieceYellowPawn(row:number, col:number):boolean{
      return state.board[row][col] === 'Y'
  }
  export function isPieceGreenPawn(row:number, col:number):boolean{
      return state.board[row][col] === 'G'
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
