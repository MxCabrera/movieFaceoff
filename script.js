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

    //listen for submit on user answer and store's answer in a variable
    $('.submitAnswer').on('submit', function (event) {
        event.preventDefault()
        let userResponse = $('#userAnswer').val()
        console.log(userResponse);
    })

    // Random Number Function for use below
    const randomNumber = Math.floor(Math.random() * 20); 

    
    // AJAX Call
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
            const movieImg = result.results[randomNumber].poster_path;
            const movieRating = result.results[randomNumber].vote_average;
            const movieURL = `https://image.tmdb.org/t/p/original/${movieImg}`;

            console.log(movieURL);
            console.log(movieRating);

            // NOTE: movie year is formatted as release date like 2020-01-03 will need to think about how to pull just the year. For now - I've pulled the rating, as a backup maybe we can do a game where people choose which movie they think has a higher rating. We should just need to do the above in a second movie variable. Do a which rating number is higher and then a true or false for user click.


            // Display to the DOM
            const displayMovieImage = `
            <img src="${movieURL}" alt="will figure out">
        `
                $('div').append(displayMovieImage);
        })
    }


    movieApp.getData()
});