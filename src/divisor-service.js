const R = require("ramda");

const create = () => {
  const extractDivisorOutput = (divisorLine) => ({
    [divisorLine.divisor]: divisorLine.output,
  });

  const buildDivisorMap = R.pipe(
    R.map(extractDivisorOutput),
    R.mergeAll
    );

  const isDivisibleBy = (number, divisor) => number % divisor === 0;

  const getDivisibilityStringForNumber = (divisorMap, number) => {
    const divisors = R.filter(
      R.curry(isDivisibleBy)(number),
      R.keys(divisorMap)
    );
    
    return R.reduce(
      (existingDivisorString, newDivisorString) =>
        existingDivisorString + R.path([newDivisorString], divisorMap),
      "",
      divisors
    );
  };

  const getDivisibilityOutput = (rangeInfo, divisorInput) => {
    const divisorMap = buildDivisorMap(divisorInput);

    const allNumbersInRange = R.range(rangeInfo.lower, rangeInfo.upper + 1);

    return R.mergeAll(
      R.map(
        (number) => ({
          [number]: getDivisibilityStringForNumber(divisorMap, number),
        }),
        allNumbersInRange
      )
    );
  };

  return {
    getDivisibilityOutput,
  };
};

module.exports = {
  create,
};
