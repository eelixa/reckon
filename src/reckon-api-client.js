const { default: axios } = require("axios");
const axiosRetry = require('axios-retry');

axiosRetry(axios, { retries: 3 });

const RANGE_INFO_URL = "https://join.reckon.com/test1/rangeInfo";
const DIVISOR_INFO_URL = "https://join.reckon.com/test1/divisorInfo";

const create = () => {
  async function getRangeInfo() {
      const response = await axios.get(RANGE_INFO_URL);

      return {
        lower: response.data.lower,
        upper: response.data.upper,
      };
  }

  async function getDivisorInfo() {
      const response = await axios.get(DIVISOR_INFO_URL);
      const divisors = response.data.outputDetails.map((outputDetail) => ({
        divisor: outputDetail.divisor,
        output: outputDetail.output,
      }));
  
      return divisors;
  }

  return {
    getRangeInfo,
    getDivisorInfo,
  };
};

module.exports = {
  create,
};
