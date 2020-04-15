$(document).ready(function () {

// listen for click on the how to play button to display alert 
    $('button.howTo').on('click', function (e) {
        e.preventDefault();
        alert(`
        Enter the correct answer based on the movie poster and the question below. 
        If you guess it right, you move to the next level. 
        If you guess wrong, you can always skip or guess again!`)
    });

// listen for click on Let's Play button to scroll down the game area
    $(function () {
        $("button.letsPlay").on('click', function () {
            $('html').animate({ scrollTop: $('main.gameArea').offset().top }, 'slow');
            return false;
        });
    });

});
