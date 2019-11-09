import ComplexFractionService from "./complexFractionService.js";

export default class properFractionService {
  generateProperFractions(complexFraction, typeOfGame) {
    let cf = Object.assign({}, complexFraction),
      cfService = new ComplexFractionService(),
      answer,
      properFractions = [
        {
          integer: 1,
          numerator: 0,
          denominator: cf.denominator
        },
        {
          integer: 0,
          numerator: 1,
          denominator: cf.denominator
        }
      ];

    switch (typeOfGame) {
      case "double it":
        answer = cfService.multiplyComplexFraction(cf, 2);
        break;
      case "tripple it":
        answer = cfService.multiplyComplexFraction(cf, 3);
        break;
      case "find one-half":
        answer = cfService.divideComplexFraction(cf, 2);
        break;
      case "find one-third":
        answer = cfService.divideComplexFraction(cf, 3);
        break;
      default:
        console.log("error in proper fraction generating");
        return;
    }
    if (answer.denominator !== cf.denominator) {
      properFractions[0].denominator = answer.denominator;
      properFractions.push({
        integer: 0,
        numerator: 1,
        denominator: answer.denominator
      });
    } else if (answer.denominator === cf.denominator && cf.denominator === 2) {
      properFractions.push({
        integer: 0,
        numerator: 1,
        denominator: 3
      });
    } else if (answer.denominator === cf.denominator && cf.denominator === 3) {
      properFractions.push({
        integer: 0,
        numerator: 1,
        denominator: 2
      });
    } else {
      properFractions.push({
        integer: 0,
        numerator: 1,
        denominator: cf.denominator - 1
      });
    }

    return properFractions;
  }
}
