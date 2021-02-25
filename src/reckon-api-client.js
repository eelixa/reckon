const { default: axios } = require("axios");
const axiosRetry = require("axios-retry");

axiosRetry(axios, { retries: 3 });

const RANGE_INFO_URL = "https://join.reckon.com/test1/rangeInfo";
const DIVISOR_INFO_URL = "https://join.reckon.com/test1/divisorInfo";
const SEARCH_TEXT_URL = "https://join.reckon.com/test2/textToSearch";
const SUB_TEXT_URL = "https://join.reckon.com/test2/subTexts";
const SUBMIT_RESULTS_URL = "https://join.reckon.com/test2/submitResults";

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

  async function getSearchText() {
    const response = await axios.get(SEARCH_TEXT_URL);
    return response.data.text;
  }

  async function getSubTexts() {
    const response = await axios.get(SUB_TEXT_URL);
    return response.data.subTexts;
  }

  async function submitSearchResults(searchResults) {
    await axios.post(SUBMIT_RESULTS_URL, searchResults);
  }

  return {
    getRangeInfo,
    getDivisorInfo,
    getSearchText,
    getSubTexts,
    submitSearchResults,
  };
};

module.exports = {
  create,
};
