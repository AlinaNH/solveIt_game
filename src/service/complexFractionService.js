import NumberUtils from "./../utils/numberUtils.js";
import Fraction from "./../entities/fraction.js";

export default class complexFractionService {
  generateComplexFractions(calculationType) {
    const dataForDoubleIt = {
      amount: 6,
      minInteger: 0,
      maxInteger: 4,
      minNumerator: 0,
      maxNumerator: 8
    };
    const dataForTrippleIt = {
      amount: 6,
      minInteger: 0,
      maxInteger: 4,
      minNumerator: 0,
      maxNumerator: 4
    };
    const dataForFindOneHalf = {
      amount: 6,
      minInteger: 0,
      maxInteger: 13,
      minNumerator: 0,
      maxNumerator: 3
    };
    const dataForFindOneThird = {
      amount: 6,
      minInteger: 0,
      maxInteger: 15,
      minNumerator: 0,
      maxNumerator: 3
    };

    let data, denominators;
    switch (calculationType) {
      case "double it":
        data = dataForDoubleIt;
        denominators = [2, 3, 4, 6, 8];
        break;
      case "tripple it":
        data = dataForTrippleIt;
        denominators = [2, 3, 4, 6, 8];
        break;
      case "find one-half":
        data = dataForFindOneHalf;
        denominators = [2, 3, 4];
        break;
      case "find one-third":
        data = dataForFindOneThird;
        denominators = [2, 4, 8];
        break;
      default:
        console.log("error in generating complex fraction");
        return;
    }

    let amount = data.amount,
      integer,
      numerator,
      randomDenominator,
      denominator,
      complexFraction,
      complexFractions = [];

    for (let i = 0; i <= amount; i++) {
      integer = NumberUtils.getRandomInteger(data.minInteger, data.maxInteger);
      numerator = NumberUtils.getRandomInteger(
        data.minNumerator,
        data.maxNumerator
      );

      randomDenominator = NumberUtils.getRandomInteger(
        0,
        denominators.length - 1
      );
      denominator = denominators[randomDenominator];

      while (numerator >= denominator) {
        numerator = NumberUtils.getRandomInteger(
          data.minNumerator,
          data.maxNumerator
        );
      }

      while (integer === 0 && numerator === 0) {
        integer = NumberUtils.getRandomInteger(
          data.minInteger,
          data.maxInteger
        );
        numerator = NumberUtils.getRandomInteger(
          data.minNumerator,
          data.maxNumerator
        );

        while (numerator >= denominator) {
          numerator = NumberUtils.getRandomInteger(
            data.minNumerator,
            data.maxNumerator
          );
        }

        if (integer !== 0 && numerator === 0) {
          denominator = 2;
        }
      }

      complexFraction = new Fraction(integer, numerator, denominator);
      complexFractions.push(complexFraction);
    }

    complexFractions.forEach(cf => this.checkingMultiplicity(cf));

    return complexFractions;
  }

  checkingMultiplicity(complexFraction) {
    let cf = Object.assign({}, complexFraction),
      result = Object.assign({}, complexFraction),
      biggestCommonDivider,
      numeratorMultiples = NumberUtils.findMultiples(cf.numerator),
      denominatorMultiples = NumberUtils.findMultiples(cf.denominator),
      commonDividers = numeratorMultiples.filter(numeratorPrime => {
        var commonDivider = denominatorMultiples.indexOf(numeratorPrime) >= 0;
        if (commonDivider) {
          var cd = denominatorMultiples.indexOf(numeratorPrime);
          denominatorMultiples.splice(cd, 1);
          return true;
        }
      });

    if (commonDividers.length) {
      biggestCommonDivider = commonDividers.reduce((reducer, divider) => {
        return reducer * divider;
      }, 1);
      result.numerator /= biggestCommonDivider;
      result.denominator /= biggestCommonDivider;
    }

    return result;
  }

  multiplyComplexFraction(complexFraction, multiplier) {
    let cf = Object.assign({}, complexFraction),
      result = {};

    result.denominator = cf.denominator;
    cf.numerator = (cf.numerator + cf.integer * cf.denominator) * multiplier;
    result.integer = Math.floor(cf.numerator / cf.denominator);
    result.numerator =
      cf.numerator - Math.floor(result.integer * cf.denominator);
    return this.checkingMultiplicity(result);
  }

  divideComplexFraction(complexFraction, divider) {
    let cf = Object.assign({}, complexFraction),
      result = {};

    cf.numerator = cf.numerator + cf.integer * cf.denominator;
    result.denominator = cf.denominator * divider;
    result.integer = Math.floor(cf.numerator / result.denominator);
    result.numerator =
      cf.numerator - Math.floor(result.integer * result.denominator);
    return this.checkingMultiplicity(result);
  }
}
