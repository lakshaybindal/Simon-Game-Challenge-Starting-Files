var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var UserClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  UserClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  UserClickedPattern.push(userChosenColour);
  console.log(UserClickedPattern);
  playSound(userChosenColour);
  animatePressed(userChosenColour);
  checkAnswer(UserClickedPattern.length - 1);
});
function checkAnswer(CurrentLevel) {
  if (gamePattern[CurrentLevel] === UserClickedPattern[CurrentLevel]) {
    console.log("success");

    if (UserClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePressed(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed"), 100;
  });
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();

    started = true;
  }
});
function startOver() {
  buttonColors = ["red", "blue", "green", "yellow"];
  gamePattern = [];
  UserClickedPattern = [];
  level = 0;
  started = false;
}
