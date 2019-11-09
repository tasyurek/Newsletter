const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.get("/failure", (req, res) => {
  res.redirect("/");
});

app.post("/", (req, res) => {
  console.log(res.statusCode);

  let // values
    fname = req.body.fname,
    lname = req.body.lname,
    email = req.body.email;

  const // Mailchimp
    API_KEY = "794d7714f2a51b0879e1b66208ca9da5-us5",
    LIST_ID = "fa0f22d746";

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  let options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/" + LIST_ID,
    method: "POST",
    headers: {
      Authorization: "tasyurek2 " + API_KEY
    }
    //body: jsonData
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendfile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running!");
});

// API KEY
// 794d7714f2a51b0879e1b66208ca9da5-us5

// UNIQE ID
// fa0f22d746
