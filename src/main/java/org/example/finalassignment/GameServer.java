package org.example.finalassignment;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONObject;

import java.io.IOException;
import java.util.*;


/**
 * This class represents a web socket server, a new connection is created and it receives a lobbyCode as a parameter
 */
@ServerEndpoint(value="/ws/{lobbyCode}")
public class GameServer {
    // contains a static List of ChatRoom used to control the existing rooms and their users
    private static Map<Session, String> lobbyList = new HashMap<>();

    /**
     * Handles the opening of a new Align 4 lobby by the user.
     *
     * @param lobbyCode the alphanumeric code identifying the room
     * @param session current session
     * @throws IOException
     * @throws EncodeException
     */
    @OnOpen
    public void open(@PathParam("lobbyCode") String lobbyCode, Session session) throws IOException, EncodeException {
        lobbyList.put(session, lobbyCode);
    }

    /**
     * Handles the closing of the Align 4 lobby for the user.
     *
     * @param session current session, to be closed
     * @throws IOException
     * @throws EncodeException
     */
    @OnClose
    public void close(Session session) throws IOException, EncodeException {
        String lobbyID = lobbyList.remove(session);
    }

    /**
     * Handles server-script interactions. Assumes all imported Jsons will have a type element specifying what kind of
     * request it is and handles it accordingly.
     *
     * "join" type requests handle when a player is joining a lobby so that the player who created the lobby can
     * transition out of the wait screen. Also limits the lobby size to 2 and sends a failure message.
     *
     * "move" type requests announce to the server and players in the room where a piece is being played.
     *
     * @param lobbyCode the alphanumeric code identifying the room
     * @param comm the data being received from the client containing type, message content, and time as a json
     * @param session current session being interacted in
     * @throws IOException
     * @throws EncodeException
     */
    @OnMessage
    public void handleMessage(@PathParam("lobbyCode") String lobbyCode, String comm, Session session) throws IOException, EncodeException {
        //gets from javascript
        String lobbyID = lobbyList.get(session);
        JSONObject jsonmsg = new JSONObject(comm);
        String type = jsonmsg.getString("type");

        // handles piece placement
        if (type.equals("move")) {
            int column = jsonmsg.getInt("column");
            String color = jsonmsg.getString("color");

            //makes the JSON that will be sent back to all players
            JSONObject addedPiece = new JSONObject();
            addedPiece.put("type", "move");
            addedPiece.put("column", column);
            addedPiece.put("color", color);
            System.out.println(addedPiece);

            //sends to all players
            for (Session player : lobbyList.keySet()) {
                player.getBasicRemote().sendText(addedPiece.toString());
            }
        }
        // handles join requests
        else if (type.equals("join")) {
            System.out.println("Joining");

            // will cap lobby to two players
            if (lobbyList.size() <= 2) {
                for (Session peer : lobbyList.keySet()) {
                    if (lobbyList.get(peer).equals(lobbyID)) {
                        System.out.println("Notifying");
                        peer.getBasicRemote().sendText("{\"type\":\"join\",\"status\":\"joined\"}");
                    }
                }
            }
            else if (lobbyList.size() > 2) {
                System.out.println("Failed to join. Full.");
                session.getBasicRemote().sendText("{\"type\":\"join\",\"status\":\"failed\",\"reason\":\"full\"}");
            }
            else {
                // very much a "just in case" condition
                System.out.println("Failed to join.");
                session.getBasicRemote().sendText("{\"type\":\"join\",\"status\":\"failed\",\"reason\":\"unknown\"}");
            }
        }
    }
}
