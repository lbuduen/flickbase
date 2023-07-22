const router = require("express").Router();
const auth = require("../middlewares/auth");
const ArticleController = require("../controllers/article.controller");

router
  .route("/")
  .post(auth("createAny", "articles"), ArticleController.createArticle)
  .get(auth("readAny", "articles"), ArticleController.getAllArticles)
router
  .route("/article/:id")
  .get(auth("readAny", "articles"), ArticleController.getArticleById)
  .patch(auth("updateAny", "articles"), ArticleController.updateArticleById)
  .delete(auth("deleteAny", "articles"), ArticleController.deleteArticleById);
router
  .route("/admin/paginate")
  .post(auth("readAny", "articles"), ArticleController.getAdminPages);

router.route("/guest/:id").get(ArticleController.getGuestArticleById);
router.route("/more").post(ArticleController.getMoreArticles);

module.exports = router;
