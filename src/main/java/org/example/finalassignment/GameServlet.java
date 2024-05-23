package org.example.finalassignment;

import java.io.*;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import org.apache.commons.lang3.RandomStringUtils;

@WebServlet(name = "gameServlet", value = "/game-servlet")
public class GameServlet extends HttpServlet {
    private String message;

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String requestURI = request.getRequestURI();
        System.out.println("Received GET request for URI: " + requestURI);
        if(requestURI.endsWith("/game-servlet")){
            response.setContentType("text/plain");

            // send the random code as the response's content
            PrintWriter out = response.getWriter();

            String randomCode = randomLobbyCode();
            System.out.println("Generated random Align 4 code: " + randomCode);

            out.println(randomCode);//sends the random lobby code to main.js enterLobby function
        }

        else {
            System.out.println("Failed");
        }
    }

    public void destroy() {
    }

    //randomly generates a string with length of 5
    static public String randomLobbyCode() {
        String generatedString = RandomStringUtils.randomAlphanumeric(5).toUpperCase();
        return generatedString;
    }
}