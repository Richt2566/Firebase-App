// on click this function does the bulk of the work
$("#submit-button").on("click", function(event){
  // prevents the page from reloading?
  event.preventDefault();
  //setting variables to equal whatever the user puts in the form
  // var train = $("#user-train").val().trim();
  // var destination = $("#user-destination").val().trim();
  var firstTime = $('#user-first').val().trim();
  var frequency = $("#user-frequency").val().trim();
  //each new submission creates an object with these qualities
  var newTrain = {
    // trainname: train,
    // traindestination: destination,
    firsttrain: firstTime,
    trainfrequency: frequency
    // minutesaway: tMinutesTillTrain
  };
  console.log(newTrain);
  //this clears the html in all fields
  // $("#user-train").val("");
  // $("#user-destination").val("");
  $("#user-frequency").val("");
  $("#user-first").val("");
  time(firstTime, frequency)
});

function time (update, frequency) {
    // this is where the calc starts...
  var currentTime = moment();
  var firstTimeConverted = moment(update, "HH:mm").subtract(1, "years");
;
  var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime + "diftime");
  var tRemainder = diffTime % frequency;
   console.log(tRemainder + "tRemainder")
   
  var tMinutesTillTrain = frequency - tRemainder;
   console.log(tMinutesTillTrain + "tMinutesTillTrain")
   
  //var tMinutesTillTrain = 5;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var formattedTrain = nextTrain.format("HH:mm:ss a")
    console.log(formattedTrain);
}