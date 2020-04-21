let movieApp = {}

movieApp.key = '3628ebe0c40080ef9275f966a8eaaa92'

movieApp.url = 'https://api.themoviedb.org/3/movie'

movieApp.userScore = 0

movieApp.init = function () {
    // listen for click on the how to play button to display alert 
    $('button.howTo').on('click', function (e) {
        e.preventDefault();
        alert(`click the movie you think is more popular!`)
    });

    // listen for click on Let's Play button to scroll down the game area
    $("button.letsPlay").on('click', function () {
        $('html').animate({
            scrollTop: $('footer').offset().top
        }, 'slow');
        return false;
    });


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
            // get random number to be used to get 2 random movies 
            // if statement to ensure 2 different movies are stored
            const randomMovie1 = Math.floor(Math.random() * 20);
            let randomMovie2 = Math.floor(Math.random() * 20);
            if (randomMovie2 === randomMovie1) {
                randomMovie2 = Math.floor(Math.random() * 20);
            }

            // Movie images
            const movieImg1 = result.results[randomMovie1].poster_path;
            const movieURL1 = `https://image.tmdb.org/t/p/original/${movieImg1}`;

            const movieImg2 = result.results[randomMovie2].poster_path;
            const movieURL2 = `https://image.tmdb.org/t/p/original/${movieImg2}`;

            // Movie ratings
            movieApp.movieRating1 = result.results[randomMovie1].vote_average;
            movieApp.movieRating2 = result.results[randomMovie2].vote_average;



            // Display to the DOM
            const displayMovieImage1 = `<img class="movie1" src="${movieURL1}" alt="will figure out">`
            const displayMovieImage2 = `<img class="movie2" src="${movieURL2}" alt="will figure out">`
            $('#movieArea1').append(displayMovieImage1);
            $('#movieArea2').append(displayMovieImage2);


            // Comparing the 2 movie ratings and storing the higher rated movie in popularMovie variable
            if (movieApp.movieRating1 > movieApp.movieRating2) {
                popularMovie = movieApp.movieRating1;
                lessPopularMovie = movieApp.movieRating2;
            } else {
                popularMovie = movieApp.movieRating2;
                lessPopularMovie = movieApp.movieRating1;
            }
        });
    }

    // User chooses a movie
    // When user selects one of the movies store user selection in a variable called userSelection 
    // Assign userSelection to the user selected movie

    $(".clickable").on('click', function () {
        let movieNumber = $(this).attr("id");
        if (movieNumber === "movieRating1") {
            userSelection = movieApp.movieRating1;
        } else {
            userSelection = movieApp.movieRating2;
        }

        $('.score').append(`Score: ${movieApp.userScore}`)

        // Compare user selection with popularMovie variable - used if else statement to determine tie, win and lose scenarios

        // Both movies equally rating (TIE)
        if (movieApp.movieRating1 === movieApp.movieRating2) {
            $('#movieArea1').addClass('bounce');
            $('.animateResponse1').addClass('correctResponse').toggle()
            $('.answerIcon1').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')

            $('#movieArea2').addClass('bounce');
            $('.animateResponse2').addClass('correctResponse').toggle()
            $('.answerIcon2').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')

            movieApp.userScore++

            // User selects more popular movie (CORRECT)
        } else if (userSelection === popularMovie) {
            $(this).addClass('bounce');
            $('.animateResponse1').addClass('correctResponse').toggle()
            $('.answerIcon1').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')

            movieApp.userScore++

            // User selects less popular movie (INCORRECT)
        } else if (userSelection === lessPopularMovie) {
            $(this).addClass('shake');
            $('.animateResponse1').addClass('wrongResponse').toggle()
            $('.answerIcon1').addClass('displayIcons')

            movieApp.userScore = 0
        };
    });

    // On click display both movie ratings to the DOM only once
    $('#movieArea1').one('click', function () {
        $('.movieRating1').append(`${movieApp.movieRating1}`);
    })

    $('#movieArea2').one('click', function () {
        $('.movieRating2').append(`${movieApp.movieRating2}`);
    })

    // On click repopulate the DOM with new images for game replay
    $("button.nextRound").on('click', function () {
        $('#movieArea1').empty();
        $('#movieArea2').empty();
        $('.movieRating1').empty();
        $('.movieRating2').empty();
        $('.score').empty();
        movieApp.movieRating1 = null;
        movieApp.movieRating2 = null;
        movieApp.getData();
    });

    movieApp.getData()
}


// Document Ready
$(document).ready(function () {
    movieApp.init()
});