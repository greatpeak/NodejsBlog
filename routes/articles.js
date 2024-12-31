const express = require("express");
const Article = require("../models/article");

const router = express.Router();

// Route for creating a new article
router.get("/new", (req, res) => {
  res.render("articles/new", {
    article: new Article(),
  });
});

// Route for editing an article by slug
router.get("/edit/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (!article) return res.redirect("/");
  res.render("articles/edit", { article: article });
});

// Route for showing an article by slug
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (!article) return res.redirect("/");
  res.render("articles/show", { article: article });
});

// Route for creating a new article
router.post("/", async (req, res) => {
  console.log("Form Data: ", req.body);
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    console.log("Article Saved: ", article);
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    console.error(err);
    res.render("articles/new", {
      article: article,
    });
  }
});

// Route for updating an article by ID
router.put("/:id", async (req, res) => {
  let article;
  try {
    article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    console.error(err);
    res.render("articles/edit", {
      article: article,
    });
  }
});

// Route for deleting an article by ID
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
