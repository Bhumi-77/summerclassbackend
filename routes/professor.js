var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
});
router.get('/professor', function(req, res, next) {
res.json({
    name :"professor name",
    college :"islington college",
    tech :["javaScript" , "Express", "React"],
  });
});
module.exports = router;