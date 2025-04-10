// Load the Express package as a module
const express = require("express");
const bodyParser = require("body-parser");
// Access the exported service
const app = express();

//body-parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.static("public"));
const multer = require("multer");

const upload = multer();

// Port 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// Index
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Gets
app.get("/ex1", (request, response) => {
  response.sendFile(`${__dirname}/views/ex1.html`);
});


app.get("/ex2", (request, response) => {
  response.sendFile(`${__dirname}/views/ex2.html`);
});


app.get("/ex3", (request, response) => {
  response.sendFile(`${__dirname}/views/ex3.html`);
});

// Posts
app.post("/ex1", upload.array(), (request, response) => {
  const name = request.body.name;
  const email = request.body.email
  response.send(`Hello ${name}, we'll send you a confirmation to ${email}.`);
});

// EX2
app.post('/api/countries', (req, res) => {
  const { name, countries } = req.body;
  const num = countries.length;

  res.json({
    message: `Hello ${name}, you have visited ${num} countries!`
  });
});


let articles = [];

app.post("/articles", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  // Calculate the new article ID (incrementing the highest existing ID by 1)
  let maxID = 0;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id > maxID) {
      maxID = articles[i].id;
    }
  }

  const newId = maxID + 1;  // New ID is the max ID plus 1
  const newArticle = {
    id: newId,
    title: title,
    content: content,
  };

  // Add the new article to the articles array
  articles.push(newArticle);

  // Respond with a message including the title and new ID
  res.json({
    message: `New article added successfully with the title "${title}" and ID ${newId}`,
  });
});