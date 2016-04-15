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
        var diceValue = gameLogic.getDiceValue();
        var die1 = document.getElementById("die1");
        var status = document.getElementById("status");
        var button = document.getElementById("rollDice");
        die1.innerHTML = diceValue + '';
        status.innerHTML = "You rolled " + diceValue + ".";
        //button.disabled=true;
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