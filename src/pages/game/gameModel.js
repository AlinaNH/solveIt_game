export default class GameModel {
  init(view) {
    this.view = view;

    this.gameStart = null;
    this.gameFinish = null;

    this.gameName = null;
    this.complexFractions = [];
    this.round = -1;
    this.currentComplexFraction = this.complexFractions[this.round];

    this.pfList = [];
    this.isPFinAnswerBlock = null;

    this.userAnswer = null;
    this.isAnswerCorrect = false;

    this.setGameStart();
  }

  getGameStart() {
    return this.gameStart;
  }

  setGameStart() {
    this.gameStart = Date.now();
  }

  getGameFinish() {
    return this.gameFinish;
  }

  setGameFinish() {
    this.gameFinish = Date.now();
    if (!localStorage.lastGameScore) {
      localStorage.lastGameScore = new Date(
        this.getGameFinish() - this.getGameStart()
      ).getSeconds();
    } else {
      localStorage.previousGameScore = localStorage.lastGameScore;
      localStorage.lastGameScore = new Date(
        this.getGameFinish() - this.getGameStart()
      ).getSeconds();
    }
  }

  getGameName() {
    return this.gameName;
  }

  setGameName(gameName) {
    this.gameName = gameName;
  }

  getComplexFractions() {
    return this.complexFractions;
  }

  setComplexFractions(complexFractions) {
    this.complexFractions = complexFractions;
    this.setCurrentComplexFraction();
  }

  getRound() {
    return this.round;
  }

  getCurrentComplexFraction() {
    return this.currentComplexFraction;
  }

  setCurrentComplexFraction() {
    this.currentComplexFraction = this.complexFractions[++this.round];
  }

  getPfList() {
    return this.pfList;
  }

  setPfinPfList(pf) {
    this.pfList.push(pf);
  }

  getIsPFinAnswerBlock() {
    return this.isPFinAnswerBlock;
  }

  setPFinAnswerBlock(pfDraggable) {
    this.isPFinAnswerBlock = pfDraggable;
    if (pfDraggable !== null) {
      this.view.makeDraggableCopyPF(pfDraggable);
      this.view.positionPFinAnswerBlock();
    }
  }
  setPFinProperFractionBlock(pfDraggable) {
    this.view.makeDraggableCopyPF(pfDraggable);
    pfDraggable.$element.detach();
  }

  getUserAnswer() {
    return this.userAnswer;
  }

  setUserAnswer(fraction) {
    this.userAnswer = fraction;
    this.view.showUserAnswer();
  }

  getIsAnswerCorrect() {
    return this.isAnswerRight;
  }

  setIsAnswerCorrect(result) {
    this.isAnswerRight = result;
    this.view.showAnswer();
  }
}
