const indexPage = require('./login');
const coursePages = require('./courses');
const studentPages = require('./student');
const express = require('express');
const app = express();

app.set('views','./views');
app.set('view engine','pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/',indexPage);
app.use('/courses',coursePages);
app.use('/student',studentPages);

courses = [
    { name: "Physics", code: "PHY1001", status: "Active" },
    { name: "Circuit Theory", code: "ECM1001", status: "Active" },
    { name: "Web of Things", code: "ECM1004", status: "Inactive" },
    { name: "Analog Electronics", code: "ECE2002", status: "Active" },
    { name: "Computer Vision", code: "CSE3017", status: "Active" },
    { name: "Machine Learning", code: "ECM2002", status: "Active" },
    { name: "TARP", code: "ECM3999", status: "Inactive" }
];
students = [
    { regno:"16BLC1001", name:"Soham Sengupta", pwd:"hello1"},
    { regno:"16BLC1002", name:"Thomas Gauspen", pwd:"hello2"},
    { regno:"16BLC1003", name:"Stephana S Goum", pwd:"hello3"},
    { regno:"16BLC1004", name:"Megan S. Pashtou", pwd:"hello4"},
    { regno:"16BLC1005", name:"Peshto Gausman", pwd:"hello5"},
    { regno:"16BLC1006", name:"Gus Thomas Pena", pwd:"hello6"},
];
coursesEnrolled = [
    { regno: "16BLC1001", coursecodes: ["ECM1001","ECM1004"] },
    { regno: "16BLC1002", coursecodes: ["ECM1001","ECM1004"] },
    { regno: "16BLC1003", coursecodes: ["ECM2002","CSE3017"] },
    { regno: "16BLC1004", coursecodes: ["ECE2022","ECM1004"] },
    { regno: "16BLC1005", coursecodes: ["CSE3017","ECE2022"] },
    { regno: "16BLC1006", coursecodes: ["ECM1004","ECM2002"] },
];
studentsEnrolled = [
    { coursecode:"ECM1001", enrollers:["16BLC1001","16BLC1003","16BLC1005","16BLC1006"]},
    { coursecode:"ECM1004", enrollers:["16BLC1001","16BLC1002","16BLC1003","16BLC1004","16BLC1006"]},
    { coursecode:"ECM2002", enrollers:["16BLC1001","16BLC1003","16BLC1005","16BLC1002","16BLC1006"]},
    { coursecode:"CSE3017", enrollers:["16BLC1001","16BLC1003","16BLC1005","16BLC1004","16BLC1006"]},
    { coursecode:"ECE2022", enrollers:["16BLC1004","16BLC1006"]},
];

/* app.locals.studentsEnrolled = [
    { ECM1001:["16BLC1002","16BLC1003","16BLC1005","16BLC1006"]},
    { ECM1004:["16BLC1001","16BLC1002","16BLC1003","16BLC1004","16BLC1006"]},
    { ECM2002:["16BLC1001","16BLC1003","16BLC1005","16BLC1002","16BLC1006"]},
    { CSE3017:["16BLC1001","16BLC1003","16BLC1005","16BLC1004","16BLC1006"]},
    { ECE2002:["16BLC1005","16BLC1006"]},
]; */

app.listen(5000);
