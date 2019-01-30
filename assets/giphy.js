$( document ).ready(function() {
// An array of animals, new animals will be pushed into this array;
var animals = ["Koala", "Dog", "Kangaroo", "Cat", "Crocodile", "Parrot", "Donkey"];
// Creating Functions & Methods
// Function that displays all gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < animals.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("animal");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", animals[i]);
        gifButton.text(animals[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new animal button
function addNewButton(){
    $("#addGif").on("click", function(){
    var animal = $("#animal-input").val().trim();
    if (animal == ""){
      return false; // added so user cannot add a blank button
    }
    animals.push(animal);

    displayGifButtons();
    return false;
    });
}
// Function to remove last animal button
    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last
    //only works when removing last button or having to clear out manually
function removeLastButton(){
    $("removeGif").on("click", function(){
    animals.pop(animal);
    displayGifButtons();
    return false;
    });
}
// Function that displays all of the gifs
function displayGifs(){
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=fLyYYE4nvcKjckNUfuRidXojJ5OOHGgM";
    console.log(queryURL); // displays the constructed url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); // console test to make sure something returns
        $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
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
displayGifButtons(); // displays list of animals already created
addNewButton();
removeLastButton();
// Document Event Listeners
$(document).on("click", ".animal", displayGifs);
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