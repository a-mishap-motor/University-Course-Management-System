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

    var studEnrolled, activeStatus, ind = '';

    var courseExists = courses.find((item)=>{
        return (item.code==req.body.enrollRequest) //check if course exists
    });

    if(courseExists){
        console.log("courseExists: "+courseExists.name);
        activeStatus = (courseExists.status=='Active')?true:false;  //check course is active or not
    }
    else res.status(404).send('<h3>Course not found</h3>');
    console.log("activeStatus: "+activeStatus);

    ind = studentsEnrolled.findIndex((item)=>{
        return (item.coursecode == courseExists.code) //find the index of that course in the studentsEnrolled array
    })
    console.log("ind: "+ind);
    
    if(ind>=0){
        studEnrolled = studentsEnrolled[ind].enrollers.find((item)=>{
        return (item == regnoGlobal);  //check whether student already enrolled in course
    })}
    else res.status(404).send('<h3>Course object not found</h3>');
    console.log("studentEnrolled: "+studEnrolled);

    var i = 0;
    if(courseExists && activeStatus && !studEnrolled){ //if all conditions satisfied do the enrolment

        for(i in studentsEnrolled){ 
            if(studentsEnrolled[i].coursecode == req.body.enrollRequest){
                studentsEnrolled[i].enrollers.push(regnoGlobal); //add student to list of enrollers
                break;
            }
        }
        for(i in coursesEnrolled){  
            if(coursesEnrolled[i].regno == regnoGlobal){
                coursesEnrolled[i].coursecodes.push(req.body.enrollRequest); //add to list of student's enrolled courses
                break;
            }
        }
        res.render('enrollsuccess', {coursename: req.body.enrollRequest, 
                                     courses: coursesEnrolled[i].coursecodes});
    }
    else{
        res.setHeader('Content-type','text/html');

        if (!courseExists) res.status(404).write('Course does not exist!');
        if (!activeStatus) res.write('Requested course is not active');
        if (studEnrolled) res.write('You are already enrolled in this course');

        res.write('<br><br><a href=\'/student\'>Click here to return to Dashboard!</a>')
    }
});

router.post('/unenrollsuccess',(req,res)=>{
    
    var studEnrolled, ind = '';

    var courseExists = courses.find((item)=>{
        return (item.code==req.body.unenrollRequest) //check if course exists
    });
    console.log("courseExists: "+courseExists.name);

    ind = studentsEnrolled.findIndex((item)=>{
        return (item.coursecode == courseExists.code) //find the index of that course in the studentsEnrolled array
    })
    console.log("ind: "+ind);
    
    if(ind>=0){
        studEnrolled = studentsEnrolled[ind].enrollers.find((item)=>{
        return (item == regnoGlobal);  //check whether student already enrolled in course
    })}
    else res.status(404).send('<h4>Course object not found</h4>');
    console.log("studentEnrolled: "+studEnrolled);

    var i = 0;
    if(courseExists && studEnrolled){ //if both conditions satisfied do the removal
        for(i in studentsEnrolled){
            if(studentsEnrolled[i].coursecode == req.body.unenrollRequest){
                var index = studentsEnrolled[i].enrollers.indexOf(regnoGlobal);
                studentsEnrolled[i].enrollers.splice(index, 1); //remove student from list of enrollers
                break;
            }
        }
        for(i in coursesEnrolled){
            if(coursesEnrolled[i].regno == regnoGlobal){
                var index = coursesEnrolled[i].coursecodes.indexOf(req.body.unenrollRequest);
                coursesEnrolled[i].coursecodes.splice(index, 1); //remove from list of student's enrolled courses
                break;
            }
        }
        res.render('unenrollsuccess', {coursename: req.body.unenrollRequest, 
            courses: coursesEnrolled[i].coursecodes});
    }
    else{
        res.setHeader('Content-type','text/html');

        if (!courseExists) res.status(404).write('Course does not exist!');
        if (studEnrolled) res.write('You are already enrolled in this course!');

        res.write('<br><br><a href=\'/student\'>Click here to return to Dashboard</a>')
    }
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