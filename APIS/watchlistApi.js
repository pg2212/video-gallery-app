const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const checkToken = require("./middlewares/verifyToken");
const watchlistApi = express.Router();

watchlistApi.use(express.json());
let watchlistCollection;
watchlistApi.use((req, res, next) => {
  watchlistCollection = req.app.get("watchlistCollection");
  next();
});

watchlistApi.get(
  "/getlist/:email",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let list = await watchlistCollection.findOne({ email: email });
    if (list) {
      res.send({ message: "success", payload: list.watchlist });
    } else {
      res.send({ message: "success", payload: [] });
    }
  })
);
watchlistApi.post(
  "/addtowatchlist",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, id } = req.body;
    let oldContent = await watchlistCollection.findOne({ email: email });
    if (oldContent) {
      await watchlistCollection.updateOne(
        { email: email },
        { $addToSet: { watchlist: id } }
      );
      res.send({ message: "success", payload: id });
    } else {
      await watchlistCollection.insertOne({
        email: email,
        watchlist: [id],
      });
      res.send({ message: "success", payload: id });
    }
  })
);
watchlistApi.put(
  "/deletefromwatchlist",
  checkToken,
  expressAsyncHandler(async (req, res) => {
    let { email, id } = req.body;
    let { watchlist } = await watchlistCollection.findOne({ email: email });
    let index = watchlist.findIndex((value) => value === id);
    await watchlistCollection.updateOne(
      { email: email },
      { $pull: { watchlist: id } }
    );
    res.send({ message: "success", index: index });
  })
);

module.exports = watchlistApi;