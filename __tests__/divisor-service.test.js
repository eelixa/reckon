const divisorService = require("../src/divisor-service.js").create();

it("should return divisibility for zero range", () => {
  const rangeInfo = {
    lower: 1,
    upper: 1,
  };

  const divisorInfo = [
    {
      divisor: 2,
      output: "two",
    },
  ];

  const divisibilityOutput = divisorService.getDivisibilityOutput(
    rangeInfo,
    divisorInfo
  );

  expect(divisibilityOutput).toStrictEqual({
    1: ""
  });
});

it("should return divisibility for no divisors", () => {
  const rangeInfo = {
    lower: 1,
    upper: 2,
  };

  const divisorInfo = [
  ];

  const divisibilityOutput = divisorService.getDivisibilityOutput(
    rangeInfo,
    divisorInfo
  );

  expect(divisibilityOutput).toStrictEqual({
    1: "",
    2: ""
  });
});

it("should return divisibility for single divisor", () => {
  const rangeInfo = {
    lower: 1,
    upper: 5,
  };

  const divisorInfo = [
    {
      divisor: 2,
      output: "two",
    },
  ];

  const divisibilityOutput = divisorService.getDivisibilityOutput(
    rangeInfo,
    divisorInfo
  );

  expect(divisibilityOutput).toStrictEqual({
    1: "",
    2: "two",
    3: "",
    4: "two",
    5: "",
  });
});

it("should return divisibility for multiple divisors", () => {
  const rangeInfo = {
    lower: 1,
    upper: 4,
  };

  const divisorInfo = [
    {
      divisor: 1,
      output: "one",
    },
    {
      divisor: 2,
      output: "two",
    }
  ];

  const divisibilityOutput = divisorService.getDivisibilityOutput(
    rangeInfo,
    divisorInfo
  );

  expect(divisibilityOutput).toStrictEqual({
    1: "one",
    2: "onetwo",
    3: "one",
    4: "onetwo"
  });
});

