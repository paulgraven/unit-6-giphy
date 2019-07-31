var natureList = ["Waterfalls", "Northern Lights", "Mountains", "Stars"];

function displaynatureInfo(nature) {
  var nature = $(this).attr("data-name");
  // console.log(nature);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=Q6uWCQmzT91m1DPvQK9kXq05ozicZCNg&q=" +
    nature +
    "&limit=20&offset=0&rating=G&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#nature-view").empty();
    for (var i = 0; i < 10; i++) {
      console.log(response.data[i]);
      console.log(response.data);
      // var stillImageURL = response.data.images.fixed_width_still.url;
      // var animatedImageURL = response.data.images.fixed_width.url;

      var stillImageURL = response.data[i].images.fixed_height_still.url;
      var animatedImageURL = response.data[i].images.fixed_height.url;

      // console.log(animatedImageURL);
      var natureImage = $("<img>");
      natureImage.attr("src", stillImageURL);

      natureImage.attr("data-still", stillImageURL);
      natureImage.attr("data-animate", animatedImageURL);
      natureImage.attr("data-state", "still");

      natureImage.attr("class", "gif");

      $("#nature-view").append(natureImage);
    }

    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });
}

function natureButtons() {
  $("#buttons").empty();
  for (var i = 0; i < natureList.length; i++) {
    var a = $("<button>");
    a.addClass("nature-btn");
    a.attr("data-name", natureList[i]);
    a.text(natureList[i]);
    $("#buttons").append(a);
  }
}

$("#add-nature").on("click", function(event) {
  event.preventDefault();
  var nature = $("#nature-input")
    .val()
    .trim();
  natureList.push(nature);
  natureButtons();
});

$(document).on("click", ".nature-btn", displaynatureInfo);

natureButtons();
