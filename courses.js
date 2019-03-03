const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('This is where all the courses will be displayed');
});

router.get('/physics',(req,res)=>{
    res.send('This is the Physics course');
});

router.get('/chemistry',(req,res)=>{
    res.send('This is the Chemistry course');
});

module.exports = router;