const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db.js');

const port = 3000;

// Body parser
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/items', (req, res) => {
    db.get((json) => res.send(JSON.stringify(json)));
});

app.post('/items', (req, res) => {
    db.save(req.body, (content)=>{
        res.send(content)});
});

app.put('/items/:id', (req,res)=>{
    db.update(req.params.id,req.body, (content)=>{
        res.send(content)});
   
});

app.delete('/items/:id', (req,res)=>{
    db.remove(req.params.id,(content)=>{
        res.send(content)});
   
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));