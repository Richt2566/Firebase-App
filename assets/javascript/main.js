// all the info from the firebase database
var config = {
    apiKey: "AIzaSyAqrXaz26bWiRXuQ1qoinQ-sCYkmTeSe3w",
    authDomain: "train-schedule-6a2de.firebaseapp.com",
    databaseURL: "https://train-schedule-6a2de.firebaseio.com",
    storageBucket: "train-schedule-6a2de.appspot.com",
  };

// make sure they are connecting
firebase.initializeApp(config);

// set the datebase to firebase
var database = firebase.database();

//-----------------------------------------------------

// on click this function does the bulk of the work
$("#submit-button").on("click", function(event){

  // prevents the page from reloading?
  event.preventDefault();

  //setting variables to equal whatever the user puts in the form
  var train = $("#user-train").val().trim();
  var destination = $("#user-destination").val().trim();
  var firstTime = $('#user-first').val().trim();
  var frequency = $("#user-frequency").val().trim();

  //----------------------------------------------------

  //each new submission creates an object with these qualities
  var newTrain = {
    trainname: train,
    traindestination: destination,
    firsttrain: firstTime,
    trainfrequency: frequency,
    //minutesaway: tMinutesTillTrain
  };

  //pushing the new data from the object
  database.ref().push(newTrain);

  //this clears the html in all fields
  $("#user-train").val("");
  $("#user-destination").val("");
  $("#user-frequency").val("");
  $("#user-first").val("");
  });

//----------------------------------------------------------

//every time the database updates, so does the HTML
database.ref().on("child_added", function(update, prevChildKey){

  var train = update.val().trainname;
  var destination = update.val().traindestination;
  var frequency = update.val().trainfrequency;
  var minutesaway = update.val().tMinutesTillTrain;
  var firstTime = update.val().firsttrain;

  //this is where the calc starts...

  // pushing back one year - not sure i understand this part...
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

  // current time is always updated
  var currentTime = moment();

  // difference between users first time and now
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;

  // minutes until train
  var tMinutesTillTrain = frequency - tRemainder;

  // next train arrival
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var formattedTrain = nextTrain.format("HH:mm:ss a")

  // create variable for the HTML to show up
  var row = $("<tr></tr>");

    //all of the different train qualities need to be appended
    row.append($("<td>" + train + "</td>"));
    row.append($("<td>" + destination + "</td>"));
    row.append($("<td>" + frequency + "</td>"));
    row.append($("<td>" + formattedTrain + "</td>"));
    row.append($("<td>" + tMinutesTillTrain + "</td>"));

    //now append the whole row to the table
  $("#trainPit").append(row);

  	}, function(errorObject) {
  		console.log("The read failed: " + errorObject.code);
});