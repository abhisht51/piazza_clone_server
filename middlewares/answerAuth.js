const answerAuth = (req, res, next) => {
  let answer_author_id = req.body.answer_author_id;
  if (answer_author_id === req.user.id || req.user.role === 'admin') return next();
  res.status(401).end();
};

module.exports = answerAuth;
