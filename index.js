const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { parse } = require("querystring");
const { log } = require("console");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "pages")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/pages/about.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/pages/login.html");
});
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/pages/signup.html");
});

// creating data

app.post("/signindata", (req, res) => {
  const { username, email, password } = req.body

  const formdata = { username, email, password }

  fs.readFile("signindetails.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err)
      res.status(500).send("Error processing signindetails")
      return
    }

    let signindetails = []

    if (data) {
      try{
        signindetails = JSON.parse(data)
      } catch(err){
        console.error("error parsing data", parseErr)
        return res.status(500).send("error processing data")
      }
    }

    signindetails.push(formdata)

    fs.writeFile(
      "signindetails.json",
      JSON.stringify(signindetails, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing file:", err)
          res.status(500).send("Error processing signindetails")
          return
        }
        console.log("signin successful:", formdata)
        res.send("signin successful")
      }
    );
  });
});

//rading the data
app.get("/readingdata", (req, res) => {
  const specificID = req.body.email;
  try {
    const readingdata = fs.readFileSync("logindetails.json", "utf8");
    const parsedreadingdata = JSON.parse(readingdata);
    const datafetched = parsedreadingdata.filter(
      (item) => item.email === specificID
    );
    res.send(datafetched);
  } catch (err) {
    console.error("No such data found", err);
  }
});

//updating data

app.put("/updatingdata/:emailId", (req, res) => {
  const referencevar = req.params.emailId;
  const passwordvalue = req.body.password;
  try {
    const datainfile = fs.readFileSync("logindetails.json", "utf8");
    const parseddatainfile = JSON.parse(datainfile);
    const dataupdated = parseddatainfile.findIndex(
      (item) => item.email === referencevar
    );
    if (dataupdated !== -1) {
      parseddatainfile[dataupdated] = {
        ...parseddatainfile[dataupdated],
        password: passwordvalue,
      };
      fs.writeFileSync(
        "logindetails.json",
        JSON.stringify(parseddatainfile, null, 2),
        "utf8"
      );
      console.log("data updated succesfully");
      res.send("data updated succesfully");
    } else {
      console.log("data instance not found");
    }
  } catch (err) {
    console.error("No such data found", err);
  }
});

//deleting data

app.delete("/deletedata/:emailId", (req, res) => {
  const deletedata = req.params.emailId;
  console.log(deletedata);
  try {
    const datainfile = fs.readFileSync("logindetails.json", "utf8");
    const parseddatainfile = JSON.parse(datainfile);
    const datafetched = parseddatainfile.findIndex(item => item.email == deletedata);
    if (datafetched !== -1) {
      parseddatainfile.splice(datafetched, 1);
      fs.writeFileSync(
        "logindetails.json",
        JSON.stringify(parseddatainfile, null, 2),
        "utf8"
      );
      console.log("data deleted successfully");
      res.send("data deleted successfully");
    } else{
      console,log("data does not exist")
      res.send("data does not exist")
    }
  } catch (err) {
    console.error("No such data found", err);
  }
});

//login verification

app.post("/logindata",(req, res)=>{
  const emailID = req.body.email
  const passwordval = req.body.password

fs.readFile('signindetails.json', 'utf8', (err, data)=>{
  if(err){
    console.error("error finding file", err)
    res.status(500).send("Error processing signindetails")
    return
  }

  const users = JSON.parse(data)
  const user = users.find(user=>user.email===emailID)

  if(!user){
    res.redirect('/signup')
  } else{
    if(user.password==passwordval){
      res.redirect('/')
    } else{
      res.redirect('/login?error==incorrect')
    }
  }

})

})

app.listen(port, () => {
  console.log(`this app is running on port http://localhost:${port}`);
});
