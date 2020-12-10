const Question = require('../models/question');

exports.listPopulerTags = async (req, res, next) => {
  try {
    const tags = await Question.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 25 }
    ]);
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.listTags = async (req, res, next) => {
  try {
    const tags = await Question.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

exports.searchTags = async (req, res, next) => {
  // const { tag = '' } = req.params;
  console.log("hi");
  let tag = req.body.tags;
  console.log(tag);
  try {

    const questions = await Question.find({tags:{ $regex: tag, $options: 'i' }}).sort([['created', -1]]);

    const tags = await Question.aggregate([
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags' } },//, count: { $sum: 1 }
      { $match: { _id: { $regex: tag, $options: 'i' } } },
      { $sort: { count: -1 } }
    ]);

    res.json(questions);
  } catch (error) {
    console.log("noheyy");

    next(error);
  }
};
