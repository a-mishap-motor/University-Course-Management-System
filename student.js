const express = require('express');
const router = express.Router();

regnoGlobal = '';

router.use(express.json());
router.use(express.urlencoded({extended: true}));

dir = __dirname;
regnoGlobal = '';

router.post('/',(req,res)=>{
    regnoGlobal = req.body.regno;
    var ind = students.findIndex((stud)=>{
        return (stud.regno==req.body.regno);
    });

    if((req.body.regno)==students[ind].regno && (req.body.pwd)==students[ind].pwd) {
        res.render('student',{studname: regnoGlobal});
    }
    else {
        res.status(401).send('Invalid Username or Password');
    }
    
});

router.get('/',(req,res)=>{
    res.render('student',{studname: regnoGlobal});
});

router.get('/allcourses',(req,res)=>{
    res.send(courses);
    //res.render('allcourses',{courselist: courses});
});

router.get('/enroll',(req,res)=>{
    res.render('enroll',{regno: regnoGlobal});
});

router.get('/unenroll',(req,res)=>{
    res.render('unenroll',{regno: regnoGlobal});
});

router.post('/enrollsuccess',(req,res)=>{

    /* pending: validate course existence and active status */
    /* also check whether the guy had already enrolled */
    // if(courses.find(req.body.enrollRequest)) { //if course exists
        
        var i = 0;
        for(i in studentsEnrolled){ //add student to list of enrollers
            if(studentsEnrolled[i].coursecode == req.body.enrollRequest){
                studentsEnrolled[i].enrollers.push(regnoGlobal);
                break;
            }
        }
        for(i in coursesEnrolled){  //added to list of enrolled courses
            if(coursesEnrolled[i].regno == regnoGlobal){
                coursesEnrolled[i].coursecodes.push(req.body.enrollRequest);
                break;
            }
        }
        res.render('enrollsuccess', {coursename: req.body.enrollRequest, 
                                     courses: coursesEnrolled[i].coursecodes});
//})
    // }
    // else {
    //     res.status(401).send("Invalid Request");
    // }
});

router.post('/unenrollsuccess',(req,res)=>{
    
    /* pending: validate course existence and active status */
    /* also check whether the guy had already enrolled */
    // if(courses.find(req.body.unenrollRequest)) { //if course exists

        var i = 0;
        for(i in studentsEnrolled){ //remove student from list of enrollers
            if(studentsEnrolled[i].coursecode == req.body.unenrollRequest){
                var index = studentsEnrolled[i].enrollers.indexOf(regnoGlobal);
                studentsEnrolled[i].enrollers.splice(index, 1);
                break;
            }
        }
        for(i in coursesEnrolled){  //removed from list of enrolled courses
            if(coursesEnrolled[i].regno == regnoGlobal){
                var index = coursesEnrolled[i].coursecodes.indexOf(req.body.unenrollRequest);
                coursesEnrolled[i].coursecodes.splice(index, 1);
                break;
            }
        }
        res.render('unenrollsuccess', {coursename: req.body.unenrollRequest, 
            courses: coursesEnrolled[i].coursecodes});


//})
    // }
    // else {
    //     res.status(401).send("Invalid Request");
    // }
});

router.get('/showenrolled',(req,res)=>{
    var currentStudentCourses = []
    for (var i=0; i<coursesEnrolled.length; ++i) {
        if(coursesEnrolled[i].regno == regnoGlobal)
            currentStudentCourses = coursesEnrolled[i].coursecodes;
    }
    res.render('showenrolled',{regno: regnoGlobal, courses: currentStudentCourses});
});

module.exports = router;