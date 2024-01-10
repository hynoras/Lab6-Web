const express = require("express");
const mongoose = require("mongoose");
const Posts = require("./postModel.js");
const Cors = require("cors");
const Pusher = require("pusher");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// App Config
const app = express();
const port = process.env.PORT || 8081;
const connection_url = "mongodb+srv://hynoras:Quang23022002@cluster0.hxredev.mongodb.net/?retryWrites=true&w=majority";

dotenv.config();

const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap1",
  useTLS: true,
});

// Middleware
app.use(express.json());
app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");
  // Instead of change stream, use watch for changes
  const postWatch = Posts.watch();
  postWatch.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      console.log("Trigerring Pusher");
      pusher.trigger("posts", "inserted", {
        change: change,
      });
    } else {
      console.log("Error trigerring Pusher");
    }
  });
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));
app.post("/upload", async (req, res) => {
  try {
    const dbPost = req.body;
    const data = await Posts.create(dbPost);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/sync", async (req, res) => {
  try {
    const data = await Posts.find().exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));