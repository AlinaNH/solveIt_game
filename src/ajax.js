window.onhashchange = function() {
  checkHash();
};

checkHash();

function loadPage(pageName) {
  $.ajax("pages/" + pageName + "/" + pageName + ".html", {
    type: "GET",
    dataType: "html",
    success: dataLoaded,
    error: errorHandler
  });
}

function dataLoaded(data) {
  $("document").ready(() => {
    document.getElementById("content").innerHTML = data;
    $.getScript("dist/game.bundle.js");
    $.getScript("dist/score.bundle.js");
  });
}

function errorHandler() {
  loadPage("main");
}

function checkHash() {
  let URLHash = window.location.hash;
  if (!URLHash) {
    loadPage("main");
    return false;
  }

  let hashStr = URLHash.slice(1);
  loadPage(hashStr);
}
