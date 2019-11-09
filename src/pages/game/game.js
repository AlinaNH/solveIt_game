import GameModel from "./gameModel.js";
import GameView from "./gameView.js";
import GameController from "./gameController.js";

let gameController = new GameController(),
  gameModel = new GameModel(),
  gameView = new GameView();

gameModel.init(gameView);
gameController.init($("#content"), gameModel);
gameView.init($("#content"), gameModel);
