//board consists of 15 rows and columns; each player has 4 pawns to move
var gameLogic;
(function (gameLogic) {
    gameLogic.ROWS = 15;
    gameLogic.COLS = 15;
    var playerCount = {
        'R': 4,
        'B': 4,
        'G': 4,
        'Y': 4
    };
    /** Returns the initial TicTacToe board, which is a ROWSxCOLS matrix containing ''. */
    function getInitialBoard() {
        var board = [];
        for (var i = 0; i < gameLogic.ROWS; i++) {
            board[i] = [];
            for (var j = 0; j < gameLogic.COLS; j++) {
                if (i == 0) {
                    if (j == 6 || j == 7 || j == 8) {
                        board[i][j] = '';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 1) {
                    if (j == 6) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = '4';
                    }
                    else if (j == 8) {
                        board[i][j] = 'S';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 2) {
                    if (j == 6) {
                        board[i][j] = 'S';
                    }
                    else if (j == 7) {
                        board[i][j] = '4';
                    }
                    else if (j == 8) {
                        board[i][j] = '';
                    }
                }
                if (i == 3 || i == 4 || i == 5) {
                    if (j == 6 || j == 8) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = '4';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 6) {
                    if (j == 1 || j == 12) {
                        board[i][j] = 'S';
                    }
                    else if (j == 6 || j == 8) {
                        board[i][j] = 'X';
                    }
                    else if (j == 7) {
                        board[i][j] = '4H';
                    }
                    else {
                        board[i][j] = '';
                    }
                }
                if (i == 7) {
                    if (j == 1 || j == 2 || j == 3 || j == 4 || j == 5) {
                        board[i][j] = '1';
                    }
                    else if (j == 6) {
                        board[i][j] = '1H';
                    }
                    else if (j == 7) {
                        board[i][j] = 'X';
                    }
                    else if (j == 8) {
                        board[i][j] = '3H';
                    }
                    else if (j == 9 || j == 10 || j == 11 || j == 12 || j == 13) {
                        board[i][j] = '3';
                    }
                    else {
                        board[i][j] = '';
                    }
                }
                if (i == 8) {
                    if (j == 2 || j == 13) {
                        board[i][j] = 'S';
                    }
                    else if (j == 6 || j == 8) {
                        board[i][j] = 'X';
                    }
                    else if (j == 7) {
                        board[i][j] = '2H';
                    }
                    else {
                        board[i][j] = '';
                    }
                }
                if (i == 9 || i == 10 || i == 11) {
                    if (j == 6 || j == 8) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = '2';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 12) {
                    if (j == 6) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = '2';
                    }
                    else if (j == 8) {
                        board[i][j] = 'S';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 13) {
                    if (j == 6) {
                        board[i][j] = 'S';
                    }
                    else if (j == 7) {
                        board[i][j] = '2';
                    }
                    else if (j == 8) {
                        board[i][j] = '';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 14) {
                    if (j == 6 || j == 7 || j == 8) {
                        board[i][j] = '';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
            }
        }
        return board;
    }
    function getInitialState() {
        return { board: getInitialBoard(), delta: null };
    }
    gameLogic.getInitialState = getInitialState;
    /**
     * Returns true if the game ended in a tie because there are no empty cells.
     * E.g., isTie returns true for the following board:
     *     [['X', 'O', 'X'],
     *      ['X', 'O', 'O'],
     *      ['O', 'X', 'X']]
     */
    function isTie(board) {
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
                if (board[i][j] === '') {
                    // If there is an empty cell then we do not have a tie.
                    return false;
                }
            }
        }
        // No empty cells, so we have a tie!
        return true;
    }
    /**
     * Return the winner (either 'X' or 'O') or '' if there is no winner.
     * The board is a matrix of size 3x3 containing either 'X', 'O', or ''.
     * E.g., getWinner returns 'X' for the following board:
     *     [['X', 'O', ''],
     *      ['X', 'O', ''],
     *      ['X', '', '']]
     */
    function getWinner(board) {
        var boardString = '';
        for (var i = 0; i < gameLogic.ROWS; i++) {
            for (var j = 0; j < gameLogic.COLS; j++) {
                var cell = board[i][j];
                boardString += cell === '' ? ' ' : cell;
            }
        }
        var win_patterns = [
            'XXX......',
            '...XXX...',
            '......XXX',
            'X..X..X..',
            '.X..X..X.',
            '..X..X..X',
            'X...X...X',
            '..X.X.X..'
        ];
        for (var _i = 0, win_patterns_1 = win_patterns; _i < win_patterns_1.length; _i++) {
            var win_pattern = win_patterns_1[_i];
            var x_regexp = new RegExp(win_pattern);
            var o_regexp = new RegExp(win_pattern.replace(/X/g, 'O'));
            if (x_regexp.test(boardString)) {
                return 'X';
            }
            if (o_regexp.test(boardString)) {
                return 'O';
            }
        }
        return '';
    }
    /**
     * Returns the move that should be performed when player
     * with index turnIndexBeforeMove makes a move in cell row X col.
     */
    function createMove(stateBeforeMove, row, col, turnIndexBeforeMove) {
        if (!stateBeforeMove) {
            stateBeforeMove = getInitialState();
        }
        var board = stateBeforeMove.board;
        if (board[row][col] !== '') {
            throw new Error("One can only make a move in an empty position!");
        }
        if (getWinner(board) !== '' || isTie(board)) {
            throw new Error("Can only make a move if the game is not over!");
        }
        var boardAfterMove = angular.copy(board);
        boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'X' : 'O';
        var winner = getWinner(boardAfterMove);
        var endMatchScores;
        var turnIndexAfterMove;
        if (winner !== '' || isTie(boardAfterMove)) {
            // Game over.
            turnIndexAfterMove = -1;
            endMatchScores = winner === 'X' ? [1, 0] : winner === 'O' ? [0, 1] : [0, 0];
        }
        else {
            // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
            turnIndexAfterMove = 1 - turnIndexBeforeMove;
            endMatchScores = null;
        }
        var delta = { row: row, col: col };
        var stateAfterMove = { delta: delta, board: boardAfterMove };
        return { endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: stateAfterMove };
    }
    gameLogic.createMove = createMove;
    function checkMoveOk(stateTransition) {
        // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need
        // to verify that the move is OK.
        var turnIndexBeforeMove = stateTransition.turnIndexBeforeMove;
        var stateBeforeMove = stateTransition.stateBeforeMove;
        var move = stateTransition.move;
        var deltaValue = stateTransition.move.stateAfterMove.delta;
        var row = deltaValue.row;
        var col = deltaValue.col;
        var expectedMove = createMove(stateBeforeMove, row, col, turnIndexBeforeMove);
        if (!angular.equals(move, expectedMove)) {
            throw new Error("Expected move=" + angular.toJson(expectedMove, true) +
                ", but got stateTransition=" + angular.toJson(stateTransition, true));
        }
    }
    gameLogic.checkMoveOk = checkMoveOk;
    function forSimpleTestHtml() {
        var move = gameLogic.createMove(null, 0, 0, 0);
        log.log("move=", move);
        var params = {
            turnIndexBeforeMove: 0,
            stateBeforeMove: null,
            move: move,
            numberOfPlayers: 4 };
        gameLogic.checkMoveOk(params);
    }
    gameLogic.forSimpleTestHtml = forSimpleTestHtml;
})(gameLogic || (gameLogic = {}));
//# sourceMappingURL=gameLogic.js.map