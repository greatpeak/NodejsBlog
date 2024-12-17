const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");

const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/articles", articlesRouter);

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Article 1",
      createdAt: new Date(),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum, mi id tempus lobortis, justo quam faucibus sapien, at dictum urna sapien non velit.",
    },
    {
      title: "Article 2",
      createdAt: new Date(),
      description:
        "Vestibulum tincidunt, orci id vulputate bibendum, metus ipsum tincidunt purus, vel malesuada metus eros id neque.",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.listen(5000, () => {
  console.log("server running");
});
