import Draggabilly from "draggabilly";
import ComplexFractionService from "./../../service/complexFractionService.js";
import NumberUtils from "./../../utils/numberUtils";
import ArrayUtils from "./../../utils/arrayUtils";

export default class GameController {
  init(content, model) {
    this.content = content;
    this.model = model;

    this.observeProperFractionBlock();
    this.generateGame();
    this.submitAnswer();
  }

  generateGame() {
    let cfService = new ComplexFractionService(),
      game = NumberUtils.getRandomInteger(1, 4),
      gameSettings = {};

    switch (game) {
      case 1:
        gameSettings.gameName = "double it";
        this.model.setGameName("double it");
        this.model.setComplexFractions(
          cfService.generateComplexFractions("double it")
        );
        break;
      case 2:
        this.model.setGameName("tripple it");
        this.model.setComplexFractions(
          cfService.generateComplexFractions("tripple it")
        );
        break;
      case 3:
        this.model.setGameName("find one-half");
        this.model.setComplexFractions(
          cfService.generateComplexFractions("find one-half")
        );
        break;
      case 4:
        this.model.setGameName("find one-third");
        this.model.setComplexFractions(
          cfService.generateComplexFractions("find one-third")
        );
        break;
      default:
        return false;
    }
  }

  makeProperFractionDraggable(properFractionDOM, properFraction) {
    const self = this,
      dragabillySetting = { grid: [1, 1] },
      pfDraggable = new Draggabilly(properFractionDOM, dragabillySetting);
    pfDraggable.on("dragEnd", function(event, pointer) {
      self.isPFinAnswerBlock(pointer, this);
    });
    pfDraggable.on("staticClick", function(event, pointer) {
      self.isDragStartInAnswerBlock(pointer, this);
    });

    return pfDraggable;
  }

  isDragStartInAnswerBlock(pointer, pfDraggable) {
    const self = this,
      inputBlockRect = $(".answerBlock")[0].getBoundingClientRect();
    if (
      pointer.pageX >= inputBlockRect.left + pageXOffset &&
      pointer.pageX <= inputBlockRect.right + pageXOffset &&
      (pointer.pageY >= inputBlockRect.top + pageYOffset &&
        pointer.pageY <= inputBlockRect.bottom + pageYOffset)
    ) {
      pfDraggable.$element.remove();
      self.findSum();
      return true;
    }
    return false;
  }

  isPFinAnswerBlock(pointer, pfDraggable) {
    const self = this,
      inputBlockRect = $(".answerBlock")[0].getBoundingClientRect();
    if (
      pointer.pageX >= inputBlockRect.left + pageXOffset &&
      pointer.pageX <= inputBlockRect.right + pageXOffset &&
      (pointer.pageY >= inputBlockRect.top + pageYOffset &&
        pointer.pageY <= inputBlockRect.bottom + pageYOffset)
    ) {
      self.model.setPFinAnswerBlock(pfDraggable);
      pfDraggable.disable();
      self.findSum();
      return true;
    } else {
      if ($(".properFractionsBlock")[0].contains(pfDraggable.element)) {
        self.model.setPFinProperFractionBlock(pfDraggable);
      } else {
        self.model.setPFinAnswerBlock(pfDraggable);
        return false;
      }
    }
  }

  observeProperFractionBlock() {
    let self = this;
    $(".properFractionsBlock").on("DOMNodeInserted", "canvas", function(event) {
      const pfDOM = $(event.target).parent()[0];
      const properFraction = {
        integer: +pfDOM.getAttribute("data-integer"),
        numerator: +pfDOM.getAttribute("data-numerator"),
        denominator: +pfDOM.getAttribute("data-denominator")
      };
      self.makeProperFractionDraggable(pfDOM, properFraction);
    });
  }

  findSum() {
    let pfAnswer = $(".answerBlock div"),
      properFractions = [],
      commonDenominator,
      numeratorsSum = 0,
      integersSum = 0,
      denominatorMultiples = [],
      result = {};

    if (!pfAnswer.length) {
      this.model.setUserAnswer(false);
      return false;
    }

    for (let i = 0; i < pfAnswer.length; i++) {
      properFractions.push({
        integer: +pfAnswer[i].getAttribute("data-integer"),
        numerator: +pfAnswer[i].getAttribute("data-numerator"),
        denominator: +pfAnswer[i].getAttribute("data-denominator")
      });
    }

    if (properFractions.length === 1) {
      result.integer = properFractions[0].integer;
      result.numerator = properFractions[0].numerator;
      result.denominator = properFractions[0].denominator;
    } else {
      properFractions.forEach(pf => {
        denominatorMultiples.push(
          ArrayUtils.arrayToMap(NumberUtils.findMultiples(pf.denominator))
        );
      });

      commonDenominator = NumberUtils.findLowestCommonDenominator(
        denominatorMultiples
      );

      properFractions.forEach(pf => {
        pf.numerator *= commonDenominator / pf.denominator;
        pf.denominator = commonDenominator;
        numeratorsSum += pf.numerator;
        integersSum += pf.integer;
      });

      result.denominator = commonDenominator;
      if (numeratorsSum >= commonDenominator) {
        result.integer = Math.floor(numeratorsSum / commonDenominator);
        result.numerator = numeratorsSum - result.integer * commonDenominator;
        result.integer += integersSum;
      } else {
        result.integer = integersSum;
        result.numerator = numeratorsSum;
      }
    }

    this.model.setUserAnswer(result);
    return result;
  }

  checkAnswer(complexFraction) {
    var cf = new ComplexFractionService(),
      answer = this.model.getUserAnswer(),
      gameName = this.model.getGameName(),
      result;

    switch (gameName) {
      case "double it":
        result = cf.multiplyComplexFraction(complexFraction, 2);
        break;
      case "tripple it":
        result = cf.multiplyComplexFraction(complexFraction, 3);
        break;
      case "find one-half":
        result = cf.divideComplexFraction(complexFraction, 2);
        break;
      case "find one-third":
        result = cf.divideComplexFraction(complexFraction, 3);
        break;
      default:
        return false;
    }

    if (
      answer.integer === result.integer &&
      answer.numerator === result.numerator &&
      answer.denominator === result.denominator
    ) {
      this.model.setIsAnswerCorrect(true);
    } else {
      this.model.setIsAnswerCorrect(false);
    }
  }

  submitAnswer() {
    let self = this;
    if (document.contains($(".submitAnswer")[0])) {
      $(".submitAnswer")[0].addEventListener("click", function() {
        self.checkAnswer(self.model.getCurrentComplexFraction());
      });
    }
  }
}
