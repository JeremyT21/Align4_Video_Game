# Align 4!!
> Course: CSCI 2020U: Software Systems Development and Integration

## 1. Project Information
This project was created by Jeremy Thummel, Owen Tustin-Fuchs, Seth Cumby, Trevor Lee.
<br>
<br>
Our project "Align 4!!" is a web-based game heavily inspired by Hasbro's classic strategy game "Connect 4". The project is built with Maven, and uses Jakarta EE for Servlet and WebSocket functionality (enabling communication between the server and clients). We utilize a Java-based server for handling the back-end of interactions between 2 different players. We also use a combination of JavaScript, HTML, and CSS to provide a quality front-end/UI experience including animated buttons, animated gameplay, music, and in-house created game elements (Align 4!! logo, board, game pieces, etc.). The game consists of a 5x5 grid where you take turns placing chips at the bottom of a chosen column with another player, and try to be the first one to get 4-in-a-row. A video demo displaying the functionality of our code can be found here:

https://github.com/OntarioTech-CS-program/w24-csci2020u-final-project-lee-cumby-thummel-tustinfuchs/assets/114171041/a083c5c7-03d8-4c9e-bcef-3822bc37693a

## 2. How To Run
 Step-By-Step Guide

    1. Download the full project from the GitHub repository.
    
    2. Open the project in IntelliJ, and add the local GlassFish configuration (the GlassFish plugin must be installed).
    
    3. Provide the version 21 JDK for deployment, and the url “http://localhost:8080/FinalAssignment-1.0-SNAPSHOT/”.
    
    4. Make sure the exploded artifact is deployed with every project build.
    
    5. Run the GlassFish local server.
    
    6. Create a lobby with the "CREATE GAME" button and share the code with your friend or join a game by hitting the "JOIN GAME" button and entering an existing lobby code.
    
    7. Once in a lobby with a friend, a game will begin, the lobby creator will get to play the first chip, get 4 chips in a row in any direction to win!

    8. After the game is completed, a "leave" button will appear where the player can go back to step six to play a new game.



## 3. Resources

Artistic resources such as title art, game-related art, and audio were contributed by Jeremy Thummel.


## 4. Comments
    1. Game audio is initialized as muted however you cannot hear it if you don't have autoplay autoplay permissions set to allow.

    2. If a player heads to our about page during a game they will be removed from the game and have to join again through the input section. This may cause problems with the games logic.

    3. There is no inplace logic for rematching.

    4. Actual game section uses absolute positions and when the browser is not full screen it will have overflow and look worse. Best viewed on 1920x1080.
