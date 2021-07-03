const { describe, expect, it } = require("@jest/globals")
const { calculateMedianAndModa, calculateQuadraticEquation } = require("./math")

const invalidDataTypes = { object: "{}", array: "[]", string: "some string", number: 1, boolean: false, undefined: "undefined" }

describe("Test Math Functions", () => {
  describe("Calculate Median and Moda Function", () => {
    Object.keys(invalidDataTypes).forEach((key) => {
      it(`${invalidDataTypes[key]} should return an error`, () => {
        const result = calculateMedianAndModa(invalidDataTypes[key])
        expect(typeof result).toBe("string")
        expect(result).toBe("Input should be an array with numbers")
      })
    })
    it("[10, 2, 5, 3, 6, 5, 9, 8, 7] should return object with median 6, moda 5 and result 30", () => {
      const result = calculateMedianAndModa([10, 2, 5, 3, 6, 5, 9, 8, 7])
      expect(typeof result).toBe("object")
      expect(result).toStrictEqual({ median: 6, moda: 5, result: 30 })
    })
    it("[6, 7, 8, 8, 8, 9, 9, 9, 9, 10] should return object with median 8.5, moda 9 and result 76.5", () => {
      const result = calculateMedianAndModa([6, 7, 8, 8, 8, 9, 9, 9, 9, 10])
      expect(typeof result).toBe("object")
      expect(result).toStrictEqual({ median: 8.5, moda: 9, result: 76.5 })
    })
  })
  describe("Calculate Quadratic Formula", () => {
    it("1x^2 - 2x - 7 should return invalid equation", () => {
      const result = calculateQuadraticEquation("1x^2 - 2x - 7")
      expect(typeof result).toBe("string")
      expect(result).toBe("Invalid equation!")
    })
    it("1x^2 - 2x - 7 = 0 should return object with discriminant 32 and 2 possible solutions", () => {
      const result = calculateQuadraticEquation("1x^2 - 2x - 7 = 0")
      expect(typeof result).toBe("object")
      expect(result).toStrictEqual({ Discriminant: 32, QuadraticFormulaResults: [3.8284271247461903, -1.8284271247461903], Solutions: 2 })
    })
  })
})