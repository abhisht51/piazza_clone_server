const { json } = require('body-parser');
const Question = require('../models/question');


const questionsAuth = (req, res, next) => {
  // let questionId = req.body.id;
  let authorId = req.body.question_author_id;
  // const question = Question.findOne(questionId);
 
  // res.send(question.author.id);
  // console.log(question.auth)
  if (authorId === (req.user.id) || req.user.role === 'admin') return next();

  // if (question.author.id.equals(req.user.id) || req.user.role === 'admin') return next();
  console.log("hello bro");

  res.status(401).end();
};

module.exports = questionsAuth;
