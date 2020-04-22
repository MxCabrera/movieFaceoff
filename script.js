let movieApp = {}

movieApp.key = '3628ebe0c40080ef9275f966a8eaaa92'

movieApp.url = 'https://api.themoviedb.org/3/movie'

movieApp.userScore = 0

movieApp.init = function () {
    // Header Functions
    // listen for click on the how to play button to display alert 
    $('button.howTo').on('click', function (e) {
        e.preventDefault();
        alert(`
        Click the movie you think is more popular!
        See how high you can get your winning streak to be.`)
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
            // Prevent the same movie being pulled in twice
            if (randomMovie2 === randomMovie1) {
                randomMovie2 = Math.floor(Math.random() * 20);
            }

            // Movie images from API 
            const movieImg1 = result.results[randomMovie1].poster_path;
            const movieURL1 = `https://image.tmdb.org/t/p/original/${movieImg1}`;

            const movieImg2 = result.results[randomMovie2].poster_path;
            const movieURL2 = `https://image.tmdb.org/t/p/original/${movieImg2}`;

            // Movie title from API
            const movieTitle1 = result.results[randomMovie1].original_title;
            const movieTitle2 = result.results[randomMovie2].original_title;


            // Movie ratings from API
            movieApp.movieRating1 = result.results[randomMovie1].vote_average;
            movieApp.movieRating2 = result.results[randomMovie2].vote_average;

            // Display Images to the DOM with alt text populated using movieTitle variable
            const displayMovieImage1 = `<img class="movie1" src="${movieURL1}" alt="${movieTitle1} movie poster">`
            const displayMovieImage2 = `<img class="movie2" src="${movieURL2}" alt="${movieTitle2} movie poster">`
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

        $('.clickable').css('pointer-events', 'none')

        if (movieNumber === "movieArea1") {
            userSelection = movieApp.movieRating1;
        } else {
            userSelection = movieApp.movieRating2;
        }

        // Append user score
        $('.score').empty()
        
        // Compare user selection with popularMovie variable - used if else statement to determine tie, win and lose scenarios
        
        // Both movies equally rating (TIE)
        if (movieApp.movieRating1 === movieApp.movieRating2) {
            
            // Add correct response animation to the selected movie
            $(this).toggleClass('bounce')
            .find('.animateResponse').toggleClass('correctResponse display')
            
            // Display the correct check fontawesome icon
            $(this).find('i').toggleClass('display fa-check')
            
            // Correct - add to the userScore
            movieApp.userScore = movieApp.userScore + 1;
            
            // User selects more popular movie (CORRECT)
        } else if (userSelection === popularMovie) {
            
            // Add correct response animation to the selected movie
            $(this).toggleClass('bounce')
            .find('.animateResponse').toggleClass('correctResponse display')
            
            // Display the correct check fontawesome icon
            $(this).find('i').toggleClass('display fa-check')
            
            // Correct - add to the userScore
            movieApp.userScore = movieApp.userScore + 1;
            
            // User selects less popular movie (INCORRECT)
        } else if (userSelection === lessPopularMovie) {
            
            // Add incorrect response animation to the selected movie
            $(this).toggleClass('shake')
            .find('.animateResponse').toggleClass('wrongResponse display')
            
            // Display the correct cross fontawesome icon
            $(this).find('i').toggleClass('display fa-times')

            // Incorrect - reset user score
            movieApp.userScore = 0;
        };
    });
    
    // On click display both movie ratings and userScore to the DOM
    $('#movieArea1, #movieArea2').on('click', function () {
        $('.score').append(`Score: ${movieApp.userScore}`)
        $('.movieRating1, .movieRating2').empty()
        $('.movieRating1').append(`${movieApp.movieRating1}`);
        $('.movieRating2').append(`${movieApp.movieRating2}`);
    })


    // On click repopulate the DOM with new images for game replay
    $("button.nextRound").on('click', function () {
        $('#movieArea1, #movieArea2').children('img').remove();

        if ($('.animateResponse').hasClass('display')) {
            $('.answerIcon').removeClass('display fa-check fa-times')
            $('.animateResponse').removeClass('display correctResponse wrongResponse')
            $('.movieArea').removeClass('shake bounce')
        }
        
        $('.movieRating1, .movieRating2, .score').empty();
        $('.clickable').css('pointer-events', 'auto')
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