const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
const password = "ZkQrySM2kUf011B3";

const app = express();

mongoose
  .connect(
    `mongodb+srv://abatandivine:${password}@blog.9p9yv.mongodb.net/?retryWrites=true&w=majority&appName=Blog`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database Connection Error:", err));

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(methodOverride("_method"));


app.use(express.urlencoded({ extended: false }));
app.use("/articles", articlesRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.listen(5000, () => {
  console.log("server running");
});
