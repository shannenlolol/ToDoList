const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/", function(req, res){

    
    var today = new Date()

    var options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    }

    var day = today.toLocaleDateString("en-US", options)
    res.render("list", {kindOfDay: day, newListItems: items});
    
  
});

app.post("/", function(req,res){
    var item = req.body.newItem
    items.push(item)
    res.redirect("/")
})
app.post("/del", function(req, res){

    items.splice(req.body.del, 1);

    res.redirect("/");

  });

  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  };
   
  app.listen(port, ()=> {
    console.log("Server Started!");
  });