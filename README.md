# Reckon test

To run:

`npm start`

This starts an Express server on `http://localhost:9999`.

A ``GET http://localhost:9999`` will return the divisor results.
A ``POST http://localhost:9999`` will submit the text search results to the external API and additionally return the results in the response.

To run the Jest unit tests:

`npm test`

To run ESLint:

`npm run fixcode`

To run Prettier code formatting:

`npm run formatcode`

Notes:
The algorithms used in these tasks are naive implementations and are not optimised. For example, a more efficient (and complex) text search algorithm could be employed if performance was a concern.