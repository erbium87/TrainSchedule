$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyBoUDZD75dOmKgQFyVDDamyQR6I-yQL028",
    authDomain: "trainschedule-4b9d7.firebaseapp.com",
    databaseURL: "https://trainschedule-4b9d7.firebaseio.com",
    storageBucket: "trainschedule-4b9d7.appspot.com",
    messagingSenderId: "197330550479"
    };
    firebase.initializeApp(config);

  var database = firebase.database();


  $("#add-train").on("click", function() {
	  var name = $("#name-input").val().trim();
	  var destination = $("#destination-input").val().trim();
    var firstTime = $("#time-input").val().trim();
	  var frequency = $("#frequency-input").val().trim();


    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });
      
    $("#name-input").val("");
    $("#destination-input").val("");
	  $("#time-input").val("");
	  $("#frequency-input").val("");
      
      return false;
    });

database.ref().on("child_added", function(snapshot){
	console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().firstTime);
	console.log(snapshot.val().frequency);
  
  //redefining firstTime in snapshot
  var firstTime = snapshot.val().firstTime;
  //redefining frequency in snapshot
  var frequency = snapshot.val().frequency;
  var currentTime = moment();
  console.log(currentTime);

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	  console.log(firstTimeConverted);
  //difference in time between current time and converted time
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("difference in time " + diffTime);

  //determining remainder
  var tRemainder = diffTime % frequency;
	console.log(tRemainder);
  //from remainder determining the time away it is based on frequency
  var minutesAway = frequency - tRemainder;
	console.log("minutes until train: " + minutesAway);
  //calculating the next time based on the current time and minutesAway
  var nextTime = moment().add(minutesAway, "minutes");
	console.log("arrival time: " + moment(nextTime).format("hh:mm"));
  //made new variable for format
  var nextTrainTime = moment(nextTime).format("hh:mm a");

  	//creating table containing information in database and appending when new data created
	$("#new-train").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + frequency +  "</td><td>" + nextTrainTime +  "</td><td>" + minutesAway + "</td></tr>");

	}, function(errorObject){
	console.log("The read failed: " + errorObject.code);
	});


});