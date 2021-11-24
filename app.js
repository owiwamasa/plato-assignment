const utils = require('./utils')

const csvFiles = process.argv.slice(2);

function csvToJson(csvFiles){
    const { courses, students, tests, marks } = utils.getCsvData(csvFiles)
    const combinedMarks = utils.combineMarksTestsAndCourses(marks, tests, courses)
    const jsonOutput = { "students": [] }

    if (!utils.checkCourseWeights(tests)) return { "error": "Invalid course weights" }

    for (let key in students) {
        let student = utils.studentToJson(students[key], combinedMarks)
        jsonOutput["students"].push(student)
    }
    return JSON.stringify(jsonOutput)
}

csvToJson(csvFiles)
