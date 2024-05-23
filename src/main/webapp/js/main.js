let board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
//makes an empty 5x5 board to put 'r's and 'y's in
// format: rows x cols, 0 top and left side of board

// placement coordinates for chips
let chipRows = ["117px", "241px", "362px", "485px", "607px"];
let chipCols = ["648px", "770px", "892px", "1014px", "1136px"];

let redWin = false;
let yellowWin = false;
//keeps track of if red or yellow or no one have won

let piecesOnBoard = 0;

// necessary for piece colour an transition handling
let playerMadeLobby = false;

// whether it's the current player's turn or not. Red (the player who created the lobby) goes first
let isPlayerTurn = false;

let ws;

/**
 * creates a new lobby and transitions to the wait screen
 */
function newLobby(){
    playerMadeLobby = true;
    isPlayerTurn = true;
    homeToWait();

    // calling GameServlet to retrieve a new room ID
    let callURL= "http://localhost:8080/FinalAssignment-1.0-SNAPSHOT/game-servlet";
    fetch(callURL, {
        method: 'GET',
        headers: {
            'Accept': 'text/plain',
        },
    })
        .then(response => response.text())
        .then(response => {

            //close previous websockets
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close();
            }

            ws = new WebSocket("ws://localhost:8080/FinalAssignment-1.0-SNAPSHOT/ws/" + response);

            ws.onopen = function (event) {
                console.log("WebSocket connection established.");
            };

            ws.onerror = function(event) {
                console.error("WebSocket error:", event);
            };

            ws.onclose = function(event) {
                console.log("WebSocket connection closed.", event);
                //playerMadeLobby = false;
            };

            enterLobby(response)
        }); // enter the room with the code
}

/**
 * Enters the user into the chat room. Also handles receiving message input from users and displaying messages
 *
 * @param code is the alphanumeric room code
 */
function enterLobby(code) {
    console.log(code);

    document.getElementById("gameCodeText").innerText = "Lobby: " + code;

    /* Now handled elsewhere

    // create the web socket
    ws = new WebSocket("ws://localhost:8080/FinalAssignment-1.0-SNAPSHOT/ws/" + code);
    document.getElementById("gameCodeText").innerText = "Lobby: " + code;
    */

    //checks to make sure ws opens
    ws.onopen = function (event) {
        console.log("WebSocket connection established.");
    };

    // parse messages received from the server and update the UI accordingly
    ws.onmessage = function (event) {
        console.log(event.data);

        // parsing the server's message as json, should parse column and color
        let message = JSON.parse(event.data);
        console.log(message);

        let type = message.type;

        console.log(type);

        if ("move" === type) {
            //this should get the column and color of the piece added by a player
            console.log("Parsed column:", message.column);
            console.log("Parsed color:", message.color);

            //parse color and column
            let colorEntered = message.color;
            let columnEntered = message.column;

            for (let i = 4; i >= 0; i--) {
                if (board[i][columnEntered - 1] === '') {
                    board[i][columnEntered - 1] = colorEntered.toLowerCase().charAt(0);

                    // visualizations for chip placement
                    // develop chipID
                    let chipID = colorEntered;
                    // chip ID number
                    chipID += (piecesOnBoard / 2 | 0) + 1
                    // put on the board
                    if (isPlayerTurn) {
                        yourMoveChip(chipID, chipRows[i], chipCols[columnEntered-1]);
                    }
                    else {
                        otherMoveChip(chipID, chipRows[i], chipCols[columnEntered-1]);
                    }

                    //there is now 1 more piece in the board
                    piecesOnBoard++;
                    console.log("placed");

                    // clears arrow and makes column unplayable if full
                    if (0 === i) {
                        hideArrow(columnEntered);
                    }

                    break;
                }
            }
            boardToConsole();

            //end game check
            checkVerticalWin();
            checkHorizontalWin();
            checkDiagonalWin();

            //if red wins
            if (redWin) {
                console.log("Red wins!");
                if (playerMadeLobby) {
                    showWin();
                }
                else {
                    showLoss();
                }
            }

            //if yellow wins
            else if (yellowWin) {
                console.log("Yellow wins!");
                if (playerMadeLobby) {
                    showLoss();
                }
                else {
                    showWin();
                }
            }

            //if no one wins
            else if (piecesOnBoard >= 25) {
                console.log("Game ends in a tie!");
                showDraw();
            }

            // changes player's turn
            isPlayerTurn = !isPlayerTurn;
        }
        else if ("join" === type) {
            console.log(message.status);
            waitToGame();
        }
    }

    ws.onerror = function(event) {
        console.error("WebSocket error:", event);
    };

    ws.onclose = function(event) {
        console.log("WebSocket connection closed.", event);
        //playerMadeLobby = false;
    };
}

/**
 * Checks if a player has won vertically
 */
function checkVerticalWin() {
    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length-3; row++) {
            let current = board[row][col];
            if (current !== '' &&
                board[row+1][col] === current &&
                board[row+2][col] === current &&
                board[row+3][col] === current) {

                if (current.toLowerCase() === 'r') {
                    console.log("red vertical");
                    redWin = true;
                    return;
                }
                else if (current.toLowerCase() === 'y') {
                    console.log("yellow vertical")
                    yellowWin = true;
                    return;
                }
            }
        }
    }
}

/**
 * Checks if a player has won horizontally
 */
function checkHorizontalWin() {
    for (let row = 0; row < 5; row++) {
        let piecesInRow = 0;
        let lastColor = '';

        for (let col = 0; col < 5; col++) {
            if (board[row][col] === lastColor && board[row][col] !== '') {
                piecesInRow++;
            }

            else {
                lastColor = board[row][col];
                piecesInRow = 1;//starts a new streak
            }

            if (piecesInRow >= 4 && lastColor !== '') {
                //check who won
                if (piecesInRow >= 4 && lastColor !== '') {
                    if (lastColor.toLowerCase() === 'r') {
                        console.log("red horizontal")
                        redWin = true;
                    }

                    else if (lastColor.toLowerCase() === 'y') {
                        console.log("yellow horizontal")
                        yellowWin = true;
                    }

                    return true;
                }
            }
        }
    }

    return false;
}

/**
 * Checks if a player has won diagonally
 */
function checkDiagonalWin() {
    //check main diagonals
    for (let row = 0; row <= 1; row++) {
        for (let col = 0; col <= 1; col++) {
            if (board[row][col] !== '' && board[row][col] === board[row + 1][col + 1] && board[row + 1][col + 1] === board[row + 2][col + 2] && board[row + 2][col + 2] === board[row + 3][col + 3]) {
                if (board[row][col].toLowerCase() === 'r') {
                    console.log("red diagonal")
                    redWin = true;
                }

                else if (board[row][col].toLowerCase() === 'y') {
                    console.log("yellow diagonal")
                    yellowWin = true;
                }

                return true;
            }
        }
    }

    //check smaller diagonals
    for (let row = 0; row <= 1; row++) {
        for (let col = 4; col >= 3; col--) {
            if (board[row][col] !== '' && board[row][col] === board[row + 1][col - 1] && board[row + 1][col - 1] === board[row + 2][col - 2] && board[row + 2][col - 2] === board[row + 3][col - 3]) {
                if (board[row][col].toLowerCase() === 'r') {
                    console.log("red diagonal")
                    redWin = true;
                }

                else if (board[row][col].toLowerCase() === 'y') {
                    console.log("yellow diagonal")
                    yellowWin = true;
                }

                return true;
            }
        }
    }

    return false; //no one won
}

/**
 * outputs the board to the console
 */
function boardToConsole() {
    let output =  "";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if(board[row][col] === ''){
                output += "_";
            }
            else {
                output += board[row][col];
            }
        }
        output += "\n";
    }
    console.log(output);
}

/**
 * flips the piece when clicked
 */
function flipPiece() {
    const flippablePiece = document.getElementById("pieceWidget");

    flipSoundPlay();

    if(flippablePiece.classList.contains("stateRed")) {
        flippablePiece.classList.remove("stateRed");
        flippablePiece.classList.add("stateMiddle");

        //remove the class after 150ms so it looks animated
        setTimeout(function() {
            flippablePiece.classList.remove("stateMiddle");
            flippablePiece.classList.add("stateYellow");
        }, 150);
    }

    else if(flippablePiece.classList.contains("stateYellow")) {
        flippablePiece.classList.remove("stateYellow");
        flippablePiece.classList.add("stateMiddle");

        //remove the class after 150ms so it looks animated
        setTimeout(function() {
            flippablePiece.classList.remove("stateMiddle");
            flippablePiece.classList.add("stateRed");
        }, 150);
    }
}

/**
 * function to play flipping piece sound
 */
function flipSoundPlay() {
    let soundEffect = new Audio('../webapp/music/clickPiece.mp3');
    soundEffect.play();
}

/**
 * Empty the game board
 */
function clearBoard() {
    board = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
}

/**
 * Resets game related variables
 */
function resetGame() {
    clearBoard();

    redWin = false;
    yellowWin = false;

    piecesOnBoard = 0;

    playerMadeLobby = false;

    isPlayerTurn = false;
}