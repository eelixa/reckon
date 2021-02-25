const create = () => {
  const formatResults = (subText, resultsList) => {
    if (resultsList.length === 0) {
      return {
        subtext: subText,
        result: "<No Output>",
      };
    }

    return {
      subtext: subText,
      result: resultsList.join(", "),
    };
  };

  const candidateFullyMatches = (text, subText, startingTextPos) => {
    for (let j = 1; j < subText.length; j += 1) {
      if (
        text[startingTextPos + j].toUpperCase() !== subText[j].toUpperCase()
      ) {
        return false;
      }
    }
    return true;
  };

  const findMatches = (text, subText) => {
    const matches = [];
    for (let i = 0; i < text.length; i += 1) {
      const possibleCandidate =
        text[i].toUpperCase() === subText[0].toUpperCase();
      if (possibleCandidate) {
        const candidateDoesNotFitInRemainingLength =
          i + subText.length > text.length;
        if (candidateDoesNotFitInRemainingLength) {
          return matches;
        }
        const matchFound = candidateFullyMatches(text, subText, i);
        if (matchFound) {
          // use 1-based indexes
          matches.push(i + 1);
        }
      }
    }
    return matches;
  };

  const searchText = (text, subTexts) => {
    const results = subTexts.map((subText) =>
      formatResults(subText, findMatches(text, subText))
    );

    return {
      candidate: "Aaron Parkes",
      text: text,
      results: results,
    };
  };

  return {
    searchText,
  };
};

module.exports = {
  create,
};
