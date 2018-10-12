const express = require('express');
const app = express();
var indexRoutes = require("./routes/api");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
app.use("/", indexRoutes);

app.listen(8080, function(){
	console.log('Testing app listening on port 8080!');
})
