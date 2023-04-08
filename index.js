const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const URL = require("./models/urlSchema");
require("dotenv").config();
require("./db");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.get("/", function (req, res) {
  let allURL = URL.find(function (err, result) {
    res.render("home", {
      urlResult: result,
    });
  });
  res.send("Welcome");
});

app.post("/create", function (req, res) {
  let urlShort = new URL({
    longURL: req.body.longURL,
    shortURL: generateURL(),
  });
  urlShort.save(function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});

app.get("/:urlID", function (req, res) {
  URL.findone({ shortURL: req.params.urlID }, function (err, data) {
    if (err) throw err;

    URL.findByIdAndUpdate(
      { _id: data.id },
      { $inc: { clickCount: 1 } },
      function (err, updatedData) {
        if (err) throw err;
        res.redirect(data.longURL);
      }
    );
  });
});

app.get("/delete/:id", function (req, res) {
  URL.findByIdAndDelete({ _id: req.params.id }, function (err, deleteData) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`server start at port no : ${PORT}`);
});

function generateURL() {
  var randomResult = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < 5; i++) {
    randomResult += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  console.log(randomResult);
  return randomResult;
}
