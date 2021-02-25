const searchService = require("../src/text-search-service.js").create();

it("should return single match at start of string", () => {
  const text = "Sample text";

  const subTexts = ["Sam"];

  const searchResult = searchService.searchText(text, subTexts);

  expect(searchResult.results).toStrictEqual([
    {
      subtext: "Sam",
      result: "1",
    },
  ]);
});

it("should return single match when repeated starting characters present", () => {
  const text = "Sososessos";

  const subTexts = ["sose"];

  const searchResult = searchService.searchText(text, subTexts);

  expect(searchResult.results).toStrictEqual([
    {
      subtext: "sose",
      result: "3",
    },
  ]);
});

it("should return single match at end of string", () => {
  const text = "Sample text";

  const subTexts = ["text"];

  const searchResult = searchService.searchText(text, subTexts);

  expect(searchResult.results).toStrictEqual([
    {
      subtext: "text",
      result: "8",
    },
  ]);
});

it("should return empty list if no matches found", () => {
  const text = "Sample text";

  const subTexts = ["texting"];

  const searchResult = searchService.searchText(text, subTexts);

  expect(searchResult.results).toStrictEqual([
    {
      subtext: "texting",
      result: "<No Output>",
    },
  ]);
});

it("should return multiple matches", () => {
  const text = "happy happy happy";

  const subTexts = ["happy"];

  const searchResult = searchService.searchText(text, subTexts);

  expect(searchResult.results).toStrictEqual([
    {
      subtext: "happy",
      result: "1, 7, 13",
    },
  ]);
});

it("should return case insensitive matches", () => {
  const text = "case does nOt matter";

  const subTexts = ["NoT"];

  const searchResult = searchService.searchText(text, subTexts);

  expect(searchResult.results).toStrictEqual([
    {
      subtext: "NoT",
      result: "11",
    },
  ]);
});

it("should return matches for multiple subtexts", () => {
  const text =
    "Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!";

  const subTexts = ["Peter", "peter", "Pick", "Pi", "Z"];

  const searchResult = searchService.searchText(text, subTexts);

  expect(searchResult.results).toStrictEqual([
    {
      subtext: "Peter",
      result: "1, 43, 98",
    },
    {
      subtext: "peter",
      result: "1, 43, 98",
    },
    {
      subtext: "Pick",
      result: "53, 81",
    },
    {
      subtext: "Pi",
      result: "53, 60, 66, 74, 81",
    },
    {
      subtext: "Z",
      result: "<No Output>",
    },
  ]);
});
