var topics = ["Rose", "Tulip", "Daisy", "Sunflower", "Zinnia", "Daffodil", "Carnation", "Cherry-blossom", "Dahlia", "Peony"];
for(var i = 0; i < topics.length; i++){
    var flowerButton = $("<button>");
    flowerButton.addClass("flower");
    flowerButton.attr("data-name", topics[i]);
    flowerButton.text(topics[i]);
    $("#flowerButtons").append(flowerButton);
}
$(".flower").on("click", function() {
    console.log("You clicked " + $(this).attr("data-name"));
})