  

  var train = $("#user-train").val().trim();
  var destination = $("#user-destination").val().trim();
  var frequency = $("#user-frequency").val().trim();
  var nextArrival = $("#user-next").val().trim();
  var minutesAway = $("#user-minutes-away").val().trim();

// $("#submit-button").on("click", function(){

//   //$("#input-train").html("<p>" + train + "</p>");
//   $("#input-train").text(destination);

//   });

$("#submit-button").on("click", function(event){
  event.preventDefault();

  console.log("hey again");

  //$("#input-train").html(train);
  $("#input-train").text("hey");
  

    });

$(document).on("ready", function(){
  console.log("hey");

});