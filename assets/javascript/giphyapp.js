// Initial array of flowers
var topics = ["Rose", "Tulip", "Daisy", "Sunflower", "Zinnia", "Daffodil", "Carnation", "Cherry-blossom", "Dahlia", "Peony"];

/* $(".flower").on("click", function() {
    console.log("You clicked " + $(this).attr("data-flower"));
}); */
// Function for dumping the rating and static image for each button into the div
function displayFlowerImage() {
    console.log("You clicked " + $(this).attr("data-flower"));
    var flower = $(this).attr("data-flower");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + flower + "&api_key=JTwlcyqSqkaxbDboRvPXe82WHvcXPhvI&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("flower-div");
            var rating = results[i].rating;
            var animatedSrc = results[i].images.fixed_height.url; // url for the animated (Default) gif
            var staticSrc = results[i].images.fixed_height_still.url; // url for the static gif
            var p = $("<p>").text("Rating: " + rating);

            var flowerImage = $("<img>");
            flowerImage.attr("src", staticSrc); // assigns the static flower gif url to src attribute
            flowerImage.addClass("flowerGiphy"); // adds a class of flowerGiphy to each gif
            flowerImage.attr("data-state", "still"); // we want to display 10 static gifs for each type of flower
            flowerImage.attr("data-still", staticSrc); 
            flowerImage.attr("data-animate", animatedSrc);
            gifDiv.prepend(p);
            gifDiv.prepend(flowerImage);

            $("#flowerGifs").prepend(gifDiv);
        }
    });
}

// Function for displaying flower data
function renderButtons() {
    for(var i = 0; i < topics.length; i++){
        var flowerButton = $("<button>");
        flowerButton.addClass("flower");
        flowerButton.attr("data-flower", topics[i]);
        flowerButton.text(topics[i]);
        $("#flowerButtons").append(flowerButton);
    }
}

// Function for playing/pausing flower gifs depending on the state of the gif.
function pausePlayFlowerGifs() {
    // The attr jQuery method allows us to get or set the value of any attribute in our HTML element
    var state = $(this).attr("data-state");
    console.log("current state: " + state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        console.log("animated img src: " + $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("state is now: " + state);
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        console.log("static img src: " + $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log("state is now: " + state);
    }
}
/* $("button").on("click", function() {
    
}); */

// Using $(document).on to add event listeners to dynamically generated button elements
$(document).on("click", ".flower", displayFlowerImage);

// Calling the renderButtons function to display the initial buttons
renderButtons();

// Using $(document).on to add event listeners to dynamically generated img elements 
$(document).on("click", ".flowerGiphy", pausePlayFlowerGifs);