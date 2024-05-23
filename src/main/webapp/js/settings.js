/**
 * Determines whether the background music is currently muted or not and sets it to be opposite.
 * Also changes the html visuals respectively
 */
function muteMusic() {
    console.log("Mute called")
    //gets the proper sections of the html
    let music = document.getElementById('backgroundMusic');
    let image = document.getElementById('muteButton');
    let text = document.getElementById("muteText");
    //checks if music is muted and sets appropriate style
    if(music.muted){
        console.log("unmuting")
        music.muted = false;
        image.src = "img/unmuted.png";
        text.textContent = 'Mute';
    }
    else {
        console.log("muting")
        music.muted = true;
        image.src = "img/muted.png";
        text.textContent = 'Unmute';
    }
}