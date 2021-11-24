const utils = require('./utils')

const csvFiles = process.argv.slice(2);

function csvToJson(csvFiles){
    const { courses, students, tests, marks } = utils.getCsvData(csvFiles)
    const combinedMarks = utils.combineMarksTestsAndCourses(marks, tests, courses)
    const jsonOutput = { "students": [] }

    if (!utils.checkCourseWeights(tests)) return { "error": "Invalid course weights" }
    console.log(students)
    for (let i = 0; i < students.length; i++) {
        console.log('here')
        let student = utils.studentToJson(students[i], combinedMarks)
        jsonOutput["students"].push(student)
    }
    return jsonOutput
}

console.log(csvToJson(csvFiles))
