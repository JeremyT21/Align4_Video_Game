/**
 * Determines which column a piece is being placed in
 *
 * @param id the id tag of the button pressed
 */
function sendColumn(id) {
    let button = document.getElementById(id);
    // current button will be id of the row piece should fall in

    if(id === "arrow1") {
        //send to java to put a piece in column 1
        arrowPress(1);
    }
    if(id === "arrow2") {
        //send to java to put a piece in column 2
        arrowPress(2);
    }
    if(id === "arrow3") {
        //send to java to put a piece in column 3
        arrowPress(3);
    }
    if(id === "arrow4") {
        //send to java to put a piece in column 4
        arrowPress(4);
    }
    if(id === "arrow5") {
        //send to java to put a piece in column 5
        arrowPress(5);
    }
}

/**
 * Handles the confirmation of an arrow being pressed and sends notice to the server with how to update the board.
 * Will not make a placement if it is not the player's turn
 *
 * @param columnNum the column of the button pressed and that the piece will be placed in
 */
function arrowPress(columnNum) {
    // check player's turn status
    if (!isPlayerTurn) {
        console.log("Not your turn");
        return;
    }

    let request;

    if(playerMadeLobby) {
        request = {"type":"move", "column": columnNum, "color": "red"};//returns code to java
    }

    else {
        request = {"type":"move", "column": columnNum, "color": "yellow"};//returns code to java
    }

    console.log(JSON.stringify(request));
    ws.send(JSON.stringify(request))

    console.log("arrow pressed");
}

/**
 * Hides the corresponding arrow. Is called once said column is filled
 *
 * @param col the column which is having its arrow hidden
 */
function hideArrow(col) {
    let arrowId = 'arrow' + col
    let button = document.getElementById(arrowId)
    button.style.display = "none";
}

/////////////////////////////////////////////////////////////////////////
// UNUSED ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function hideArrow1() {
    let button = document.getElementById('arrow1')
    button.style.display = "none";
}

function hideArrow2() {
    let button = document.getElementById('arrow2')
    button.style.display = "none";
}

function hideArrow3() {
    let button = document.getElementById('arrow3')
    button.style.display = "none";
}

function hideArrow4() {
    let button = document.getElementById('arrow4')
    button.style.display = "none";
}

function hideArrow5() {
    let button = document.getElementById('arrow5')
    button.style.display = "none";
}