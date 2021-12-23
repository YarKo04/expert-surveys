const express = require("express");
const mysql = require('mysql2');

const app = express();
const jsonParse = express.json();

const connectionOptions = {
  host: "localhost",
  user: "root",
  password: "8888",
  database: "expertsurveys"
};

const con = mysql.createConnection(connectionOptions);

app.get("/api/getanswer/:answerid", function (req, res) {
  const sql = `SELECT * FROM Answer WHERE id = ${req.params.answerid}`

  con.connect(function (err) {
    if (err) throw err;

    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});


app.get("/api/getanswers", function (req, res) {
  con.connect(function (err) {
    if (err) throw err;

    con.query(`SELECT * from Answer`, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404)
    });
  });
});

app.post("/api/addanswer/", jsonParse, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);
  const sql = `INSERT INTO Answer (id, text, date, Experts_id, Question_id, SelectedAlt_id) VALUES (${req.body.id},\"${req.body.text}\", \"${req.body.date}\", ${req.body.Experts_id}, ${req.body.Question_id}, ${req.body.SelectedAlt_id})`;

  con.connect(function (err) {
    if (err) throw err;

    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.delete("/api/deleteanswer/:answerid", function (req, res) {
  const sql = `DELETE FROM Answer WHERE id = ${req.params.answerid}`

  con.connect(function (err) {
    if (err) throw err;

    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.put("/api/updateanswer/:answerid", jsonParse, function (req, res) {
  if (!req.body)
    return res.sendStatus(400);

  con.connect(function (err) {
    if (err) throw err;

    const sql = `UPDATE Answer SET text = \"${req.body.text}\", date = \"${req.body.date}\", Experts_id = \"${req.body.Experts_id}\", Question_id = \"${req.body.Question_id}\", SelectedAlt_id = \"${req.body.SelectedAlt_id}\" WHERE id = ${req.params.answerid} `
    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      result ? res.send(result) : res.sendStatus(404);
    });
  });
});

app.listen(2222);