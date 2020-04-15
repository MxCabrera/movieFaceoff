let movieApp = {}

movieApp.userResponse;

movieApp.key = '3628ebe0c40080ef9275f966a8eaaa92'

movieApp.url = 'https://api.themoviedb.org/3/movie'

// Declaring globally the poster value of our object
movieApp.poster;

movieApp.init = function () {
    // listen for click on the how to play button to display alert 
    $('button.howTo').on('click', function (e) {
        e.preventDefault();
        alert(`
        Enter the correct answer based on the movie poster and the question below. 
        If you guess it right, you move to the next level. 
        If you guess wrong, you can always skip or guess again!`)
    });

    // listen for click on Let's Play button to scroll down the game area
    $("button.letsPlay").on('click', function () {
        $('html').animate({
            scrollTop: $('main.gameArea').offset().top
        }, 'slow');
        return false;
    });

    // Create this in the global scope let user response =
    $('#submitAnswer').on('submit', function (event) {
        event.preventDefault()
        movieApp.userResponse = $('#userAnswer').val()
        movieApp.callVariable(movieApp.userResponse)
    })

    movieApp.getMovieById('238')
}

movieApp.callVariable = function (variable) {
    console.log(variable);
    // User response YYYY ==== movieYear.release_date splice off month/day and just get the YYYY
}

movieApp.getMovieById = (movieId) => {
    $.ajax({
        url: `${movieApp.url}/${movieId}`,

        method: 'GET',
        dataType: 'json',
        data: {
            api_key: movieApp.key,

        }
    }).then((result) => {
        const movieYear = result.release_date
        console.log(result);
        console.log(movieYear);
        let moviePoster = result.poster_path
        // Logging our results.poster_path to see we are getting the end of the poster url
        console.log(moviePoster);
    })
}

// Document Ready
$(document).ready(function () {
    movieApp.init()
});