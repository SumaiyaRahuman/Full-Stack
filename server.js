const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", function(req, res) {
res.sendFile(__dirname + "/FS6.html");
});
app.post("/submit", function(req, res) {
const name = req.body.name;
const email = req.body.email;
const rating = req.body.rating;
const feedback = req.body.feedback;
res.send(`
<h2>Survey Submitted Successfully</h2>
<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Rating:</b> ${rating}</p>
<p><b>Feedback:</b> ${feedback}</p>
<br>
<a href="/">Back to Survey</a>
`);
});
app.listen(3000, function() {
console.log("Server running at http://localhost:3000");
});