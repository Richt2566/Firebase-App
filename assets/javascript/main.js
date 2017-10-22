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

// on click this function does the bulk of the work
$("#submit-button").on("click", function(event){

  //console.log(event);
    // prevents the page from reloading?
    event.preventDefault();

  //setting variables to equal whatever the user puts in the form
  var train = $("#user-train").val().trim();
  var destination = $("#user-destination").val().trim();
  //var frequency = $("#user-frequency").val().trim();
  //var nextArrival = moment(currentTime, "hh:mm");// first train time + frequency
  //var minutesAway = // first train time + frequency - current time.

  //console.log(frequency);

  var frequency = $("#user-frequency").val().trim();
console.log(frequency);

var currentTime = parseInt(moment().format("HH:mm"));
console.log(currentTime);

var firstTime = parseInt($("#user-first").val().trim());
console.log(firstTime);

    // Difference between the times
var diffTime = parseInt(currentTime - firstTime);
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  //each new submission creates an object with these qualities
  var newTrain = {
    trainname: train,
    traindestination: destination,
    trainfrequency: frequency
  };

  //pushing the new data from the object
  database.ref().push(newTrain);

  // I will change this later
  alert("train added");

  //this clears the html in all fields
  $("#user-train").val("");
  $("#user-destination").val("");
  $("#user-frequency").val("");
  $("#user-first").val("");
  //$("#user-minutes-away").val("");

    
  });

//every time the database updates, so does the HTML
database.ref().on("child_added", function(update, prevChildKey){

  //console.log(update);
  //console.log(prevChildKey);

var train = update.val().trainname;
var destination = update.val().traindestination;
var frequency = update.val().trainfrequency;
//var nextArrival = // already established
//var minutesAway = // already established

  var frequency = $("#user-frequency").val().trim();
//console.log(frequency);

var currentTime = parseInt(moment().format("HH:mm"));
//console.log(currentTime);

var firstTime = parseInt($("#user-first").val().trim());
//console.log(firstTime);

    // Difference between the times
var diffTime = parseInt(currentTime - firstTime);
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
var tRemainder = diffTime % frequency;
    //console.log(tRemainder);

    // Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // create variable for the HTML to show up
  var row = $("<tr></tr>");

    //all of the different train qualities need to be appended
    row.append($("<td>" + train + "</td>"));
    row.append($("<td>" + destination + "</td>"));
    row.append($("<td>" + frequency + "</td>"));
    row.append($("<td>" + nextTrain.format("HH:mm:ss a") + "</td>"));
    row.append($("<td>" + tMinutesTillTrain + "</td>"));

    //now append the whole row to the table
  $("#trainPit").append(row);

  	}, function(errorObject) {
  		console.log("The read failed: " + errorObject.code);
  });