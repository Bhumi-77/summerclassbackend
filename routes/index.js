var express = require('express');
const { verifyUsercontroller } = require('../controller/indexcontroller');
const { validateTokenMiddleware } = require('../middleware/AuthMiddleware');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/api/verify/me", validateTokenMiddleware, verifyUsercontroller);

module.exports = router;
