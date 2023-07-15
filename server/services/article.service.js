const { Article } = require("../models/article");

const addArticle = async ({ body }) => {
  try {
    const article = new Article({ ...body, score: +body.score });
    await article.save();
    return article;
  } catch (error) {
    throw error;
  }
};

const getArticleById = async (_id, user) => {
  try {
    const article = await Article.findById(_id);
    if (!article) {
      throw new Error("Article not found");
    }
    if (user.role === "user" && article.status === "draft") {
      throw new Error("Draft articles can only be seen by admin users");
    }
    return article;
  } catch (error) {
    throw error;
  }
};
const getGuestArticleById = async (_id) => {
  try {
    const article = await Article.findById(_id);
    if (!article) {
      throw new Error("Article not found");
    }
    if (article.status === "draft") {
      throw new Error("Draft articles can only be seen by admin users");
    }
    return article;
  } catch (error) {
    throw error;
  }
};
const updateArticleById = async (_id, body) => {
  try {
    const article = await Article.findByIdAndUpdate(
      _id,
      { $set: body },
      { new: true }
    );
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    throw error;
  }
};
const deleteArticleById = async (_id) => {
  try {
    const article = await Article.findByIdAndRemove(_id);
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    throw error;
  }
};
const getAllArticles = async (req) => {
  const sortBy = req.query.sortby || "_id";
  const order = req.query.order || "desc";
  const limit = req.query.limit || 2;
  try {
    const articles = await Article.find({ status: "public" })
      .sort([[sortBy, order]])
      .limit(+limit);
    if (!articles) {
      throw new Error("There are no articles yet");
    }
    return articles;
  } catch (error) {
    throw error;
  }
};
const getMoreArticles = async (req) => {
  const sortBy = req.body.sortby || "_id";
  const order = req.body.order || "desc";
  const limit = req.body.limit || 3;
  const skip = req.body.skip || 0;

  try {
    const articles = await Article.find({ status: "public" })
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(+limit);
    if (!articles) {
      throw new Error("There are no articles yet");
    }
    return articles;
  } catch (error) {
    throw error;
  }
};
const paginateAdminArticles = async (req) => {
  const limit = req.body.limit || 5;

  const options = {
    page: req.body.page,
    sort: { _id: "desc" },
    limit
  };

  try {
    const aggQuery = Article.aggregate();
    const articles = await Article.aggregatePaginate(aggQuery, options);
    return articles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addArticle,
  getArticleById,
  getGuestArticleById,
  updateArticleById,
  deleteArticleById,
  getAllArticles,
  getMoreArticles,
  paginateAdminArticles,
};
