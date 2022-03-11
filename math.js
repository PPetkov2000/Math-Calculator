// Median - The "middle" of a sorted list of numbers
// Moda - The longest sequence of repeated numbers
function calculateMedianAndModa(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return "Input should be an array with numbers"

  const sortedNumbers = numbers.sort((a, b) => a - b);
  const halfLength = (sortedNumbers.length - 1) / 2;
  const median =
    sortedNumbers.length % 2 === 0
      ? sortedNumbers
        .slice(halfLength, halfLength + 2)
        .reduce((a, b) => a + b, 0) / 2
      : sortedNumbers[halfLength];
  const repeats = sortedNumbers.reduce((acc, curr, index, arr) => {
    if (!acc.hasOwnProperty(curr)) {
      acc[curr] = 0;
      if (arr[index + 1] === curr) {
        acc[curr]++;
      }
    } else {
      acc[curr]++;
    }
    return acc;
  }, {});

  const repeatsKeys = Object.keys(repeats);
  let moda = 0;

  if (repeatsKeys.length === 1) {
    moda = Number(repeatsKeys[0]);
  } else {
    let maxValue = 0;
    let maxKey;
    repeatsKeys.forEach((key) => {
      if (repeats[key] > maxValue) {
        maxValue = repeats[key];
        maxKey = Number(key);
      }
    });
    moda = maxKey;
  }

  return { median, moda, result: median * moda };
}

// console.log(calculateMedianAndModa([10, 2, 5, 3, 6, 5, 9, 8, 7]));
// console.log(calculateMedianAndModa([6, 7, 8, 8, 8, 9, 9, 9, 9, 10]));

/* Quadratic Equations */
// Discriminant Formula: b^2 - 4ac
// Quadratic Formula: (-b +/- Math.sqrt(b^2 - 4ac)) / 2a
function calculateQuadraticEquation(input) {
  const quadraticEquationPattern = /^[0-9]+x\^2\s?[-+]\s?[0-9x]+\s?[-+]\s?[0-9]+\s?=\s?0$/g;
  // floating point numbers regex
  // const quadraticEquationPattern = /^([0-9]+x\^2|[0-9]+\.[0-9]+x\^2)\s?[+-]\s?([0-9]+x|[0-9]+\.[0-9]+x)\s?[+-]\s?([0-9]+|[0-9]+\.[0-9]+)\s?=\s?0$/g;
  if (!quadraticEquationPattern.test(input)) return "Invalid equation!";

  function getExpressionValues(expression) {
    const newExpression = expression
      .split("-")
      .map((x) => (x.startsWith(" ") ? x.replace(" ", "-") : x))
      .join(", ")
      .replace(/\s,\s/g, " ");
    return newExpression.split(/\s|\+/).filter((x) => x !== "");
  }
  function getExpressionNumberValues(expressionParts) {
    return expressionParts.map((part) => Number(part.match(/^[-]?[0-9]+/g)[0]));
  }
  function splitExpression(expression) {
    return expression.split(" = ")[0];
  }
  function calculateDiscriminant(a, b, c) {
    return Math.pow(b, 2) - 4 * a * c;
  }
  function calculateQuadraticFormula(a, b, c) {
    const result1 = (-b + Math.sqrt(calculateDiscriminant(a, b, c))) / (2 * a);
    const result2 = (-b - Math.sqrt(calculateDiscriminant(a, b, c))) / (2 * a);
    return [result1, result2];
  }

  const expression = splitExpression(input);
  const expressionValues = getExpressionValues(expression);
  const expressionNumberValues = getExpressionNumberValues(expressionValues);
  const discriminant = calculateDiscriminant(...expressionNumberValues);
  const quadraticFormulaResults = calculateQuadraticFormula(...expressionNumberValues);
  // console.log("Expression:", expression);
  // console.log("Expression Values:", expressionValues);
  // console.log("Expression Number Values:", expressionNumberValues);
  return {
    Discriminant: discriminant,
    QuadraticFormulaResults: discriminant > 0 ? quadraticFormulaResults : "No results",
    Solutions: discriminant > 0 ? 2 : discriminant === 0 ? 1 : 0,
  };
}

// console.log(calculateQuadraticEquation("2x^2 + 8x + 4 = 0"));
// console.log(calculateQuadraticEquation("3x^2 + 24x + 48 = 0"));
// console.log(calculateQuadraticEquation("6x^2 + 10x - 1 = 0"));
// console.log(calculateQuadraticEquation("2x^2 - 7x + 3 = 0"));
// console.log(calculateQuadraticEquation("5x^2 + 3x + 3 = 0"));
// console.log(calculateQuadraticEquation("5x^2 + 6x + 1 = 0"));
// console.log(calculateQuadraticEquation("5x^2 + 2x + 1 = 0")); 
// console.log(calculateQuadraticEquation("1x^2 - 4x + 6.25 = 0")); // Does not support floating point numbers yet
// console.log(calculateQuadraticEquation("1x^2 - 2x - 7 = 0"));

// 3.8284271247461903 * -1.8284271247461903 + Math.pow(3.8284271247461903, 2) + Math.pow(-1.8284271247461903, 2) = 11 // Correct
// x1 + x2 = -b / a;
// x1 * x2 = c / a;
const result = calculateQuadraticEquation("1x^2 - 2x - 7 = 0");
const [x1, x2] = result.QuadraticFormulaResults;
console.log(x1 + x2, 2 / 1);
console.log(x1 * x2, -7 / 1);

module.exports = { calculateMedianAndModa, calculateQuadraticEquation };