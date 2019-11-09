export default class NumberUtils {
  static findPrimes(number) {
    let result = [];
    nextPrime: for (let i = 2; i <= number; i++) {
      for (let j = 2; j < i; j++) {
        if (i % j === 0) continue nextPrime;
      }
      result.push(i);
    }
    return result;
  }

  static findMultiples(number) {
    let result = [],
      primes = this.findPrimes(number);
    for (let i = 0; i < primes.length; i++) {
      if (number % primes[i] === 0) {
        result.push(primes[i]);
        number /= primes[i];
        --i;
      }
    }
    return result;
  }

  static getRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  static findLowestCommonDenominator(arrayOfMaps) {
    const commonMultiples = new Map();
    let result = 1;
    arrayOfMaps.forEach(map => {
      map.forEach((value, key) => {
        if (commonMultiples.has(key)) {
          if (commonMultiples.get(key) < value) {
            commonMultiples.set(key, value);
          }
        } else {
          commonMultiples.set(key, value);
        }
      });
    });
    commonMultiples.forEach((value, key) => {
      result *= Math.pow(key, value);
    });
    return result;
  }
}
