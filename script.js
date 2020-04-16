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
    $('.submitAnswer').on('submit', function (event) {
        event.preventDefault()
        movieApp.userResponse = $('#userAnswer').val()
        movieApp.callVariable(movieApp.userResponse)
    })

}

movieApp.callVariable = function (variable) {
    console.log(variable);
    // User response YYYY ==== movieYear.release_date splice off month/day and just get the YYYY

    // GAME TWO STRETCH IDEA - which movie is better?
        // two movies will display in the dom with pulled in rating. Can easily be done now that we've done it once below.
        // user selects which movie they think is better
        // We just need a if rating number is < or > statement and true false for user click
        // how to avoid generating the same movie twice
}

// get random number to be used to get random movie
const randomNumber = Math.floor(Math.random() * 20);
console.log(randomNumber);

// AJAX CALL
movieApp.getData = () => {
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/popular',
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: movieApp.key,
            format: 'json',
        }
    }).then((result) => {
        // Movie image
        const movieImg = result.results[randomNumber].poster_path;
        const movieURL = `https://image.tmdb.org/t/p/original/${movieImg}`;

        // Movie Rating
        const movieRating = result.results[randomNumber].vote_average;

        // Movie Year
        const movieYear = result.results[randomNumber].release_date;

        // Console logs for testing
        console.log(movieYear);
        console.log(movieURL);
        console.log(movieRating);


        // Display to the DOM
        const displayMovieImage = `<img src="${movieURL}" alt="will figure out">`

        $('div').append(displayMovieImage);
    })

}

movieApp.getData()

// Document Ready
$(document).ready(function () {
    movieApp.init()
});