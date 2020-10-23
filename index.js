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

app.get("/api/questions", async (req, res) => {
  try {
    Questions.find({}, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        return res.json(doc);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return;
});

app.post("/api/get-answer", async (req, res) => {
  const { _id, num, answer } = req.body;
  let checkAnswer;
  try {
    checkAnswer = Questions.findById(_id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      // console.log("doc.answer", doc.answer);
      if (doc.answer === parseInt(answer)) {
        return res.json({ answer: true });
      } else {
        return res.json({ answer: false });
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

app.post("/api/post-Qustion", async (req, res) => {
  const data = req.body;

  const newQuestions = new Questions(data);
  try {
    newQuestions.save((err) => {
      if (err) {
        return res.status(500).json({ msg: "Sorry server error" });
        console.log("err", err);
      } else {
        return res.json({
          msg: "your data has ben save",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }

  return res.json({ msg: "we receive your data" });
});

// lvel two API

app.get("/api/levl-two", async (req, res) => {
  try {
    LevelTwo.find({}, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        return res.json(doc);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return;
});

app.post("/api/leveltwo-answer", async (req, res) => {
  const { _id, num, answer } = req.body;

  let checkAnswer;
  try {
    checkAnswer = LvelTwo.findById(_id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log("doc.answer", doc.answer);
      if (doc.answer === parseInt(answer)) {
        return res.json({ answer: true });
      } else {
        return res.json({ answer: false });
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
  return;
});

// level three

app.get("/api/three-two", async (req, res) => {
  try {
    LevelThree.find({}, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        return res.json(doc);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return;
});

app.post("/api/levelthree-answer", async (req, res) => {
  const { _id, num, answer } = req.body;

  let checkAnswer;
  try {
    checkAnswer = LevelThree.findById(_id, (err, doc) => {
      if (err) {
        console.log(err);
      }
      // console.log("doc.answer", doc.answer);
      if (doc.answer === parseInt(answer)) {
        return res.json({ answer: true });
      } else {
        return res.json({ answer: false });
      }
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
  // return;
});

app.post("/api/lvel-three", async (req, res) => {
  const data = req.body;

  const newQuestions = new LevelThree(data);
  try {
    newQuestions.save((err) => {
      if (err) {
        return res.status(500).json({ msg: "Sorry server error" });
      } else {
        return res.json({
          msg: "your data has ben save",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
  return res.json({ msg: "we receive your lvel two data" });
});

// players

app.post("/api/player", async (req, res) => {
  const name = req.body;
  const newPlayer = new Players(name);

  try {
    newPlayer.save((err) => {
      if (err) {
        return res.status(500).json({ msg: "Sorry server error" });
      } else {
        // return res.json({ msg: "your name has ben saved" });
        return res.json({ id: newPlayer._id, name: newPlayer.name });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/players-list", async (req, res) => {
  try {
    Players.find({}, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        return res.json(doc);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return;
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.post("/api/players-score", async (req, res) => {
  const { _id, finalScore } = req.body;
  console.log(_id, finalScore);
  let findPlay;
  try {
    findPlay = await Players.findById(_id);
  } catch (err) {
    console.log(err);
  }
  // console.log(findPlay);
  if (findPlay) {
    console.log("findPlay", findPlay);
  }
  try {
    await findPlay.updateOne({ finalScore: finalScore });
  } catch (err) {
    console.log(err);
  }
  return res.json({ msg: "players ben update" });
});

app.get("/api/player-score", async (req, res) => {
  Players.find({}, (err, doc) => {
    try {
      if (err) {
        throw Error;
      } else {
        res.json(doc);
      }
    } catch (err) {
      console.log(err);
    }
  });
  return;
});

const PORT = process.env.PORT || 5000;

const server = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}!`);
  });
};

connectDB(server);
