var express = require('express');
var router = express.Router();

let goals = [{
  name:"aaa",
  description:"aaa",
  dueDate:"25-12-24"
}];

/* GET home page. */
router.get('/getGoals', function(req, res, next) {
  res.json(goals);
});

router.post('/addGoals', function(req, res, next) {
  let timestamp = Date.now()+Math.random();
  if(req.body && req.body.name && req.body.description && req.body.dueDate){
      req.body.id = timestamp.toString();
      goals.push(req.body);
      res.status(200).json(goals);
  } else{
      res.status(400).json({error:"No se están enviando los parámetros correctos"});
  }
});

router.delete('/removeGoals/:id', function(req, res, next) {
if(req.params && req.params.id){
    let id = req.params.id;
    goals = goals.filter(goals => goals.id !== id);
    res.status(200).json(goals);
}else {
    res.json("No");
}
});

module.exports = router;
