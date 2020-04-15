let movieApp = {}

movieApp.key = '3628ebe0c40080ef9275f966a8eaaa92'

// Document Ready
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
            $('html').animate({
                scrollTop: $('main.gameArea').offset().top
            }, 'slow');
            return false;
        });
    });

    $('#submitAnswer').on('submit', function (event) {
        event.preventDefault()
        let userResponse = $('#userAnswer').val()
        console.log(userResponse);
    })


    movieApp.getData = () => {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie",
            // https://api.themoviedb.org/3/movie/ - secondary URL that allows us to search for a movies 'id'. The Godfathers is 238.
            method: 'GET',
            dataType: 'json',
            data: {
                api_key: movieApp.key,
                query: "The Godfather"
                // Trying to pass in userResponse here but scope issue
            }
        }).then((result) => {
            const movieYear = result
            // Current search returns a bunch of results with multiple movies and multiple properties for each movie like release_year - unsuccessfully been trying to access it by result.release_year and release[0] to target first item with index 0
            console.log(movieYear);
        })
    }

    movieApp.getData()

});