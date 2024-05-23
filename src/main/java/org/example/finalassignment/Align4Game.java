package org.example.finalassignment;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////  UNUSED  ////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Class to represent an instance of a game of Connect 4
 */
public class Align4Game {
    // Game board. Will store locations of the pieces. 'E' is empty, 'R' and 'Y' correspond to players with colours red and yellow
    private String[][] board;
    private int rows;
    private int cols;

    /**
     * Constructor that creates an empty game board when called and sets its size
     *
     * @param rows number of rows
     * @param cols number of cols
     */
    public Align4Game(int rows, int cols){
        //fill the game board as empty
        this.rows = rows;
        this.cols = cols;
        this.board = new String[rows][cols];
        for(int i = 0; i < rows; i++){
            for(int j = 0; j < cols; j++){
                this.board[i][j] = "E";
            }
        }
    }

    /**
     * Makes a move by placing a piece on the game board. Checks to make sure the piece is valid, then will place the
     * piece in the selected column in the lowest available row.
     *
     * @param col the column for placement
     * @param player the player/piece being placed
     * @return true if the placement is successful, false otherwise
     */
    public boolean makeMove(int col, String player){
        // check if piece is valid
        if(!player.equals("R") && !player.equals("Y")){
            System.out.println("Invalid piece");
            return false;
        }

        // check if column is valid
        if(col >= 0 && col < cols){
            System.out.println("Invalid piece");
            return false;
        }

        // attempt to place piece
        // starts from the bottom of the column and works up, looking for first empty place
        for(int i = 0; i < rows; i++){
            if(board[i][col].equals("E")){
                board[i][col] = player;
                System.out.println("Placed piece in column " + col + ", row " + i);
                return true;
            }
        }

        // if loop is exited, placement failed because the column is full
        System.out.println("Column Full");
        return false;
    }

    /**
     * Checks to see if a player has won horizontally, vertically, and on both diagonals
     *
     * @param player player piece being checked
     * @return true if player has won. False if player hasn't won or player is invalid
     */
    public boolean isWinner(String player){
        // check if piece is valid
        if(!player.equals("R") && !player.equals("Y")){
            System.out.println("Invalid piece");
            return false;
        }

        // check for horizontal win
        for(int i = 0; i < rows; i++){
            for(int j = 0; j < cols - 3; j++){
                if(board[i][j].equals(player) &&
                        board[i][j+1].equals(player) &&
                        board[i][j+2].equals(player) &&
                        board[i][j+3].equals(player)){

                    System.out.println(player + " wins horizontally.");
                    return true;
                }
            }
        }

        // check for vertical win
        for(int j = 0; j < cols; j++){
            for(int i = 0; i < rows - 3; i++){
                if(board[i][j].equals(player) &&
                        board[i+1][j].equals(player) &&
                        board[i+2][j].equals(player) &&
                        board[i+3][j].equals(player)){

                    System.out.println(player + " wins vertically.");
                    return true;
                }
            }
        }

        // check for diagonal win (up and right)
        for(int i = 0; i < rows - 3; i++){
            for(int j = 0; j < cols - 3; j++){
                if(board[i][j].equals(player) &&
                        board[i+1][j+1].equals(player) &&
                        board[i+2][j+2].equals(player) &&
                        board[i+3][j+3].equals(player)){

                    System.out.println(player + " wins diagonally.");
                    return true;
                }
            }
        }

        // check for diagonal win (down and right)
        for(int i = 3; i < rows; i++){
            for(int j = 0; j < cols - 3; j++){
                if(board[i][j].equals(player) &&
                        board[i-1][j+1].equals(player) &&
                        board[i-2][j+2].equals(player) &&
                        board[i-3][j+3].equals(player)){

                    System.out.println(player + " wins diagonally.");
                    return true;
                }
            }
        }

        System.out.println(player + " doesn't win");
        return false;
    }

    /**
     * @return the full game board for reference
     */
    public String[][] getBoard(){ return board; }

    /**
     * Resets the game board
     */
    public void resetBoard(){
        //fill the game board as empty
        for(int i = 0; i < rows; i++){
            for(int j = 0; j < cols; j++){
                board[i][j] = "E";
            }
        }
    }
}
