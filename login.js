const express = require('express');
const router = express.Router();
const app = express();

router.get('/',(req,res)=>{
    //console.clear();
    res.render('login');
});

module.exports = router;