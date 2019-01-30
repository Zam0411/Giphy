$( document ).ready(function() {
    // An array of musicians, musicians will be pushed into this array;
    var musicians = ["Michael Jackson", "Freddy Mercury", "Robert Plant", "Dave Mustaine", "Trent Reznor", "James Hetfield", "Post Malone"];
    // Creating Functions & Methods
    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for(var i = 0; i < musicians.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("musician");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", musicians[i]);
            gifButton.text(musicians[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new button
    function addNewButton(){
        $("#addGif").on("click", function(){
            var musician = $("#musician-input").val().trim();
            if (musician == ""){
             return false; // added so user cannot add a blank button
            }
            musicians.push(musician);

            displayGifButtons();
            return false;
        });
    }

    // Function that displays all of the gifs
    function displayGifs(){
        var musician = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + musician + "&api_key=fLyYYE4nvcKjckNUfuRidXojJ5OOHGgM";
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
        
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            var results = response.data; //shows results of gifs
            for (var i=0; i<results.length; i++){

                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list already created
    addNewButton();

    // Document Event Listeners
    $(document).on("click", ".musician", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
});
});