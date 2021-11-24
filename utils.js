const fs = require('fs');


// Parse CSV data to JavaScript Objects
function getCsvData(csvFiles){
    const { coursesArr, studentsArr, testsArr, marksArr } = parseCsvData(csvFiles)
    const courses = convertArrayToObj(coursesArr)
    const students = convertArrayToObj(studentsArr)
    const tests = convertArrayToObj(testsArr)
    const marks = convertArrayToObj(marksArr, true)

    return {courses, students, tests, marks}
}

//Parsing Cvs data and separating into arrays
function parseCsvData(csvFiles) {
    let coursesArr;
    let studentsArr;
    let testsArr;
    let marksArr;

    for (let i = 0; i < csvFiles.length; i++) {
        let file = csvFiles[i]
        let csv = fs.readFileSync(file)
        let arr = csv.toString().split(/\r|\n/)
        if (i === 0) coursesArr = arr
        if (i === 1) studentsArr = arr
        if (i === 2) testsArr = arr
        if (i === 3) marksArr = arr
    }

    return { coursesArr, studentsArr, testsArr, marksArr }
}

// Converting arrays from parseCsvData function into objects
function convertArrayToObj(arr, isMarks){
    const res = {}
    const titles = arr[0].split(',')
    for (let i = 1; i < arr.length; i++) {
        let str = arr[i]
        if (str === '') continue
        let data = str.split(',')
        let obj = {}
        for (let j = 0; j < data.length; j++) {
            obj[titles[j]] = data[j]
        }
        if (!isMarks) {
            res[data[0]] = obj
        } else {
            res[i] = obj
        }
    }
    return res
}


// Check for valid course weights
function checkCourseWeights(tests) {
    const courseWeights = {}
    for (let i = 0; i < tests.length; i++) {
        let test = tests[i]
        let course_id = test.course_id
        let weight = Number(test.weight)
        if (!courseWeights[course_id]) {
            courseWeights[course_id] = weight
        } else {
            courseWeights[course_id] += weight
        }
    }
    for (let key in courseWeights) {
        if (courseWeights[key] !== 100) return false
    }
    return true
}


//Combine Marks, Tests, and Courses Objects
function combineMarksTestsAndCourses(marks, tests, courses){
    for (let key in marks) {
        let markTest_id = marks[key]["test_id"]
        //Adds weight column to marks with appropriate value
        marks[key]["weight"] = tests[markTest_id]["weight"]
        //Adds course name and teacher to marks object
        let course_id = tests[markTest_id]["course_id"]
        let name = courses[course_id]["name"]
        let teacher = courses[course_id]["teacher"]
        marks[key]["name"] = name
        marks[key]["teacher"] = teacher
        marks[key]["course_id"] = course_id
    }
    return marks
}


//Create student JSON object
function studentToJson(student, marks) {
    const courses = {}
    for (let key in marks) {
        let markStudent_id = marks[key]["student_id"]
        let markCourse_id = marks[key]["course_id"]
        let weightedMark = marks[key]["mark"] * (marks[key]["weight"] * 0.01)
        if (student.id === markStudent_id) {
            if (!courses[markCourse_id]) {
                let newObj = {}
                newObj["id"] = markCourse_id
                newObj["name"] = marks[key]["name"]
                newObj["teacher"] = marks[key]["teacher"]
                newObj["courseAverage"] = weightedMark
                courses[markCourse_id] = newObj
            } else {
                courses[markCourse_id]["courseAverage"] += weightedMark
                courses[markCourse_id]["courseAverage"] = Math.round(courses[markCourse_id]["courseAverage"] * 100) / 100
            }
        }
    }
    let totalMarks = 0
    let studentCourses = []
    for (let key in courses) {
        totalMarks += courses[key]["courseAverage"]
        studentCourses.push(courses[key])
    }
    student["totalAverage"] = Math.round((totalMarks / studentCourses.length) * 100) / 100
    student["courses"] = studentCourses
    return student
}





exports.getCsvData = getCsvData;
exports.checkCourseWeights = checkCourseWeights;
exports.combineMarksTestsAndCourses = combineMarksTestsAndCourses;
exports.studentToJson = studentToJson;
