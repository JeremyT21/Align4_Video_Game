/**
 * Takes inputs and moves piece according to user input of player
 * Difference to 'other' function is the showing/hiding of buttons
 *
 * @param id The id tag of the chip to be moved
 * @param top The set number of pixels from the top of the parent container
 * @param left The set number of pixels from the left side of the parent container
 */
function yourMoveChip(id, top, left){
    //get proper chip and arrows
    let chip = document.getElementById(id);
    let buttons = document.querySelector('.arrows');
    //hide arrows as your turn is over
    buttons.style.display = 'none';
    //fade in chip
    chip.style.opacity = '1';
    //timing functions to allow animations to complete
    setTimeout(function (){
        //move chip straight up
        chip.style.top = '10px';
        setTimeout(function (){
            //set it over top of the column
            chip.style.left = left;
            setTimeout(function (){
                //'drop' into the column stopping at last open spot
                chip.style.top = top;
                setTimeout(function (){
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}


/**
 * Takes inputs and moves piece according to user input of opponent
 * Difference to 'your' function is the showing/hiding of buttons
 *
 * @param id The id tag of the chip to be moved
 * @param top The set number of pixels from the top of the parent container
 * @param left The set number of pixels from the left side of the parent container
 */
function otherMoveChip(id, top, left){
    //get proper chip and arrows
    let chip = document.getElementById(id);
    let buttons = document.querySelector('.arrows');
    //fade chip in
    chip.style.opacity = '1';
    //timing functions to allow animations to complete
    setTimeout(function (){
        //move chip straight up
        chip.style.top = '10px';
        setTimeout(function (){
            //move chip above column
            chip.style.left = left;
            setTimeout(function (){
                //'drop' chip into column stopping at last free space
                chip.style.top = top;
                setTimeout(function (){
                    //show arrows as opponents turn has ended
                    buttons.style.display = 'initial';
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}