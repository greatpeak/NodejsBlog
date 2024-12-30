const express = require("express");
const Article = require("../models/article");

const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", {
    article: new Article(),
  });
});

// edit route
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.redirect("/");
  res.render("articles/edit", { article: article });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (!article) return res.redirect("/");
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    console.error(err);
    res.render("articles/new", {
      article: article,
    });
  }
});

router.put("/:id", async (req, res) => {
  let article;
  try {
    article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    console.error(err);
    res.render("articles/edit", {
      article: article,
    });
  }
})

// delete Router
router.delete("/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;
