let movieApp = {}

movieApp.key = '3628ebe0c40080ef9275f966a8eaaa92'

movieApp.url = 'https://api.themoviedb.org/3/movie'

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
}





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
        const movieRating1 = result.results[randomMovie1].vote_average;
        const movieRating2 = result.results[randomMovie2].vote_average;



        // Display to the DOM
        const displayMovieImage1 = `<img class="movie1" src="${movieURL1}" alt="will figure out">`
        const displayMovieImage2 = `<img class="movie2" src="${movieURL2}" alt="will figure out">`
        $('.movieArea1').append(displayMovieImage1);
        $('.movieArea2').append(displayMovieImage2);


        // Comparing the 2 movie ratings and storing the higher rated movie in popularMovie variable
        if (movieRating1 > movieRating2) {
            popularMovie = movieRating1;
            lessPopularMovie = movieRating2;
        } else {
            popularMovie = movieRating2;
            lessPopularMovie = movieRating1;
        }

        // TO DO Alter this for name-spacing purposes? I.e. movieApp.userSelection
        let userSelection = 0;


    // DRY TO DO - definetly need to figure out how to DRY the code below. It's essentially a copy of the same thing but with different click.

    // When user selects one of the movies store user selection in a variable called userSelection 
    // assign userSelection to the corresponding movie rating
    // Compare user selection with popularMovie variable - used if else statement to determine tie, win and lose scenarios
    
        // User chooses movie 1
        $(".movieArea1").on('click', function () {
            userSelection = movieRating1;
            $('.movieRating1').append(movieRating1);
            $('.movieRating2').append(movieRating2);

            // tie scenario - both correct
            if (movieRating1 === movieRating2) {
                $('.movieArea1').addClass('bounce');
                $('.animateResponse1').removeClass('wrongResponse').addClass('correctResponse').toggle()
                $('.answerIcon1').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')

                $('.movieArea2').addClass('bounce');
                $('.animateResponse2').removeClass('wrongResponse', 'fa-cross').addClass('correctResponse').toggle()
                $('.answerIcon2').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')
            // movie 1 is the popular movie, user clicks movie 1 - correct
            } else if (userSelection === popularMovie) {
                $('.movieArea1').addClass('bounce');
                $('.animateResponse1').removeClass('wrongResponse').addClass('correctResponse').toggle()
                $('.answerIcon1').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')
            // movie 2 is the popular movie, user clicks movie 1 - wrong
            } else {
                $('.movieArea1').addClass('shake');
                $('.animateResponse1').addClass('wrongResponse').toggle()
                $('.answerIcon1').addClass('displayIcons')
            };

            // On click repopulate the DOM with new images for game replay
            $("button.nextRound").on('click', function () {
                $('.movieArea1').empty(displayMovieImage1);
                $('.movieArea2').empty(displayMovieImage2);
                $('.movieRating1').empty(movieRating1);
                $('.movieRating2').empty(movieRating2);
                movieApp.getData().reset();
            });
        });

        // User chooses movie 2
        $(".movieArea2").on('click', function () {
            userSelection = movieRating2;
            $('.movieRating1').append(movieRating1);
            $('.movieRating2').append(movieRating2);

            // Tie scenario - both correct
            if (movieRating1 === movieRating2) {
                $('.movieArea1').addClass('bounce');
                $('.animateResponse1').removeClass('wrongResponse').addClass('correctResponse').toggle()
                $('.answerIcon1').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')

                $('.movieArea2').addClass('bounce');
                $('.animateResponse2').removeClass('wrongResponse', 'fa-cross').addClass('correctResponse').toggle()
                $('.answerIcon2').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')
            // movie 2 is the popular movie, user clicks movie 2 - correct
            } if (userSelection === popularMovie) {
                $('.movieArea2').addClass('bounce');
                $('.animateResponse2').removeClass('wrongResponse', 'fa-cross').addClass('correctResponse').toggle()
                $('.answerIcon2').removeClass('fa-times').addClass('fa-check').addClass('displayIcons')
            // movie 1 is the popular movie, user clicks movie 2 - wrong
            } else {
                $('.movieArea2').addClass('shake');
                $('.animateResponse2').addClass('wrongResponse').toggle()
                $('.answerIcon2').addClass('displayIcons')
            }

            // On click repopulate the DOM with new images for game replay
            $("button.nextRound").on('click', function () {
                $('.movieArea1').empty(displayMovieImage1);
                $('.movieArea2').empty(displayMovieImage2);
                $('.movieRating1').empty(movieRating1);
                $('.movieRating2').empty(movieRating2);
                movieApp.getData().reset();
            });
        });


        


        
    })

}

movieApp.getData()

// Document Ready
$(document).ready(function () {
    movieApp.init()
});