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
    // prevents the page from reloading?
    event.preventDefault();

  //setting variables to equal whatever the user puts in the form
  var train = $("#user-train").val().trim();
  var destination = $("#user-destination").val().trim();
  var frequency = $("#user-frequency").val().trim();
  var nextArrival = $("#user-next").val().trim();
  var minutesAway = $("#user-minutes-away").val().trim();

  //each new submission creates an object with these qualities
  var newTrain = {
    trainname: train,
    traindestination: destination,
    trainfrequency: frequency,
    nextarrival: nextArrival,
    minutesaway: minutesAway
  };

  //pushing the new data from the object
  database.ref().push(newTrain);

  // I will change this later
  alert("train added");

  //this clears the html in all fields
  $("#user-train").val("");
  $("#user-destination").val("");
  $("#user-frequency").val("");
  $("#user-next").val("");
  $("#user-minutes-away").val("");

  // create variable for the HTML to show up
  var row = $("<tr></tr>");

    //all of the different train qualities need to be appended
    row.append($("<td>" + train + "</td>"));
    row.append($("<td>" + destination + "</td>"));
    row.append($("<td>" + frequency + "</td>"));
    row.append($("<td>" + nextArrival + "</td>"));
    row.append($("<td>" + minutesAway + "</td>"));

    //now append the whole row to the table
  $("#trainPit").append(row);
    
  });

//every time the database updates, so does the HTML
database.ref().on("child_added", function(update){

  var train = update.val().trainname;
  var destination = update.val().traindestination;
  var frequency = update.val().trainfrequency;
  var nextArrival = update.val().nextarrival;
  var minutesAway = update.val().minutesAway;

  	// console.log(update.val().trainname);
   //  console.log(update.val().traindestination);
   //  console.log(update.val().trainfrequency);
   //  console.log(update.val().nextarrival);
   //  console.log(update.val().minutesaway);

  	}, function(errorObject) {
  		console.log("The read failed: " + errorObject.code);
  });