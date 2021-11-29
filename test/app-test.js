const chai = require("chai");
const expect = chai.expect;

const { getCsvData, parseCsvData, convertArrayToObj, checkCourseWeights, combineMarksTestsAndCourses, studentToJson } = require("../utils.js");
const { csvToJson } = require("../app.js")
const csvFiles = ['test-csv-files/courses.csv', 'test-csv-files/students.csv', 'test-csv-files/tests.csv', 'test-csv-files/marks.csv']


describe("getCsvData(csvFiles)", () => {
    context("should return a single object containing multiple objects, one for each csv file", () => {

      // Tests for "courses"
      it('should contain a key "courses"', () => {
        let expected = true;
        let csvObject = getCsvData(csvFiles);
        let actual = csvObject.courses !== undefined

        expect(actual).to.equal(expected);
      })
      it('courses object should contain 3 courses', () => {
        let expected = 3;
        let csvObject = getCsvData(csvFiles);
        let actual = Object.keys(csvObject["courses"]).length

        expect(actual).to.equal(expected);
      })

      //Tests for "students"
      it('should contain a key "students"', () => {
        let expected = true;
        let csvObject = getCsvData(csvFiles);
        let actual = csvObject.students !== undefined

        expect(actual).to.equal(expected);
      })
      it('courses object should contain 3 courses', () => {
        let expected = 3;
        let csvObject = getCsvData(csvFiles);
        let actual = Object.keys(csvObject.students).length

        expect(actual).to.equal(expected);
      })

      //Tests for "tests"
      it('should contain a key "tests"', () => {
        let expected = true;
        let csvObject = getCsvData(csvFiles);
        let actual = csvObject.tests !== undefined

        expect(actual).to.equal(expected);
      })
      it('courses object should contain 7 tests', () => {
        let expected = 7;
        let csvObject = getCsvData(csvFiles);
        let actual = Object.keys(csvObject.tests).length

        expect(actual).to.equal(expected);
      })

      //Tests for "marks"
      it('should contain a key "marks"', () => {
        let expected = true;
        let csvObject = getCsvData(csvFiles);
        let actual = csvObject.marks !== undefined

        expect(actual).to.equal(expected);
      })
      it('courses object should contain 19 marks', () => {
        let expected = 19;
        let csvObject = getCsvData(csvFiles);
        let actual = Object.keys(csvObject.marks).length

        expect(actual).to.equal(expected);
      })
    });
  });

describe("checkCourseWeights(tests)", () => {
    const tests1 = {
        '1': { id: '1', course_id: '1', weight: '10' },
        '2': { id: '2', course_id: '1', weight: '40' },
        '3': { id: '3', course_id: '1', weight: '50' },
        '4': { id: '4', course_id: '2', weight: '40' },
        '5': { id: '5', course_id: '2', weight: '60' },
        '6': { id: '6', course_id: '3', weight: '90' },
        '7': { id: '7', course_id: '3', weight: '10' }
      }
    const tests2 = {
        '1': { id: '1', course_id: '1', weight: '10' },
        '2': { id: '2', course_id: '1', weight: '40' },
        '3': { id: '3', course_id: '1', weight: '40' },
        '4': { id: '4', course_id: '2', weight: '40' },
        '5': { id: '5', course_id: '2', weight: '10' },
        '6': { id: '6', course_id: '3', weight: '90' },
        '7': { id: '7', course_id: '3', weight: '10' }
      }

    context("testing if test weights for each course add up to 100", () => {
        it('should return true, if all test weights for each course add up to 100', () => {
        let expected = true;
        let actual = checkCourseWeights(tests1);

        expect(actual).to.equal(expected);
        })
        it('should return false, if all test weights for each course do not add up to 100', () => {
        let expected = false;
        let actual = checkCourseWeights(tests2);

        expect(actual).to.equal(expected);
        })

    });
});

describe("combineMarksTestsAndCourses(marks, tests, courses)", () => {
    const tests1 = {
        '1': { id: '1', course_id: '1', weight: '10' },
        '2': { id: '2', course_id: '1', weight: '40' },
        '3': { id: '3', course_id: '1', weight: '50' },
        '4': { id: '4', course_id: '2', weight: '40' },
        '5': { id: '5', course_id: '2', weight: '60' },
        '6': { id: '6', course_id: '3', weight: '90' },
        '7': { id: '7', course_id: '3', weight: '10' }
      }

    context("should add ", () => {
        it('should return true, if all test weights for each course add up to 100', () => {
        let expected = true;
        let actual = checkCourseWeights(tests1);

        expect(actual).to.equal(expected);
        })
        it('should return false, if all test weights for each course do not add up to 100', () => {
        let expected = false;
        let actual = checkCourseWeights(tests2);

        expect(actual).to.equal(expected);
        })

    });
});
