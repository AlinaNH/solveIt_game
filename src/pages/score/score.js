let observerGameResult = new MutationObserver(function(mutations) {
  if (document.contains($(".gameResult")[0])) {
    let gameResult, minutes, seconds, message;

    if (!localStorage.previousGameScore) {
      gameResult = localStorage.lastGameScore;
    } else {
      gameResult = Math.abs(
        localStorage.previousGameScore - localStorage.lastGameScore
      );
    }
    minutes = Math.floor(gameResult / 60);
    seconds = gameResult - Math.floor(gameResult / 60) * 10;

    const resultMessage = {
      firstTimeWithMinutes:
        "Congratulations! Your score is " +
        minutes +
        " minutes " +
        seconds +
        " seconds!",
      firstTimeWithoutMinutes:
        "Congratulations! Your score is " + seconds + " seconds!",
      withMinutesFaster:
        "Congratulation! You have counted " +
        minutes +
        " minutes " +
        seconds +
        " seconds faster than in the previous game.",
      withoutMinutesFaster:
        "Congratulation! You have counted " +
        seconds +
        " seconds faster than in the previous game.",
      withMinutesSlower:
        "You have counted " +
        minutes +
        " minutes " +
        seconds +
        " seconds slower than in the previous game. Try again!",
      withoutMinutesSlower:
        "You have counted " +
        seconds +
        " seconds slower than in the previous game. Try again!"
    };

    if (!localStorage.previousGameScore && !minutes) {
      message = resultMessage.firstTimeWithoutMinutes;
    } else if (!localStorage.previousGameScore && minutes) {
      message = resultMessage.firstTimeWithMinutes;
    } else if (
      localStorage.previousGameScore &&
      !minutes &&
      localStorage.previousGameScore >= localStorage.lastGameScore
    ) {
      message = resultMessage.withoutMinutesFaster;
    } else if (
      localStorage.previousGameScore &&
      !minutes &&
      localStorage.previousGameScore < localStorage.lastGameScore
    ) {
      message = resultMessage.withoutMinutesSlower;
    } else if (
      localStorage.previousGameScore &&
      minutes &&
      localStorage.previousGameScore >= localStorage.lastGameScore
    ) {
      message = resultMessage.withMinutesFaster;
    } else if (
      localStorage.previousGameScore &&
      minutes &&
      localStorage.previousGameScore < localStorage.lastGameScore
    ) {
      message = resultMessage.withMinutesSlower;
    }

    $(".gameResult").html(message);
    observerGameResult.disconnect();
  }
});

observerGameResult.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true
});
