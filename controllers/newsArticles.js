const NewsArticle = require("../models/newsArticle.js");
const InternalServerError = require("../errors/internalServerError");
const { handleRepeatErrors } = require("../middlewares/error-handler");

const getItems = (req, res, next) => {
  NewsArticle.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return next(new InternalServerError(err.message));
    });
};

const likeItem = (req, res, next) => {
  NewsArticle.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ item }))

    .catch((err) => {
      console.error(err);
      handleRepeatErrors(err, res, next);
    });
};

const dislikeItem = (req, res, next) => {
  NewsArticle.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((err) => {
      console.error(err);
      handleRepeatErrors(err, res, next);
    });
};

module.exports = {
  getItems,

  likeItem,
  dislikeItem,
};
