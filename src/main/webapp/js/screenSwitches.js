/**
 * Takes both the end screen and game screen and hides them then displays the home screen
 * Resets the game screen for the next game
 * Calls function to reset javascript game variables
 */
function endToHome(){
    //get correct html elements
    let view = document.querySelector(".endScreen");
    let game = document.querySelector(".game");
    //set opacity for fading animation
    view.style.opacity = "0";
    game.style.opacity = "0";
    //timing functions to allow for the previous animation to complete fully
    setTimeout(function () {
        //hiding elements
        view.style.display = "none";
        game.style.display = "none";
        view = document.querySelector(".newGame");
        //showing new element
        view.style.display = "flex";
        setTimeout(function () {
            //fading in
            view.style.opacity = "1";
        }, 100);
    }, 1000);

    //resetting the chips within game
    for(let i=1; i<14; i++){
        let chip = document.getElementById("red" + i)
        if(chip){
            //hides then makes adjustments
            chip.style.display = "none";
            chip.style.opacity = "0";
            chip.style.top = "640px";
            chip.style.left = "400px";
            chip.style.display = "initial";
        }
        chip = document.getElementById("yellow" + i)
        if(chip){
            chip.style.display = "none";
            chip.style.opacity = "0";
            chip.style.top = "640px";
            chip.style.left = "400px";
            chip.style.display = "initial";
        }
    }

    // close the game and reset variables
    console.log("Closing game")
    ws.close();
    resetGame();
}

/**
 * Takes user from home screen to the waiting screen
 */
function homeToWait(){
    //get home screen
    let view = document.querySelector(".newGame");
    //fade out
    view.style.opacity = "0";
    //timing functions to allow animation to complete
    setTimeout(function () {
        //hide home
        view.style.display = "none";
        view = document.querySelector(".waitScreen");
        //show waiting
        view.style.display = "flex";
        setTimeout(function () {
            //fade in home
            view.style.opacity = "1";
        }, 100);
    }, 1000);
}


/**
 * Takes user from home screen to code input screen
 */
function homeToInput(){
    //get home screen
    let view = document.querySelector(".newGame");
    //fade out
    view.style.opacity = "0";
    //timing function to allow animation to complete
    setTimeout(function () {
        //hide home
        view.style.display = "none";
        //get input screen
        view = document.querySelector(".inputScreen");
        //display input
        view.style.display = "flex";
        setTimeout(function () {
            //fade in
            view.style.opacity = "1";
        }, 100);
    }, 1000);
    //add listener for enter key for code submission
    document.getElementById("codeInput").addEventListener("keyup", enterCheck);
}


/**
 * Checks the event listener for the enter key and sends user to enter lobby.
 * If lobby connection is successful, enters lobby and switches screen
 */
function enterCheck(event){
    if(event.key === "Enter"){
        let enteredCode = document.getElementById("codeInput").value;
        document.getElementById("codeInput").value = "";

        //close previous websockets
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
        }

        // attempt to join
        ws = new WebSocket("ws://localhost:8080/FinalAssignment-1.0-SNAPSHOT/ws/" + enteredCode);
        console.log(enteredCode);

        ws.onopen = function (event) {
            console.log("WebSocket connection established.");

            let request = {"type":"join", "status":"joining"};
            ws.send(JSON.stringify(request));
            console.log("Joining");
        };

        ws.onmessage = function (event){
            console.log(event.data);

            // parsing the server's message as json
            let message = JSON.parse(event.data);

            let type = message.type;

            if ("join" === type) {
                if ("failed" === message.status) {
                    console.log("Failed to join. Reason: " + message.reason);
                    ws.close();
                    // displays a notification on users screen containing error
                    let notifText = document.getElementById('notifText');
                    notifText.textContent = "Failed to join: " + message.reason;
                    let notif = document.querySelector('.notification');
                    notif.style.display = 'initial';
                    setTimeout(function () {
                        notif.style.opacity = '1';
                        setTimeout(function (){
                            notif.style.opacity = '0';
                            setTimeout(function () {
                                notifText.textContent = "";
                                notif.style.display = 'none'
                            }, 1000);
                        }, 4000);
                    }, 100);
                }
                else {
                    console.log("Joined")
                    enterLobby(enteredCode); //event.value is the lobby string entered by the user
                    inputToGame();
                }
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
}


/**
 * Takes user from waiting screen to game screen
 * Is only called when second player joins the server
 * Is only used by player 1
 */
function waitToGame(){
    //get waiting screen and arrows
    let view = document.querySelector(".waitScreen");
    let arrows = document.querySelector('.arrows');
    //unhide arrows
    arrows.style.display = 'initial';
    //fade out
    view.style.opacity = "0";
    //timing function to allow animation to complete
    setTimeout(function () {
        //hide waiting
        view.style.display = "none";
        //get game
        view = document.querySelector(".game");
        //show game
        view.style.display = "flex";
        setTimeout(function () {
            //fade in game
            view.style.opacity = "1";
        }, 100);
    }, 1000);
}

/**
 * Takes user from code input to game
 * Is only used by player 2
 */
function inputToGame(){
    //get input screen
    let view = document.querySelector(".inputScreen");
    //fade out
    view.style.opacity = "0";
    //timing functions to allow animations to complete
    setTimeout(function () {
        //hide input
        view.style.display = "none";
        //get game
        view = document.querySelector(".game");
        //show game
        view.style.display = "flex";
        let buttons = document.querySelector('.arrows');
        //hide arrow buttons as player 1 always goes first
        buttons.style.display = 'none';

        setTimeout(function () {
            //fade in game
            view.style.opacity = "1";
        }, 100);
    }, 1000);
}


/**
 * Takes user to end screen with the winning clause
 */
function showWin(){
    console.log("Show win");
    //get end screen
    let view = document.getElementById("endText");
    //set text to winning text
    view.textContent = 'You Won!!!';
    view = document.querySelector(".endScreen");
    view.style.display = "flex";
    setTimeout(function () {
        //fade in
        view.style.opacity = "1";
    }, 100);

}


/**
 * Takes user to end screen with the losing clause
 */
function showLoss(){
    console.log("Show loss");
    //get end screen
    let view = document.getElementById("endText");
    //update to losing text
    view.textContent = 'You Lost';
    view = document.querySelector(".endScreen");
    view.style.display = "flex";
    setTimeout(function () {
        //fade in
        view.style.opacity = "1";
    }, 100);
}


/**
 * Takes user to end screen with the drawing clause
 */
function showDraw() {
    console.log("Show draw");
    //get end screen
    let view = document.getElementById("endText");
    //update to draw text
    view.textContent = "It's a draw!";
    view = document.querySelector(".endScreen");
    view.style.display = "flex";
    setTimeout(function () {
        //fade in
        view.style.opacity = "1";
    }, 100);
}


/**
 * Takes user back to the home screen
 */
function inputToHome() {
    //get input screen
    let view = document.querySelector(".inputScreen");
    //fade out
    view.style.opacity = "0";
    //timing functions to allow animations to complete
    setTimeout(function () {
        //hide input
        view.style.display = "none";
        //get home
        view = document.querySelector(".newGame");
        //show home
        view.style.display = "flex";
        setTimeout(function () {
            //fade in home
            view.style.opacity = "1";
        }, 100);
    }, 1000);
}