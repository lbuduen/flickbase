const httpStatus = require("http-status");
const { articleService, authService } = require("../services");

const ArticleController = {
  async createArticle(req, res, next) {
    try {
      const article = await articleService.addArticle(req);
      res.json(article);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async getArticleById(req, res, next) {
    try {
      const article = await articleService.getArticleById(
        req.params.id,
        req.user
      );
      res.json(article);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async getGuestArticleById(req, res, next) {
    try {
      const article = await articleService.getGuestArticleById(req.params.id);
      res.json(article);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async updateArticleById(req, res, next) {
    try {
      const article = await articleService.updateArticleById(
        req.params.id,
        req.body
      );
      res.json(article);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async deleteArticleById(req, res, next) {
    try {
      await articleService.deleteArticleById(req.params.id);
      res.status(httpStatus.OK).json({ ok: true });
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async getAllArticles(req, res, next) {
    try {
      const articles = await articleService.getAllArticles(req);
      res.json(articles);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async getMoreArticles(req, res, next) {
    try {
      const articles = await articleService.getMoreArticles(req);
      res.json(articles);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
  async getAdminPages(req, res, next) {
    try {
      const articles = await articleService.paginateAdminArticles(req);
      res.json(articles);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).send(error.message);
      next();
    }
  },
};

module.exports = ArticleController;
