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
  // var name = "";
  // var destination = "";
  // var firstTime = 0;
  // var frequency = 0;
  var nextTime = 0; //is that a string or a number becasue of time
  var minutesAway = 0;



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

      
      return false;
    });

database.ref().on("child_added", function(snapshot){
	console.log(snapshot.val());
	console.log(snapshot.val().name);
	console.log(snapshot.val().destination);
	console.log(snapshot.val().firstTime);
	console.log(snapshot.val().frequency);
  
  var firstTime = snapshot.val().firstTime;
  var frequency = snapshot.val().frequency;

  var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	  console.log(firstTimeConverted);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("difference in time " + diffTime);

  var tRemainder = diffTime % frequency;
	console.log(tRemainder);

  var minutesAway = frequency - tRemainder;
	console.log("minutes until train: " + minutesAway);

  var nextTime = moment().add(minutesAway, "minutes");
	console.log("arrival time: " + moment(nextTime).format("hh:mm"));

  var nextTrainTime = moment(nextTime).format("hh:mm");


	$("#new-train").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + frequency +  "</td><td>" + nextTrainTime +  "</td><td>" + minutesAway + "</td></tr>");

	}, function(errorObject){
	console.log("The read failed: " + errorObject.code);
	});


});