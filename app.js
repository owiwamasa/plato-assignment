const {getCsvData, combineMarksTestsAndCourses, checkCourseWeights, studentToJson} = require('./utils')

const csvFiles = process.argv.slice(2);

function csvToJson(csvFiles){
    const { courses, students, tests, marks } = getCsvData(csvFiles)
    const combinedMarks = combineMarksTestsAndCourses(marks, tests, courses)
    const jsonOutput = { "students": [] }

    if (!checkCourseWeights(tests)) return { "error": "Invalid course weights" }

    for (let key in students) {
        let student = studentToJson(students[key], combinedMarks)
        jsonOutput["students"].push(student)
    }
    return JSON.stringify(jsonOutput)
}

csvToJson(csvFiles)
