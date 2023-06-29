const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname +"/date.js");
const app = express();

let items = ["Buy food", "Someones birthday", "Play apex"];
let workitems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static("public"));


app.get("/", function(req, res) {
 let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItem: items
  });
});
  app.post("/", function(req, res) {

    let item = req.body.newItem;
if (req.body.list === "Work List"){
  workitems.push(item);
  res.redirect("/work");
} else {
  items.push(item);

  res.redirect("/");
}

  });

  app.get("/work", function (req, res){
    res.render("list", {
      listTitle: "Work List",
      newListItem: workitems,
    });
  });
app.post("/work", function (req,res){
  workitems = req.body.newItem;
  workitems.push(item)
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("currently running on server 3000");
})
