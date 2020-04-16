let movieApp = {}

movieApp.userResponse;

movieApp.generateQuestion = [
    'What year was this movie made?',
    'Can you name the director of this movie?',
    'What was the average viewer rating for this movie?'
]

movieApp.key = '3628ebe0c40080ef9275f966a8eaaa92'

movieApp.url = 'https://api.themoviedb.org/3/movie'

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

    // User Response stored in a global variable
    $('.submitAnswer').on('submit', function (event) {
        event.preventDefault()
        movieApp.userResponse = $('#userAnswer').val()
        movieApp.callVariable(movieApp.userResponse)
    })

    // Display a random question to the DOM
    $('.question').append(`<p>${randomQuestion}</p>`)
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

// get random number to be used to get random movie and generate random question
const randomMovie = Math.floor(Math.random() * 20);
const randomQuestion = movieApp.generateQuestion[Math.floor(Math.random() * movieApp.generateQuestion.length)]
console.log(randomMovie);
console.log(randomQuestion);

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
        const movieImg = result.results[randomMovie].poster_path;
        const movieURL = `https://image.tmdb.org/t/p/original/${movieImg}`;

        // Movie Rating
        const movieRating = result.results[randomMovie].vote_average;

        // Movie Year
        const movieYear = result.results[randomMovie].release_date;

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