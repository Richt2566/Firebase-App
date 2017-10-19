
var config = {
    apiKey: "AIzaSyAqrXaz26bWiRXuQ1qoinQ-sCYkmTeSe3w",
    authDomain: "train-schedule-6a2de.firebaseapp.com",
    databaseURL: "https://train-schedule-6a2de.firebaseio.com",
    storageBucket: "train-schedule-6a2de.appspot.com",
  };

firebase.initializeApp(config);

var database = firebase.database();

function makeTable() {
  var row = $("<tr></tr>");
 
    row.append($("<td>" + trainname + "</td>"));
    row.append($("<td>" + traindestination + "</td>"));
    row.append($("<td>" + trainfrequency + "</td>"));
    row.append($("<td>" + nextarrival + "</td>"));
    row.append($("<td>" + minutesaway + "</td>"));

    $("#trainPit").append(row);
}

//function to push the info that the user changes...
function pushTrain() {

  //setting variables to equal whatever the user puts in the form
  var train = $("#user-train").val().trim();
  var destination = $("#user-destination").val().trim();
  var frequency = $("#user-frequency").val().trim();
  var nextArrival = $("#user-next").val().trim();
  var minutesAway = $("#user-minutes-away").val().trim();

  //this pushes the info
  database.ref().push({
      trainname: train,
      traindestination: destination,
      trainfrequency: frequency,
      nextarrival: nextArrival,
      minutesaway: minutesAway
    });
}

//every time the database updates, so does the HTML
database.ref().on("value", function(update){

  // creating variable to hold update value: why? i don't know.
  var trainInfo = update.val();

  	console.log(update.val().trainname);
    console.log(update.val().traindestination);
    console.log(update.val().trainfrequency);
    console.log(update.val().nextarrival);
    console.log(update.val().minutesaway);

  // making HTML change as the value changes.
  $("#input-train").text(trainInfo.trainname);
  $("#input-destination").text(update.val().traindestination);
  $("#input-frequency").text(update.val().trainfrequency);
  $("#input-next").text(update.val().nextarrival);
  $("#input-minutes-away").text(update.val().minutesaway);

  	}, function(errorObject) {
  		console.log("The read failed: " + errorObject.code);
  });

$(document).ready(function(){

  $("#submit-button").on("click", function(event){
  
    event.preventDefault();

    pushTrain();
    
  });

});