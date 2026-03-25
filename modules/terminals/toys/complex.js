export class ComplexNumber {
  constructor(realPortion, imagPortion) {
    this.real = realPortion;
    this.imag = imagPortion;
  }

  toString() {
    let imagPortion;
    if (this.imag < 0) {
      imagPortion = " - " + this.imag * -1 + "i";
    } else if (this.imag == 0) {
      imagPortion = "";
    } else {
      imagPortion = " + " + this.imag + "i";
    }

    return `${this.real}${imagPortion}`;
  }

  isEqualTo(other) {
    return this.real == other.real && this.imag == other.imag;
  }

  add(other) {

    if (typeof(other) != 'object') { // if is number
      return new ComplexNumber(
        this.real + other,
        this.imag
      );
    }

    return new ComplexNumber(
      this.real + other.real,
      this.imag + other.imag 
    );
  }

  subtract(other) {
    return new ComplexNumber(
      this.real - other.real,
      this.imag - other.imag
    );
  }

  multiply(other) {
    // ex:
    // (2i, 4) * (-3i, -4)

    let firstPart = this.imag * other.imag * -1;  // 2i * -3i => 6
    let secondPart = this.imag * other.real;      // 2i * -4 => -8i
    let thirdPart = this.real * other.imag;       // -3i * 4 => -12i
    let fourthPart = this.real * other.real;      // 4 * -4  => -16

    let newImag = secondPart + thirdPart;         // -8i + -12i
    let newReal = firstPart + fourthPart;         // 6 + (-16)

    return new ComplexNumber(newReal, newImag);   // -20i - 10
  }

  divide(other) {
    const denom = other.real ** 2 + other.imag ** 2;
    if (denom === 0) { return NaN };

    // simplified based on 'complex division' formula
    // a + bi / c + di
    // (ac + bd) + (i)(bc - ad) / c^2 + d^2

    // bd has i removed since it canceled
    // (ac + bd)
    let realChunk = this.real * other.real + this.imag * other.imag;
    // (bc - ad)
    let imagChunk = this.imag * other.real - this.real * other.imag;

    return new ComplexNumber(realChunk / denom, imagChunk / denom);
  }

  pow(factor) {
    // ie. (4i - 2) ^ 3
    
    if (factor == 0) return 1;

    let result = new ComplexNumber(this.real, this.imag);

    if (factor == 1) return result;

    for (let i=0; i < factor - 1; i++) {
      result = result.multiply(this);
    }

    return result
  }
}

function testRegularOperators() {
  let tests = {
    "add": [
      [
        [0, 1], [-2, 1], [-2, 2]
      ],
      [
        [12, 5], [3, -4], [15, 1]
      ]
    ],
    "subtract": [
      [
        [-3, -1], [-6, -7], [3, 6]
      ],
      [
        [1, 4], [-16, 9], [17, -5]
      ],
    ],
    "multiply": [
      [
        [4, -5], [12, 11], [103, -16]
      ],
      [
        [0, 8], [10, 2], [-16, 80]
      ]
    ],
    "divide": [
      [
        [7, -1], [2, 10], [1/26, -9/13]
      ],
      [
        [6, 7], [8, -1], [41/65, 62/65]
      ],
      [
        [1, 5], [0, -3], [-5/3, 1/3]
      ],
      [
        [3, 2], [0, 0], NaN
      ]
    ]
  };

  let totalTests = 0;
  let testsPassed = 0;
 
  // add, subtract, multiply, divide
  for (var [testType, testList] of Object.entries(tests)) {
    for (var test of testList) {
      totalTests ++;

      let [term1, term2, term3] = test;

      let num1 = new ComplexNumber(term1[0], term1[1]);
      let num2 = new ComplexNumber(term2[0], term2[1]);

      let resultNum;

      if (isNaN(term3)) {
        resultNum = NaN;
      } else {
        resultNum = new ComplexNumber(term3[0], term3[1]);
      };

      let testVal;
      switch (testType) {
        case "add":
          testVal = num1.add(num2);
          break;
        case "subtract":
          testVal = num1.subtract(num2);
          break
        case "multiply":
          testVal = num1.multiply(num2);
          break
        case "divide":
          testVal = num1.divide(num2);
          break

        default:
          throw new Error("unknown test type.");
      }
      
      let success;
      if (isNaN(testVal)) {
        success = isNaN(resultNum);
      } else {
        success = testVal.isEqualTo(resultNum);
      }

      if (success) { 
        testsPassed ++;
      } else {
        console.error(
          `Test FAILED for: function ${testType} with args: ( ${num1.toString()} | ${num2.toString()} ). \n` +
          `Got: ${testVal}, Expected: ${resultNum}`
        )
      }
    }
  };

  return {totalTests: totalTests, passed: testsPassed};
}

function testPows() {
  let tests = [
    [
      [-2, 4], 2, [-12, -16],
      [3, 5], 3, [-198, 10],
      [-2, -3], 5, [122, 597],
    ]
  ];

  let testsPassed = 0;

  for (var test of tests) {
    let [term1, pow, term3] = test;

    let num1 = new ComplexNumber(term1[0], term1[1]);
    let resultNum = new ComplexNumber(term3[0], term3[1]);

    let testVal = num1.pow(pow);

    let success = testVal.isEqualTo(resultNum);
    if (success) { 
      testsPassed ++;
    } else {
      console.error(
        `Test FAILED for: function pow with args: ( ${num1.toString()} | ${pow} ). \n` +
        `Got: ${testVal.toString()}, Expected: ${resultNum.toString()}`
      )
    }
  }

  return {totalTests: tests.length, passed: testsPassed};
}

function test() {
  // TODO
  // Need to add tests for all the decimals
  // for each test, first two are params and third is result
  //
  // need to add tests for adding non complex numbers to complex ones
  
  // add, subtract, multiply, divide
  let regularTestResults = testRegularOperators();
  let regularTestCount = regularTestResults.totalTests;
  let regularTestsPassed = regularTestResults.passed;

  // powers
  let powResults = testPows();
  let powTestCount = regularTestResults.totalTests;
  let powTestsPassed = regularTestResults.passed;

  let totalTests = regularTestCount + powTestCount;
  let totalPassed = regularTestsPassed + powTestsPassed;

  console.log(`Tests Passed: ${totalPassed}/${totalTests}`);
}

//test();
