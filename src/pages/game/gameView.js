import ProperFractionService from "./../../service/properFractionService.js";

export default class GameView {
  init(content, model) {
    this.content = content;
    this.model = model;

    this.showGameName();
    this.drawComplexFractions(this.model.complexFractions);
    this.makeComplexFractionActive();
  }

  showGameName() {
    if (document.contains($(".gameName")[0])) {
      $(".gameName")[0].append(this.model.getGameName());
    }
  }

  drawComplexFractions(complexFractions) {
    let self = this,
      cfDiv;
    complexFractions.forEach((cf, e) => {
      cfDiv = self.showComplexFraction(cf);
      if (document.contains($(".complexFractionsBlock")[0])) {
        $(".complexFractionsBlock")[0].append(cfDiv[0]);
      }
      cfDiv.addClass("roundDiv");
    });
  }

  showComplexFraction(complexFraction) {
    let cfDiv = $("<div></div>");
    if (
      complexFraction.integer <= 9 &&
      complexFraction.integer !== 0 &&
      complexFraction.numerator > 0
    ) {
      cfDiv.html(
        "<div class='complexFraction'><span class='integerTo9'>" +
          complexFraction.integer +
          "</span><div class='fullFractionTo9'><span class='numerator'>" +
          complexFraction.numerator +
          "</span><span class='denominator'>" +
          complexFraction.denominator +
          "</span></div></div>"
      );
    } else if (complexFraction.integer > 9 && complexFraction.numerator > 0) {
      cfDiv.html(
        "<div class='complexFraction'><span class='integerFrom10'>" +
          complexFraction.integer +
          "</span><div class='fullFractionFrom10'><span class='numerator'>" +
          complexFraction.numerator +
          "</span><span class='denominator'>" +
          complexFraction.denominator +
          "</span></div></div>"
      );
    } else if (
      complexFraction.integer <= 9 &&
      complexFraction.numerator === 0
    ) {
      cfDiv.html(
        "<div class='complexFraction'><span class='noProperFractionTo9'>" +
          complexFraction.integer +
          "</span></div>"
      );
    } else if (complexFraction.integer > 9 && complexFraction.numerator === 0) {
      cfDiv.html(
        "<div class='complexFraction'><span class='noProperFractionFrom10'>" +
          complexFraction.integer +
          "</span></div>"
      );
    } else if (complexFraction.integer === 0) {
      cfDiv.html(
        "<div class='complexFraction'><div class='noInteger'><span class='numeratorNoInt'>" +
          complexFraction.numerator +
          "</span><span class='denominatorNoInt'>" +
          complexFraction.denominator +
          "</span></div></div>"
      );
    }
    return cfDiv;
  }

  makeComplexFractionActive() {
    let pfService = new ProperFractionService(),
      currentCF = this.model.getCurrentComplexFraction(),
      round = this.model.getRound(),
      properFractions = pfService.generateProperFractions(
        currentCF,
        this.model.getGameName()
      );

    if (round >= this.model.complexFractions.length) {
      this.model.setGameFinish();
      window.location.hash = "#score";
      return;
    } else {
      if (document.contains($(".roundDiv")[round])) {
        $(".roundDiv")[round].style.transform = "scale(3)";
      }
      if (document.contains($(".complexFraction")[round])) {
        $(".complexFraction")[round].style.display = "block";
      }
      properFractions.forEach(pf => this.drawProperFraction(pf));
    }
  }

  makeComplexFractionInactive() {
    let round = this.model.getRound();
    $(".roundDiv")[round].style.transform = "scale(1)";
    $(".complexFraction")[round].style.display = "none";
  }

  drawProperFraction(properFraction) {
    let canvas, pfDOM, radius;
    if (properFraction.copy) {
      if (properFraction.nextSibling.length) {
        $(properFraction.nextSibling).before("<div class=properFraction>");
      } else {
        $(properFraction.prevSibling).after("<div class=properFraction>");
      }
      $(".properFraction:not(:has(canvas))").append("<canvas></canvas>");
      canvas = $("canvas:not(.drawn)")[0];
    } else {
      $(".properFractionsBlock").append("<div class=properFraction>");
      $(".properFraction:last-child").append("<canvas></canvas>");
      canvas = $("canvas")[$("canvas").length - 1];
    }

    pfDOM = $(canvas).parent()[0];
    if (document.contains(pfDOM)) {
      pfDOM.setAttribute("data-integer", properFraction.integer);
      pfDOM.setAttribute("data-numerator", properFraction.numerator);
      pfDOM.setAttribute("data-denominator", properFraction.denominator);
    }

    let context,
      beginAngle = Math.PI * 1.5,
      angle360 = Math.PI * 2;

    if (document.contains(canvas)) {
      context = canvas.getContext("2d");
      canvas.setAttribute("width", "100px");
      canvas.setAttribute("height", "100px");

      if (window.innerWidth > 600) {
        radius = 30;
        canvas.setAttribute("width", "100px");
        canvas.setAttribute("height", "100px");
      } else {
        radius = 20;
        canvas.setAttribute("width", "85px");
        canvas.setAttribute("height", "85px");
      }

      context.beginPath();
      context.fillStyle = "rgb(230, 242, 254)";

      if (properFraction.integer === 1) {
        context.arc(50, 50, radius, beginAngle, beginAngle + angle360);
      }

      context.arc(
        50,
        50,
        radius,
        beginAngle,
        beginAngle +
          (angle360 / properFraction.denominator) * properFraction.numerator
      );
      context.lineTo(50, 50);
      context.fill();

      context.strokeStyle = "rgb(230, 242, 254)";
      context.arc(50, 50, radius, beginAngle, beginAngle + angle360);
      context.stroke();
      context.closePath();

      $(canvas).addClass("drawn");
    }

    this.model.setPfinPfList(pfDOM);

    return pfDOM;
  }

  makeDraggableCopyPF(pfDraggable) {
    var pfDOM = pfDraggable.$element[0];
    const pfCopy = {
      integer: +pfDOM.getAttribute("data-integer"),
      numerator: +pfDOM.getAttribute("data-numerator"),
      denominator: +pfDOM.getAttribute("data-denominator"),
      copy: true,
      nextSibling: $(pfDOM).next(),
      prevSibling: $(pfDOM).prev()
    };
    this.drawProperFraction(pfCopy);
  }

  positionPFinAnswerBlock() {
    let inputBlockRect = $(".answerBlock")[0].getBoundingClientRect(),
      pfDraggable = this.model.getIsPFinAnswerBlock();
    if (pfDraggable !== null) {
      $(".answerBlock").append(pfDraggable.element);
      pfDraggable.element.style.left = "0px";
      pfDraggable.element.style.top = "20px";
      if (
        inputBlockRect.bottom <
        pfDraggable.element.getBoundingClientRect().bottom
      ) {
        $(".answerBlock")[0].style.height =
          pfDraggable.element.getBoundingClientRect().top -
          $(".answerBlock")[0].getBoundingClientRect().top +
          110 +
          "px";
      }
      this.model.setPFinAnswerBlock(null);
      return true;
    }
  }

  showUserAnswer() {
    let answer = this.model.getUserAnswer(),
      cfDiv;
    if (answer) {
      cfDiv = this.showComplexFraction(answer);
      $(".total").css("display", "block");
      $(".total").html("");
      cfDiv.addClass("roundDiv animated fadeIn");
      $(".total")[0].append(cfDiv[0]);
      $(".total .roundDiv div").css("display", "block");
      $(".total")[0].style.transform = "scale(3)";
    } else {
      $(".total")[0].style.transform = "scale(0)";
      $(".total").css("display", "none");
    }
  }

  showAnswer() {
    let result = this.model.getIsAnswerCorrect();
    if (result) {
      $(".submitAnswer").addClass("animated heartBeat");
      this.makeComplexFractionInactive();
      $(".answerBlock div").remove();
      $(".properFractionsBlock div").remove();
      $(".total").html("");
      this.model.setCurrentComplexFraction();
      this.makeComplexFractionActive();
      $(".answerBlock").css("height", "150px");
      $(".submitAnswer").css({ "border-color": "MediumSeaGreen" });
      setTimeout(() => {
        $(".submitAnswer").removeClass("animated heartBeat");
        $(".submitAnswer").css({ "border-color": "#dae9e3" });
      }, 1000);
      return true;
    } else {
      $(".submitAnswer").addClass("animated shake");
      $(".submitAnswer").css({ "border-color": "tomato" });
      setTimeout(() => {
        $(".submitAnswer").removeClass("animated shake");
        $(".submitAnswer").css({ "border-color": "#dae9e3" });
      }, 1000);
      return false;
    }
  }
}
