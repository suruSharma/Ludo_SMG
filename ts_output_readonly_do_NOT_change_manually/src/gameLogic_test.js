describe("In TicTacToe", function () {
    var OK = true;
    var ILLEGAL = false;
    var X_TURN = 0;
    var O_TURN = 1;
    var NO_ONE_TURN = -1;
    var NO_ONE_WINS = null;
    var X_WIN_SCORES = [1, 0];
    var O_WIN_SCORES = [0, 1];
    var TIE_SCORES = [0, 0];
    function expectMove(isOk, turnIndexBeforeMove, boardBeforeMove, row, col, boardAfterMove, turnIndexAfterMove, endMatchScores) {
        var stateTransition = {
            turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: boardBeforeMove ? { board: boardBeforeMove, delta: null } : null,
            move: {
                turnIndexAfterMove: turnIndexAfterMove,
                endMatchScores: endMatchScores,
                stateAfterMove: { board: boardAfterMove, delta: { players: [], dirtyCell: null } } //TOOD : Change this
            },
            numberOfPlayers: null
        };
        if (isOk) {
            gameLogic.checkMoveOk(stateTransition);
        }
        else {
            // We expect an exception to be thrown :)
            var didThrowException = false;
            try {
                gameLogic.checkMoveOk(stateTransition);
            }
            catch (e) {
                didThrowException = true;
            }
            if (!didThrowException) {
                throw new Error("We expect an illegal move, but checkMoveOk didn't throw any exception!");
            }
        }
    }
    it("placing X in 0x0 from initial state is legal", function () {
        expectMove(OK, X_TURN, null, 0, 0, [['X', '', ''],
            ['', '', ''],
            ['', '', '']], O_TURN, NO_ONE_WINS);
    });
    it("placing X in 0x0 from initial state but setting the turn to yourself is illegal", function () {
        expectMove(ILLEGAL, X_TURN, null, 0, 0, [['X', '', ''],
            ['', '', ''],
            ['', '', '']], X_TURN, NO_ONE_WINS);
    });
    it("placing X in 0x0 from initial state and winning is illegal", function () {
        expectMove(ILLEGAL, X_TURN, null, 0, 0, [['X', '', ''],
            ['', '', ''],
            ['', '', '']], NO_ONE_TURN, X_WIN_SCORES);
    });
    it("placing X in 0x0 from initial state and setting the wrong board is illegal", function () {
        expectMove(ILLEGAL, X_TURN, null, 0, 0, [['X', 'X', ''],
            ['', '', ''],
            ['', '', '']], O_TURN, NO_ONE_WINS);
    });
    it("placing O in 0x1 after X placed X in 0x0 is legal", function () {
        expectMove(OK, O_TURN, [['X', '', ''],
            ['', '', ''],
            ['', '', '']], 0, 1, [['X', 'O', ''],
            ['', '', ''],
            ['', '', '']], X_TURN, NO_ONE_WINS);
    });
    it("placing an O in a non-empty position is illegal", function () {
        expectMove(ILLEGAL, O_TURN, [['X', '', ''],
            ['', '', ''],
            ['', '', '']], 0, 0, [['O', '', ''],
            ['', '', ''],
            ['', '', '']], X_TURN, NO_ONE_WINS);
    });
    it("cannot move after the game is over", function () {
        expectMove(ILLEGAL, O_TURN, [['X', 'O', ''],
            ['X', 'O', ''],
            ['X', '', '']], 2, 1, [['X', 'O', ''],
            ['X', 'O', ''],
            ['X', 'O', '']], X_TURN, NO_ONE_WINS);
    });
    it("placing O in 2x1 is legal", function () {
        expectMove(OK, O_TURN, [['O', 'X', ''],
            ['X', 'O', ''],
            ['X', '', '']], 2, 1, [['O', 'X', ''],
            ['X', 'O', ''],
            ['X', 'O', '']], X_TURN, NO_ONE_WINS);
    });
    it("X wins by placing X in 2x0 is legal", function () {
        expectMove(OK, X_TURN, [['X', 'O', ''],
            ['X', 'O', ''],
            ['', '', '']], 2, 0, [['X', 'O', ''],
            ['X', 'O', ''],
            ['X', '', '']], NO_ONE_TURN, X_WIN_SCORES);
    });
    it("O wins by placing O in 1x1 is legal", function () {
        expectMove(OK, O_TURN, [['X', 'X', 'O'],
            ['X', '', ''],
            ['O', '', '']], 1, 1, [['X', 'X', 'O'],
            ['X', 'O', ''],
            ['O', '', '']], NO_ONE_TURN, O_WIN_SCORES);
    });
    it("the game ties when there are no more empty cells", function () {
        expectMove(OK, X_TURN, [['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', '']], 2, 2, [['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', 'X']], NO_ONE_TURN, TIE_SCORES);
    });
    it("move without board is illegal", function () {
        expectMove(ILLEGAL, X_TURN, [['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', '']], 2, 2, null, NO_ONE_TURN, TIE_SCORES);
    });
    it("placing X outside the board (in 0x3) is illegal", function () {
        expectMove(ILLEGAL, X_TURN, [['', '', ''],
            ['', '', ''],
            ['', '', '']], 0, 3, [['', '', '', 'X'],
            ['', '', ''],
            ['', '', '']], O_TURN, NO_ONE_WINS);
    });
});
//# sourceMappingURL=gameLogic_test.js.map