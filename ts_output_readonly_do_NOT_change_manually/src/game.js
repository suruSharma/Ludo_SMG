;
var game;
(function (game) {
    // I export all variables to make it easy to debug in the browser by
    // simply typing in the console:
    // game.state
    game.animationEnded = false;
    game.canMakeMove = false;
    game.isComputerTurn = false;
    game.move = null;
    game.state = null;
    game.isHelpModalShown = false;
    var RedPath = [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]];
    var BluePath = [[1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]];
    var YellowPath = [[8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]];
    var GreenPath = [[13, 6], [12, 6], [11, 6], [10, 6], [9, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7],];
    var dieValue = 0;
    function init() {
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
        var w = window;
        if (w["HTMLInspector"]) {
            setInterval(function () {
                w["HTMLInspector"].inspect({
                    excludeRules: ["unused-classes", "script-placement"],
                });
            }, 3000);
        }
    }
    game.init = init;
    function getTranslations() {
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
            CLOSE: {
                en: "Close",
                iw: "סגור",
            },
        };
    }
    function animationEndedCallback() {
        $rootScope.$apply(function () {
            log.info("Animation ended");
            game.animationEnded = true;
            sendComputerMove();
        });
    }
    function sendComputerMove() {
        if (!game.isComputerTurn) {
            return;
        }
        game.isComputerTurn = false; // to make sure the computer can only move once.
        moveService.makeMove(aiService.findComputerMove(game.move));
    }
    function updateUI(params) {
        log.info("Game got updateUI:", params);
        game.animationEnded = false;
        game.move = params.move;
        game.state = game.move.stateAfterMove;
        if (!game.state) {
            game.state = gameLogic.getInitialState();
        }
        game.canMakeMove = game.move.turnIndexAfterMove >= 0 &&
            params.yourPlayerIndex === game.move.turnIndexAfterMove; // it's my turn
        // Is it the computer's turn?
        game.isComputerTurn = game.canMakeMove &&
            params.playersInfo[params.yourPlayerIndex].playerId === '';
        if (game.isComputerTurn) {
            // To make sure the player won't click something and send a move instead of the computer sending a move.
            game.canMakeMove = false;
            // We calculate the AI move only after the animation finishes,
            // because if we call aiService now
            // then the animation will be paused until the javascript finishes.
            if (!game.state.delta) {
                // This is the first move in the match, so
                // there is not going to be an animation, so
                // call sendComputerMove() now (can happen in ?onlyAIs mode)
                sendComputerMove();
            }
        }
    }
    function rollDice() {
        var die1 = document.getElementById("die1");
        var status = document.getElementById("status");
        var button = document.getElementById("rollDice");
        var d1 = Math.floor(Math.random() * 6) + 1;
        var diceTotal = d1;
        die1.innerHTML = diceTotal + '';
        status.innerHTML = "You rolled " + diceTotal + ".";
        game.diceValue = d1;
        dieValue = diceTotal;
        button.disabled = true;
    }
    game.rollDice = rollDice;
    function cellClicked(row, col) {
        log.info("Clicked on cell:", row, col);
        if (window.location.search === '?throwException') {
            throw new Error("Throwing the error because URL has '?throwException'");
        }
        if (!game.canMakeMove) {
            return;
        }
        try {
            var nextMove = gameLogic.createMove(game.state, row, col, game.move.turnIndexAfterMove);
            game.canMakeMove = false;
            moveService.makeMove(nextMove);
        }
        catch (e) {
            log.info(["Cell is already full in position:", row, col]);
            return;
        }
    }
    game.cellClicked = cellClicked;
    function destinationCell(initRow, initCol, colorofPlayer) {
        var initArrPos = 0;
        var endCellPos = { row: 0, col: 0 };
        if (colorofPlayer == 'R') {
            for (var z = 0; z < RedPath.length; z++) {
                if ((RedPath[z][0] == initRow) && (RedPath[z][1] == initCol)) {
                    initArrPos = z;
                }
            }
            var finalArrPos = initArrPos + dieValue;
            endCellPos = { row: RedPath[finalArrPos][0], col: RedPath[finalArrPos][1] };
        }
        else if (colorofPlayer == 'B') {
            for (var z = 0; z < BluePath.length; z++) {
                if ((BluePath[z][0] == initRow) && (BluePath[z][1] == initCol)) {
                    initArrPos = z;
                }
            }
            var finalArrPos = initArrPos + dieValue;
            endCellPos = { row: BluePath[finalArrPos][0], col: BluePath[finalArrPos][1] };
        }
        else if (colorofPlayer == 'Y') {
            for (var z = 0; z < YellowPath.length; z++) {
                if ((YellowPath[z][0] == initRow) && (YellowPath[z][1] == initCol)) {
                    initArrPos = z;
                }
            }
            var finalArrPos = initArrPos + dieValue;
            endCellPos = { row: YellowPath[finalArrPos][0], col: YellowPath[finalArrPos][1] };
        }
        else if (colorofPlayer == 'G') {
            for (var z = 0; z < GreenPath.length; z++) {
                if ((GreenPath[z][0] == initRow) && (GreenPath[z][1] == initCol)) {
                    initArrPos = z;
                }
            }
            var finalArrPos = initArrPos + dieValue;
            endCellPos = { row: GreenPath[finalArrPos][0], col: GreenPath[finalArrPos][1] };
        }
        else {
            log.info("Incorrect Player color sent. send only R B G Y");
        }
        return endCellPos;
    }
    game.destinationCell = destinationCell;
    function shouldShowImage(row, col) {
        var cell = game.state.board[row][col];
        return cell !== "";
    }
    game.shouldShowImage = shouldShowImage;
    //Move Allowed
    function isPieceInaccessible(row, col) {
        return game.state.board[row][col] === 'X';
    }
    game.isPieceInaccessible = isPieceInaccessible;
    //Color of homes
    function isPieceRedHome(row, col) {
        return game.state.board[row][col] === 'RH';
    }
    game.isPieceRedHome = isPieceRedHome;
    function isPieceGreenHome(row, col) {
        return game.state.board[row][col] === 'GH';
    }
    game.isPieceGreenHome = isPieceGreenHome;
    function isPieceBlueHome(row, col) {
        return game.state.board[row][col] === 'BH';
    }
    game.isPieceBlueHome = isPieceBlueHome;
    function isPieceYellowHome(row, col) {
        return game.state.board[row][col] === 'YH';
    }
    game.isPieceYellowHome = isPieceYellowHome;
    //Color of stars
    function isPieceRedStar(row, col) {
        return game.state.board[row][col] === 'RS';
    }
    game.isPieceRedStar = isPieceRedStar;
    function isPieceGreenStar(row, col) {
        return game.state.board[row][col] === 'GS';
    }
    game.isPieceGreenStar = isPieceGreenStar;
    function isPieceBlueStar(row, col) {
        return game.state.board[row][col] === 'BS';
    }
    game.isPieceBlueStar = isPieceBlueStar;
    function isPieceYellowStar(row, col) {
        return game.state.board[row][col] === 'YS';
    }
    game.isPieceYellowStar = isPieceYellowStar;
    //Color of lane
    function isPieceRedLane(row, col) {
        return game.state.board[row][col] === 'RL';
    }
    game.isPieceRedLane = isPieceRedLane;
    function isPieceGreenLane(row, col) {
        return game.state.board[row][col] === 'GL';
    }
    game.isPieceGreenLane = isPieceGreenLane;
    function isPieceBlueLane(row, col) {
        return game.state.board[row][col] === 'BL';
    }
    game.isPieceBlueLane = isPieceBlueLane;
    function isPieceYellowLane(row, col) {
        return game.state.board[row][col] === 'YL';
    }
    game.isPieceYellowLane = isPieceYellowLane;
    //Plain star
    function isPiecePlainStar(row, col) {
        return game.state.board[row][col] === 'S';
    }
    game.isPiecePlainStar = isPiecePlainStar;
    function isPieceRedPlayer(row, col) {
        return game.state.board[row][col] === 'RP';
    }
    game.isPieceRedPlayer = isPieceRedPlayer;
    function isPieceGreenPlayer(row, col) {
        return game.state.board[row][col] === 'GP';
    }
    game.isPieceGreenPlayer = isPieceGreenPlayer;
    function isPieceBluePlayer(row, col) {
        return game.state.board[row][col] === 'BP';
    }
    game.isPieceBluePlayer = isPieceBluePlayer;
    function isPieceYellowPlayer(row, col) {
        return game.state.board[row][col] === 'YP';
    }
    game.isPieceYellowPlayer = isPieceYellowPlayer;
    //color of border
    function isPieceRedBorder(row, col) {
        return game.state.board[row][col] === 'RB';
    }
    game.isPieceRedBorder = isPieceRedBorder;
    function isPieceBlueBorder(row, col) {
        return game.state.board[row][col] === 'BB';
    }
    game.isPieceBlueBorder = isPieceBlueBorder;
    function isPieceGreenBorder(row, col) {
        return game.state.board[row][col] === 'GB';
    }
    game.isPieceGreenBorder = isPieceGreenBorder;
    function isPieceYellowBorder(row, col) {
        return game.state.board[row][col] === 'YB';
    }
    game.isPieceYellowBorder = isPieceYellowBorder;
    function isPieceBlack(row, col) {
        return game.state.board[row][col] === 'B';
    }
    game.isPieceBlack = isPieceBlack;
    //Set color of cells
    function isPieceRedCell(row, col) {
        return game.state.board[row][col] === 'RC';
    }
    game.isPieceRedCell = isPieceRedCell;
    function isPieceBlueCell(row, col) {
        return game.state.board[row][col] === 'BC';
    }
    game.isPieceBlueCell = isPieceBlueCell;
    function isPieceYellowCell(row, col) {
        return game.state.board[row][col] === 'YC';
    }
    game.isPieceYellowCell = isPieceYellowCell;
    function isPieceGreenCell(row, col) {
        return game.state.board[row][col] === 'GC';
    }
    game.isPieceGreenCell = isPieceGreenCell;
    function isPieceRedPawn(row, col) {
        return game.state.board[row][col] === 'R';
    }
    game.isPieceRedPawn = isPieceRedPawn;
    function isPieceBluePawn(row, col) {
        return game.state.board[row][col] === 'B';
    }
    game.isPieceBluePawn = isPieceBluePawn;
    function isPieceYellowPawn(row, col) {
        return game.state.board[row][col] === 'Y';
    }
    game.isPieceYellowPawn = isPieceYellowPawn;
    function isPieceGreenPawn(row, col) {
        return game.state.board[row][col] === 'G';
    }
    game.isPieceGreenPawn = isPieceGreenPawn;
    function shouldSlowlyAppear(row, col) {
        return !game.animationEnded;
        //TODO : check this  
        //&&
        //state.delta &&
        //state.delta.row === row && state.delta.col === col;
    }
    game.shouldSlowlyAppear = shouldSlowlyAppear;
    function clickedOnModal(evt) {
        if (evt.target === evt.currentTarget) {
            evt.preventDefault();
            evt.stopPropagation();
            game.isHelpModalShown = false;
        }
        return true;
    }
    game.clickedOnModal = clickedOnModal;
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    game.init();
});
//# sourceMappingURL=game.js.map