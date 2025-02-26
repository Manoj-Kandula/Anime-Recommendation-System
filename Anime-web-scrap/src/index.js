const express = require("express");
const cors = require("cors");

const {
  getPopularAnime,
  getSearchedAnime,
  getAnimePage,
} = require("./animeAPI");

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/popular", async (req, res) => {
  try {
    const popular = await getPopularAnime();
    res.status(200).json(popular);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/search", async (req, res) => {
  const { search } = req.query;
  try {
    const data = await getSearchedAnime(search);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
  console.log(search);
});

app.get("/api/anime", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await getAnimePage(id);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
  console.log(id);
});

app.get("/api/recommend", async (req, res) => {
  const { anime } = req.query;

  let animes = getRecommendations(anime);

  try {
    let data = [];
    animes = animes.split(",");
    for (let el of animes) {
      let temp = await getSearchedAnime(el);
      temp = temp.filter((e) => {
        const a = e.title.toLowerCase();
        const c = e.jtitle.toLowerCase();
        const b = el.toLowerCase();
        return a == b || c == b;
      });
      data.push(...temp);
    }
    
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
