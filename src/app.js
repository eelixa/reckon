const express = require("express");

const app = express();
const port = 9999;
const apiClient = require("./reckon-api-client.js").create();
const divisorService = require("./divisor-service.js").create();

const sendSuccessResponse = (res, json) => {
  res.contentType("application/json");
  res.status(200).send(json);
};

const handleRequest = async (req, res) => {
    const [rangeInfo, divisorInfo] = await Promise.all([apiClient.getRangeInfo(), apiClient.getDivisorInfo()]);
    sendSuccessResponse(res, divisorService.getDivisibilityOutput(rangeInfo, divisorInfo));
};

app.get("/", (req, res) => {
  handleRequest(req, res);
});

app.listen(port, () => {});

module.exports = {
  app
}
