const chai = require("chai");
const expect = chai.expect;

const { getCsvData, parseCsvData, convertArrayToObj, checkCourseWeights, combineMarksTestsAndCourses, studentToJson } = require("../utils.js");
const { csvToJson } = require("../app.js")
const coursesCsv = "../test-csv-files/courses.csv"
const marksCsv = "../test-csv-files/marks.csv"
const studentsCsv = "../test-csv-files/students.csv"
const testsCsv = "../test-csv-files/tests.csv"

const csvFiles = [coursesCsv, studentsCsv, testsCsv, marksCsv]

describe("getCsvData(csvFiles)", () => {
    it("should return a single object containing multiple objects, one for each csv file", () => {
      it('should contain a key "courses"', () => {
        //Arrange
        const expected = true;
        //Act
        const csvObject = getCsvData(csvFiles);
        const actual = csvObject.courses !== undefined
        //Assert
        expect(actual).to.equal(expected);
      })
      it('courses object should contain 3 courses', () => {
        const expected = 3;
        //Act
        const csvObject = getCsvData(csvFiles);
        const actual = csvObject.courses.keys().length()
        //Assert
        expect(actual).to.equal(expected);
      })

    });
  });
