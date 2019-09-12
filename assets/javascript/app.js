$(document).ready(function () {
    //  List of Cartoons

    var topics = ["Doug", "Sout Park", "Rocko's Modern Life", "Teenage Mutant Ninja Turtles",
        "The Simpsons", "SpongsBob SquarePants", "Ed, Edd and Eddy", "Pinky and the Brain",
        "The Angry Beavers", "Invader Zim"
    ];

    // ALL FUNCTIONS


    function displayInfo() {
        $('#toon-view').empty();
        var topic = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=01wNr6cOCHUPCwEyprRUuaxYcuiTsKwk&limit=10';


        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {

                if (response.pagination.total_count == 0) {
                    alert("No Gifs Dangus!");
                    var itemindex = topics.indexOf(topic);

                    if (itemindex > -1) {
                        topics.splice(itemindex, 1);
                        renderButtons();
                    }
                }


                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    var newTopicDiv = $("<div class='toon-name'>");
                    // Save responses from API into variables and add to DOM
                    // GIF Rating
                    var pRating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

                    // GIF URL
                    var gifURL = results[i].images.fixed_height_still.url;
                    var gif = $("<img>");
                    gif.attr("src", gifURL);
                    gif.attr("data-still", results[i].images.fixed_height_still.url);
                    gif.attr("data-animate", results[i].images.fixed_height.url);
                    gif.attr("data-state", "still");
                    gif.addClass("animate-gif");
                    // Appending info 
                    newTopicDiv.prepend(pRating);
                    newTopicDiv.prepend(gif);
                    // Putting the saved info to new div
                    $("#toon-view").prepend(newTopicDiv);
                }
            });
    };

    // Function for displaying buttons
    function renderButtons() {
        // Deletes the movies prior to adding new movies
        $(".buttons-view").empty();
        // Loops through the array of topics to create buttons for all topics
        for (var i = 0; i < topics.length; i++) {
            var createButtons = $("<button>");
            createButtons.addClass("topic btn btn-info");
            createButtons.attr("data-name", topics[i]);
            createButtons.text(topics[i]);
            $(".buttons-view").append(createButtons);
        }
    }

  

    // Function to play or still Gif images
    function playGif() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }


    $("#add-toon").on("click", function (event) {
        event.preventDefault();
        
        var toon = $("#toon-input").val().trim();
        
        if (topics.toString().toLowerCase().indexOf(toon.toLowerCase()) != -1) {
            alert("SIMPSONS DID IT!!");
        } else {
            topics.push(toon);
            renderButtons();
        }


    });

    $(document).on("click", ".topic", displayInfo);

    $(document).on("click", ".animate-gif", playGif);




    renderButtons();


});