const express = require("express");
const enableCORS = require("./enableCORS");
const connectDB = require("./models/connectDB");
const Questions = require("./models/QuestionsDB");
const LvelTwo = require("./models/LevleTwo");
const LevelTwo = require("./models/LevleTwo");
const LevelThree = require("./models/LevelThree");
const Players = require("./models/players");

const app = express();

app.use(enableCORS);
app.use(express.json());

app.get("/api/questions", (req, res) => {
  Questions.find({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

app.post("/api/get-answer", (req, res) => {
  const { _id, num, answer } = req.body;
  let checkAnswer;
  try {
    checkAnswer = Questions.findById(_id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      // console.log("doc.answer", doc.answer);
      if (doc.answer === parseInt(answer)) {
        res.json({ answer: true });
      } else {
        res.json({ answer: false });
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

app.post("/api/post-Qustion", (req, res) => {
  console.log("body", req.body);
  const data = req.body;

  const newQuestions = new Questions(data);

  newQuestions.save((err) => {
    if (err) {
      res.status(500).json({ msg: "Sorry server error" });
      console.log("err", err);
    } else {
      res.json({
        msg: "your data has ben save",
      });
    }
  });
  res.json({ msg: "we receive your data" });
});

// lvel two API

app.get("/api/levl-two", (req, res) => {
  LevelTwo.find({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

app.post("/api/leveltwo-answer", (req, res) => {
  const { _id, num, answer } = req.body;
  console.log("body backend", num, answer, _id);

  let checkAnswer;
  try {
    checkAnswer = LvelTwo.findById(_id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log("doc.answer", doc.answer);
      if (doc.answer === parseInt(answer)) {
        res.json({ answer: true });
      } else {
        res.json({ answer: false });
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

// level three

app.get("/api/three-two", (req, res) => {
  LevelThree.find({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

app.post("/api/levelthree-answer", (req, res) => {
  const { _id, num, answer } = req.body;
  console.log("body backend", num, answer, _id);

  let checkAnswer;
  try {
    checkAnswer = LevelThree.findById(_id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log("doc.answer", doc.answer);
      if (doc.answer === parseInt(answer)) {
        res.json({ answer: true });
      } else {
        res.json({ answer: false });
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

app.post("/api/lvel-three", (req, res) => {
  console.log("body", req.body);
  const data = req.body;

  const newQuestions = new LevelThree(data);

  newQuestions.save((err) => {
    if (err) {
      res.status(500).json({ msg: "Sorry server error" });
      console.log("err", err);
    } else {
      res.json({
        msg: "your data has ben save",
      });
    }
  });
  res.json({ msg: "we receive your lvel two data" });
});

// players

app.post("/api/player", (req, res) => {
  const name = req.body;
  console.log("player", name);
  const newPlayer = new Players(name);
  newPlayer.save((err) => {
    if (err) {
      res.status(500).json({ msg: "Sorry server error" });
    } else {
      res.json({ msg: "your name has ben saved" });
    }
  });
  res.json({ id: newPlayer._id, name: newPlayer.name });
});

app.get("/api/players-list", (req, res) => {
  Players.find({}, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

const server = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}!`);
  });
};

connectDB(server);
