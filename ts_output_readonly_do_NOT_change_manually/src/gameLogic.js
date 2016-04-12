//board consists of 15 rows and columns; each player has 4 pawns to move
var gameLogic;
(function (gameLogic) {
    gameLogic.ROWS = 15;
    gameLogic.COLS = 15;
    gameLogic.NUMPLAYERS = 4;
    var previousClick;
    function getIntialPositions(player) {
        var cells = [];
        if (player === 'R') {
            cells.push({ row: 2, col: 2 });
            cells.push({ row: 2, col: 3 });
            cells.push({ row: 3, col: 2 });
            cells.push({ row: 3, col: 3 });
        }
        else if (player === 'B') {
            cells.push({ row: 2, col: 11 });
            cells.push({ row: 2, col: 12 });
            cells.push({ row: 3, col: 11 });
            cells.push({ row: 3, col: 12 });
        }
        else if (player === 'Y') {
            cells.push({ row: 11, col: 2 });
            cells.push({ row: 11, col: 3 });
            cells.push({ row: 12, col: 2 });
            cells.push({ row: 12, col: 3 });
        }
        else if (player === 'G') {
            cells.push({ row: 11, col: 11 });
            cells.push({ row: 11, col: 12 });
            cells.push({ row: 12, col: 11 });
            cells.push({ row: 12, col: 12 });
        }
        return cells;
    }
    function setIntialPlayerConfiguration() {
        var initPlayerState = [];
        var redPlayer = { pawnsOnBoard: 4, color: 'R', position: getIntialPositions('R') };
        var bluePlayer = { pawnsOnBoard: 4, color: 'B', position: getIntialPositions('B') };
        var yellowPlayer = { pawnsOnBoard: 4, color: 'Y', position: getIntialPositions('Y') };
        var greenPlayer = { pawnsOnBoard: 4, color: 'G', position: getIntialPositions('G') };
        initPlayerState.push(redPlayer);
        initPlayerState.push(bluePlayer);
        initPlayerState.push(yellowPlayer);
        initPlayerState.push(greenPlayer);
        var delta = { players: initPlayerState };
        return delta;
    }
    /** Returns the initial Ludo board, which is a ROWSxCOLS matrix containing ''. */
    function getInitialBoard() {
        var board = [];
        for (var i = 0; i < gameLogic.ROWS; i++) {
            board[i] = [];
            for (var j = 0; j < gameLogic.COLS; j++) {
                if (i == 0) {
                    if (j == 6 || j == 7 || j == 8) {
                        board[i][j] = '';
                    }
                    else if (j == 0 || j == 1 || j == 2 || j == 3 || j == 4 || j == 5) {
                        board[i][j] = 'RB';
                    }
                    else if (j == 9 || j == 10 || j == 11 || j == 12 || j == 13 || j == 14) {
                        board[i][j] = 'BB';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 1) {
                    if (j == 0 || j == 5) {
                        board[i][j] = 'RB';
                    }
                    else if (j == 6) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = 'BL';
                    }
                    else if (j == 8) {
                        board[i][j] = 'BS';
                    }
                    else if (j == 9 || j == 14) {
                        board[i][j] = 'BB';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 2 || i == 3) {
                    if (j == 0 || j == 5) {
                        board[i][j] = 'RB';
                    }
                    else if (j == 2 || j == 3) {
                        board[i][j] = 'RP';
                    }
                    else if (j == 6) {
                        if (i == 2) {
                            board[i][j] = 'S';
                        }
                        else if (i == 3) {
                            board[i][j] = '';
                        }
                    }
                    else if (j == 7) {
                        board[i][j] = 'BL';
                    }
                    else if (j == 8) {
                        board[i][j] = '';
                    }
                    else if (j == 11 || j == 12) {
                        board[i][j] = 'BP';
                    }
                    else if (j == 9 || j == 14) {
                        board[i][j] = 'BB';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 4 || i == 5) {
                    if (j == 0 || j == 5) {
                        board[i][j] = 'RB';
                    }
                    else if (j == 6 || j == 8) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = 'BL';
                    }
                    else if (j == 9 || j == 14) {
                        board[i][j] = 'BB';
                    }
                    else if (i == 5) {
                        if (j == 1 || j == 2 || j == 3 || j == 4) {
                            board[i][j] = 'RB';
                        }
                        else if (j == 10 || j == 11 || j == 12 || j == 13) {
                            board[i][j] = 'BB';
                        }
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 6) {
                    if (j == 1) {
                        board[i][j] = 'RS';
                    }
                    else if (j == 6 || j == 8) {
                        board[i][j] = 'B';
                    }
                    else if (j == 7) {
                        board[i][j] = 'BH';
                    }
                    else if (j == 12) {
                        board[i][j] = 'S';
                    }
                    else {
                        board[i][j] = '';
                    }
                }
                if (i == 7) {
                    if (j == 1 || j == 2 || j == 3 || j == 4 || j == 5) {
                        board[i][j] = 'RL';
                    }
                    else if (j == 6) {
                        board[i][j] = 'RH';
                    }
                    else if (j == 7) {
                        board[i][j] = 'B';
                    }
                    else if (j == 8) {
                        board[i][j] = 'YH';
                    }
                    else if (j == 9 || j == 10 || j == 11 || j == 12 || j == 13) {
                        board[i][j] = 'YL';
                    }
                    else {
                        board[i][j] = '';
                    }
                }
                if (i == 8) {
                    if (j == 2) {
                        board[i][j] = 'S';
                    }
                    else if (j == 6 || j == 8) {
                        board[i][j] = 'B';
                    }
                    else if (j == 7) {
                        board[i][j] = 'GH';
                    }
                    else if (j == 13) {
                        board[i][j] = 'YS';
                    }
                    else {
                        board[i][j] = '';
                    }
                }
                if (i == 9 || i == 14) {
                    if (j >= 0 && j <= 5) {
                        board[i][j] = 'GB';
                    }
                    else if (j == 6 || j == 8) {
                        board[i][j] = '';
                    }
                    else if (i == 9 && j == 7) {
                        board[i][j] = 'GL';
                    }
                    else if (j >= 9 && j <= 14) {
                        board[i][j] = 'YB';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 10 || i == 11) {
                    if (j == 0 || j == 5) {
                        board[i][j] = 'GB';
                    }
                    else if (i == 11 && (j == 2 || j == 3)) {
                        board[i][j] = 'GP';
                    }
                    else if (j == 6 || j == 8) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = 'GL';
                    }
                    else if (i == 11 && (j == 11 || j == 12)) {
                        board[i][j] = 'YP';
                    }
                    else if (j == 9 || j == 14) {
                        board[i][j] = 'YB';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 12) {
                    if (j == 0 || j == 5) {
                        board[i][j] = 'GB';
                    }
                    else if (j == 2 || j == 3) {
                        board[i][j] = 'GP';
                    }
                    else if (j == 6) {
                        board[i][j] = '';
                    }
                    else if (j == 7) {
                        board[i][j] = 'GL';
                    }
                    else if (j == 8) {
                        board[i][j] = 'S';
                    }
                    else if (j == 11 || j == 12) {
                        board[i][j] = 'YP';
                    }
                    else if (j == 9 || j == 14) {
                        board[i][j] = 'YB';
                    }
                    else {
                        board[i][j] = 'X';
                    }
                }
                if (i == 13) {
                    if (j == 0 || j == 5) {
                        board[i][j] = 'GB';
                    }
                    else if (j == 6) {
                        board[i][j] = 'GS';
                    }
                    else if (j == 7) {
                        board[i][j] = 'GL';
                    }
                    else if (j == 8) {
                        board[i][j] = '';
                    }
                    else if (j == 9 || j == 14) {
                        board[i][j] = 'YB';
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
        return { board: getInitialBoard(), delta: setIntialPlayerConfiguration() };
    }
    gameLogic.getInitialState = getInitialState;
    /**
     * This method will always return false because a tie is not possible in the game of ludo
     */
    function isTie(board) {
        return false;
    }
    /**
     * Return the id of the player if the player does not have any pawns on the board. Else return an empty string
     */
    function getWinner(boardDelta) {
        var players = boardDelta.players;
        for (var i = 0; i < 4; i++) {
            var player = players[i];
            if (player.pawnsOnBoard == 0) {
                return player.color;
            }
        }
        return '';
    }
    function getColor(player) {
        if (player == 0) {
            return 'RP';
        }
        else if (player == 1) {
            return 'BP';
        }
        else if (player == 2) {
            return 'YP';
        }
        else if (player == 3) {
            return 'GP';
        }
    }
    function checkPreviousCLick(row, col, turnIndexBeforeMove, board) {
        //1: Check if the cell clicked is a pawn 
        //2: Check if the player and the pawn color is the same
        var valueInBoard = board[row][col];
        return valueInBoard == getColor(turnIndexBeforeMove);
    }
    //TODO : handle the scenario when the player lands on a star
    function getNextPlayer(turnIndexBeforeMove) {
        if (turnIndexBeforeMove == 0) {
            return 1;
        }
        else if (turnIndexBeforeMove == 1) {
            return 2;
        }
        else if (turnIndexBeforeMove == 2) {
            return 3;
        }
        else if (turnIndexBeforeMove == 3) {
            return 0;
        }
    }
    function getValueForSourceCell(board, row, col) {
        if (board[row][col] == 'RP') {
            return 'RC';
        }
        else if (board[row][col] == 'BP') {
            return 'BC';
        }
        else if (board[row][col] == 'YP') {
            return 'YC';
        }
        else if (board[row][col] == 'GP') {
            return 'GC';
        }
        else {
            return board[row][col];
        }
    }
    function getValueForDestinationCell(board, row, col, turnIndexBeforeMove) {
        if (turnIndexBeforeMove == 0) {
            return 'R';
        }
        else if (turnIndexBeforeMove == 1) {
            return 'B';
        }
        else if (turnIndexBeforeMove == 2) {
            return 'Y';
        }
        else if (turnIndexBeforeMove == 3) {
            return 'G';
        }
    }
    function getEndMatchScores(winner) {
        //TODO : prepare the array of result
        if (winner === 'R') {
            return [1, 0, 0, 0];
        }
        else if (winner === 'B') {
            return [0, 1, 0, 0];
        }
        else if (winner === 'Y') {
            return [0, 0, 1, 0];
        }
        else if (winner === 'G') {
            return [0, 0, 0, 1];
        }
    }
    function getPawnIndex(player, row, col) {
        for (var i = 0; i < 4; i++) {
            if (player.position[i].row == row && player.position[i].col === col) {
                return i;
            }
        }
        return -1;
        //This method will always find an index. If it doesn't fix it.
    }
    function getDeltaAfterMove(boardDelta, turnIndexBeforeMove, sourceRow, sourceCol, destinationRow, destinationCol) {
        //TODO : Update the player information here.
        var player = boardDelta.players[turnIndexBeforeMove];
        //get pawn index : match the source row, col
        var index = getPawnIndex(player, sourceRow, sourceCol);
        var destination = { row: destinationRow, col: destinationCol };
        if (index === -1) {
            throw new Error("The source is not found. Cannot make the move");
        }
        else {
            player.position[index] = { row: destinationRow, col: destinationCol };
        }
        boardDelta.players[turnIndexBeforeMove] = player;
        //TODO : update the pawn count here
        return boardDelta;
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
        var boardDelta = stateBeforeMove.delta;
        if (board[row][col] === '' || board[row][col] === 'X') {
            throw new Error("One can only select a pawn to move");
        }
        if (getWinner(boardDelta) !== '' || isTie(board)) {
            throw new Error("Can only make a move if the game is not over!");
        }
        var boardAfterMove = angular.copy(board);
        //Set the value of the source
        boardAfterMove[row][col] = getValueForSourceCell(board, row, col);
        var desitnation = { row: 6, col: 2 };
        //Set the value of the desitnation cell
        boardAfterMove[desitnation.row][desitnation.col] = getValueForDestinationCell(board, desitnation.row, desitnation.col, turnIndexBeforeMove);
        //TODO : update board delta here
        var winner = getWinner(boardDelta);
        var endMatchScores;
        var turnIndexAfterMove;
        if (winner !== '' || isTie(boardAfterMove)) {
            // Game over.
            turnIndexAfterMove = -1;
            endMatchScores = getEndMatchScores(winner);
        }
        else {
            //TODO: here, check for killed pawn, star destination
            turnIndexAfterMove = getNextPlayer(turnIndexBeforeMove);
            endMatchScores = null;
        }
        var delta = getDeltaAfterMove(boardDelta, turnIndexBeforeMove, row, col, desitnation.row, desitnation.col);
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
        //TODO: Check the values here
        //PROBLEM!!!
        var row = 0; //deltaValue.row;
        var col = 1; //deltaValue.col;
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