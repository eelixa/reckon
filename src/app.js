const express = require("express");

const app = express();
const apiClient = require("./reckon-api-client.js").create();
const divisorService = require("./divisor-service.js").create();
const searchTextService = require("./text-search-service.js").create();

const PORT = 9999;

const sendSuccessResponse = (res, json) => {
  res.contentType("application/json");
  res.status(200).send(json);
};

const handleTask1Request = async (req, res) => {
  const [rangeInfo, divisorInfo] = await Promise.all([
    apiClient.getRangeInfo(),
    apiClient.getDivisorInfo(),
  ]);
  sendSuccessResponse(
    res,
    divisorService.getDivisibilityOutput(rangeInfo, divisorInfo)
  );
};

const handleTask2Request = async (req, res) => {
  const [searchText, subTexts] = await Promise.all([
    apiClient.getSearchText(),
    apiClient.getSubTexts(),
  ]);
  const results = searchTextService.searchText(searchText, subTexts);
  apiClient.submitSearchResults(results);
  sendSuccessResponse(res, results);
};

app.get("/", (req, res) => {
  handleTask1Request(req, res);
});

app.post("/", (req, res) => {
  handleTask2Request(req, res);
});

app.listen(PORT, () => {});

module.exports = {
  app,
};
