describe("In TicTacToe", function() {
  let OK = true;
  let ILLEGAL = false;
  let R_TURN = 0;
  let B_TURN = 1;
  let Y_TURN = 2;
  let G_TURN = 3;
  let NO_ONE_TURN = -1;
  let NO_ONE_WINS: number[] = null;
  let R_WIN_SCORES = [4, 0, 0, 0];
  let B_WIN_SCORES = [0, 4, 0, 0];
  let Y_WIN_SCORES = [0, 0, 4, 0];
  let G_WIN_SCORES = [0, 0, 0, 4];
  let ROWS = 15;
  let COLS = 15; 
  
   let initBoard = [["RB","RB","RB","RB","RB","RB","","","","BB","BB","BB","BB","BB","BB",],
                    ["RB", "X","X","X","X","RB", "","BL","BC","BB","X","X","X","X","BB"],
                    ["RB", "X","RP","RP","X","RB", "","BL","BC","BB","X","RP","RP","X","BB"],
                    ["RB", "X","RP","RP","X","RB", "","BL","BC","BB","X","RP","RP","X","BB"],
                    ["RB", "X","X","X","X","RB", "","BL","BC","BB","X","X","X","X","BB"],
                    ["RB","RB","RB","RB","RB","RB","","BL","","BB","BB","BB","BB","BB","BB",],
                    ["","RC","","","","","B","BH","B","","","","","","",],
                    ["","RL","RL","RL","RL","RL","RH","B","YH","YL","YL","YL","YL","YL",""],
                    ["","","","","","","B","GH","B","","","","","YC","",],
                    ["GB","GB","GB","GB","GB","GB","","GL","","YB","YB","YB","YB","YB","YB",],
                    ["GB","X","X","X","X","GB","","GL","","YB","X","X","X","X","YB"],
                    ["GB","X","GP","GP","X","GB","","GL","","YB","X","YP","YP","X","YB"],
                    ["GB","X","GP","GP","X","GB","","GL","","YB","X","YP","YP","X","YB"],
                    ["GB","X","X","X","X","GB","GC","GL","","YB","X","X","X","X","YB"],
                    ["GB","GB","GB","GB","GB","GB","","","","YB","YB","YB","YB","YB","YB",],
                        ];
  let turnRintiBoard = [["RB","RB","RB","RB","RB","RB","","","","BB","BB","BB","BB","BB","BB",],
                    ["RB", "X","X","X","X","RB", "","BL","BC","BB","X","X","X","X","BB"],
                    ["RB", "X","RP","RP","X","RB", "","BL","BC","BB","X","RP","RP","X","BB"],
                    ["RB", "X","","RP","X","RB", "","BL","BC","BB","X","RP","RP","X","BB"],
                    ["RB", "X","X","X","X","RB", "","BL","BC","BB","X","X","X","X","BB"],
                    ["RB","RB","RB","RB","RB","RB","","BL","","BB","BB","BB","BB","BB","BB",],
                    ["","RP","","","","","B","BH","B","","","","","","",],
                    ["","RL","RL","RL","RL","RL","RH","B","YH","YL","YL","YL","YL","YL",""],
                    ["","","","","","","B","GH","B","","","","","YC","",],
                    ["GB","GB","GB","GB","GB","GB","","GL","","YB","YB","YB","YB","YB","YB",],
                    ["GB","X","X","X","X","GB","","GL","","YB","X","X","X","X","YB"],
                    ["GB","X","GP","GP","X","GB","","GL","","YB","X","YP","YP","X","YB"],
                    ["GB","X","GP","GP","X","GB","","GL","","YB","X","YP","YP","X","YB"],
                    ["GB","X","X","X","X","GB","GC","GL","","YB","X","X","X","X","YB"],
                    ["GB","GB","GB","GB","GB","GB","","","","YB","YB","YB","YB","YB","YB",],
                        ];
  
 //
  
  //let TIE_SCORES = [0, 0];
// create new expect move!
  function expectMove(
      isOk: boolean,
      turnIndexBeforeMove: number,
      boardBeforeMove: Board,
      row: number,
      col: number,
      boardAfterMove: Board,
      turnIndexAfterMove: number,
      endMatchScores: number[]): void {
    let stateTransition: IStateTransition = {
      turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: boardBeforeMove ? {board: boardBeforeMove, delta: null} : null,
      move: {
        turnIndexAfterMove: turnIndexAfterMove,
        endMatchScores: endMatchScores,
        stateAfterMove: {board: boardAfterMove, delta: {players : [], row: null, col : null}}
      },
      numberOfPlayers: null
    };
    if (isOk) {
      gameLogic.checkMoveOk(stateTransition);
    } else {
      // We expect an exception to be thrown :)
      let didThrowException = false;
      try {
        gameLogic.checkMoveOk(stateTransition);
      } catch (e) {
        didThrowException = true;
      }
      if (!didThrowException) {
        throw new Error("We expect an illegal move, but checkMoveOk didn't throw any exception!")
      }
    }
  }
  
  it("placing R in the initial position is legal", function(){
      
      expectMove(OK, R_TURN, null, 6, 1,
      turnRintiBoard, B_TURN, NO_ONE_WINS );
      
  }  );
//change the board variables and all

//   it("placing X in 0x0 from initial state is legal", function() {
//     expectMove(OK, X_TURN, null, 0, 0,
//       [['X', '', ''],
//        ['', '', ''],
//        ['', '', '']], O_TURN, NO_ONE_WINS);
//   });

//   it("placing X in 0x0 from initial state but setting the turn to yourself is illegal", function() {
//     expectMove(ILLEGAL, X_TURN, null, 0, 0,
//       [['X', '', ''],
//        ['', '', ''],
//        ['', '', '']], X_TURN, NO_ONE_WINS);
//   });

//   it("placing X in 0x0 from initial state and winning is illegal", function() {
//     expectMove(ILLEGAL, X_TURN, null, 0, 0,
//       [['X', '', ''],
//        ['', '', ''],
//        ['', '', '']], NO_ONE_TURN, X_WIN_SCORES);
//   });

//   it("placing X in 0x0 from initial state and setting the wrong board is illegal", function() {
//     expectMove(ILLEGAL, X_TURN, null, 0, 0,
//       [['X', 'X', ''],
//        ['', '', ''],
//        ['', '', '']], O_TURN, NO_ONE_WINS);
//   });

//   it("placing O in 0x1 after X placed X in 0x0 is legal", function() {
//     expectMove(OK, O_TURN,
//       [['X', '', ''],
//        ['', '', ''],
//        ['', '', '']], 0, 1,
//       [['X', 'O', ''],
//        ['', '', ''],
//        ['', '', '']], X_TURN, NO_ONE_WINS);
//   });

//   it("placing an O in a non-empty position is illegal", function() {
//     expectMove(ILLEGAL, O_TURN,
//       [['X', '', ''],
//        ['', '', ''],
//        ['', '', '']], 0, 0,
//       [['O', '', ''],
//        ['', '', ''],
//        ['', '', '']], X_TURN, NO_ONE_WINS);
//   });

//   it("cannot move after the game is over", function() {
//     expectMove(ILLEGAL, O_TURN,
//       [['X', 'O', ''],
//        ['X', 'O', ''],
//        ['X', '', '']], 2, 1,
//       [['X', 'O', ''],
//        ['X', 'O', ''],
//        ['X', 'O', '']], X_TURN, NO_ONE_WINS);
//   });

//   it("placing O in 2x1 is legal", function() {
//     expectMove(OK, O_TURN,
//       [['O', 'X', ''],
//        ['X', 'O', ''],
//        ['X', '', '']], 2, 1,
//       [['O', 'X', ''],
//        ['X', 'O', ''],
//        ['X', 'O', '']], X_TURN, NO_ONE_WINS);
//   });

//   it("X wins by placing X in 2x0 is legal", function() {
//     expectMove(OK, X_TURN,
//       [['X', 'O', ''],
//        ['X', 'O', ''],
//        ['', '', '']], 2, 0,
//       [['X', 'O', ''],
//        ['X', 'O', ''],
//        ['X', '', '']], NO_ONE_TURN, X_WIN_SCORES);
//   });

//   it("O wins by placing O in 1x1 is legal", function() {
//     expectMove(OK, O_TURN,
//       [['X', 'X', 'O'],
//        ['X', '', ''],
//        ['O', '', '']], 1, 1,
//       [['X', 'X', 'O'],
//        ['X', 'O', ''],
//        ['O', '', '']], NO_ONE_TURN, O_WIN_SCORES);
//   });

//   it("the game ties when there are no more empty cells", function() {
//     expectMove(OK, X_TURN,
//       [['X', 'O', 'X'],
//        ['X', 'O', 'O'],
//        ['O', 'X', '']], 2, 2,
//       [['X', 'O', 'X'],
//        ['X', 'O', 'O'],
//        ['O', 'X', 'X']], NO_ONE_TURN, TIE_SCORES);
//   });

//   it("move without board is illegal", function() {
//     expectMove(ILLEGAL, X_TURN,
//       [['X', 'O', 'X'],
//        ['X', 'O', 'O'],
//        ['O', 'X', '']], 2, 2,
//       null, NO_ONE_TURN, TIE_SCORES);
//   });

//   it("placing X outside the board (in 0x3) is illegal", function() {
//     expectMove(ILLEGAL, X_TURN,
//       [['', '', ''],
//        ['', '', ''],
//        ['', '', '']], 0, 3,
//       [['', '', '', 'X'],
//        ['', '', ''],
//        ['', '', '']], O_TURN, NO_ONE_WINS);
//   });
// });
});

