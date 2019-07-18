var topics = ["Rose", "Tulip", "Daisy", "Sunflower", "Zinnia", "Daffodil", "Carnation", "Cherry-blossom", "Dahlia", "Peony"];
for(var i = 0; i < topics.length; i++){
    var flowerButton = $("<button>");
    flowerButton.addClass("flower");
    flowerButton.attr("data-flower", topics[i]);
    flowerButton.text(topics[i]);
    $("#flowerButtons").append(flowerButton);
}
/* $(".flower").on("click", function() {
    console.log("You clicked " + $(this).attr("data-flower"));
}); */
$("button").on("click", function() {
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
            flowerImage.attr("data-state", "still"); // we want to display 10 static gifs for each type of flower
            flowerImage.attr("data-still", staticSrc); 
            flowerImage.attr("data-animate", animatedSrc);
            gifDiv.prepend(p);
            gifDiv.prepend(flowerImage);

            $("#flowerGifs").prepend(gifDiv);
        }
    })
});