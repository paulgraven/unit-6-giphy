var countries = ["Philippines", "Japan", "Colombia", "Peru"];

function displaycountryInfo() {
  var country = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=Q6uWCQmzT91m1DPvQK9kXq05ozicZCNg&tag=nature&limit=10&q=" +
    country;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var imageURL = response.data.image_original_url;
    var countryImage = $("<img>");
    countryImage.attr("src", imageURL);
    $("#countries-view").append(countryImage);
  });
}

function countryButtons() {
  $("#buttons").empty();
  for (var i = 0; i < countries.length; i++) {
    var a = $("<button>");
    a.addClass("country-btn");
    a.attr("data-name", countries[i]);
    a.text(countries[i]);
    $("#buttons").append(a);
  }
}

$("#add-country").on("click", function(event) {
  event.preventDefault();
  var country = $("#country-input")
    .val()
    .trim();
  countries.push(country);
  countryButtons();
});

$(document).on("click", ".country-btn", displaycountryInfo);

countryButtons();
